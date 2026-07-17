import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DSASolution } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL SOLUTIONS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const problemId = searchParams.get('problemId');
    const userId = searchParams.get('userId');
    const language = searchParams.get('language');

    // Build query
    const query: any = {};

    if (problemId && mongoose.Types.ObjectId.isValid(problemId)) {
      query.problem = problemId;
    }

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query.user = userId;
    }

    if (language) {
      query.language = language;
    }

    const solutions = await DSASolution.find(query)
      .populate('problem', 'title')
      .populate('user', 'username name')
      .sort({ likes: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      solutions,
    });
  } catch (error) {
    console.error('GET SOLUTIONS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch solutions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE SOLUTION
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      problem,
      user,
      code,
      language,
      explanation,
      timeComplexity,
      spaceComplexity,
    } = body;

    // Validation
    if (!problem || !user || !code || !language || !timeComplexity || !spaceComplexity) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create solution
    const solution = await DSASolution.create({
      problem: new mongoose.Types.ObjectId(problem),
      user: new mongoose.Types.ObjectId(user),
      code,
      language,
      explanation: explanation || '',
      timeComplexity,
      spaceComplexity,
      isCorrect: false, // Will be updated after verification
    });

    return NextResponse.json(
      {
        success: true,
        solution,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE SOLUTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create solution',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
