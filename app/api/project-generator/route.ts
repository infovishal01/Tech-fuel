import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { z } from 'zod';

const VALID_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

const projectGenSchema = z.object({
  skills: z
    .array(z.string().min(1))
    .min(1, 'At least one skill is required')
    .max(20),
  level: z.enum(VALID_LEVELS),
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

    const validation = projectGenSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { skills, level } = validation.data;

    const openai = getOpenAI();

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

    return NextResponse.json(
      {
        success: true,
        ideas: completion.choices[0].message.content,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('PROJECT GENERATOR ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'AI service unavailable. Please try again.' },
      { status: 503, headers: CORS_HEADERS }
    );
  }
}
