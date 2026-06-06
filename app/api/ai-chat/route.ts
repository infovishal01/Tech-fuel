import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const openai = getOpenAI();
    const { message } = await req.json();

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
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(customReadable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'AI Chat failed',
    });
  }
}
