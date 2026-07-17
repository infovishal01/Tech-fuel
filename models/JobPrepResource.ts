import { Schema, model, models, Document, Types } from "mongoose";

// Resource type
export type ResourceType = 
  | "Resume Template"
  | "Cover Letter"
  | "Interview Question"
  | "Company Guide"
  | "Remote Job Tip"
  | "Negotiation Guide"
  | "Portfolio Tip"
  | "LinkedIn Guide"
  | "GitHub Guide"
  | "Behavioral Question"
  | "Technical Question"
  | "Coding Challenge";

// Job category
export type JobCategory = 
  | "Frontend"
  | "Backend"
  | "Full Stack"
  | "DevOps"
  | "Data Science"
  | "ML Engineer"
  | "AI Engineer"
  | "Mobile Developer"
  | "QA Engineer"
  | "Product Manager"
  | "Data Engineer";

// Experience level
export type ExperienceLevel = "Fresher" | "Junior" | "Mid Level" | "Senior" | "Lead" | "Manager";

// Company tier
export type CompanyTier = "FAANG" | "Unicorn" | "Startup" | "MNC" | "Product Based" | "Service Based";

// Interface for Job Preparation Resource
export interface IJobPrepResource extends Document {
  title: string;
  slug: string;
  description: string;
  resourceType: ResourceType;
  category: JobCategory;
  experienceLevel: ExperienceLevel;
  companyTier?: CompanyTier;
  companyName?: string;
  content: string;
  tags: string[];
  difficulty?: "Easy" | "Medium" | "Hard";
  frequency?: number; // How often this is asked (1-10)
  importance?: number; // How important this is (1-10)
  sampleAnswer?: string;
  tips?: string[];
  references?: string[];
  isPremium: boolean;
  isPublished: boolean;
  likes: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  viewCount: number;
  rating: number;
  ratingsCount: number;
  createdBy: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User Bookmark
export interface IUserBookmark extends Document {
  user: Types.ObjectId;
  resource: Types.ObjectId;
  resourceType: string;
  notes?: string;
  createdAt: Date;
}

// Interface for User Practice (for interview questions)
export interface IUserPractice extends Document {
  user: Types.ObjectId;
  resource: Types.ObjectId;
  attempts: {
    date: Date;
    score?: number;
    notes?: string;
  }[];
  lastAttempted: Date;
  masteryLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  createdAt: Date;
  updatedAt: Date;
}

// Job Prep Resource Schema
const JobPrepResourceSchema = new Schema<IJobPrepResource>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-friendly"],
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    resourceType: {
      type: String,
      enum: [
        "Resume Template",
        "Cover Letter",
        "Interview Question",
        "Company Guide",
        "Remote Job Tip",
        "Negotiation Guide",
        "Portfolio Tip",
        "LinkedIn Guide",
        "GitHub Guide",
        "Behavioral Question",
        "Technical Question",
        "Coding Challenge",
      ],
      required: [true, "Resource type is required"],
    },
    category: {
      type: String,
      enum: [
        "Frontend",
        "Backend",
        "Full Stack",
        "DevOps",
        "Data Science",
        "ML Engineer",
        "AI Engineer",
        "Mobile Developer",
        "QA Engineer",
        "Product Manager",
        "Data Engineer",
      ],
      required: [true, "Category is required"],
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid Level", "Senior", "Lead", "Manager"],
      default: "Fresher",
    },
    companyTier: {
      type: String,
      enum: ["FAANG", "Unicorn", "Startup", "MNC", "Product Based", "Service Based"],
    },
    companyName: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    tags: [{ type: String, lowercase: true, trim: true, maxlength: 50 }],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
    },
    frequency: {
      type: Number,
      min: 1,
      max: 10,
    },
    importance: {
      type: Number,
      min: 1,
      max: 10,
    },
    sampleAnswer: {
      type: String,
      trim: true,
    },
    tips: [{ type: String, trim: true }],
    references: [
      {
        type: String,
        trim: true,
        match: [/^https?:\/\/.+/i, "Reference must be a valid URL"],
      },
    ],
    isPremium: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    bookmarks: [{ type: Schema.Types.ObjectId, ref: "User" }],
    viewCount: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// User Bookmark Schema
const UserBookmarkSchema = new Schema<IUserBookmark>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resource: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// User Practice Schema
const UserPracticeSchema = new Schema<IUserPractice>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resource: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    attempts: [
      {
        date: { type: Date, default: Date.now },
        score: { type: Number, min: 0, max: 100 },
        notes: { type: String, trim: true },
      },
    ],
    lastAttempted: { type: Date },
    masteryLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      default: "Beginner",
    },
  },
  {
    timestamps: true,
  }
);

// Export models
const JobPrepResource = models.JobPrepResource || model<IJobPrepResource>("JobPrepResource", JobPrepResourceSchema);
const UserBookmark = models.UserBookmark || model<IUserBookmark>("UserBookmark", UserBookmarkSchema);
const UserPractice = models.UserPractice || model<IUserPractice>("UserPractice", UserPracticeSchema);

export { JobPrepResource, UserBookmark, UserPractice };
export default JobPrepResource;
