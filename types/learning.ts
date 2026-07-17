// Learning-related types for Tech Fuel

// ============================================
// DSA Types
// ============================================

export type Difficulty = "Easy" | "Medium" | "Hard";

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

export type ProgrammingLanguage = "Python" | "Java" | "C++" | "JavaScript" | "TypeScript" | "Go" | "Rust";

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

export interface DSAProblem {
  _id: string;
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
  likes: string[];
  dislikes: string[];
  viewCount: number;
  solveCount: number;
  acceptanceRate: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface DSASolution {
  _id: string;
  problem: string;
  user: string;
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
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DSASubmission {
  _id: string;
  problem: string;
  user: string;
  code: string;
  language: ProgrammingLanguage;
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded" | "Memory Limit Exceeded" | "Runtime Error" | "Compilation Error";
  runtime: number;
  memoryUsage: number;
  submittedAt: string;
  createdAt: string;
}

export interface DSAStats {
  totalProblems: number;
  solved: number;
  byDifficulty: {
    Easy: number;
    Medium: number;
    Hard: number;
  };
  byCategory: Record<ProblemCategory, number>;
  acceptanceRate: number;
  streak: number;
}

// ============================================
// System Design Types
// ============================================

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

export type SystemDesignDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface SystemDesignCase {
  _id: string;
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
  likes: string[];
  bookmarks: string[];
  viewCount: number;
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DesignSubmission {
  _id: string;
  caseStudy: string;
  user: string;
  highLevelDesign: string;
  detailedDesign: string;
  dataModel: string;
  apiDesign: string;
  feedback?: string;
  rating?: number;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Core CS Types
// ============================================

export type CoreCSSubject = 
  | "Operating Systems"
  | "Database Systems"
  | "Computer Networks"
  | "Compiler Design"
  | "Computer Organization"
  | "Theory of Computation"
  | "Algorithms"
  | "Data Structures";

export type ConceptDifficulty = "Beginner" | "Intermediate" | "Advanced";

export type ContentType = "Tutorial" | "Concept" | "Example" | "Quiz" | "Exercise" | "Project";

export interface CoreCSConcept {
  _id: string;
  title: string;
  slug: string;
  subject: CoreCSSubject;
  description: string;
  content: string;
  contentType: ContentType;
  difficulty: ConceptDifficulty;
  tags: string[];
  prerequisites: string[];
  relatedConcepts: string[];
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
  likes: string[];
  bookmarks: string[];
  viewCount: number;
  completionCount: number;
  rating: number;
  ratingsCount: number;
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizSubmission {
  _id: string;
  concept: string;
  user: string;
  answers: {
    questionIndex: number;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  score: number;
  totalQuestions: number;
  percentage: number;
  timeTakenSeconds: number;
  completedAt?: string;
  createdAt: string;
}

export interface UserProgress {
  _id: string;
  user: string;
  concept: string;
  subject: CoreCSSubject;
  completed: boolean;
  lastAccessed?: string;
  notes?: string;
  bookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CoreCSStats {
  totalConcepts: number;
  completed: number;
  bySubject: Record<CoreCSSubject, number>;
  byDifficulty: Record<ConceptDifficulty, number>;
  averageRating: number;
}

// ============================================
// Backend Example Types
// ============================================

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

export type ExampleDifficulty = "Beginner" | "Intermediate" | "Advanced";

export interface BackendExample {
  _id: string;
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
  relatedExamples: string[];
  isRunnable: boolean;
  containerImage?: string;
  timeoutSeconds: number;
  memoryLimitMB: number;
  isPremium: boolean;
  isPublished: boolean;
  likes: string[];
  bookmarks: string[];
  viewCount: number;
  runCount: number;
  successCount: number;
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CodeExecution {
  _id: string;
  example: string;
  user: string;
  input: string;
  code: string;
  language: string;
  status: "Pending" | "Running" | "Success" | "Error" | "Timeout" | "Memory Limit Exceeded";
  output: string;
  error: string;
  runtime: number;
  memoryUsage: number;
  startedAt: string;
  completedAt?: string;
  createdAt: string;
}

export interface BackendExampleStats {
  totalExamples: number;
  runCount: number;
  successRate: number;
  byTechnology: Record<BackendTechnology, number>;
  byCategory: Record<ExampleCategory, number>;
}

// ============================================
// Combined Learning Types
// ============================================

export interface LearningProgress {
  dsa: DSAStats;
  systemDesign: {
    totalCases: number;
    completed: number;
    bookmarked: number;
  };
  coreCS: CoreCSStats;
  backend: BackendExampleStats;
  overall: {
    totalItems: number;
    completed: number;
    completionPercentage: number;
    streak: number;
  };
}

export interface LearningDashboard {
  progress: LearningProgress;
  recommendations: {
    dsa: DSAProblem[];
    systemDesign: SystemDesignCase[];
    coreCS: CoreCSConcept[];
    backend: BackendExample[];
  };
  recentActivity: {
    solvedProblems: DSAProblem[];
    completedCases: SystemDesignCase[];
    finishedConcepts: CoreCSConcept[];
    ranExamples: BackendExample[];
  };
}
