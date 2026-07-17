import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { CoreCSConcept, ConceptProgress } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET CONCEPT BY ID
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
          message: 'Invalid concept ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const concept = await CoreCSConcept.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('createdBy', 'username name')
      .populate('quizId')
      .lean();

    if (!concept) {
      return NextResponse.json(
        {
          success: false,
          message: 'Concept not found',
        },
        { status: 404 }
      );
    }

    // Get user's progress for this concept
    const userId = req.headers.get('x-user-id');
    let userProgress: any = null;

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userProgress = await ConceptProgress.findOne({
        concept: id,
        user: userId,
      }).lean();
    }

    // Get related concepts
    const related = await CoreCSConcept.find({
      _id: { $ne: id },
      category: concept.category,
      isPublished: true,
    })
      .sort({ order: 1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      concept,
      userProgress,
      related,
    });
  } catch (error) {
    console.error('GET CONCEPT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch concept',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE CONCEPT
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
          message: 'Invalid concept ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const concept = await CoreCSConcept.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!concept) {
      return NextResponse.json(
        {
          success: false,
          message: 'Concept not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      concept,
    });
  } catch (error) {
    console.error('UPDATE CONCEPT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update concept',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// MARK CONCEPT AS COMPLETED
// =======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { userId, isCompleted } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid concept ID',
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

    // Update or create progress
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const conceptObjectId = new mongoose.Types.ObjectId(id);

    const progress = await ConceptProgress.findOneAndUpdate(
      { concept: conceptObjectId, user: userObjectId },
      { completed: isCompleted || true, completedAt: new Date() },
      { upsert: true, new: true }
    );

    // Increment completion count
    if (isCompleted) {
      await CoreCSConcept.findByIdAndUpdate(id, {
        $inc: { completionCount: 1 },
      });
    }

    return NextResponse.json({
      success: true,
      progress,
    });
  } catch (error) {
    console.error('MARK COMPLETED ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to mark concept as completed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE CONCEPT
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
          message: 'Invalid concept ID',
        },
        { status: 400 }
      );
    }

    const concept = await CoreCSConcept.findByIdAndDelete(id);

    if (!concept) {
      return NextResponse.json(
        {
          success: false,
          message: 'Concept not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Concept deleted successfully',
    });
  } catch (error) {
    console.error('DELETE CONCEPT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete concept',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
