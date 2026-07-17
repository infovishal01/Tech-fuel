import { Schema, model, models, Document, Types } from "mongoose";

// Difficulty levels for DSA problems
export type Difficulty = "Easy" | "Medium" | "Hard";

// Problem category
export type ProblemCategory = 
  | "Array"
  | "String"
  | "Linked List"
  | "Stack"
  | "Queue"
  | "Tree"
  | "Graph"
  | "Heap"
  | "Hash Table"
  | "Dynamic Programming"
  | "Greedy"
  | "Backtracking"
  | "Divide and Conquer"
  | "Sorting"
  | "Searching"
  | "Mathematical"
  | "Bit Manipulation"
  | "Recursion";

// Programming language support
export type ProgrammingLanguage = "Python" | "Java" | "C++" | "JavaScript" | "TypeScript" | "Go" | "Rust";

// Company tags for problems
export type CompanyTag = 
  | "FAANG"
  | "Google"
  | "Amazon"
  | "Apple"
  | "Netflix"
  | "Meta"
  | "Microsoft"
  | "Uber"
  | "Lyft"
  | "Airbnb"
  | "Dropbox"
  | "Stripe"
  | "Startups"
  | "Top 100";

// Interface for DSA Problem
export interface IDSAProblem extends Document {
  title: string;
  description: string;
  problemStatement: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  constraints: string[];
  difficulty: Difficulty;
  categories: ProblemCategory[];
  tags: string[];
  companyTags: CompanyTag[];
  hints: string[];
  notes?: string;
  isPremium: boolean;
  isPublished: boolean;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  viewCount: number;
  solveCount: number;
  acceptanceRate: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for DSA Solution
export interfaceIDSASolution extends Document {
  problem: Types.ObjectId;
  user: Types.ObjectId;
  code: string;
  language: ProgrammingLanguage;
  explanation: string;
  timeComplexity: string;
  spaceComplexity: string;
  isCorrect: boolean;
  feedback?: string;
  testCasesPassed: number;
  totalTestCases: number;
  runtime: number;
  memoryUsage: number;
  likes: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

// Interface for DSA Submission (user's code submission)
export interfaceIDSASubmission extends Document {
  problem: Types.ObjectId;
  user: Types.ObjectId;
  code: string;
  language: ProgrammingLanguage;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Memory Limit Exceeded" | "Runtime Error" | "Compilation Error";
  runtime: number;
  memoryUsage: number;
  submittedAt: Date;
}

// DSA Problem Schema
const DSAProblemSchema = new Schema<IDSAProblem>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    problemStatement: {
      type: String,
      required: [true, "Problem statement is required"],
      trim: true,
    },
    examples: [
      {
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    constraints: [{ type: String }],
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Medium",
    },
    categories: [
      {
        type: String,
        enum: [
          "Array",
          "String",
          "Linked List",
          "Stack",
          "Queue",
          "Tree",
          "Graph",
          "Heap",
          "Hash Table",
          "Dynamic Programming",
          "Greedy",
          "Backtracking",
          "Divide and Conquer",
          "Sorting",
          "Searching",
          "Mathematical",
          "Bit Manipulation",
          "Recursion",
        ],
      },
    ],
    tags: [{ type: String, lowercase: true, trim: true }],
    companyTags: [
      {
        type: String,
        enum: [
          "FAANG",
          "Google",
          "Amazon",
          "Apple",
          "Netflix",
          "Meta",
          "Microsoft",
          "Uber",
          "Lyft",
          "Airbnb",
          "Dropbox",
          "Stripe",
          "Startups",
          "Top 100",
        ],
      },
    ],
    hints: [{ type: String }],
    notes: { type: String },
    isPremium: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    dislikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    viewCount: {
      type: Number,
      default: 0,
    },
    solveCount: {
      type: Number,
      default: 0,
    },
    acceptanceRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DSA Solution Schema
const DSASolutionSchema = new Schema<IDSASolution>(
  {
    problem: {
      type: Schema.Types.ObjectId,
      ref: "DSAProblem",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      enum: ["Python", "Java", "C++", "JavaScript", "TypeScript", "Go", "Rust"],
      required: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
    timeComplexity: {
      type: String,
      required: true,
      trim: true,
    },
    spaceComplexity: {
      type: String,
      required: true,
      trim: true,
    },
    isCorrect: {
      type: Boolean,
      default: false,
    },
    feedback: { type: String },
    testCasesPassed: {
      type: Number,
      default: 0,
    },
    totalTestCases: {
      type: Number,
      default: 0,
    },
    runtime: {
      type: Number,
      default: 0,
    },
    memoryUsage: {
      type: Number,
      default: 0,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  {
    timestamps: true,
  }
);

// DSA Submission Schema
const DSASubmissionSchema = new Schema<IDSASubmission>(
  {
    problem: {
      type: Schema.Types.ObjectId,
      ref: "DSAProblem",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      enum: ["Python", "Java", "C++", "JavaScript", "TypeScript", "Go", "Rust"],
      required: true,
    },
    status: {
      type: String,
      enum: ["Accepted", "Wrong Answer", "Time Limit Exceeded", "Memory Limit Exceeded", "Runtime Error", "Compilation Error"],
      default: "Compilation Error",
    },
    runtime: {
      type: Number,
      default: 0,
    },
    memoryUsage: {
      type: Number,
      default: 0,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Export models
const DSAProblem = models.DSAProblem || model<IDSAProblem>("DSAProblem", DSAProblemSchema);
const DSASolution = models.DSASolution || model<IDSASolution>("DSASolution", DSASolutionSchema);
const DSASubmission = models.DSASubmission || model<IDSASubmission>("DSASubmission", DSASubmissionSchema);

export { DSAProblem, DSASolution, DSASubmission };
export default DSAProblem;
