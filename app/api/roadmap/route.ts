import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const openai = getOpenAI();
    const { role, experience } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a career advisor for developers. Create personalized career roadmaps with clear milestones, skills to learn, and recommended projects. Include: Current level assessment, 3-month goals, 6-month goals, 1-year goals, Recommended resources.',
        },
        {
          role: 'user',
          content: `Create a career roadmap for a ${role} with ${experience} years of experience.`,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      roadmap: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Roadmap generation failed',
    });
  }
}
