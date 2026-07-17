import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { SystemDesignCase, DesignSubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL CASE STUDIES
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const search = searchParams.get('search');

    // Build query
    const query: any = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const caseStudies = await SystemDesignCase.find(query)
      .sort({ viewCount: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await SystemDesignCase.countDocuments(query);

    return NextResponse.json({
      success: true,
      caseStudies,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET CASE STUDIES ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch case studies',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE CASE STUDY
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      category,
      difficulty,
      tags,
      requirements,
      goals,
      constraints,
      capacityEstimation,
      highLevelDesign,
      detailedDesign,
      dataModel,
      apiDesign,
      algorithms,
      technologies,
      tradeoffs,
      failureAnalysis,
      scalingAnalysis,
      extensions,
      diagramUrl,
      references,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !description || !highLevelDesign) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Create case study
    const caseStudy = await SystemDesignCase.create({
      title,
      slug,
      description,
      category: category || 'Basics',
      difficulty: difficulty || 'Intermediate',
      tags: tags || [],
      requirements: requirements || [],
      goals: goals || [],
      constraints: constraints || [],
      capacityEstimation: capacityEstimation || {},
      highLevelDesign,
      detailedDesign: detailedDesign || '',
      dataModel: dataModel || '',
      apiDesign: apiDesign || '',
      algorithms: algorithms || [],
      technologies: technologies || [],
      tradeoffs: tradeoffs || [],
      failureAnalysis: failureAnalysis || [],
      scalingAnalysis: scalingAnalysis || '',
      extensions: extensions || [],
      diagramUrl: diagramUrl || '',
      references: references || [],
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        caseStudy,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE CASE STUDY ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create case study',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
