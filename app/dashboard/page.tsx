'use client';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { BookOpen, Bot, FolderKanban, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Tutorials Completed',
    value: '12',
    icon: BookOpen,
    change: '+3 this week',
  },
  { label: 'AI Chats', value: '48', icon: Bot, change: '+8 today' },
  {
    label: 'Projects',
    value: '5',
    icon: FolderKanban,
    change: '2 in progress',
  },
  {
    label: 'Learning Streak',
    value: '7d',
    icon: TrendingUp,
    change: 'Keep it up!',
  },
];

const recentActivity = [
  { action: 'Completed', item: 'Master ChatGPT Prompts', time: '2 hours ago' },
  { action: 'Started', item: 'Build with Next.js 16', time: '5 hours ago' },
  { action: 'Generated', item: 'REST API boilerplate', time: '1 day ago' },
  { action: 'Practiced', item: 'System Design Interview', time: '2 days ago' },
];

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Welcome back! Here&apos;s your learning overview.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="border border-white/5 rounded-xl p-4 bg-white/[0.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-zinc-500">{stat.label}</span>
              <stat.icon className="w-4 h-4 text-zinc-600" />
            </div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-green-500 mt-1">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
        <h2 className="text-sm font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((activity, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
            >
              <div>
                <span className="text-xs text-green-500 font-medium">
                  {activity.action}
                </span>
                <span className="text-sm text-zinc-400 ml-2">
                  {activity.item}
                </span>
              </div>
              <span className="text-xs text-zinc-600">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
