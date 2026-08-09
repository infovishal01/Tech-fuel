'use client';

import { useState } from 'react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import {
  Code2,
  Brain,
  Server,
  Layers,
  Play,
  BookOpen,
  Trophy,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Zap,
  Target,
  BarChart2,
} from 'lucide-react';

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'dsa', label: 'DSA Sheets', icon: Code2 },
  { id: 'core-cs', label: 'Core CS', icon: Brain },
  { id: 'system-design', label: 'System Design', icon: Layers },
  { id: 'backend', label: 'Backend Dev', icon: Server },
  { id: 'playlists', label: 'DSA Playlists', icon: Play },
  { id: 'interview', label: 'Interview Prep', icon: Trophy },
  { id: 'blogs', label: 'Blogs', icon: BookOpen },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ─── Content data per tab ─────────────────────────────────────────────────────
const CONTENT: Record<TabId, { title: string; desc: string; tags: string[]; href: string; badge?: string; badgeColor?: string; accent: string }[]> = {
  dsa: [
    {
      title: 'A2Z DSA Sheet',
      desc: 'Master DSA from Basics to Advanced — 455+ problems structured by topic.',
      tags: ['Arrays', 'Trees', 'DP', 'Graphs'],
      href: '/tutorials?cat=dsa',
      badge: 'Most Popular',
      badgeColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      accent: 'from-green-500/10 to-transparent',
    },
    {
      title: 'Blind 75 Sheet',
      desc: 'The classic 75 must-know LeetCode problems with video solutions.',
      tags: ['LeetCode', 'FAANG', 'Video'],
      href: '/tutorials?cat=dsa',
      badge: 'FAANG Ready',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
      accent: 'from-sky-500/10 to-transparent',
    },
    {
      title: 'SDE Sheet',
      desc: 'Top 180 frequently asked coding interview questions across all companies.',
      tags: ['Interviews', 'Top 180', 'All companies'],
      href: '/tutorials?cat=dsa',
      accent: 'from-violet-500/10 to-transparent',
    },
    {
      title: 'Striver 79 Sheet',
      desc: 'Last-minute preparation — 79 hand-picked problems to ace your interviews.',
      tags: ['Quick Prep', '79 Problems'],
      href: '/tutorials?cat=dsa',
      badge: 'Last Minute',
      badgeColor: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      accent: 'from-orange-500/10 to-transparent',
    },
    {
      title: 'Two Pointers & Sliding Window',
      desc: 'Pattern-based approach to mastering array and string problems.',
      tags: ['Patterns', 'Arrays', 'Strings'],
      href: '/tutorials?cat=dsa',
      accent: 'from-rose-500/10 to-transparent',
    },
    {
      title: 'Dynamic Programming Sheet',
      desc: 'Complete DP roadmap — from memoisation to tabulation, every pattern covered.',
      tags: ['DP', 'Recursion', 'Optimisation'],
      href: '/tutorials?cat=dsa',
      accent: 'from-amber-500/10 to-transparent',
    },
  ],
  'core-cs': [
    {
      title: 'Operating Systems',
      desc: 'Process management, memory management, scheduling, deadlocks — everything for interviews.',
      tags: ['Processes', 'Memory', 'Scheduling'],
      href: '/tutorials?cat=core-cs',
      badge: 'Interview Must',
      badgeColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      accent: 'from-green-500/10 to-transparent',
    },
    {
      title: 'DBMS',
      desc: 'Normalization, transactions, indexing, SQL queries — from basics to advanced.',
      tags: ['SQL', 'Normalization', 'Indexing'],
      href: '/tutorials?cat=core-cs',
      accent: 'from-sky-500/10 to-transparent',
    },
    {
      title: 'Computer Networks',
      desc: 'TCP/IP, HTTP, DNS, OSI model, and every networking concept asked in interviews.',
      tags: ['TCP/IP', 'HTTP', 'DNS'],
      href: '/tutorials?cat=core-cs',
      accent: 'from-violet-500/10 to-transparent',
    },
    {
      title: 'Object Oriented Design',
      desc: 'SOLID principles, design patterns, UML diagrams — master OOP for interviews.',
      tags: ['SOLID', 'Patterns', 'OOP'],
      href: '/tutorials?cat=core-cs',
      accent: 'from-orange-500/10 to-transparent',
    },
  ],
  'system-design': [
    {
      title: 'HLD Roadmap',
      desc: 'High-level design from scratch — load balancers, caching, CDN, databases.',
      tags: ['HLD', 'Scalability', 'Caching'],
      href: '/tutorials?cat=system-design',
      badge: 'Senior Level',
      badgeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
      accent: 'from-violet-500/10 to-transparent',
    },
    {
      title: 'Design URL Shortener',
      desc: 'Step-by-step breakdown of TinyURL — capacity estimation, API design, data model.',
      tags: ['Case Study', 'APIs', 'Scaling'],
      href: '/tutorials?cat=system-design',
      badge: 'Case Study',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
      accent: 'from-sky-500/10 to-transparent',
    },
    {
      title: 'Design Instagram / Twitter',
      desc: 'Social media system design — feeds, notifications, media storage, CDN.',
      tags: ['Feed', 'CDN', 'NoSQL'],
      href: '/tutorials?cat=system-design',
      accent: 'from-rose-500/10 to-transparent',
    },
    {
      title: 'Design WhatsApp / Chat System',
      desc: 'Real-time messaging, websockets, message queues, presence system.',
      tags: ['WebSockets', 'Queues', 'Real-time'],
      href: '/tutorials?cat=system-design',
      accent: 'from-amber-500/10 to-transparent',
    },
  ],
  backend: [
    {
      title: 'Node.js REST API',
      desc: 'Build a production-ready CRUD API with Express, MongoDB, auth, and validation.',
      tags: ['Node.js', 'Express', 'MongoDB'],
      href: '/tutorials?cat=backend',
      badge: 'Hands-on',
      badgeColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      accent: 'from-green-500/10 to-transparent',
    },
    {
      title: 'JWT Authentication',
      desc: 'Secure your APIs with JWT, refresh tokens, and role-based access control.',
      tags: ['Security', 'JWT', 'RBAC'],
      href: '/tutorials?cat=backend',
      accent: 'from-sky-500/10 to-transparent',
    },
    {
      title: 'Database Design',
      desc: 'Schema design, indexing strategies, and query optimisation for production apps.',
      tags: ['SQL', 'NoSQL', 'Indexes'],
      href: '/tutorials?cat=backend',
      accent: 'from-violet-500/10 to-transparent',
    },
    {
      title: 'Docker & Deployment',
      desc: 'Containerise your app, write Dockerfiles, and deploy to cloud with CI/CD.',
      tags: ['Docker', 'CI/CD', 'Cloud'],
      href: '/tutorials?cat=backend',
      accent: 'from-orange-500/10 to-transparent',
    },
  ],
  playlists: [
    { title: 'Arrays — Basics to Advanced', desc: 'Complete array series with every pattern and problem type.', tags: ['30+ videos'], href: '/tutorials?cat=dsa', accent: 'from-green-500/10 to-transparent' },
    { title: 'Binary Search Mastery', desc: 'Every binary search variant — from sorted arrays to answer space problems.', tags: ['20+ videos'], href: '/tutorials?cat=dsa', accent: 'from-sky-500/10 to-transparent' },
    { title: 'Graphs — Full Series', desc: 'BFS, DFS, shortest paths, MST, topological sort and more.', tags: ['40+ videos'], href: '/tutorials?cat=dsa', accent: 'from-violet-500/10 to-transparent' },
    { title: 'Dynamic Programming', desc: 'Every DP pattern from 1D/2D DP to partition, knapsack, and LCS.', tags: ['56+ videos'], href: '/tutorials?cat=dsa', badge: 'Most Loved', badgeColor: 'text-rose-400 bg-rose-400/10 border-rose-400/20', accent: 'from-rose-500/10 to-transparent' },
    { title: 'Trees & BST', desc: 'Binary trees, BSTs, AVL trees, and segment trees from scratch.', tags: ['35+ videos'], href: '/tutorials?cat=dsa', accent: 'from-amber-500/10 to-transparent' },
    { title: 'Recursion & Backtracking', desc: 'Build strong recursion intuition with 30+ curated problems.', tags: ['30+ videos'], href: '/tutorials?cat=dsa', accent: 'from-teal-500/10 to-transparent' },
  ],
  interview: [
    {
      title: 'Top 50 Interview Questions',
      desc: '50 most frequently asked coding questions across Google, Amazon, Microsoft.',
      tags: ['FAANG', 'Coding', 'Top 50'],
      href: '/tutorials',
      badge: 'Top Picks',
      badgeColor: 'text-green-400 bg-green-400/10 border-green-400/20',
      accent: 'from-green-500/10 to-transparent',
    },
    {
      title: 'Resume Building Guide',
      desc: 'ATS-friendly resume tips, templates, and review checklist for tech roles.',
      tags: ['Resume', 'ATS', 'Tips'],
      href: '/tutorials',
      accent: 'from-sky-500/10 to-transparent',
    },
    {
      title: 'Mock Interview with AI',
      desc: 'Practice with our AI interviewer — get instant feedback on your answers.',
      tags: ['AI-powered', 'Real-time'],
      href: '/dashboard',
      badge: 'AI Tool',
      badgeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
      accent: 'from-violet-500/10 to-transparent',
    },
    {
      title: 'Behavioural Interview Guide',
      desc: 'STAR method, common questions, and sample answers for non-technical rounds.',
      tags: ['HR Round', 'STAR', 'Soft Skills'],
      href: '/tutorials',
      accent: 'from-orange-500/10 to-transparent',
    },
  ],
  blogs: [
    { title: 'Mastering DSA in 2026', desc: 'A complete roadmap to mastering data structures and algorithms from scratch.', tags: ['Roadmap', 'DSA'], href: '/tutorials', accent: 'from-green-500/10 to-transparent', badge: 'Trending', badgeColor: 'text-green-400 bg-green-400/10 border-green-400/20' },
    { title: 'Welcome to TechFuel', desc: 'What is TechFuel, who it is for, and how to make the most of the platform.', tags: ['Guide', 'Getting Started'], href: '/about', accent: 'from-sky-500/10 to-transparent' },
    { title: 'How to Crack FAANG', desc: 'The exact preparation strategy used by engineers who cracked Google & Amazon.', tags: ['FAANG', 'Strategy'], href: '/tutorials', accent: 'from-violet-500/10 to-transparent' },
    { title: 'System Design Interview Prep', desc: 'A 30-day plan to go from zero to confident in system design interviews.', tags: ['30-day Plan', 'HLD'], href: '/tutorials?cat=system-design', accent: 'from-orange-500/10 to-transparent' },
    { title: 'Top 10 DSA Patterns', desc: 'The 10 algorithmic patterns that cover 90% of coding interview problems.', tags: ['Patterns', 'Tips'], href: '/tutorials?cat=dsa', accent: 'from-rose-500/10 to-transparent' },
    { title: 'AI Tools for Developers', desc: 'How to 10x your productivity using ChatGPT, Copilot, and other AI tools.', tags: ['AI', 'Productivity'], href: '/ai-tools', accent: 'from-amber-500/10 to-transparent' },
  ],
};

