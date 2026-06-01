interface ToolCardProps {
  name: string;
  company: string;
  emoji: string;
  desc: string;
}

export default function ToolCard({ name, company, emoji, desc }: ToolCardProps) {
  return (
    <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/20 transition-all">
      <div className="text-3xl mb-4">{emoji}</div>
      <h3 className="font-semibold">{name}</h3>
      <p className="text-xs text-green-500 mt-1">{company}</p>
      <p className="text-sm text-zinc-500 mt-3 leading-relaxed">{desc}</p>
    </div>
  );
}
