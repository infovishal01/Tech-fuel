import { NextResponse }
from "next/server";

import mongoose from "mongoose";

import { connectDB }
from "@/lib/mongodb";

import User from "@/models/User";

import Tutorial from "@/models/Tutorial";

export async function GET() {

  try {

    // Connect DB
    await connectDB();

    // Total Users
    const totalUsers =
      await User.countDocuments();

    // Total Tutorials
    const totalTutorials =
      await Tutorial.countDocuments();

    // Latest Users
    const latestUsers =
      await User.find()
        .sort({
          createdAt: -1,
        })
        .limit(5);

    // Latest Tutorials
    const latestTutorials =
      await Tutorial.find()
        .sort({
          createdAt: -1,
        })
        .limit(5);

    return NextResponse.json({

      success: true,

      totalUsers,

      totalTutorials,

      latestUsers,

      latestTutorials,
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json({

      success: false,

      message:
        "Server Error",
    });
  }
}