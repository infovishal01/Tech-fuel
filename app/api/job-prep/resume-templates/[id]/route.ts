import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ResumeTemplate, UserResume } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET TEMPLATE BY ID
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
          message: 'Invalid template ID',
        },
        { status: 400 }
      );
    }

    // Find and increment view count
    const template = await ResumeTemplate.findByIdAndUpdate(
      id,
      { $inc: { viewCount: 1 } },
      { new: true }
    )
      .populate('createdBy', 'username name')
      .lean();

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: 'Template not found',
        },
        { status: 404 }
      );
    }

    // Get user's saved resumes using this template
    const userId = req.headers.get('x-user-id');
    let userResumes: any[] = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userResumes = await UserResume.find({
        template: id,
        user: userId,
      })
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean();
    }

    // Get related templates
    const related = await ResumeTemplate.find({
      _id: { $ne: id },
      category: template.category,
      isPublished: true,
    })
      .sort({ downloadCount: -1 })
      .limit(5)
      .lean();

    return NextResponse.json({
      success: true,
      template,
      userResumes,
      related,
    });
  } catch (error) {
    console.error('GET TEMPLATE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch template',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DOWNLOAD TEMPLATE (increment download count)
// =======================
export async function PATCH(
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
          message: 'Invalid template ID',
        },
        { status: 400 }
      );
    }

    // Increment download count
    const template = await ResumeTemplate.findByIdAndUpdate(
      id,
      { $inc: { downloadCount: 1 } },
      { new: true }
    );

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: 'Template not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      template,
      message: 'Download count incremented',
    });
  } catch (error) {
    console.error('DOWNLOAD TEMPLATE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to increment download count',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE TEMPLATE
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
          message: 'Invalid template ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const template = await ResumeTemplate.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: 'Template not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('UPDATE TEMPLATE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update template',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// LIKE/UNLIKE TEMPLATE
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
          message: 'Invalid template ID',
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
      await ResumeTemplate.findByIdAndUpdate(id, {
        $addToSet: { likes: userObjectId },
      });
    } else {
      await ResumeTemplate.findByIdAndUpdate(id, {
        $pull: { likes: userObjectId },
      });
    }

    const template = await ResumeTemplate.findById(id).lean();

    return NextResponse.json({
      success: true,
      template,
    });
  } catch (error) {
    console.error('LIKE TEMPLATE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to like template',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE TEMPLATE
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
          message: 'Invalid template ID',
        },
        { status: 400 }
      );
    }

    const template = await ResumeTemplate.findByIdAndDelete(id);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: 'Template not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Template deleted successfully',
    });
  } catch (error) {
    console.error('DELETE TEMPLATE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete template',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
