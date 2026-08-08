import { NextResponse } from 'next/server';
import { getOpenAI } from '@/lib/openai';
import { z } from 'zod';

const roadmapSchema = z.object({
  role: z.string().min(1, 'Role is required').max(200),
  experience: z.union([z.string(), z.number()]).transform((v) => String(v)),
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

    const validation = roadmapSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.issues[0].message },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const { role, experience } = validation.data;

    const openai = getOpenAI();

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

    return NextResponse.json(
      {
        success: true,
        roadmap: completion.choices[0].message.content,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error('ROADMAP ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'AI service unavailable. Please try again.' },
      { status: 503, headers: CORS_HEADERS }
    );
  }
}
