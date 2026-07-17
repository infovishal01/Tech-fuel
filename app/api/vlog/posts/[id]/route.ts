import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { VlogPost, Comment } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET VLOG POST BY ID
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
          message: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const post = await VlogPost.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('author', 'username name email')
      .lean();

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: 'Post not found',
        },
        { status: 404 }
      );
    }

    // Get comments for this post
    const comments = await Comment.find({ post: id, parent: null })
      .populate('author', 'username name')
      .sort({ createdAt: 1 })
      .lean();

    // Get user's like status
    const userId = req.headers.get('x-user-id');
    let isLikedByUser = false;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const postObj = await VlogPost.findById(id);
      isLikedByUser = postObj?.likes?.includes(new mongoose.Types.ObjectId(userId)) || false;
    }

    // Get related posts
    const related = await VlogPost.find({
      _id: { $ne: id },
      $or: [
        { category: post.category },
        { tags: { $in: post.tags } },
      ],
      isPublished: true,
    })
      .sort({ viewCount: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      post,
      comments,
      isLikedByUser,
      related,
    });
  } catch (error) {
    console.error('GET POST ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch post',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE VLOG POST
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
          message: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    // Update reading time if content changed
    if (body.content) {
      body.readingTime = Math.ceil(body.content.split(/\s+/).length / 200);
    }

    const post = await VlogPost.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: 'Post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('UPDATE POST ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update post',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE/UNLIKE POST
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
          message: 'Invalid post ID',
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
      await VlogPost.findByIdAndUpdate(id, {
        $addToSet: { likes: userObjectId },
      });
    } else {
      await VlogPost.findByIdAndUpdate(id, {
        $pull: { likes: userObjectId },
      });
    }

    const post = await VlogPost.findById(id).lean();

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('LIKE POST ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like post',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE VLOG POST
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
          message: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    // Delete all comments for this post
    await Comment.deleteMany({ post: id });

    const post = await VlogPost.findByIdAndDelete(id);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: 'Post not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Post and its comments deleted successfully',
    });
  } catch (error) {
    console.error('DELETE POST ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete post',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
