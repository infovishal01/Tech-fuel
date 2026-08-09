'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard, BookOpen, Bot, Briefcase,
  Code2, Layers, Brain, ChevronDown, Shield,
} from 'lucide-react';

interface NavGroup {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: { name: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Learning',
    icon:  BookOpen,
    children: [
      { name: 'DSA Practice',    href: '/tutorials?cat=dsa',           icon: Code2 },
      { name: 'System Design',   href: '/tutorials?cat=system-design', icon: Layers },
      { name: 'Core CS',         href: '/tutorials?cat=core-cs',       icon: Brain },
      { name: 'Backend Dev',     href: '/tutorials?cat=backend',       icon: Code2 },
    ],
  },
  {
    label: 'AI Tools',
    icon:  Bot,
    children: [
      { name: 'AI Chat',         href: '/ai-tools',    icon: Bot },
      { name: 'Code Generator',  href: '/ai-tools',    icon: Code2 },
      { name: 'Mock Interview',  href: '/ai-tools',    icon: Brain },
      { name: 'Career Roadmap',  href: '/ai-tools',    icon: Layers },
    ],
  },
  {
    label: 'Job Prep',
    icon:  Briefcase,
    children: [
      { name: 'Interview Guide', href: '/tutorials', icon: Briefcase },
      { name: 'Resume Tips',     href: '/tutorials', icon: BookOpen },
      { name: 'Top 50 Qs',       href: '/tutorials', icon: Code2 },
    ],
  },
];

export default function Sidebar() {
  const pathname  = usePathname();
  const [open, setOpen] = useState<Record<string, boolean>>({ Learning: true });

  const toggle = (label: string) =>
    setOpen(prev => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen bg-[#0a0a0c] border-r border-white/5 sticky top-0 overflow-y-auto">
      <div className="p-4">
        {/* Dashboard link */}
        <Link href="/dashboard"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mb-3 transition-colors ${
            pathname === '/dashboard'
              ? 'bg-green-500/10 text-green-400'
              : 'text-zinc-500 hover:text-white hover:bg-white/5'
          }`}>
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </Link>

        {/* Grouped nav */}
        {NAV_GROUPS.map(({ label, icon: Icon, children }) => (
          <div key={label} className="mb-1">
            <button
              onClick={() => toggle(label)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-zinc-500 hover:text-white hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {label}
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open[label] ? 'rotate-180' : ''}`} />
            </button>

            {open[label] && (
              <div className="pl-7 mt-0.5 space-y-0.5">
                {children.map(item => {
                  const active = pathname === item.href || pathname.startsWith(item.href + '?');
                  return (
                    <Link key={item.name} href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs transition-colors ${
                        active ? 'text-green-400 bg-green-500/5' : 'text-zinc-600 hover:text-white hover:bg-white/5'
                      }`}>
                      <item.icon className="w-3.5 h-3.5" />
                      {item.name}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* Admin link */}
        <Link href="/admin"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium mt-3 transition-colors ${
            pathname.startsWith('/admin')
              ? 'bg-green-500/10 text-green-400'
              : 'text-zinc-500 hover:text-white hover:bg-white/5'
          }`}>
          <Shield className="w-4 h-4" />
          Admin Panel
        </Link>
      </div>

      {/* Bottom badge */}
      <div className="mt-auto p-4">
        <div className="border border-green-500/15 rounded-xl p-3 bg-green-500/5 text-center">
          <p className="text-xs text-green-400 font-semibold">TechFuel v2.0</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">AI Learning Platform</p>
        </div>
      </div>
    </aside>
  );
}
