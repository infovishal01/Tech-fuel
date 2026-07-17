import { Schema, model, models, Document, Types } from "mongoose";

// Backend technology
export type BackendTechnology = 
  | "Node.js"
  | "Express"
  | "NestJS"
  | "Python"
  | "Django"
  | "Flask"
  | "FastAPI"
  | "Java"
  | "Spring Boot"
  | "Go"
  | "Gin"
  | "Echo"
  | "Rust"
  | "Actix"
  | "Rocket";

// Example category
export type ExampleCategory = 
  | "CRUD"
  | "Authentication"
  | "Database"
  | "API Design"
  | "Microservices"
  | "Caching"
  | "File Upload"
  | "WebSockets"
  | "GraphQL"
  | "gRPC"
  | "Testing"
  | "Deployment"
  | "Security"
  | "Performance";

// Difficulty level
export type ExampleDifficulty = "Beginner" | "Intermediate" | "Advanced";

// Interface for Backend Code Example
export interface IBackendExample extends Document {
  title: string;
  slug: string;
  description: string;
  technology: BackendTechnology;
  category: ExampleCategory;
  difficulty: ExampleDifficulty;
  tags: string[];
  code: string;
  language: string;
  dependencies: string[];
  setupInstructions: string;
  runInstructions: string;
  expectedOutput: string;
  explanation: string;
  keyConcepts: string[];
  bestPractices: string[];
  commonMistakes: string[];
  relatedExamples: Types.ObjectId[];
  isRunnable: boolean;
  containerImage?: string;
  timeoutSeconds: number;
  memoryLimitMB: number;
  isPremium: boolean;
  isPublished: boolean;
  likes: Types.ObjectId[];
  bookmarks: Types.ObjectId[];
  viewCount: number;
  runCount: number;
  successCount: number;
  createdBy: Types.ObjectId;
  reviewedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Interface for Code Execution
export interface ICodeExecution extends Document {
  example: Types.ObjectId;
  user: Types.ObjectId;
  input: string;
  code: string;
  language: string;
  status: "Pending" | "Running" | "Success" | "Error" | "Timeout" | "Memory Limit Exceeded";
  output: string;
  error: string;
  runtime: number;
  memoryUsage: number;
  startedAt: Date;
  completedAt?: Date;
  createdAt: Date;
}

// Backend Example Schema
const BackendExampleSchema = new Schema<IBackendExample>(
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
    technology: {
      type: String,
      enum: [
        "Node.js",
        "Express",
        "NestJS",
        "Python",
        "Django",
        "Flask",
        "FastAPI",
        "Java",
        "Spring Boot",
        "Go",
        "Gin",
        "Echo",
        "Rust",
        "Actix",
        "Rocket",
      ],
      required: [true, "Technology is required"],
    },
    category: {
      type: String,
      enum: [
        "CRUD",
        "Authentication",
        "Database",
        "API Design",
        "Microservices",
        "Caching",
        "File Upload",
        "WebSockets",
        "GraphQL",
        "gRPC",
        "Testing",
        "Deployment",
        "Security",
        "Performance",
      ],
      required: [true, "Category is required"],
    },
    difficulty: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tags: [{ type: String, lowercase: true, trim: true, maxlength: 50 }],
    code: {
      type: String,
      required: [true, "Code is required"],
      trim: true,
    },
    language: {
      type: String,
      required: [true, "Language is required"],
      trim: true,
    },
    dependencies: [{ type: String, trim: true }],
    setupInstructions: {
      type: String,
      trim: true,
    },
    runInstructions: {
      type: String,
      trim: true,
    },
    expectedOutput: {
      type: String,
      trim: true,
    },
    explanation: {
      type: String,
      trim: true,
    },
    keyConcepts: [{ type: String, trim: true }],
    bestPractices: [{ type: String, trim: true }],
    commonMistakes: [{ type: String, trim: true }],
    relatedExamples: [{ type: Schema.Types.ObjectId, ref: "BackendExample" }],
    isRunnable: {
      type: Boolean,
      default: false,
    },
    containerImage: {
      type: String,
      trim: true,
    },
    timeoutSeconds: {
      type: Number,
      default: 30,
      min: 5,
      max: 300,
    },
    memoryLimitMB: {
      type: Number,
      default: 256,
      min: 64,
      max: 2048,
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
    runCount: {
      type: Number,
      default: 0,
    },
    successCount: {
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

// Code Execution Schema
const CodeExecutionSchema = new Schema<ICodeExecution>(
  {
    example: {
      type: Schema.Types.ObjectId,
      ref: "BackendExample",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    input: { type: String, default: "" },
    code: {
      type: String,
      required: true,
      trim: true,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Running", "Success", "Error", "Timeout", "Memory Limit Exceeded"],
      default: "Pending",
    },
    output: { type: String, default: "" },
    error: { type: String, default: "" },
    runtime: { type: Number, default: 0 },
    memoryUsage: { type: Number, default: 0 },
    startedAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Export models
const BackendExample = models.BackendExample || model<IBackendExample>("BackendExample", BackendExampleSchema);
const CodeExecution = models.CodeExecution || model<ICodeExecution>("CodeExecution", CodeExecutionSchema);

export { BackendExample, CodeExecution };
export default BackendExample;
