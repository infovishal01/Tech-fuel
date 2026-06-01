const tools = [
  { name: "ChatGPT", icon: "🤖" },
  { name: "Claude", icon: "🧠" },
  { name: "Gemini", icon: "✨" },
  { name: "DeepSeek", icon: "🔍" },
  { name: "Perplexity", icon: "🔎" },
  { name: "Midjourney", icon: "🎨" },
];

export default function TrustedTools() {
  return (
    <section className="border-y border-white/5 bg-[#0a0a0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <p className="text-center text-xs text-zinc-600 uppercase tracking-widest mb-8">
          Master the tools shaping the future
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2 px-4 py-2 border border-white/5 rounded-lg bg-white/[0.02] text-zinc-400 hover:text-white hover:border-green-500/30 transition-all text-sm"
            >
              <span>{tool.icon}</span>
              {tool.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
