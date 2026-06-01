import { NextRequest, NextResponse }
from "next/server";

import jwt from "jsonwebtoken";

import User from "@/models/User";

import { connectDB }
from "@/lib/mongodb";

export async function GET(
  req: NextRequest
) {

  try {

    // Get Token
    const token =
      req.headers
        .get("authorization")
        ?.split(" ")[1];

    // No Token
    if (!token) {

      return NextResponse.json(
        {
          message:
            "Unauthorized",
        },

        {
          status: 401,
        }
      );
    }

    // Verify Token
    const decoded: any =
      jwt.verify(
        token,
        process.env.JWT_SECRET!
      );

    // Connect DB
    await connectDB();

    // Find User
    const user =
      await User.findById(
        decoded.userId
      ).select("-password");

    // User Not Found
    if (!user) {

      return NextResponse.json(
        {
          message:
            "User not found",
        },

        {
          status: 404,
        }
      );
    }

    // Success
    return NextResponse.json(
      user
    );

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        message:
          "Server Error",
      },

      {
        status: 500,
      }
    );
  }
}