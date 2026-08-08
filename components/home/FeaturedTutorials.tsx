import Link from 'next/link';
import { ArrowRight, Clock, Tag } from 'lucide-react';

interface Tutorial {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  href: string;
  badge?: string;
  badgeColor?: string;
}

const TUTORIALS: Tutorial[] = [
  {
    title: 'Master ChatGPT Prompts for Developers',
    excerpt:
      'Learn advanced prompting techniques to get production-quality code, documentation, and architecture decisions from AI.',
    category: 'AI',
    readTime: '8 min',
    href: '/tutorials/chatgpt-prompts',
    badge: 'Popular',
    badgeColor: 'text-green-400 bg-green-400/10 border-green-400/20',
  },
  {
    title: 'Build a REST API with Node.js & MongoDB',
    excerpt:
      'Hands-on guide to building a production-ready CRUD API with authentication, validation, and proper error handling.',
    category: 'Backend',
    readTime: '12 min',
    href: '/tutorials',
    badge: 'New',
    badgeColor: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  },
  {
    title: 'Two Sum — DSA Problem Breakdown',
    excerpt:
      'Deep-dive into the classic interview problem — brute force, hash map solution, complexity analysis, and follow-ups.',
    category: 'DSA',
    readTime: '6 min',
    href: '/tutorials',
  },
  {
    title: 'Design a URL Shortener (TinyURL)',
    excerpt:
      'System design case study — capacity estimation, data model, API design, and scaling to millions of requests.',
    category: 'System Design',
    readTime: '15 min',
    href: '/tutorials',
    badge: 'Featured',
    badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  },
  {
    title: 'OS Fundamentals: Processes & Threads',
    excerpt:
      'Everything you need to know about process management, context switching, and concurrency for FAANG interviews.',
    category: 'Core CS',
    readTime: '10 min',
    href: '/tutorials',
  },
  {
    title: 'Database Normalization (1NF → BCNF)',
    excerpt:
      'Understand normal forms step-by-step with practical examples and when to denormalize for performance.',
    category: 'DBMS',
    readTime: '9 min',
    href: '/tutorials',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  AI:            'text-emerald-400 bg-emerald-400/8',
  Backend:       'text-sky-400    bg-sky-400/8',
  DSA:           'text-orange-400 bg-orange-400/8',
  'System Design':'text-violet-400 bg-violet-400/8',
  'Core CS':     'text-rose-400   bg-rose-400/8',
  DBMS:          'text-amber-400  bg-amber-400/8',
};

export default function FeaturedTutorials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <p className="text-xs text-green-500 font-medium uppercase tracking-widest mb-2">
              Curated Learning
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Featured Tutorials
            </h2>
            <p className="text-zinc-500 mt-2 text-sm sm:text-base max-w-lg">
              Structured guides crafted for developers preparing for
              interviews and levelling up their skills.
            </p>
          </div>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-1.5 text-sm text-green-500 hover:text-green-400 transition-colors whitespace-nowrap"
          >
            View all tutorials
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Tutorial grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TUTORIALS.map((tutorial) => (
            <Link
              key={tutorial.title}
              href={tutorial.href}
              className="group relative flex flex-col border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              {/* Top row: category + badge */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    CATEGORY_COLORS[tutorial.category] ??
                    'text-zinc-400 bg-zinc-400/10'
                  }`}
                >
                  {tutorial.category}
                </span>
                {tutorial.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${tutorial.badgeColor}`}
                  >
                    {tutorial.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-sm leading-snug group-hover:text-green-400 transition-colors line-clamp-2">
                {tutorial.title}
              </h3>

              {/* Excerpt */}
              <p className="text-xs text-zinc-500 mt-2 leading-relaxed line-clamp-3 flex-1">
                {tutorial.excerpt}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1 text-xs text-zinc-600">
                  <Clock className="w-3 h-3" />
                  {tutorial.readTime} read
                </div>
                <span className="text-xs text-green-500 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Read more <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            <Tag className="w-4 h-4" />
            Browse all categories
          </Link>
        </div>
      </div>
    </section>
  );
}
