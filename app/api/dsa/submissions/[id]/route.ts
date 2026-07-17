import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DSASubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET SUBMISSION BY ID
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
          message: 'Invalid submission ID',
        },
        { status: 400 }
      );
    }

    const submission = await DSASubmission.findById(id)
      .populate('problem', 'title')
      .populate('user', 'username name')
      .lean();

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          message: 'Submission not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error('GET SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE SUBMISSION RESULT
// =======================
export async function PATCH(
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
          message: 'Invalid submission ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { status, runtime, memoryUsage, feedback } = body;

    const submission = await DSASubmission.findByIdAndUpdate(
      id,
      {
        status,
        runtime,
        memoryUsage,
        feedback,
        submittedAt: new Date(),
      },
      { new: true }
    );

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          message: 'Submission not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      submission,
    });
  } catch (error) {
    console.error('UPDATE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE SUBMISSION
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
          message: 'Invalid submission ID',
        },
        { status: 400 }
      );
    }

    const submission = await DSASubmission.findByIdAndDelete(id);

    if (!submission) {
      return NextResponse.json(
        {
          success: false,
          message: 'Submission not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Submission deleted successfully',
    });
  } catch (error) {
    console.error('DELETE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
