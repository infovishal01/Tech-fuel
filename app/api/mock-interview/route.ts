import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const openai = getOpenAI();
    const { answer, question } = await req.json();

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

    return NextResponse.json({
      success: true,
      feedback: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Mock Interview failed',
    });
  }
}
