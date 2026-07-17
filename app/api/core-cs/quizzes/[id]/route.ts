import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { Quiz, QuizSubmission } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET QUIZ BY ID
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
          message: 'Invalid quiz ID',
        },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findById(id)
      .populate('createdBy', 'username name')
      .lean();

    if (!quiz) {
      return NextResponse.json(
        {
          success: false,
          message: 'Quiz not found',
        },
        { status: 404 }
      );
    }

    // Get user's submissions for this quiz
    const userId = req.headers.get('x-user-id');
    let userSubmissions: any[] = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      userSubmissions = await QuizSubmission.find({
        quiz: id,
        user: userId,
      })
        .sort({ submittedAt: -1 })
        .limit(10)
        .lean();
    }

    return NextResponse.json({
      success: true,
      quiz,
      userSubmissions,
    });
  } catch (error) {
    console.error('GET QUIZ ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch quiz',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// UPDATE QUIZ
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
          message: 'Invalid quiz ID',
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const quiz = await Quiz.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return NextResponse.json(
        {
          success: false,
          message: 'Quiz not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      quiz,
    });
  } catch (error) {
    console.error('UPDATE QUIZ ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to update quiz',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// SUBMIT QUIZ ANSWERS
// =======================
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;
    const { userId, answers, timeTaken } = await req.json();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid quiz ID',
        },
        { status: 400 }
      );
    }

    if (!userId || !mongoose.Types.ObjectId.isValid(userId) || !answers) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Get quiz to calculate score
    const quiz = await Quiz.findById(id).lean();

    if (!quiz) {
      return NextResponse.json(
        {
          success: false,
          message: 'Quiz not found',
        },
        { status: 404 }
      );
    }

    // Calculate score
    let score = 0;
    const results: any[] = [];

    quiz.questions.forEach((question: any, index: number) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) {
        score += question.points || 1;
      }
      results.push({
        questionId: question._id || question.id,
        isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer,
      });
    });

    const totalScore = quiz.questions.reduce(
      (sum: number, q: any) => sum + (q.points || 1),
      0
    );
    const percentage = Math.round((score / totalScore) * 100);
    const passed = percentage >= (quiz.passingScore || 70);

    // Create submission
    const submission = await QuizSubmission.create({
      quiz: new mongoose.Types.ObjectId(id),
      user: new mongoose.Types.ObjectId(userId),
      answers,
      results,
      score,
      totalScore,
      percentage,
      passed,
      timeTaken: timeTaken || 0,
      submittedAt: new Date(),
    });

    // Update quiz stats
    await Quiz.findByIdAndUpdate(id, {
      $inc: { attemptCount: 1 },
    });

    // Update average score
    const submissions = await QuizSubmission.find({ quiz: id });
    const avgScore =
      submissions.reduce((sum: number, s: any) => sum + s.percentage, 0) /
      submissions.length;

    await Quiz.findByIdAndUpdate(id, {
      averageScore: Math.round(avgScore),
    });

    return NextResponse.json({
      success: true,
      submission,
      passed,
      percentage,
      results,
    });
  } catch (error) {
    console.error('SUBMIT QUIZ ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit quiz',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// DELETE QUIZ
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
          message: 'Invalid quiz ID',
        },
        { status: 400 }
      );
    }

    const quiz = await Quiz.findByIdAndDelete(id);

    if (!quiz) {
      return NextResponse.json(
        {
          success: false,
          message: 'Quiz not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    console.error('DELETE QUIZ ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to delete quiz',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
