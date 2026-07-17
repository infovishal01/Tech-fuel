import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DSAProblem, DSASubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET PROBLEM BY ID
// =======================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid problem ID',
        },
        { status: 400 }
      );
    }

    // Find problem and increment view count
    const problem = await DSAProblem.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('createdBy', 'username name')
      .lean();

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: 'Problem not found',
        },
        { status: 404 }
      );
    }

    // Get user's submissions for this problem
    const userId = req.headers.get('x-user-id');
    let userSubmissions: any[] = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userSubmissions = await DSASubmission.find({
        problem: id,
        user: userId,
      })
        .sort({ submittedAt: -1 })
        .limit(10)
        .lean();
    }

    return NextResponse.json({
      success: true,
      problem,
      userSubmissions,
    });
  } catch (error) {
    console.error('GET PROBLEM ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch problem',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE PROBLEM
// =======================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid problem ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const problem = await DSAProblem.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: 'Problem not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      problem,
    });
  } catch (error) {
    console.error('UPDATE PROBLEM ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update problem',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE PROBLEM
// =======================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid problem ID',
        },
        { status: 400 }
      );
    }

    const problem = await DSAProblem.findByIdAndDelete(id);

    if (!problem) {
      return NextResponse.json(
        {
          success: false,
          message: 'Problem not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Problem deleted successfully',
    });
  } catch (error) {
    console.error('DELETE PROBLEM ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete problem',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
