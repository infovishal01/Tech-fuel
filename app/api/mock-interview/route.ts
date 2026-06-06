import OpenAI from 'openai';

import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { role, answer } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',

      messages: [
        {
          role: 'system',

          content: `
              You are an AI mock interviewer.

              Evaluate:
              - Technical accuracy
              - Communication
              - Clarity
              - Confidence
              - Improvements
              - Interview readiness
              `,
        },

        {
          role: 'user',

          content: `
              Role:
              ${role}

              Candidate Answer:
              ${answer}
              `,
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

      message: 'Interview Error',
    });
  }
}
