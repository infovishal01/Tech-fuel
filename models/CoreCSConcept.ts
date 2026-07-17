import { Schema, model, models, Document, Types } from "mongoose";

// Core CS subjects
export type CoreCSSubject = 
  | "Operating Systems"
  | "Database Systems"
  | "Computer Networks"
  | "Compiler Design"
  | "Computer Organization"
  | "Theory of Computation"
  | "Algorithms"
  | "Data Structures";

// Difficulty level
export type ConceptDifficulty = "Beginner" | "Intermediate" | "Advanced";

// Content type
export type ContentType = "Tutorial" | "Concept" | "Example" | "Quiz" | "Exercise" | "Project";

// Interface for Core CS Concept
export interface ICoreCSConcept extends Document {
  title: string;
  slug: string;
  subject: CoreCSSubject;
  description: string;
  content: string;
  contentType: ContentType;
  difficulty: ConceptDifficulty;
  tags: string[];
  prerequisites: Types.ObjectId[];
  relatedConcepts: Types.ObjectId[];
  examples: {
    title: string;
    description: string;
    code?: string;
    language?: string;
  }[];
  quizQuestions: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  references: string[];
  diagramUrl?: string;
  videoUrl?: string;
  durationMinutes: number;
  isPremium: boolean;
  isPublished: boolean;
  likes: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  viewCount: number;
  completionCount: number;
  rating: number;
  ratingsCount: number;
  createdBy: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Quiz Submission
export interface IQuizSubmission extends Document {
  concept: Types.ObjectId;
  user: Types.ObjectId;
  answers: {
    questionIndex: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds: number;
  completedAt: Date;
  createdAt: Date;
}

// Interface for User Progress
export interface IUserProgress extends Document {
  user: Types.ObjectId;
  concept: Types.ObjectId;
  subject: CoreCSSubject;
  completed: boolean;
  lastAccessed: Date;
  notes: string;
  bookmarked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Core CS Concept Schema
const CoreCSConceptSchema = new Schema<ICoreCSConcept>(
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
    subject: {
      type: String,
      enum: [
        "Operating Systems",
        "Database Systems",
        "Computer Networks",
        "Compiler Design",
        "Computer Organization",
        "Theory of Computation",
        "Algorithms",
        "Data Structures",
      ],
      required: [true, "Subject is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    contentType: {
      type: String,
      enum: ["Tutorial", "Concept", "Example", "Quiz", "Exercise", "Project"],
      default: "Tutorial",
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tags: [{ type: String, lowercase: true, trim: true, maxlength: 50 }],
    prerequisites: [{ type: Schema.Types.ObjectId, ref: "CoreCSConcept" }],
    relatedConcepts: [{ type: Schema.Types.ObjectId, ref: "CoreCSConcept" }],
    examples: [
      {
        title: { type: String, required: true },
        description: { type: String },
        code: { type: String },
        language: { type: String },
      },
    ],
    quizQuestions: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true, min: 0 },
        explanation: { type: String },
      },
    ],
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
    diagramUrl: {
      type: String,
      trim: true,
      match: [
        /^https?:\/\/.+\.(png|jpg|jpeg|gif|svg|webp)$/i,
        "Diagram URL must be a valid image URL",
      ],
    },
    videoUrl: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|vimeo\.com\/)/i,
        "Video URL must be a valid YouTube or Vimeo URL",
      ],
    },
    durationMinutes: {
      type: Number,
      default: 10,
      min: 1,
      max: 600,
    },
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
    completionCount: {
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

// Quiz Submission Schema
const QuizSubmissionSchema = new Schema<IQuizSubmission>(
  {
    concept: {
      type: Schema.Types.ObjectId,
      ref: "CoreCSConcept",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    answers: [
      {
        questionIndex: { type: Number, required: true },
        selectedOption: { type: Number, required: true },
        isCorrect: { type: Boolean, default: false },
      },
    ],
    score: {
      type: Number,
      default: 0,
      min: 0,
    },
    totalQuestions: {
      type: Number,
      default: 0,
      min: 0,
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    timeTakenSeconds: {
      type: Number,
      default: 0,
    },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// User Progress Schema
const UserProgressSchema = new Schema<IUserProgress>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    concept: {
      type: Schema.Types.ObjectId,
      ref: "CoreCSConcept",
      required: true,
    },
    subject: {
      type: String,
      enum: [
        "Operating Systems",
        "Database Systems",
        "Computer Networks",
        "Compiler Design",
        "Computer Organization",
        "Theory of Computation",
        "Algorithms",
        "Data Structures",
      ],
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    lastAccessed: { type: Date },
    notes: { type: String, trim: true },
    bookmarked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export models
const CoreCSConcept = models.CoreCSConcept || model<ICoreCSConcept>("CoreCSConcept", CoreCSConceptSchema);
const QuizSubmission = models.QuizSubmission || model<IQuizSubmission>("QuizSubmission", QuizSubmissionSchema);
const UserProgress = models.UserProgress || model<IUserProgress>("UserProgress", UserProgressSchema);

export { CoreCSConcept, QuizSubmission, UserProgress };
export default CoreCSConcept;
