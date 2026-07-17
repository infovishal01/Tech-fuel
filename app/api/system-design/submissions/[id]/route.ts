import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DesignSubmission } from '@/models';
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

    const submission = await DesignSubmission.findById(id)
      .populate('caseStudy', 'title category difficulty')
      .populate('user', 'username name')
      .populate('reviewedBy', 'username name')
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
// UPDATE SUBMISSION
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
          message: 'Invalid submission ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const submission = await DesignSubmission.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

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
// ADD FEEDBACK TO SUBMISSION
// =======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { feedback, rating, reviewedBy } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid submission ID',
        },
        { status: 400 }
      );
    }

    if (!feedback || !rating || !reviewedBy) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields for feedback',
        },
        { status: 400 }
      );
    }

    const submission = await DesignSubmission.findByIdAndUpdate(
      id,
      {
        feedback,
        rating,
        reviewedBy: new mongoose.Types.ObjectId(reviewedBy),
        reviewedAt: new Date(),
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
    console.error('FEEDBACK SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add feedback',
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

    const submission = await DesignSubmission.findByIdAndDelete(id);

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
