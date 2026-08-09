'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import {
  BookOpen,
  Bot,
  FolderKanban,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Code2,
  Brain,
  Flame,
} from 'lucide-react';

const stats = [
  {
    label: 'Tutorials Completed',
    value: '12',
    icon: BookOpen,
    change: '+3 this week',
    changePositive: true,
    accent: 'text-sky-400 bg-sky-400/10',
  },
  {
    label: 'AI Chats',
    value: '48',
    icon: Bot,
    change: '+8 today',
    changePositive: true,
    accent: 'text-violet-400 bg-violet-400/10',
  },
  {
    label: 'Projects',
    value: '5',
    icon: FolderKanban,
    change: '2 in progress',
    changePositive: true,
    accent: 'text-orange-400 bg-orange-400/10',
  },
  {
    label: 'Learning Streak',
    value: '7d',
    icon: Flame,
    change: 'Keep it up!',
    changePositive: true,
    accent: 'text-green-400 bg-green-400/10',
  },
];

const recentActivity = [
  {
    action: 'Completed',
    item: 'Master ChatGPT Prompts',
    time: '2 hours ago',
    icon: CheckCircle2,
    color: 'text-green-400',
  },
  {
    action: 'Started',
    item: 'Build with Next.js 16',
    time: '5 hours ago',
    icon: PlayCircle,
    color: 'text-sky-400',
  },
  {
    action: 'Generated',
    item: 'REST API boilerplate',
    time: '1 day ago',
    icon: Code2,
    color: 'text-violet-400',
  },
  {
    action: 'Practiced',
    item: 'System Design Interview',
    time: '2 days ago',
    icon: Brain,
    color: 'text-orange-400',
  },
];

const quickActions = [
  { label: 'Continue Learning', desc: 'Pick up where you left off', href: '/tutorials', icon: BookOpen },
  { label: 'Ask AI Tutor', desc: 'Get instant code help', href: '/ai-tools', icon: Bot },
  { label: 'Mock Interview', desc: 'Practice with AI feedback', href: '/dashboard', icon: Brain },
  { label: 'Generate Code', desc: 'Scaffold your next project', href: '/dashboard', icon: Code2 },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* ── Welcome banner ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border border-white/5 rounded-2xl p-6 mb-6 bg-gradient-to-br from-green-500/5 via-transparent to-transparent">
        <div className="absolute right-0 top-0 w-64 h-32 bg-green-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs text-green-500 font-medium uppercase tracking-widest mb-1">
              Good morning 👋
            </p>
            <h2 className="text-xl font-bold text-white">
              Welcome back to your workspace
            </h2>
            <p className="text-sm text-zinc-500 mt-1">
              You&apos;re on a <span className="text-green-400 font-medium">7-day streak</span> — keep the momentum going!
            </p>
          </div>
          <a
            href="/tutorials"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] whitespace-nowrap"
          >
            Continue Learning
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* ── Stats grid ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500 leading-tight">{stat.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${stat.accent}`}>
                <stat.icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
            <p className="text-xs text-green-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* ── Bottom row: activity + quick actions ───────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

        {/* Recent Activity — 3 cols */}
        <div className="lg:col-span-3 border border-white/5 rounded-xl bg-white/[0.02]">
          <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Recent Activity</h3>
            <span className="text-xs text-zinc-600">Last 7 days</span>
          </div>
          <div className="divide-y divide-white/5">
            {recentActivity.map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
              >
                <div className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 ${activity.color}`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{activity.item}</p>
                  <p className={`text-xs font-medium ${activity.color}`}>{activity.action}</p>
                </div>
                <span className="text-xs text-zinc-600 whitespace-nowrap flex-shrink-0">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
          <div className="px-5 py-3 border-t border-white/5">
            <button className="text-xs text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
              View all activity <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Quick Actions — 2 cols */}
        <div className="lg:col-span-2 border border-white/5 rounded-xl bg-white/[0.02]">
          <div className="px-5 pt-4 pb-3 border-b border-white/5">
            <h3 className="text-sm font-semibold text-white">Quick Actions</h3>
          </div>
          <div className="p-3 space-y-2">
            {quickActions.map((action) => (
              <a
                key={action.label}
                href={action.href}
                className="group flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all"
              >
                <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                    {action.label}
                  </p>
                  <p className="text-xs text-zinc-600">{action.desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-green-400 opacity-0 group-hover:opacity-100 transition-all" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Progress section ───────────────────────────────────────────── */}
      <div className="mt-4 border border-white/5 rounded-xl p-5 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Learning Progress</h3>
          <span className="text-xs text-zinc-600">This month</span>
        </div>
        <div className="space-y-3">
          {[
            { label: 'DSA', percent: 68, color: 'bg-sky-500' },
            { label: 'System Design', percent: 45, color: 'bg-violet-500' },
            { label: 'Backend Dev', percent: 80, color: 'bg-green-500' },
            { label: 'Core CS', percent: 30, color: 'bg-orange-500' },
          ].map((track) => (
            <div key={track.label}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-zinc-400">{track.label}</span>
                <span className="text-zinc-600">{track.percent}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${track.color}`}
                  style={{ width: `${track.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
