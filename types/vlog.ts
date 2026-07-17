// Vlog and Blog types for Tech Fuel

// ============================================
// Vlog Types
// ============================================

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

export type VlogStatus = "Draft" | "Published" | "Archived";

export interface VlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: VlogCategory;
  tags: string[];
  featuredImage?: string;
  author: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  status: VlogStatus;
  publishedAt?: string;
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
  createdAt: string;
  updatedAt: string;
}

export interface VlogComment {
  _id: string;
  post: string;
  user: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
  };
  parent?: string;
  content: string;
  likes: string[];
  dislikes: string[];
  isEdited: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  replies: VlogComment[];
  createdAt: string;
  updatedAt: string;
}

export interface VlogStats {
  totalPosts: number;
  totalComments: number;
  totalViews: number;
  totalLikes: number;
  byCategory: Record<VlogCategory, number>;
  popularPosts: VlogPost[];
  recentPosts: VlogPost[];
}

// ============================================
// Job Prep Types
// ============================================

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

export type ExperienceLevel = "Fresher" | "Junior" | "Mid Level" | "Senior" | "Lead" | "Manager";

export type CompanyTier = "FAANG" | "Unicorn" | "Startup" | "MNC" | "Product Based" | "Service Based";

export interface JobPrepResource {
  _id: string;
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
  frequency?: number;
  importance?: number;
  sampleAnswer?: string;
  tips?: string[];
  references?: string[];
  isPremium: boolean;
  isPublished: boolean;
  likes: string[];
  bookmarks: string[];
  viewCount: number;
  rating: number;
  ratingsCount: number;
  createdBy: string;
  reviewedBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserBookmark {
  _id: string;
  user: string;
  resource: string;
  resourceType: string;
  notes?: string;
  createdAt: string;
}

export interface UserPractice {
  _id: string;
  user: string;
  resource: string;
  attempts: {
    date: string;
    score?: number;
    notes?: string;
  }[];
  lastAttempted?: string;
  masteryLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  createdAt: string;
  updatedAt: string;
}

export interface JobPrepStats {
  totalResources: number;
  byType: Record<ResourceType, number>;
  byCategory: Record<JobCategory, number>;
  byCompanyTier: Record<CompanyTier, number>;
  bookmarkedResources: JobPrepResource[];
  recommendedResources: JobPrepResource[];
}

// ============================================
// Combined Vlog & Job Prep Types
// ============================================

export interface VlogDashboard {
  posts: VlogPost[];
  stats: VlogStats;
  featuredPosts: VlogPost[];
  recentComments: VlogComment[];
  popularTags: string[];
}

export interface JobPrepDashboard {
  resources: JobPrepResource[];
  stats: JobPrepStats;
  quickAccess: {
    resumeTemplates: JobPrepResource[];
    interviewQuestions: JobPrepResource[];
    faangGuides: JobPrepResource[];
    remoteTips: JobPrepResource[];
  };
  progress: {
    bookmarked: number;
    practiced: number;
    masteryLevel: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  };
}
