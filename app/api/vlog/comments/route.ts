import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { VlogPost, Comment } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL COMMENTS FOR A POST
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get('postId');
    const parent = searchParams.get('parent');

    if (!postId || !mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    const query: any = { post: postId };

    if (parent && mongoose.Types.ObjectId.isValid(parent)) {
      query.parent = parent;
    } else {
      query.parent = null;
    }

    const comments = await Comment.find(query)
      .populate('author', 'username name')
      .sort({ createdAt: 1 })
      .lean();

    return NextResponse.json({
      success: true,
      comments,
    });
  } catch (error) {
    console.error('GET COMMENTS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch comments',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE COMMENT
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { postId, author, content, parent } = body;

    // Validation
    if (!postId || !author || !content) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid post ID',
        },
        { status: 400 }
      );
    }

    // Verify post exists
    const post = await VlogPost.findById(postId);

    if (!post) {
      return NextResponse.json(
        {
          success: false,
          message: 'Post not found',
        },
        { status: 404 }
      );
    }

    // Create comment
    const comment = await Comment.create({
      post: new mongoose.Types.ObjectId(postId),
      author: new mongoose.Types.ObjectId(author),
      content,
      parent: parent && mongoose.Types.ObjectId.isValid(parent)
        ? new mongoose.Types.ObjectId(parent)
        : null,
      likeCount: 0,
    });

    // Increment post comment count
    await VlogPost.findByIdAndUpdate(postId, {
      $inc: { commentCount: 1 },
    });

    // Populate author for response
    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username name')
      .lean();

    return NextResponse.json(
      {
        success: true,
        comment: populatedComment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE COMMENT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create comment',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
