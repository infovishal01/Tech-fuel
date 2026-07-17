import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { VlogPost, Comment } from '@/models';
import mongoose from 'mongoose';

// =======================
// GET ALL VLOG POSTS
// =======================
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const author = searchParams.get('author');
    const search = searchParams.get('search');

    // Build query
    const query: any = { isPublished: true };

    if (category) {
      query.category = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (author && mongoose.Types.ObjectId.isValid(author)) {
      query.author = author;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    const posts = await VlogPost.find(query)
      .populate('author', 'username name')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const total = await VlogPost.countDocuments(query);

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('GET POSTS ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to fetch posts',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// =======================
// CREATE VLOG POST
// =======================
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();
    const {
      title,
      excerpt,
      content,
      category,
      tags,
      featuredImage,
      metaTitle,
      metaDescription,
      isPremium,
      author,
    } = body;

    // Validation
    if (!title || !content || !author) {
      return NextResponse.json(
        {
          success: false,
          message: 'Missing required fields',
        },
        { status: 400 }
      );
    }

    // Generate slug
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');

    // Create post
    const post = await VlogPost.create({
      title,
      slug,
      excerpt: excerpt || content.substring(0, 200) + '...',
      content,
      category: category || 'General',
      tags: tags || [],
      featuredImage: featuredImage || '',
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt || content.substring(0, 160),
      isPremium: isPremium || false,
      isPublished: true,
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      readingTime: Math.ceil(content.split(/\s+/).length / 200), // ~200 words per minute
      author: new mongoose.Types.ObjectId(author),
    });

    return NextResponse.json(
      {
        success: true,
        post,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('CREATE POST ERROR:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create post',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
