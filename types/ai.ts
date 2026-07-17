// AI-related types for Tech Fuel

// ============================================
// AI Chat Types
// ============================================

export interface ChatMessage {
  _id?: string;
  role: "system" | "user" | "assistant";
  content: string;
  timestamp?: Date;
  metadata?: {
    model?: string;
    tokens?: number;
    finishReason?: string;
  };
}

export interface ChatSession {
  _id: string;
  user: string;
  title: string;
  messages: ChatMessage[];
  model: string;
  temperature: number;
  maxTokens: number;
  createdAt: string;
  updatedAt: string;
}

export interface ChatRequest {
  message: string;
  sessionId?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
  context?: ChatMessage[];
}

export interface ChatResponse {
  message: ChatMessage;
  sessionId?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// ============================================
// Code Generation Types
// ============================================

export type CodeLanguage = "Python" | "JavaScript" | "TypeScript" | "Java" | "C++" | "Go" | "Rust" | "C#" | "PHP" | "Ruby";

export type CodeTemplateType = 
  | "function"
  | "class"
  | "algorithm"
  | "api"
  | "database"
  | "auth"
  | "middleware"
  | "utility";

export interface CodeGenerationRequest {
  prompt: string;
  language: CodeLanguage;
  templateType?: CodeTemplateType;
  context?: string;
  maxTokens?: number;
  temperature?: number;
}

export interface CodeGenerationResponse {
  code: string;
  language: CodeLanguage;
  explanation: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// ============================================
// Mock Interview Types
// ============================================

export type InterviewMode = "technical" | "behavioral" | "system-design" | "dsa" | "mixed";

export type InterviewDifficulty = "Easy" | "Medium" | "Hard";

export interface MockInterviewRequest {
  mode: InterviewMode;
  difficulty?: InterviewDifficulty;
  topics?: string[];
  duration?: number; // in minutes
  company?: string;
}

export interface InterviewQuestion {
  _id?: string;
  question: string;
  type: "coding" | "theoretical" | "design" | "behavioral";
  difficulty: InterviewDifficulty;
  topic: string;
  expectedAnswer: string;
  evaluationCriteria?: string[];
  followupQuestions?: string[];
}

export interface MockInterviewSession {
  _id: string;
  user: string;
  mode: InterviewMode;
  questions: InterviewQuestion[];
  currentQuestionIndex: number;
  answers: {
    questionId: string;
    answer: string;
    feedback?: string;
    rating?: number;
  }[];
  startedAt: string;
  endedAt?: string;
  duration: number;
  totalScore?: number;
  feedback?: string;
  createdAt: string;
  updatedAt: string;
}

export interface MockInterviewResponse {
  session: MockInterviewSession;
  currentQuestion: InterviewQuestion;
  nextQuestion?: InterviewQuestion;
}

// ============================================
// Project Generation Types
// ============================================

export type ProjectDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ProjectCategory = 
  | "Web Development"
  | "Mobile App"
  | "Backend Service"
  | "API"
  | "CLI Tool"
  | "Library"
  | "Framework"
  | "Game"
  | "AI/ML"
  | "Data Analysis"
  | "Automation"
  | "DevOps"
  | "Blockchain"
  | "Open Source";

export interface ProjectIdea {
  title: string;
  description: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  techStack: string[];
  features: string[];
  requirements: string[];
  bonusFeatures: string[];
  learningOutcomes: string[];
  estimatedTime: string;
  resources: string[];
}

export interface ProjectGenerationRequest {
  category?: ProjectCategory;
  difficulty?: ProjectDifficulty;
  techStack?: string[];
  interests?: string[];
  count?: number;
}

export interface ProjectGenerationResponse {
  projects: ProjectIdea[];
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

// ============================================
// Career Roadmap Types
// ============================================

export type CareerGoal = 
  | "Frontend Developer"
  | "Backend Developer"
  | "Full Stack Developer"
  | "DevOps Engineer"
  | "Data Scientist"
  | "ML Engineer"
  | "AI Engineer"
  | "Mobile Developer"
  | "QA Engineer"
  | "Product Manager"
  | "Data Engineer"
  | "Software Architect"
  | "CTO";

export type RoadmapDuration = "1 month" | "3 months" | "6 months" | "1 year" | "2 years";

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  resources: {
    title: string;
    url: string;
    type: "course" | "book" | "video" | "article" | "project";
  }[];
  milestones: string[];
  prerequisites: string[];
}

export interface CareerRoadmap {
  goal: CareerGoal;
  duration: RoadmapDuration;
  steps: RoadmapStep[];
  totalDuration: string;
  estimatedCompletion: string;
  recommendedOrder: number[];
}

export interface RoadmapRequest {
  goal: CareerGoal;
  duration?: RoadmapDuration;
  currentSkills?: string[];
  experienceLevel?: ExperienceLevel;
}

// ============================================
// AI Settings Types
// ============================================

export interface AIModelConfig {
  id: string;
  name: string;
  provider: "OpenAI" | "Anthropic" | "Google" | "Local";
  maxTokens: number;
  pricePer1KTokens: {
    prompt: number;
    completion: number;
  };
  supported: boolean;
  default: boolean;
}

export interface AIConfig {
  defaultModel: string;
  models: AIModelConfig[];
  temperature: number;
  maxTokens: number;
  apiKeys: {
    openai?: string;
    anthropic?: string;
    google?: string;
  };
  rateLimits: {
    requestsPerMinute: number;
    tokensPerMinute: number;
  };
}

// ============================================
// Combined AI Types
// ============================================

export interface AIUsage {
  totalRequests: number;
  totalTokens: {
    prompt: number;
    completion: number;
  };
  byModel: Record<string, {
    requests: number;
    tokens: {
      prompt: number;
      completion: number;
    };
  }>;
  byFeature: {
    chat: number;
    code: number;
    interview: number;
    project: number;
    roadmap: number;
  };
  dailyUsage: {
    date: string;
    requests: number;
    tokens: number;
  }[];
}

export interface AIFeaturesStatus {
  chat: boolean;
  codeGenerator: boolean;
  mockInterview: boolean;
  projectGenerator: boolean;
  roadmapGenerator: boolean;
  models: AIModelConfig[];
  usage: AIUsage;
}
