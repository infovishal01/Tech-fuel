'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles, Play, CheckCircle2 } from 'lucide-react';

const HIGHLIGHTS = [
  '50+ in-depth tutorials',
  '5 AI-powered tools',
  'Mock interview practice',
  'Career roadmap generator',
];

const TECH_STACK = ['React', 'Node.js', 'Python', 'TypeScript', 'Next.js', 'PostgreSQL', 'Docker', 'AWS'];

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* ── Ambient background ─────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,197,94,0.08),transparent)]" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5 text-green-400 text-xs font-medium mb-8 hover:border-green-500/40 transition-colors cursor-default">
            <Sparkles className="w-3.5 h-3.5" />
            AI-Powered Learning Platform for Developers
            <span className="bg-green-500/20 text-green-300 px-1.5 py-0.5 rounded-full text-[10px]">
              NEW
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.07] mb-6">
            Master Tech Skills
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500">
              Fuel Your Career
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl leading-relaxed mb-10">
            Learn DSA, system design, and backend development through structured
            tutorials — then supercharge your preparation with AI tools built
            for developers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-12">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black px-7 py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-[0_0_24px_rgba(34,197,94,0.4)]"
            >
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/tutorials"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm font-medium transition-colors"
            >
              <Play className="w-4 h-4 text-green-500" />
              Browse Tutorials
            </Link>
          </div>

          {/* Highlight checklist */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {HIGHLIGHTS.map((item) => (
              <div
                key={item}
                className="flex items-center gap-1.5 text-sm text-zinc-400"
              >
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* ── Stats row ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5 max-w-3xl mx-auto">
          {[
            { value: '50+', label: 'Tutorials' },
            { value: '5K+', label: 'Learners' },
            { value: '5', label: 'AI Tools' },
            { value: '100%', label: 'Free to start' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center py-6 px-4 bg-[#09090b] hover:bg-white/[0.02] transition-colors"
            >
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-xs text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ── Tech stack ticker ─────────────────────────────────────────── */}
        <div className="mt-14 text-center">
          <p className="text-xs text-zinc-600 uppercase tracking-widest mb-5">
            Everything you need to land the job
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {TECH_STACK.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs text-zinc-400 border border-white/5 rounded-full bg-white/[0.02] hover:border-green-500/30 hover:text-white transition-all cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  );
}
