import { Schema, model, models, Document, Types } from "mongoose";

// Vlog category
export type VlogCategory = 
  | "Tech Updates"
  | "Tutorials"
  | "Learning Resources"
  | "Success Stories"
  | "Interviews"
  | "Career Advice"
  | "Industry News"
  | "Product Releases"
  | "Community"
  | "Events";

// Vlog status
export type VlogStatus = "Draft" | "Published" | "Archived";

// Interface for Vlog Post
export interface IVlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: VlogCategory;
  tags: string[];
  featuredImage?: string;
  author: Types.ObjectId;
  status: VlogStatus;
  publishedAt?: Date;
  isFeatured: boolean;
  isPremium: boolean;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  seoScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Vlog Comment
export interface IVlogComment extends Document {
  post: Types.ObjectId;
  user: Types.ObjectId;
  parent?: Types.ObjectId;
  content: string;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Vlog Post Schema
const VlogPostSchema = new Schema<IVlogPost>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly"],
      unique: true,
    },
    excerpt: {
      type: String,
      required: [true, "Excerpt is required"],
      trim: true,
      maxlength: [300, "Excerpt cannot exceed 300 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Tech Updates",
        "Tutorials",
        "Learning Resources",
        "Success Stories",
        "Interviews",
        "Career Advice",
        "Industry News",
        "Product Releases",
        "Community",
        "Events",
      ],
      default: "Tech Updates",
    },
    tags: [{ type: String, lowercase: true, trim: true, maxlength: 50 }],
    featuredImage: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+\.(png|jpg|jpeg|gif|svg|webp|avif)$/i,
        "Featured image must be a valid image URL",
      ],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Draft", "Published", "Archived"],
      default: "Draft",
    },
    publishedAt: { type: Date },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    shareCount: {
      type: Number,
      default: 0,
    },
    metaTitle: {
      type: String,
      trim: true,
      maxlength: [100, "Meta title cannot exceed 100 characters"],
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: [200, "Meta description cannot exceed 200 characters"],
    },
    metaKeywords: [{ type: String, trim: true }],
    seoScore: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Vlog Comment Schema
const VlogCommentSchema = new Schema<IVlogComment>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "VlogPost",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "VlogComment",
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
      maxlength: [2000, "Comment cannot exceed 2000 characters"],
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Export models
const VlogPost = models.VlogPost || model<IVlogPost>("VlogPost", VlogPostSchema);
const VlogComment = models.VlogComment || model<IVlogComment>("VlogComment", VlogCommentSchema);

export { VlogPost, VlogComment };
export default VlogPost;