// ─── Card component ───────────────────────────────────────────────────────────
function ContentCard({
  title, desc, tags, href, badge, badgeColor, accent, index,
}: (typeof CONTENT.dsa)[0] & { index: number }) {
  return (
    <div className={`group relative border border-white/5 rounded-2xl overflow-hidden bg-gradient-to-br ${accent} hover:border-white/10 transition-all`}>
      <div className="p-5">
        {/* Badge */}
        {badge && (
          <span className={`inline-flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-full border mb-3 ${badgeColor}`}>
            {badge}
          </span>
        )}

        {/* Number + title */}
        <div className="flex items-start gap-3 mb-2">
          <span className="text-xs font-mono text-zinc-700 mt-0.5 flex-shrink-0 w-5">
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 className="font-semibold text-sm text-white leading-snug group-hover:text-green-400 transition-colors">
            {title}
          </h3>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed ml-8 mb-4">
          {desc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 ml-8 mb-4">
          {tags.map((tag) => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-zinc-500">
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-8">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-green-500 hover:bg-green-400 text-black px-3 py-1.5 rounded-lg transition-colors"
          >
            Start Learning
            <ArrowRight className="w-3 h-3" />
          </Link>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white px-3 py-1.5 rounded-lg border border-white/5 hover:border-white/15 transition-colors"
          >
            <BarChart2 className="w-3 h-3" />
            Track
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
const STATS = [
  { value: '455+', label: 'DSA Problems', icon: Code2 },
  { value: '50+', label: 'Tutorials', icon: BookOpen },
  { value: '5', label: 'AI Tools', icon: Zap },
  { value: '5K+', label: 'Learners', icon: Target },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function LearnPage() {
  const [activeTab, setActiveTab] = useState<TabId>('dsa');

  const cards = CONTENT[activeTab];

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-green-500 font-medium uppercase tracking-widest mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Structured Learning Paths
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Everything you need to crack your dream job
          </h1>
          <p className="text-zinc-500 mt-2 text-sm sm:text-base max-w-2xl">
            Pick a track, follow the sheet, and use our AI tools to accelerate your preparation — all in one place.
          </p>
        </div>

        {/* ── Stats bar ────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div key={label} className="flex items-center gap-3 border border-white/5 rounded-xl p-3 bg-white/[0.02]">
              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-base font-bold text-white leading-none">{value}</p>
                <p className="text-xs text-zinc-600 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Category tabs ─────────────────────────────────────────────── */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-6 scrollbar-hide">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === id
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                  : 'text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* ── Tab content ──────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <ContentCard key={card.title} {...card} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────────────── */}
        <div className="mt-12 border border-white/5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-green-500/5 to-transparent text-center">
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            Use AI to learn 10x faster
          </h2>
          <p className="text-zinc-500 text-sm mb-5 max-w-md mx-auto">
            Our AI Chat Tutor, Mock Interview, and Code Generator are built specifically to accelerate your preparation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/ai-tools"
              className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Zap className="w-4 h-4" />
              Try AI Tools Free
            </Link>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm px-5 py-2.5 rounded-xl transition-colors"
            >
              Create Free Account
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
