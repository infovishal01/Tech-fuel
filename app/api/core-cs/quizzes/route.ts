import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Quiz, QuizSubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL QUIZZES
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');

    // Build query
    const query: any = {};

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    const quizzes = await Quiz.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await Quiz.countDocuments(query);

    return NextResponse.json({
      success: true,
      quizzes,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET QUIZZES ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch quizzes',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE QUIZ
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      category,
      difficulty,
      questions,
      passingScore,
      timeLimit,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !questions || questions.length === 0) {
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

    // Create quiz
    const quiz = await Quiz.create({
      title,
      slug,
      description: description || '',
      category: category || 'General',
      difficulty: difficulty || 'Medium',
      questions,
      passingScore: passingScore || 70,
      timeLimit: timeLimit || 30, // minutes
      isPremium: isPremium || false,
      isPublished: true,
      attemptCount: 0,
      averageScore: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        quiz,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE QUIZ ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create quiz',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
