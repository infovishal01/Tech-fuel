import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { CoreCSConcept, ConceptProgress } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL CONCEPTS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');

    // Build query
    const query: any = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const concepts = await CoreCSConcept.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await CoreCSConcept.countDocuments(query);

    return NextResponse.json({
      success: true,
      concepts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET CONCEPTS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch concepts',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE CONCEPT
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      category,
      subcategory,
      content,
      examples,
      keyPoints,
      diagrams,
      references,
      quizId,
      order,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !category || !content) {
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

    // Create concept
    const concept = await CoreCSConcept.create({
      title,
      slug,
      description: description || '',
      category,
      subcategory: subcategory || '',
      content,
      examples: examples || [],
      keyPoints: keyPoints || [],
      diagrams: diagrams || [],
      references: references || [],
      quizId: quizId || null,
      order: order || 0,
      difficulty: 'Medium',
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      completionCount: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        concept,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE CONCEPT ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create concept',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
