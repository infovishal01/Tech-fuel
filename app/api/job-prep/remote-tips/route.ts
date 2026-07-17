import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { RemoteTip, TipCategory } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL REMOTE JOB TIPS
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
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const tips = await RemoteTip.find(query)
      .sort({ order: 1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await RemoteTip.countDocuments(query);

    return NextResponse.json({
      success: true,
      tips,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET TIPS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch tips',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE REMOTE JOB TIP
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      content,
      category,
      tags,
      resources,
      order,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !content || !category) {
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

    // Create tip
    const tip = await RemoteTip.create({
      title,
      slug,
      content,
      category,
      tags: tags || [],
      resources: resources || [],
      order: order || 0,
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      bookmarkCount: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        tip,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE TIP ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create tip',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


