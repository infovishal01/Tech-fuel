import { Bot, Code, Briefcase, Lightbulb } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Chat',
    desc: 'Get instant answers and code explanations from our AI assistant.',
  },
  {
    icon: Code,
    title: 'Code Generator',
    desc: 'Generate production-ready code in any language or framework.',
  },
  {
    icon: Briefcase,
    title: 'Mock Interviews',
    desc: 'Practice technical interviews with AI-powered feedback.',
  },
  {
    icon: Lightbulb,
    title: 'Project Ideas',
    desc: 'Get personalized project suggestions to build your portfolio.',
  },
];

export default function AIUpdates() {
  return (
    <section className="py-20 border-y border-white/5 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">AI-Powered Tools</h2>
          <p className="text-zinc-500 mt-2 max-w-lg mx-auto">
            Supercharge your development workflow with our suite of AI tools
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/20 transition-all"
            >
              <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
