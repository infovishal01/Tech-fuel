import { Schema, model, models, Document, Types } from "mongoose";

// System design category
export type SystemDesignCategory = 
  | "Basics"
  | "Scalability"
  | "Performance"
  | "Database Design"
  | "Caching"
  | "Load Balancing"
  | "Microservices"
  | "Real-time Systems"
  | "Social Network"
  | "E-commerce"
  | "Messaging"
  | "Streaming"
  | "Search"
  | "Payment Systems"
  | "Analytics";

// Difficulty level
export type SystemDesignDifficulty = "Beginner" | "Intermediate" | "Advanced";

// Interface for System Design Case Study
export interface ISystemDesignCase extends Document {
  title: string;
  slug: string;
  description: string;
  category: SystemDesignCategory;
  difficulty: SystemDesignDifficulty;
  tags: string[];
  requirements: string[];
  goals: string[];
  constraints: string[];
  capacityEstimation: {
    users: number;
    readsPerSecond: number;
    writesPerSecond: number;
    storage: string;
    bandwidth: string;
  };
  highLevelDesign: string;
  detailedDesign: string;
  dataModel: string;
  apiDesign: string;
  algorithms: string[];
  technologies: string[];
  tradeoffs: string[];
  failureAnalysis: string[];
  scalingAnalysis: string;
  extensions: string[];
  diagramUrl: string;
  references: string[];
  isPremium: boolean;
  isPublished: boolean;
  likes: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  viewCount: number;
  createdBy: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for User Design Submission
export interface IDesignSubmission extends Document {
  caseStudy: Types.ObjectId;
  user: Types.ObjectId;
  highLevelDesign: string;
  detailedDesign: string;
  dataModel: string;
  apiDesign: string;
  feedback?: string;
  rating?: number;
  reviewedBy?: Types.ObjectId;
  reviewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// System Design Case Schema
const SystemDesignCaseSchema = new Schema<ISystemDesignCase>(
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
    category: {
      type: String,
      enum: [
        "Basics",
        "Scalability",
        "Performance",
        "Database Design",
        "Caching",
        "Load Balancing",
        "Microservices",
        "Real-time Systems",
        "Social Network",
        "E-commerce",
        "Messaging",
        "Streaming",
        "Search",
        "Payment Systems",
        "Analytics",
      ],
      default: "Basics",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    tags: [{ type: String, lowercase: true, trim: true, maxlength: 50 }],
    requirements: [{ type: String, trim: true }],
    goals: [{ type: String, trim: true }],
    constraints: [{ type: String, trim: true }],
    capacityEstimation: {
      users: { type: Number, default: 0 },
      readsPerSecond: { type: Number, default: 0 },
      writesPerSecond: { type: Number, default: 0 },
      storage: { type: String, default: "" },
      bandwidth: { type: String, default: "" },
    },
    highLevelDesign: {
      type: String,
      required: [true, "High level design is required"],
      trim: true,
    },
    detailedDesign: {
      type: String,
      trim: true,
    },
    dataModel: {
      type: String,
      trim: true,
    },
    apiDesign: {
      type: String,
      trim: true,
    },
    algorithms: [{ type: String, trim: true }],
    technologies: [{ type: String, trim: true }],
    tradeoffs: [{ type: String, trim: true }],
    failureAnalysis: [{ type: String, trim: true }],
    scalingAnalysis: { type: String, trim: true },
    extensions: [{ type: String, trim: true }],
    diagramUrl: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+\.(png|jpg|jpeg|gif|svg|webp)$/i,
        "Diagram URL must be a valid image URL",
      ],
    },
    references: [
      {
        type: String,
        trim: true,
        match: [
          /^https?:\/\/.+/i,
          "Reference must be a valid URL",
        ],
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

// Design Submission Schema
const DesignSubmissionSchema = new Schema<IDesignSubmission>(
  {
    caseStudy: {
      type: Schema.Types.ObjectId,
      ref: "SystemDesignCase",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    highLevelDesign: {
      type: String,
      required: [true, "High level design is required"],
      trim: true,
    },
    detailedDesign: {
      type: String,
      trim: true,
    },
    dataModel: {
      type: String,
      trim: true,
    },
    apiDesign: {
      type: String,
      trim: true,
    },
    feedback: { type: String, trim: true },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    reviewedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    reviewedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Export models
const SystemDesignCase = models.SystemDesignCase || model<ISystemDesignCase>("SystemDesignCase", SystemDesignCaseSchema);
const DesignSubmission = models.DesignSubmission || model<IDesignSubmission>("DesignSubmission", DesignSubmissionSchema);

export { SystemDesignCase, DesignSubmission };
export default SystemDesignCase;
