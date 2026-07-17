import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BackendExample, CodeExecution } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET EXAMPLE BY ID
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
          message: 'Invalid example ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const example = await BackendExample.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('createdBy', 'username name')
      .populate('relatedExamples', 'title slug')
      .lean();

    if (!example) {
      return NextResponse.json(
        {
          success: false,
          message: 'Example not found',
        },
        { status: 404 }
      );
    }

    // Get user's executions for this example
    const userId = req.headers.get('x-user-id');
    let userExecutions: any[] = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userExecutions = await CodeExecution.find({
        example: id,
        user: userId,
      })
        .sort({ executedAt: -1 })
        .limit(10)
        .lean();
    }

    // Get related examples
    const related = await BackendExample.find({
      _id: { $ne: id },
      category: example.category,
      isPublished: true,
    })
      .sort({ order: 1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      example,
      userExecutions,
      related,
    });
  } catch (error) {
    console.error('GET EXAMPLE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch example',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE EXAMPLE
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
          message: 'Invalid example ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const example = await BackendExample.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!example) {
      return NextResponse.json(
        {
          success: false,
          message: 'Example not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      example,
    });
  } catch (error) {
    console.error('UPDATE EXAMPLE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update example',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE EXAMPLE
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
          message: 'Invalid example ID',
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

    const action = isLiked ? 'like' : 'dislike';
    const update: any = {};

    if (action === 'like') {
      update.$addToSet = { likes: userObjectId };
      update.$pull = { dislikes: userObjectId };
    } else {
      update.$addToSet = { dislikes: userObjectId };
      update.$pull = { likes: userObjectId };
    }

    await BackendExample.findByIdAndUpdate(id, update);

    const example = await BackendExample.findById(id).lean();

    return NextResponse.json({
      success: true,
      example,
    });
  } catch (error) {
    console.error('LIKE EXAMPLE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like example',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE EXAMPLE
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
          message: 'Invalid example ID',
        },
        { status: 400 }
      );
    }

    const example = await BackendExample.findByIdAndDelete(id);

    if (!example) {
      return NextResponse.json(
        {
          success: false,
          message: 'Example not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Example deleted successfully',
    });
  } catch (error) {
    console.error('DELETE EXAMPLE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete example',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
