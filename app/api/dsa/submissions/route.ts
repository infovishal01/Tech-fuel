import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DSASubmission, DSAProblem } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET USER SUBMISSIONS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const problemId = searchParams.get('problemId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build query
    const query: any = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query.user = userId;
    }

    if (problemId && mongoose.Types.ObjectId.isValid(problemId)) {
      query.problem = problemId;
    }

    if (status) {
      query.status = status;
    }

    const submissions = await DSASubmission.find(query)
      .populate('problem', 'title difficulty')
      .sort({ submittedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await DSASubmission.countDocuments(query);

    return NextResponse.json({
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET SUBMISSIONS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE SUBMISSION
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { problem, user, code, language } = body;

    // Validation
    if (!problem || !user || !code || !language) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await DSASubmission.create({
      problem: new mongoose.Types.ObjectId(problem),
      user: new mongoose.Types.ObjectId(user),
      code,
      language,
      status: 'Compilation Error', // Will be updated after execution
      runtime: 0,
      memoryUsage: 0,
    });

    // Increment problem solve count
    await DSAProblem.findByIdAndUpdate(problem, {
      $inc: { solveCount: 1 },
    });

    return NextResponse.json(
      {
        success: true,
        submission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
