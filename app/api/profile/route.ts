import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import jwt from 'jsonwebtoken';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

interface DecodedToken {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * GET /api/profile
 * Supports both custom JWT auth and NextAuth session.
 * Priority: Authorization header (JWT) → NextAuth session
 */
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    let userId: string | null = null;
    let userEmail: string | null = null;

    // 1. Try Authorization header (custom JWT login)
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token) {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 });
      }
      try {
        const decoded = jwt.verify(token, secret) as DecodedToken;
        userId = decoded.userId;
      } catch {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
      }
    } else {
      // 2. Fall back to NextAuth session
      const session = await getServerSession();
      if (session?.user?.email) {
        userEmail = session.user.email;
      } else {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    }

    // Find user
    const query = userId ? { _id: userId } : { email: userEmail };
    const user = await User.findOne(query).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        savedTutorials: user.savedTutorials,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('PROFILE ERROR:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/profile
 * Update user profile (name only — password change handled separately)
 */
export async function PATCH(req: NextRequest) {
  try {
    await connectDB();

    let userId: string | null = null;
    let userEmail: string | null = null;

    const authHeader = req.headers.get('authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

    if (token) {
      const secret = process.env.JWT_SECRET;
      if (!secret) return NextResponse.json({ message: 'Server misconfiguration' }, { status: 500 });
      try {
        const decoded = jwt.verify(token, secret) as DecodedToken;
        userId = decoded.userId;
      } catch {
        return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
      }
    } else {
      const session = await getServerSession();
      if (session?.user?.email) {
        userEmail = session.user.email;
      } else {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await req.json();
    const { name } = body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json({ message: 'Name is required' }, { status: 400 });
    }

    const query = userId ? { _id: userId } : { email: userEmail };
    const user = await User.findOneAndUpdate(
      query,
      { name: name.trim() },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error('PROFILE UPDATE ERROR:', error);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
