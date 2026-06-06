import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';

export async function POST(req: Request) {
  try {
    const openai = getOpenAI();
    const { skills, level } = await req.json();

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a project ideation expert. Generate innovative project ideas that help developers improve their skills. Include: Project name, Description, Technologies, Learning objectives, Difficulty level.',
        },
        {
          role: 'user',
          content: `Generate project ideas for a ${level} developer with skills in: ${skills.join(', ')}`,
        },
      ],
    });

    return NextResponse.json({
      success: true,
      ideas: completion.choices[0].message.content,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: 'Project generation failed',
    });
  }
}
