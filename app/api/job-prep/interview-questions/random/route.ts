import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { InterviewQuestion, PracticeSession } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET RANDOM QUESTION FOR PRACTICE
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const company = searchParams.get('company');
    const difficulty = searchParams.get('difficulty');
    const type = searchParams.get('type');
    const exclude = searchParams.get('exclude'); // Comma-separated list of IDs to exclude

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

    if (exclude) {
      const excludeIds = exclude.split(',').filter((id: string) => mongoose.Types.ObjectId.isValid(id));
      if (excludeIds.length > 0) {
        query._id = { $nin: excludeIds.map((id: string) => new mongoose.Types.ObjectId(id)) };
      }
    }

    // Get random question
    const count = await InterviewQuestion.countDocuments(query);

    if (count === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No questions found matching criteria',
        },
        { status: 404 }
      );
    }

    const randomIndex = Math.floor(Math.random() * count);

    const question = await InterviewQuestion.findOne(query)
      .skip(randomIndex)
      .lean();

    if (!question) {
      return NextResponse.json(
        {
          success: false,
          message: 'No questions found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      question,
    });
  } catch (error) {
    console.error('GET RANDOM QUESTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch random question',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
