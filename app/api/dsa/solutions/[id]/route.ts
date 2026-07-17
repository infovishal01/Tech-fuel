import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DSASolution } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET SOLUTION BY ID
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
          message: 'Invalid solution ID',
        },
        { status: 400 }
      );
    }

    const solution = await DSASolution.findById(id)
      .populate('problem', 'title description')
      .populate('user', 'username name')
      .lean();

    if (!solution) {
      return NextResponse.json(
        {
          success: false,
          message: 'Solution not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      solution,
    });
  } catch (error) {
    console.error('GET SOLUTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch solution',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE SOLUTION
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
          message: 'Invalid solution ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const solution = await DSASolution.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!solution) {
      return NextResponse.json(
        {
          success: false,
          message: 'Solution not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      solution,
    });
  } catch (error) {
    console.error('UPDATE SOLUTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update solution',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE/DISLIKE SOLUTION
// =======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { action, userId } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid solution ID',
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

    if (action === 'like') {
      await DSASolution.findByIdAndUpdate(id, {
        $addToSet: { likes: userObjectId },
        $pull: { dislikes: userObjectId },
      });
    } else if (action === 'dislike') {
      await DSASolution.findByIdAndUpdate(id, {
        $addToSet: { dislikes: userObjectId },
        $pull: { likes: userObjectId },
      });
    }

    const solution = await DSASolution.findById(id).lean();

    return NextResponse.json({
      success: true,
      solution,
    });
  } catch (error) {
    console.error('LIKE/DISLIKE SOLUTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like/dislike solution',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE SOLUTION
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
          message: 'Invalid solution ID',
        },
        { status: 400 }
      );
    }

    const solution = await DSASolution.findByIdAndDelete(id);

    if (!solution) {
      return NextResponse.json(
        {
          success: false,
          message: 'Solution not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Solution deleted successfully',
    });
  } catch (error) {
    console.error('DELETE SOLUTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete solution',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
