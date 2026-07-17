import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { DSAProblem, DSASubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL PROBLEMS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const company = searchParams.get('company');
    const search = searchParams.get('search');

    // Build query
    const query: any = { isPublished: true };

    if (category) {
      query.categories = { $in: [category] };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (company) {
      query.companyTags = { $in: [company] };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Get problems with pagination
    const problems = await DSAProblem.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    // Get total count
    const total = await DSAProblem.countDocuments(query);

    return NextResponse.json({
      success: true,
      problems,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET PROBLEMS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch problems',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE PROBLEM
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      description,
      problemStatement,
      examples,
      constraints,
      difficulty,
      categories,
      tags,
      companyTags,
      hints,
      notes,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!title || !description || !problemStatement || !examples || !constraints) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create problem
    const problem = await DSAProblem.create({
      title,
      description,
      problemStatement,
      examples,
      constraints,
      difficulty: difficulty || 'Medium',
      categories: categories || [],
      tags: tags || [],
      companyTags: companyTags || [],
      hints: hints || [],
      notes,
      isPremium: isPremium || false,
      isPublished: true,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        problem,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE PROBLEM ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create problem',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
