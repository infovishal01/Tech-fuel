import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { ResumeTemplate, UserResume } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL RESUME TEMPLATES
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

    const templates = await ResumeTemplate.find(query)
      .sort({ downloadCount: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await ResumeTemplate.countDocuments(query);

    return NextResponse.json({
      success: true,
      templates,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET TEMPLATES ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch templates',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE RESUME TEMPLATE
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      category,
      templateData,
      previewImage,
      colorScheme,
      fontFamily,
      features,
      tags,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !templateData) {
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

    // Create template
    const template = await ResumeTemplate.create({
      title,
      slug,
      description: description || '',
      category: category || 'General',
      templateData,
      previewImage: previewImage || '',
      colorScheme: colorScheme || '',
      fontFamily: fontFamily || 'Inter',
      features: features || [],
      tags: tags || [],
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      downloadCount: 0,
      likeCount: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        template,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE TEMPLATE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create template',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
