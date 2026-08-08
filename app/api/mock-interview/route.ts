import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { z } from 'zod';

const interviewSchema = z.object({
  question: z.string().min(1, 'Question is required').max(2000),
  answer: z.string().min(1, 'Answer is required').max(10000),
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

    const validation = interviewSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { question, answer } = validation.data;

    const openai = getOpenAI();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a technical interview evaluator. Evaluate the answer to the question and provide constructive feedback. Include: Correctness, Clarity, Areas for improvement.',
        },
        {
          role: 'user',
          content: `Question: ${question}\n\nAnswer: ${answer}`,
        },
      ],
    });

    return NextResponse.json(
      {
        success: true,
        feedback: completion.choices[0].message.content,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('MOCK INTERVIEW ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'AI service unavailable. Please try again.' },
      { status: 503, headers: CORS_HEADERS }
    );
  }
}
