'use client';

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import {
  Target, BookOpen, Users, Zap, Mail, Github,
  Globe, ArrowRight, CheckCircle2, MessageSquare, Send, Loader2,
} from 'lucide-react';

const STATS = [
  { value: '5K+',  label: 'Developers Learning' },
  { value: '50+',  label: 'In-depth Tutorials' },
  { value: '455+', label: 'DSA Problems' },
  { value: '5',    label: 'AI Tools' },
];

const MISSION_CARDS = [
  { icon: Target,   title: 'Our Mission',    desc: 'Make world-class tech education accessible to every developer — from students to senior engineers.' },
  { icon: BookOpen, title: 'What We Build',  desc: 'Structured DSA sheets, system design case studies, core CS notes, and hands-on backend examples.' },
  { icon: Zap,      title: 'AI-Powered',     desc: 'AI chat tutor, code generator, mock interview, roadmap builder — tools built for how developers actually learn.' },
  { icon: Users,    title: 'For Everyone',   desc: 'Whether you are a CS student, a self-taught developer, or prepping for FAANG — TechFuel is for you.' },
];

const TEAM = [
  { name: 'Vishal Kumar', role: 'Founder & Full Stack Developer', initials: 'VK', desc: 'Building TechFuel to make developer education practical and AI-powered.', links: { github: 'https://github.com/infovishal01', linkedin: '#' } },
];

const FAQ = [
  { q: 'Is TechFuel free?',          a: 'Yes — all tutorials, DSA sheets, and core CS notes are completely free. AI tools require an OpenAI API key.' },
  { q: 'Who is TechFuel for?',       a: 'CS students, self-taught developers, and working engineers who want structured learning and AI-powered prep tools.' },
  { q: 'How do I contribute?',       a: 'TechFuel is open source! Submit a PR on GitHub or open an issue to suggest content.' },
  { q: 'Do I need to create an account?', a: 'No — you can browse all tutorials without an account. Sign up to track progress and use AI tools.' },
];

export default function AboutPage() {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending]         = useState(false);
  const [sent, setSent]               = useState(false);
  const [faqOpen, setFaqOpen]         = useState<number | null>(null);

  const handleContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise(r => setTimeout(r, 800)); // simulate send
    setSending(false);
    setSent(true);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs text-green-400 font-medium bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full mb-5">
            <CheckCircle2 className="w-3.5 h-3.5" /> Open source · Free to use
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold leading-tight mb-4">
            Fuel your career with<br />
            <span className="text-green-500">structured learning</span>
          </h1>
          <p className="text-zinc-400 text-base leading-relaxed">
            TechFuel is a free, open-source developer learning platform with DSA sheets, core CS notes, system design cases, and AI-powered prep tools — all in one place.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Link href="/tutorials" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Start Learning <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="https://github.com/infovishal01/Tech-fuel" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm px-5 py-2.5 rounded-xl transition-colors">
              <Github className="w-4 h-4" /> View on GitHub
            </a>
          </div>
        </div>

        {/* ── Stats ─────────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {STATS.map(s => (
            <div key={s.label} className="text-center border border-white/5 rounded-2xl p-5 bg-white/[0.02]">
              <p className="text-3xl font-extrabold text-green-400">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ── Mission ───────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">Why we built TechFuel</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MISSION_CARDS.map(c => (
              <div key={c.title} className="border border-white/5 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center mb-4">
                  <c.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold mb-1.5">{c.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Team ──────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">The Team</h2>
          <div className="flex justify-center">
            {TEAM.map(m => (
              <div key={m.name} className="border border-white/5 rounded-2xl p-6 bg-white/[0.02] max-w-sm w-full text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-black flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {m.initials}
                </div>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="text-xs text-green-500 mt-0.5">{m.role}</p>
                <p className="text-sm text-zinc-500 mt-3 leading-relaxed">{m.desc}</p>
                <div className="flex items-center justify-center gap-3 mt-4">
                  <a href={m.links.github} target="_blank" rel="noopener noreferrer"
                    className="p-2 border border-white/10 rounded-lg text-zinc-500 hover:text-white hover:border-white/20 transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={m.links.linkedin} className="p-2 border border-white/10 rounded-lg text-zinc-500 hover:text-white hover:border-white/20 transition-colors">
                    <Globe className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FAQ ───────────────────────────────────────────────────── */}
        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-2 max-w-2xl mx-auto">
            {FAQ.map((f, i) => (
              <div key={i} className="border border-white/5 rounded-xl overflow-hidden">
                <button onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="text-sm font-medium">{f.q}</span>
                  <span className={`text-zinc-500 transition-transform text-lg leading-none ${faqOpen === i ? 'rotate-45' : ''}`}>+</span>
                </button>
                {faqOpen === i && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-zinc-500 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-xl font-bold mb-2">Get in touch</h2>
            <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
              Have a question, suggestion, or want to contribute? We&apos;d love to hear from you.
            </p>
            <div className="space-y-4">
              <a href="mailto:infovishalkumar01@gmail.com" className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center group-hover:bg-green-500/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                infovishalkumar01@gmail.com
              </a>
              <a href="https://github.com/infovishal01/Tech-fuel" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-zinc-400 hover:text-white transition-colors group">
                <div className="w-9 h-9 rounded-xl bg-white/5 text-zinc-400 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                github.com/infovishal01/Tech-fuel
              </a>
              <div className="flex items-center gap-3 text-sm text-zinc-400 group">
                <div className="w-9 h-9 rounded-xl bg-white/5 text-zinc-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                Open an issue on GitHub
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="border border-white/5 rounded-2xl p-6 bg-white/[0.02]">
            {sent ? (
              <div className="h-full flex flex-col items-center justify-center gap-3 text-center py-8">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
                <h3 className="font-semibold">Message sent!</h3>
                <p className="text-sm text-zinc-500">We&apos;ll get back to you as soon as possible.</p>
                <button onClick={() => setSent(false)} className="text-xs text-green-500 hover:text-green-400">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleContact} className="space-y-3">
                <h3 className="font-semibold mb-4">Send us a message</h3>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Your name</label>
                  <input required value={contactForm.name} onChange={e => setContactForm(f => ({ ...f, name: e.target.value }))} placeholder="Vishal Kumar"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-green-500 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Email address</label>
                  <input required type="email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} placeholder="you@example.com"
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-green-500 transition-colors" />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 block mb-1.5">Message</label>
                  <textarea required rows={4} value={contactForm.message} onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))} placeholder="Your message..."
                    className="w-full bg-black border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-green-500 transition-colors resize-none" />
                </div>
                <button type="submit" disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold py-2.5 rounded-xl transition-colors">
                  {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Open source CTA */}
        <div className="border border-white/5 rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-green-500/5 to-transparent text-center">
          <p className="text-xs text-green-500 uppercase tracking-widest font-medium mb-2">Open Source</p>
          <h2 className="text-xl font-bold mb-2">Help us build TechFuel</h2>
          <p className="text-zinc-500 text-sm mb-5 max-w-md mx-auto">Star the repo, report bugs, submit PRs, suggest new content — every contribution makes the platform better for everyone.</p>
          <a href="https://github.com/infovishal01/Tech-fuel" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            <Github className="w-4 h-4" /> Contribute on GitHub
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
