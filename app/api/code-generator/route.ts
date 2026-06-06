import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',

      messages: [
        {
          role: 'system',

          content: `
              You are a senior software architect.

              Generate:
              - Production-ready code
              - Folder structure
              - Backend
              - Frontend
              - APIs
              - Database models
              - Deployment guide
              - Best practices
              `,
        },

        {
          role: 'user',

          content: prompt,
        },
      ],
    });

    return NextResponse.json({
      success: true,

      code: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json({
      success: false,

      message: 'Code Generation Failed',
    });
  }
}
