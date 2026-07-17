import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DesignSubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL SUBMISSIONS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const caseStudyId = searchParams.get('caseStudyId');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Build query
    const query: any = {};

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      query.user = userId;
    }

    if (caseStudyId && mongoose.Types.ObjectId.isValid(caseStudyId)) {
      query.caseStudy = caseStudyId;
    }

    const submissions = await DesignSubmission.find(query)
      .populate('caseStudy', 'title')
      .populate('user', 'username name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await DesignSubmission.countDocuments(query);

    return NextResponse.json({
      success: true,
      submissions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET SUBMISSIONS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch submissions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE SUBMISSION
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { caseStudy, user, highLevelDesign, detailedDesign, dataModel, apiDesign } = body;

    // Validation
    if (!caseStudy || !user || !highLevelDesign) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create submission
    const submission = await DesignSubmission.create({
      caseStudy: new mongoose.Types.ObjectId(caseStudy),
      user: new mongoose.Types.ObjectId(user),
      highLevelDesign,
      detailedDesign: detailedDesign || '',
      dataModel: dataModel || '',
      apiDesign: apiDesign || '',
    });

    return NextResponse.json(
      {
        success: true,
        submission,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE SUBMISSION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create submission',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
