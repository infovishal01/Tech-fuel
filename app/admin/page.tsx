'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import {
  BookOpen, Users, Code2, Brain, Layers, Server,
  TrendingUp, ArrowRight, Plus, Eye, Edit3, Zap,
} from 'lucide-react';

interface StatsData {
  totalUsers: number;
  totalTutorials: number;
  latestUsers: Array<{ _id: string; name: string; email: string; role: string; createdAt: string }>;
  latestTutorials: Array<{ _id: string; title: string; category: string; createdAt: string }>;
}

const QUICK_LINKS = [
  { label: 'Add Tutorial',    href: '/admin/tutorials',     icon: BookOpen, color: 'text-sky-400    bg-sky-400/10' },
  { label: 'Add DSA Problem', href: '/admin/dsa',          icon: Code2,    color: 'text-green-400  bg-green-400/10' },
  { label: 'Add Core CS Note',href: '/admin/core-cs',      icon: Brain,    color: 'text-violet-400 bg-violet-400/10' },
  { label: 'Add System Design',href: '/admin/system-design',icon: Layers,  color: 'text-orange-400 bg-orange-400/10' },
  { label: 'Manage Users',    href: '/admin/users',         icon: Users,    color: 'text-rose-400   bg-rose-400/10' },
  { label: 'Add Backend',     href: '/admin/backend',       icon: Server,   color: 'text-amber-400  bg-amber-400/10' },
];

export default function AdminOverviewPage() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const STAT_CARDS = [
    { label: 'Total Users',     value: data?.totalUsers ?? '—',     icon: Users,       color: 'text-sky-400    bg-sky-400/10',     trend: '+12 this week' },
    { label: 'Tutorials',       value: data?.totalTutorials ?? '—', icon: BookOpen,    color: 'text-green-400  bg-green-400/10',   trend: 'Active' },
    { label: 'DSA Problems',    value: '455+',                       icon: Code2,       color: 'text-violet-400 bg-violet-400/10',  trend: 'Curated' },
    { label: 'Monthly Views',   value: '48K',                        icon: TrendingUp,  color: 'text-orange-400 bg-orange-400/10',  trend: '+18%' },
  ];

  return (
    <AdminLayout>
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-green-500 font-medium uppercase tracking-widest mb-1">Admin Panel</p>
          <h2 className="text-xl font-bold">Good morning 👋 Welcome back</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Here&apos;s what&apos;s happening with TechFuel today.</p>
        </div>
        <Link href="/admin/tutorials" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] whitespace-nowrap">
          <Plus className="w-4 h-4" /> New Content
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STAT_CARDS.map(s => (
          <div key={s.label} className="border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold">{loading ? <span className="skeleton w-12 h-6 block rounded" /> : s.value}</p>
            <p className="text-xs text-green-500 mt-1">{s.trend}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map(({ label, href, icon: Icon, color }) => (
            <Link key={href} href={href}
              className="group flex flex-col items-center gap-2 p-4 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all text-center">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs text-zinc-400 group-hover:text-white transition-colors leading-tight">{label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Users */}
        <div className="border border-white/5 rounded-xl bg-white/[0.02]">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold">Recent Users</h3>
            <Link href="/admin/users" className="text-xs text-green-500 hover:text-green-400 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <div className="skeleton w-8 h-8 rounded-full" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton w-28 h-3 rounded" />
                    <div className="skeleton w-40 h-2 rounded" />
                  </div>
                </div>
              ))
            ) : data?.latestUsers?.length ? data.latestUsers.map(u => (
              <div key={u._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02]">
                <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {u.name?.charAt(0)?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{u.name}</p>
                  <p className="text-xs text-zinc-600 truncate">{u.email}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${u.role === 'admin' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-zinc-500'}`}>
                  {u.role}
                </span>
              </div>
            )) : (
              <p className="px-5 py-4 text-sm text-zinc-600">No users yet.</p>
            )}
          </div>
        </div>

        {/* Recent Tutorials */}
        <div className="border border-white/5 rounded-xl bg-white/[0.02]">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold">Latest Tutorials</h3>
            <Link href="/admin/tutorials" className="text-xs text-green-500 hover:text-green-400 flex items-center gap-1">View all <ArrowRight className="w-3 h-3" /></Link>
          </div>
          <div className="divide-y divide-white/5">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 px-5 py-3">
                  <div className="skeleton w-8 h-8 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <div className="skeleton w-36 h-3 rounded" />
                    <div className="skeleton w-20 h-2 rounded" />
                  </div>
                </div>
              ))
            ) : data?.latestTutorials?.length ? data.latestTutorials.map(t => (
              <div key={t._id} className="flex items-center gap-3 px-5 py-3 hover:bg-white/[0.02]">
                <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{t.title}</p>
                  <p className="text-xs text-zinc-600">{t.category}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-zinc-600 hover:text-white rounded-lg hover:bg-white/5 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
                  <button className="p-1.5 text-zinc-600 hover:text-green-400 rounded-lg hover:bg-white/5 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
            )) : (
              <p className="px-5 py-4 text-sm text-zinc-600">No tutorials yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* AI Banner */}
      <div className="mt-4 border border-white/5 rounded-xl p-5 bg-gradient-to-r from-green-500/5 to-transparent flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold">AI Content Generator</p>
            <p className="text-xs text-zinc-500">Use AI to auto-generate tutorial content, DSA explanations, and notes.</p>
          </div>
        </div>
        <Link href="/dashboard" className="hidden sm:flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-xs font-semibold px-4 py-2 rounded-lg transition-colors whitespace-nowrap">
          Open AI Tools <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </AdminLayout>
  );
}
