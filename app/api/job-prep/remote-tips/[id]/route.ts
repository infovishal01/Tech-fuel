import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { RemoteTip } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET TIP BY ID
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
          message: 'Invalid tip ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const tip = await RemoteTip.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('category', 'name slug')
      .populate('createdBy', 'username name')
      .lean();

    if (!tip) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tip not found',
        },
        { status: 404 }
      );
    }

    // Get user's bookmark status
    const userId = req.headers.get('x-user-id');
    let isBookmarkedByUser = false;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      const tipObj = await RemoteTip.findById(id);
      isBookmarkedByUser = tipObj?.bookmarks?.includes(new mongoose.Types.ObjectId(userId)) || false;
    }

    // Get related tips
    const related = await RemoteTip.find({
      _id: { $ne: id },
      category: tip.category,
      isPublished: true,
    })
      .sort({ order: 1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      tip,
      isBookmarkedByUser,
      related,
    });
  } catch (error) {
    console.error('GET TIP ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch tip',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE TIP
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
          message: 'Invalid tip ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const tip = await RemoteTip.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!tip) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tip not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      tip,
    });
  } catch (error) {
    console.error('UPDATE TIP ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update tip',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE/BOOKMARK TIP
// =======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { userId, action } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid tip ID',
        },
        { status: 400 }
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !action) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const update: any = {};

    if (action === 'like') {
      update.$addToSet = { likes: userObjectId };
    } else if (action === 'bookmark') {
      update.$addToSet = { bookmarks: userObjectId };
    } else if (action === 'unlike') {
      update.$pull = { likes: userObjectId };
    } else if (action === 'unbookmark') {
      update.$pull = { bookmarks: userObjectId };
    }

    await RemoteTip.findByIdAndUpdate(id, update);

    const tip = await RemoteTip.findById(id).lean();

    return NextResponse.json({
      success: true,
      tip,
    });
  } catch (error) {
    console.error('LIKE/BOOKMARK TIP ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like/bookmark tip',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE TIP
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
          message: 'Invalid tip ID',
        },
        { status: 400 }
      );
    }

    const tip = await RemoteTip.findByIdAndDelete(id);

    if (!tip) {
      return NextResponse.json(
        {
          success: false,
          message: 'Tip not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Tip deleted successfully',
    });
  } catch (error) {
    console.error('DELETE TIP ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete tip',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
