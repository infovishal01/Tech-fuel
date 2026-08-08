import Link from 'next/link';
import { Bot, Code2, Briefcase, Lightbulb, MapPin, ArrowRight } from 'lucide-react';

interface AITool {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  accentColor: string;
}

const AI_TOOLS: AITool[] = [
  {
    icon: Bot,
    title: 'AI Chat Tutor',
    desc: 'Ask any programming question and get instant, detailed answers with code examples and explanations.',
    href: '/ai-tools',
    accentColor: 'text-green-400 bg-green-400/10',
  },
  {
    icon: Code2,
    title: 'Code Generator',
    desc: 'Describe your project and get production-ready code, folder structure, API design, and deployment guide.',
    href: '/dashboard',
    accentColor: 'text-sky-400 bg-sky-400/10',
  },
  {
    icon: Briefcase,
    title: 'Mock Interview',
    desc: 'Practice with 500+ real interview questions. Get AI feedback on correctness, clarity, and improvements.',
    href: '/dashboard',
    accentColor: 'text-violet-400 bg-violet-400/10',
  },
  {
    icon: MapPin,
    title: 'Roadmap Generator',
    desc: 'Enter your role and experience level. Get a personalised roadmap with milestones and recommended resources.',
    href: '/dashboard',
    accentColor: 'text-orange-400 bg-orange-400/10',
  },
  {
    icon: Lightbulb,
    title: 'Project Ideas',
    desc: 'Tell us your skills. We\'ll suggest projects that close your knowledge gaps and build your portfolio.',
    href: '/dashboard',
    accentColor: 'text-rose-400 bg-rose-400/10',
  },
];

export default function AIUpdates() {
  const [first, ...rest] = AI_TOOLS;

  return (
    <section className="py-20 relative">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-[#0a0a0c] -z-10" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-green-500 font-medium uppercase tracking-widest mb-2">
            Powered by AI
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Your AI-Powered Dev Toolkit
          </h2>
          <p className="text-zinc-500 mt-3 max-w-lg mx-auto text-sm sm:text-base">
            Five tools designed to accelerate how you learn, code, and land
            your next role.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Feature card (spans 5 cols) */}
          <Link
            href={first.href}
            className="group md:col-span-5 flex flex-col border border-white/5 rounded-2xl p-7 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/20 transition-all"
          >
            <div
              className={`w-12 h-12 rounded-xl ${first.accentColor} flex items-center justify-center mb-5`}
            >
              <first.icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold group-hover:text-green-400 transition-colors">
              {first.title}
            </h3>
            <p className="text-sm text-zinc-500 mt-2 leading-relaxed flex-1">
              {first.desc}
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-sm text-green-500 font-medium">
              Try it now
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>

          {/* Right column (4 smaller cards) */}
          <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rest.map((tool) => (
              <Link
                key={tool.title}
                href={tool.href}
                className="group flex flex-col border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
              >
                <div
                  className={`w-9 h-9 rounded-lg ${tool.accentColor} flex items-center justify-center mb-3`}
                >
                  <tool.icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold group-hover:text-white transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/ai-tools"
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm px-6 py-2.5 rounded-xl transition-colors"
          >
            Explore all AI tools
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
