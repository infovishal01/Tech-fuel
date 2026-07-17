import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BackendExample, CodeExecution } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL BACKEND EXAMPLES
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const language = searchParams.get('language');
    const search = searchParams.get('search');

    // Build query
    const query: any = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (language) {
      query.language = language;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const examples = await BackendExample.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await BackendExample.countDocuments(query);

    return NextResponse.json({
      success: true,
      examples,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET EXAMPLES ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch examples',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE BACKEND EXAMPLE
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      category,
      language,
      code,
      explanation,
      dependencies,
      setupInstructions,
      runInstructions,
      expectedOutput,
      errorHandling,
      securityNotes,
      performanceNotes,
      bestPractices,
      relatedExamples,
      order,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !code || !language) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Create example
    const example = await BackendExample.create({
      title,
      slug,
      description: description || '',
      category: category || 'General',
      language,
      code,
      explanation: explanation || '',
      dependencies: dependencies || [],
      setupInstructions: setupInstructions || '',
      runInstructions: runInstructions || '',
      expectedOutput: expectedOutput || '',
      errorHandling: errorHandling || '',
      securityNotes: securityNotes || '',
      performanceNotes: performanceNotes || '',
      bestPractices: bestPractices || [],
      relatedExamples: relatedExamples || [],
      order: order || 0,
      difficulty: 'Medium',
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      runCount: 0,
      likeCount: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        example,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE EXAMPLE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create example',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
