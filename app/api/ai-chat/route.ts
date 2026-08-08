import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { z } from 'zod';

const chatSchema = z.object({
  message: z.string().min(1, 'Message is required').max(10000, 'Message too long'),
});

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: Request) {
  try {
    // Validate request body
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const validation = chatSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { message } = validation.data;

    const openai = getOpenAI();

    const stream = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      stream: true,
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful AI tutor for developers. Explain concepts clearly and provide code examples when relevant.',
        },
        {
          role: 'user',
          content: message,
        },
      ],
    });

    const encoder = new TextEncoder();
    const customReadable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
        } catch (streamError) {
          console.error('STREAM ERROR:', streamError);
          controller.error(streamError);
        } finally {
          controller.close();
        }
      },
    });

    return new NextResponse(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        ...CORS_HEADERS,
      },
    });
  } catch (error) {
    console.error('AI CHAT ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'AI service unavailable. Please try again.' },
      { status: 503, headers: CORS_HEADERS }
    );
  }
}
