import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { InterviewQuestion, PracticeSession } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL INTERVIEW QUESTIONS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const company = searchParams.get('company');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const search = searchParams.get('search');

    // Build query
    const query: any = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (company) {
      query.companies = { $in: [company] };
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (type) {
      query.type = type;
    }

    if (search) {
      query.$or = [
        { question: { $regex: search, $options: 'i' } },
        { answer: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const questions = await InterviewQuestion.find(query)
      .sort({ frequency: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await InterviewQuestion.countDocuments(query);

    return NextResponse.json({
      success: true,
      questions,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET QUESTIONS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch questions',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE INTERVIEW QUESTION
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      question,
      answer,
      category,
      companies,
      difficulty,
      type,
      tags,
      frequency,
      notes,
      references,
      isPremium,
      createdBy,
    } = body;

    // Validation
    if (!question || !answer) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Create question
    const newQuestion = await InterviewQuestion.create({
      question,
      answer,
      category: category || 'General',
      companies: companies || [],
      difficulty: difficulty || 'Medium',
      type: type || 'Technical',
      tags: tags || [],
      frequency: frequency || 1,
      notes: notes || '',
      references: references || [],
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      practiceCount: 0,
      likeCount: 0,
      createdBy: new mongoose.Types.ObjectId(createdBy),
    });

    return NextResponse.json(
      {
        success: true,
        question: newQuestion,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE QUESTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create question',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}


