import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SystemDesignCase, DesignSubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET CASE STUDY BY ID
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
          message: 'Invalid case study ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const caseStudy = await SystemDesignCase.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('createdBy', 'username name')
      .lean();

    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          message: 'Case study not found',
        },
        { status: 404 }
      );
    }

    // Get user's submissions for this case study
    const userId = req.headers.get('x-user-id');
    let userSubmissions: any[] = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userSubmissions = await DesignSubmission.find({
        caseStudy: id,
        user: userId,
      })
        .sort({ createdAt: -1 })
        .limit(10)
        .lean();
    }

    // Get related case studies
    const related = await SystemDesignCase.find({
      _id: { $ne: id },
      category: caseStudy.category,
      isPublished: true,
    })
      .sort({ viewCount: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      caseStudy,
      userSubmissions,
      related,
    });
  } catch (error) {
    console.error('GET CASE STUDY ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch case study',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE CASE STUDY
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
          message: 'Invalid case study ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const caseStudy = await SystemDesignCase.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          message: 'Case study not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      caseStudy,
    });
  } catch (error) {
    console.error('UPDATE CASE STUDY ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update case study',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE/BOOKMARK CASE STUDY
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
          message: 'Invalid case study ID',
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
      await SystemDesignCase.findByIdAndUpdate(id, {
        $addToSet: { likes: userObjectId },
      });
    } else if (action === 'bookmark') {
      await SystemDesignCase.findByIdAndUpdate(id, {
        $addToSet: { bookmarks: userObjectId },
      });
    }

    const caseStudy = await SystemDesignCase.findById(id).lean();

    return NextResponse.json({
      success: true,
      caseStudy,
    });
  } catch (error) {
    console.error('LIKE/BOOKMARK CASE STUDY ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like/bookmark case study',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE CASE STUDY
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
          message: 'Invalid case study ID',
        },
        { status: 400 }
      );
    }

    const caseStudy = await SystemDesignCase.findByIdAndDelete(id);

    if (!caseStudy) {
      return NextResponse.json(
        {
          success: false,
          message: 'Case study not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Case study deleted successfully',
    });
  } catch (error) {
    console.error('DELETE CASE STUDY ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete case study',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
