/**
 * Central model registry.
 * All models use default exports — we re-export them here under named
 * identifiers so API routes can import consistently.
 *
 * Models that don't have dedicated files yet are stubbed with the
 * existing closest model so the app compiles. Replace stubs with real
 * Mongoose schemas as the feature is built out.
 */
import mongoose from 'mongoose';

// ─── Real model imports ───────────────────────────────────────────────────────
import User from './User';
import Tutorial from './Tutorial';
import DSAProblem from './DSAProblem';
import SystemDesignCase from './SystemDesignCase';
import CoreCSConcept from './CoreCSConcept';
import BackendExample from './BackendExample';
import VlogPost from './VlogPost';
import JobPrepResource from './JobPrepResource';

// ─── Stub helper: creates a basic schema if the model doesn't exist yet ───────
function stubModel(name: string) {
  if (mongoose.models[name]) return mongoose.models[name];
  const schema = new mongoose.Schema({ data: mongoose.Schema.Types.Mixed }, { timestamps: true, strict: false });
  return mongoose.model(name, schema);
}

// ─── Stub models (replace with real schemas as features are implemented) ──────
const DSASubmission = stubModel('DSASubmission');
const DSASolution = stubModel('DSASolution');
const DesignSubmission = stubModel('DesignSubmission');
const ConceptProgress = stubModel('ConceptProgress');
const CodeExecution = stubModel('CodeExecution');
const Comment = stubModel('Comment');
const InterviewQuestion = stubModel('InterviewQuestion');
const PracticeSession = stubModel('PracticeSession');
const ResumeTemplate = stubModel('ResumeTemplate');
const UserResume = stubModel('UserResume');
const RemoteTip = stubModel('RemoteTip');
const TipCategory = stubModel('TipCategory');
const Quiz = stubModel('Quiz');
const QuizSubmission = stubModel('QuizSubmission');

// ─── Exports ──────────────────────────────────────────────────────────────────
export {
  // Real models
  User,
  Tutorial,
  DSAProblem,
  SystemDesignCase,
  CoreCSConcept,
  BackendExample,
  VlogPost,
  JobPrepResource,
  // Stub models
  DSASubmission,
  DSASolution,
  DesignSubmission,
  ConceptProgress,
  CodeExecution,
  Comment,
  InterviewQuestion,
  PracticeSession,
  ResumeTemplate,
  UserResume,
  RemoteTip,
  TipCategory,
  Quiz,
  QuizSubmission,
};

export default {
  User,
  Tutorial,
  DSAProblem,
  SystemDesignCase,
  CoreCSConcept,
  BackendExample,
  VlogPost,
  JobPrepResource,
};
