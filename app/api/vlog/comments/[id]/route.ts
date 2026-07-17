import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Comment, VlogPost } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET COMMENT BY ID
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
          message: 'Invalid comment ID',
        },
        { status: 400 }
      );
    }

    const comment = await Comment.findById(id)
      .populate('author', 'username name')
      .populate('replies')
      .lean();

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Comment not found',
        },
        { status: 404 }
      );
    }

    // Get replies
    const replies = await Comment.find({ parent: id })
      .populate('author', 'username name')
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      comment,
      replies,
    });
  } catch (error) {
    console.error('GET COMMENT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch comment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE COMMENT
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
          message: 'Invalid comment ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const comment = await Comment.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Comment not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error('UPDATE COMMENT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update comment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE/DISLIKE COMMENT
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
          message: 'Invalid comment ID',
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
      await Comment.findByIdAndUpdate(id, {
        $addToSet: { likes: userObjectId },
      });
    } else {
      await Comment.findByIdAndUpdate(id, {
        $pull: { likes: userObjectId },
      });
    }

    const comment = await Comment.findById(id).lean();

    return NextResponse.json({
      success: true,
      comment,
    });
  } catch (error) {
    console.error('LIKE COMMENT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like comment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE COMMENT
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
          message: 'Invalid comment ID',
        },
        { status: 400 }
      );
    }

    // Get comment to find its post
    const comment = await Comment.findById(id);

    if (!comment) {
      return NextResponse.json(
        {
          success: false,
          message: 'Comment not found',
        },
        { status: 404 }
      );
    }

    // Delete all replies
    await Comment.deleteMany({ parent: id });

    // Delete the comment
    await Comment.findByIdAndDelete(id);

    // Decrement post comment count
    await VlogPost.findByIdAndUpdate(comment.post, {
      $inc: { commentCount: -1 },
    });

    return NextResponse.json({
      success: true,
      message: 'Comment and its replies deleted successfully',
    });
  } catch (error) {
    console.error('DELETE COMMENT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete comment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
