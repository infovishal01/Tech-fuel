import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { BackendExample, CodeExecution } from '@/models';
import mongoose from 'mongoose';

// =======================
// RUN CODE EXAMPLE
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const { exampleId, userId, code, input, language } = body;

    // Validation
    if (!exampleId || !userId || !code) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(exampleId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid example ID',
        },
        { status: 400 }
      );
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid user ID',
        },
        { status: 400 }
      );
    }

    // Get example to validate it exists
    const example = await BackendExample.findById(exampleId);

    if (!example) {
      return NextResponse.json(
        {
          success: false,
          message: 'Example not found',
        },
        { status: 404 }
      );
    }

    // Increment run count
    await BackendExample.findByIdAndUpdate(exampleId, {
      $inc: { runCount: 1 },
    });

    // Create execution record
    const execution = await CodeExecution.create({
      example: new mongoose.Types.ObjectId(exampleId),
      user: new mongoose.Types.ObjectId(userId),
      code,
      input: input || '',
      language: language || example.language,
      status: 'Queued',
      output: '',
      error: '',
      executionTime: 0,
      memoryUsage: 0,
      executedAt: new Date(),
    });

    // In a real implementation, you would:
    // 1. Send the code to a code execution service (like AWS Lambda, Replit, or a custom container)
    // 2. Stream the results back
    // 3. Update the execution record with actual results

    // For now, we'll simulate a successful execution
    // This is a placeholder - in production, you'd integrate with a real code runner
    const simulatedResult = {
      status: 'Completed',
      output: 'Code executed successfully! (simulated)',
      error: '',
      executionTime: 123, // ms
      memoryUsage: 1024, // KB
    };

    // Update execution record
    await CodeExecution.findByIdAndUpdate(execution._id, simulatedResult);

    // Get updated execution
    const updatedExecution = await CodeExecution.findById(execution._id).lean();

    return NextResponse.json({
      success: true,
      execution: updatedExecution,
      message:
        'Code execution simulated. In production, integrate with a real code execution service.',
      simulation: true,
    });
  } catch (error) {
    console.error('RUN CODE ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to run code',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// GET EXECUTION RESULTS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const executionId = searchParams.get('executionId');

    if (!executionId || !mongoose.Types.ObjectId.isValid(executionId)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid execution ID',
        },
        { status: 400 }
      );
    }

    const execution = await CodeExecution.findById(executionId)
      .populate('example', 'title')
      .lean();

    if (!execution) {
      return NextResponse.json(
        {
          success: false,
          message: 'Execution not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      execution,
    });
  } catch (error) {
    console.error('GET EXECUTION ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch execution results',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
