import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';
import Tutorial from '@/models/Tutorial';

export async function GET(req: NextRequest) {
  try {
    // Auth guard — only admins can access stats
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    // Verify the calling user has admin role
    const adminUser = await User.findOne({ email: session.user.email }).select('role');
    if (!adminUser || adminUser.role !== 'admin') {
      return NextResponse.json(
        { success: false, message: 'Forbidden — admin only' },
        { status: 403 }
      );
    }

    // Gather stats in parallel
    const [totalUsers, totalTutorials, latestUsers, latestTutorials] =
      await Promise.all([
        User.countDocuments(),
        Tutorial.countDocuments(),
        User.find().select('-password').sort({ createdAt: -1 }).limit(5).lean(),
        Tutorial.find().sort({ createdAt: -1 }).limit(5).lean(),
      ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers,
        totalTutorials,
      },
      latestUsers,
      latestTutorials,
    });
  } catch (error) {
    console.error('ADMIN STATS ERROR:', error);
    return NextResponse.json(
      { success: false, message: 'Server error' },
      { status: 500 }
    );
  }
}
