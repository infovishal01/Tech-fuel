import Link from "next/link";
import { ArrowRight, BookOpen, Code, Brain } from "lucide-react";

const tutorials = [
  {
    title: "Master ChatGPT Prompts",
    desc: "Learn advanced prompting techniques to get better results from AI models.",
    icon: Brain,
    category: "AI",
  },
  {
    title: "Build with Next.js 16",
    desc: "Create modern web applications with the latest Next.js features.",
    icon: Code,
    category: "Development",
  },
  {
    title: "AI Tools for Developers",
    desc: "Boost your productivity with AI-powered development tools.",
    icon: BookOpen,
    category: "Productivity",
  },
];

export default function FeaturedTutorials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Featured Tutorials
            </h2>
            <p className="text-zinc-500 mt-2">
              Start learning with our most popular guides
            </p>
          </div>
          <Link
            href="/tutorials"
            className="inline-flex items-center gap-2 text-sm text-green-500 hover:text-green-400 transition-colors"
          >
            View all
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tutorials.map((tutorial) => (
            <Link
              key={tutorial.title}
              href="/tutorials"
              className="group border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <tutorial.icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-zinc-600 uppercase tracking-wider">
                {tutorial.category}
              </span>
              <h3 className="text-lg font-semibold mt-2 group-hover:text-green-400 transition-colors">
                {tutorial.title}
              </h3>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {tutorial.desc}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
