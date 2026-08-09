import MainLayout from '@/components/layout/MainLayout';
import { getTutorialBySlug } from '@/lib/tutorials';
import { Clock, BookOpen, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function TutorialPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let tutorial;
  try {
    tutorial = getTutorialBySlug(slug);
  } catch {
    notFound();
  }

  const wordCount  = tutorial.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Extract H2/H3 headings for TOC
  const headings = tutorial.content
    .split('\n')
    .filter(line => line.startsWith('## ') || line.startsWith('### '))
    .map(line => ({
      level: line.startsWith('### ') ? 3 : 2,
      text:  line.replace(/^#{2,3}\s+/, ''),
      id:    line.replace(/^#{2,3}\s+/, '').toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    }));

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex gap-10">

          {/* ── Main content ─────────────────────────────────────────── */}
          <article className="flex-1 min-w-0">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-zinc-600 mb-6">
              <Link href="/tutorials" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft className="w-3 h-3" /> Tutorials
              </Link>
              <span>/</span>
              <span className="text-zinc-400">{tutorial.frontmatter.title}</span>
            </nav>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {tutorial.frontmatter.category && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                  {tutorial.frontmatter.category}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <Clock className="w-3.5 h-3.5" /> {readingTime} min read
              </span>
              <span className="flex items-center gap-1.5 text-xs text-zinc-500">
                <BookOpen className="w-3.5 h-3.5" /> {wordCount} words
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
              {tutorial.frontmatter.title}
            </h1>

            {tutorial.frontmatter.description && (
              <p className="text-zinc-400 text-base leading-relaxed border-l-2 border-green-500/40 pl-4 mb-8">
                {tutorial.frontmatter.description}
              </p>
            )}

            <div className="h-px bg-white/5 mb-8" />

            {/* Rendered content */}
            <div className="prose-content">
              {tutorial.content.split('\n').map((line, i) => {
                if (line.startsWith('# '))
                  return <h1 key={i} id={line.replace(/^#\s+/, '').toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-bold mt-8 mb-4">{line.replace(/^#\s+/, '')}</h1>;
                if (line.startsWith('## '))
                  return <h2 key={i} id={line.replace(/^##\s+/, '').toLowerCase().replace(/\s+/g, '-')} className="text-xl font-bold mt-8 mb-3 text-white">{line.replace(/^##\s+/, '')}</h2>;
                if (line.startsWith('### '))
                  return <h3 key={i} id={line.replace(/^###\s+/, '').toLowerCase().replace(/\s+/g, '-')} className="text-base font-semibold mt-6 mb-2 text-white">{line.replace(/^###\s+/, '')}</h3>;
                if (line.startsWith('```'))
                  return <div key={i} className="bg-[#0d0d0f] border border-white/10 rounded-lg px-1 py-0.5 my-1"><code className="text-xs text-green-400 font-mono">{line.replace(/```(\w+)?/, '').replace(/```/, '')}</code></div>;
                if (line.startsWith('- ') || line.startsWith('* '))
                  return <li key={i} className="text-zinc-300 text-sm leading-relaxed ml-4 mb-1 list-disc">{line.replace(/^[-*]\s+/, '')}</li>;
                if (line.match(/^\d+\. /))
                  return <li key={i} className="text-zinc-300 text-sm leading-relaxed ml-4 mb-1 list-decimal">{line.replace(/^\d+\.\s+/, '')}</li>;
                if (line.startsWith('> '))
                  return <blockquote key={i} className="border-l-2 border-green-500/40 pl-4 text-zinc-400 italic text-sm my-3">{line.replace(/^>\s+/, '')}</blockquote>;
                if (line === '')
                  return <div key={i} className="h-3" />;
                return (
                  <p key={i} className="text-zinc-300 text-sm leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{ __html: line
                      .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                      .replace(/\*(.+?)\*/g, '<em class="text-zinc-200">$1</em>')
                      .replace(/`(.+?)`/g, '<code class="bg-white/8 text-green-400 px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
                    }}
                  />
                );
              })}
            </div>

            {/* Nav footer */}
            <div className="mt-12 pt-6 border-t border-white/5 flex items-center justify-between gap-4">
              <Link href="/tutorials" className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors">
                <ArrowLeft className="w-4 h-4" /> All Tutorials
              </Link>
              <Link href="/tutorials" className="flex items-center gap-2 text-sm text-green-500 hover:text-green-400 transition-colors">
                More Tutorials <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* ── Sidebar TOC ──────────────────────────────────────────── */}
          {headings.length > 0 && (
            <aside className="hidden xl:block w-56 flex-shrink-0">
              <div className="sticky top-24">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">On this page</p>
                <nav className="space-y-1">
                  {headings.map(h => (
                    <a key={h.id} href={`#${h.id}`}
                      className={`block text-xs text-zinc-600 hover:text-white transition-colors py-1 border-l-2 border-transparent hover:border-green-500/50 ${h.level === 3 ? 'pl-6' : 'pl-3'}`}>
                      {h.text}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
