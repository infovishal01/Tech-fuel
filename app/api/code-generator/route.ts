import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { z } from 'zod';

const codeGenSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required').max(5000, 'Prompt too long'),
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
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON in request body' },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const validation = codeGenSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { prompt } = validation.data;

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `You are a senior software architect.
Generate:
- Production-ready code
- Folder structure
- Backend
- Frontend
- APIs
- Database models
- Deployment guide
- Best practices`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        code: completion.choices[0].message.content,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('CODE GENERATOR ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'AI service unavailable. Please try again.' },
      { status: 503, headers: CORS_HEADERS }
    );
  }
}
