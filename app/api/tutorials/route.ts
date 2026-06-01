import { NextRequest, NextResponse }
from "next/server";

import mongoose from "mongoose";

import { connectDB }
from "@/lib/mongodb";

// =======================
// Tutorial Schema
// =======================

const TutorialSchema =
  new mongoose.Schema(

    {
      title: String,

      slug: String,

      description: String,

      content: String,

      category: String,

      author: String,
    },

    {
      timestamps: true,
    }
  );

// Prevent Recompile Error
const Tutorial =
  mongoose.models.Tutorial ||

  mongoose.model(
    "Tutorial",
    TutorialSchema
  );

// =======================
// CREATE TUTORIAL
// =======================

export async function POST(
  req: NextRequest
) {

  try {

    // Connect DB
    await connectDB();

    // Body
    const body =
      await req.json();

    const {
      title,
      description,
      content,
      category,
    } = body;

    // Validation
    if (
      !title ||
      !description ||
      !content
    ) {

      return NextResponse.json(

        {
          success: false,

          message:
            "All fields required",
        },

        {
          status: 400,
        }
      );
    }

    // Slug
    const slug =
      title
        .toLowerCase()
        .replace(/\s+/g, "-");

    // Create
    const tutorial =
      await Tutorial.create({

        title,

        slug,

        description,

        content,

        category:
          category || "AI",

        author:
          "Tech Fuel",
      });

    // Response
    return NextResponse.json({

      success: true,

      tutorial,
    });

  } catch (error) {

    console.log(
      "POST ERROR:",
      error
    );

    return NextResponse.json(

      {
        success: false,

        message:
          "Server Error",
      },

      {
        status: 500,
      }
    );
  }
}

// =======================
// GET TUTORIALS
// =======================

export async function GET() {

  try {

    // Connect DB
    await connectDB();

    // Fetch Tutorials
    const tutorials =
      await Tutorial.find()
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({

      success: true,

      tutorials,
    });

  } catch (error) {

    console.log(
      "GET ERROR:",
      error
    );

    return NextResponse.json(

      {
        success: false,

        message:
          "Server Error",
      },

      {
        status: 500,
      }
    );
  }
}