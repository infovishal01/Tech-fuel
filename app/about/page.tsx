"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Target, BookOpen, Users, Zap } from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Our Mission",
    desc: "Make AI and technology learning accessible to everyone, regardless of their background or experience level.",
  },
  {
    icon: BookOpen,
    title: "What We Teach",
    desc: "Practical AI tools, coding skills, prompt engineering, and modern development workflows.",
  },
  {
    icon: Users,
    title: "Who It's For",
    desc: "Students, developers, creators, and anyone who wants to build future-ready skills with AI.",
  },
  {
    icon: Zap,
    title: "Why Tech Fuel",
    desc: "Learn by doing with hands-on tutorials, AI-powered tools, and a supportive community.",
  },
];

const audience = [
  { emoji: "🎓", label: "Students" },
  { emoji: "💻", label: "Developers" },
  { emoji: "🎨", label: "Creators" },
  { emoji: "📈", label: "Businesses" },
  { emoji: "🚀", label: "Beginners" },
];

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            Fueling the Future with{" "}
            <span className="text-green-500">AI</span>
          </h1>
          <p className="text-zinc-500 text-lg mt-4 leading-relaxed">
            Tech Fuel is a modern learning platform helping students,
            developers, creators, and beginners learn AI tools, coding, and
            future technology through practical guides.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
          {values.map((value) => (
            <div
              key={value.title}
              className="border border-white/5 rounded-xl p-6 bg-white/[0.02]"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <value.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-lg">{value.title}</h3>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Audience */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-8">Built for Every Learner</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {audience.map((item) => (
              <div
                key={item.label}
                className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-lg bg-white/[0.02] text-sm"
              >
                <span>{item.emoji}</span>
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
