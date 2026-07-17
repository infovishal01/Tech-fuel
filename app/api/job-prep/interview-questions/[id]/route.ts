import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { InterviewQuestion, PracticeSession } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET QUESTION BY ID
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
          message: 'Invalid question ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const question = await InterviewQuestion.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('createdBy', 'username name')
      .lean();

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: 'Question not found',
        },
        { status: 404 }
      );
    }

    // Get user's practice sessions for this question
    const userId = req.headers.get('x-user-id');
    let userSessions: any[] = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userSessions = await PracticeSession.find({
        question: id,
        user: userId,
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
    }

    // Get related questions
    const related = await InterviewQuestion.find({
      _id: { $ne: id },
      $or: [
        { category: question.category },
        { companies: { $in: question.companies } },
      ],
      isPublished: true,
    })
      .sort({ frequency: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      question,
      userSessions,
      related,
    });
  } catch (error) {
    console.error('GET QUESTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch question',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE QUESTION
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
          message: 'Invalid question ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const question = await InterviewQuestion.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: 'Question not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error('UPDATE QUESTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update question',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE QUESTION
// =======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { userId, isLiked } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid question ID',
        },
        { status: 400 }
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid user ID',
        },
        { status: 400 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    if (isLiked) {
      await InterviewQuestion.findByIdAndUpdate(id, {
        $addToSet: { likes: userObjectId },
      });
    } else {
      await InterviewQuestion.findByIdAndUpdate(id, {
        $pull: { likes: userObjectId },
      });
    }

    const question = await InterviewQuestion.findById(id).lean();

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error('LIKE QUESTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like question',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE QUESTION
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
          message: 'Invalid question ID',
        },
        { status: 400 }
      );
    }

    const question = await InterviewQuestion.findByIdAndDelete(id);

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: 'Question not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Question deleted successfully',
    });
  } catch (error) {
    console.error('DELETE QUESTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete question',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
