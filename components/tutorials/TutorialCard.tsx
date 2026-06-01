import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface TutorialCardProps {
  title: string;
  description: string;
  slug: string;
  category: string;
}

export default function TutorialCard({
  title,
  description,
  slug,
  category,
}: TutorialCardProps) {
  return (
    <Link
      href={`/tutorials/${slug}`}
      className="group border border-white/5 rounded-xl p-6 bg-white/[0.02] hover:bg-white/[0.04] hover:border-green-500/20 transition-all block"
    >
      <span className="text-xs text-zinc-600 uppercase tracking-wider">
        {category}
      </span>
      <h3 className="text-lg font-semibold mt-2 group-hover:text-green-400 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-zinc-500 mt-2 leading-relaxed">
        {description}
      </p>
      <div className="flex items-center gap-1 text-sm text-green-500 mt-4 group-hover:gap-2 transition-all">
        Read more
        <ArrowRight className="w-3 h-3" />
      </div>
    </Link>
  );
}
