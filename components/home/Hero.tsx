import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-500/10 text-green-400 text-sm">
            <Sparkles className="w-4 h-4" />
            AI-Powered Developer Platform
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
          Build Faster
          <br />
          <span className="text-green-500">With AI</span>
        </h1>

        {/* Description */}
        <p className="text-center text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mt-6 leading-relaxed">
          Learn AI tools, generate code, build projects, prepare for interviews,
          and grow as a modern developer — all in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/tutorials"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-zinc-800 hover:border-zinc-700 px-6 py-3 rounded-lg text-zinc-300 hover:text-white transition-colors"
          >
            Explore Tutorials
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16">
          {[
            { value: '50+', label: 'Tutorials' },
            { value: '10+', label: 'AI Tools' },
            { value: '5K+', label: 'Learners' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
