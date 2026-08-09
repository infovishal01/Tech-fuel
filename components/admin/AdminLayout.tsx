'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, ReactNode } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  LayoutDashboard, BookOpen, Code2, Brain, Layers, Users,
  Settings, LogOut, Zap, Menu, X, Bell, ChevronRight,
  Shield, Server,
} from 'lucide-react';

const NAV = [
  { label: 'Overview',     href: '/admin',              icon: LayoutDashboard },
  { label: 'Tutorials',    href: '/admin/tutorials',     icon: BookOpen },
  { label: 'DSA Sheets',   href: '/admin/dsa',          icon: Code2 },
  { label: 'Core CS',      href: '/admin/core-cs',      icon: Brain },
  { label: 'System Design',href: '/admin/system-design', icon: Layers },
  { label: 'Backend',      href: '/admin/backend',       icon: Server },
  { label: 'Users',        href: '/admin/users',         icon: Users },
  { label: 'Settings',     href: '/admin/settings',      icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  const current = NAV.find(n => pathname === n.href || pathname.startsWith(n.href + '/'));
  const pageTitle = current?.label ?? 'Admin';

  return (
    <div className="min-h-screen bg-[#09090b] flex text-white">

      {/* Mobile overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
      )}

      {/* ── Sidebar ────────────────────────────────────────────────────── */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 flex flex-col
        border-r border-white/5 bg-[#0a0a0c]
        transition-transform duration-200
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:flex
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center gap-3 px-5 border-b border-white/5 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">Tech<span className="text-green-500">Fuel</span></p>
            <div className="flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-green-500" />
              <p className="text-[10px] text-green-600 font-medium">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          <p className="text-[10px] text-zinc-700 uppercase tracking-widest px-3 pt-2 pb-1">Content</p>
          {NAV.slice(0, 6).map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active ? 'bg-green-500/10 text-green-400 border border-green-500/15' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}

          <p className="text-[10px] text-zinc-700 uppercase tracking-widest px-3 pt-4 pb-1">Management</p>
          {NAV.slice(6).map(({ label, href, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active ? 'bg-green-500/10 text-green-400 border border-green-500/15' : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}>
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        {/* Profile footer */}
        <div className="p-3 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-8 h-8 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{session?.user?.name ?? 'Admin'}</p>
              <p className="text-[10px] text-zinc-600 truncate">{session?.user?.email ?? ''}</p>
            </div>
            <button onClick={() => signOut({ callbackUrl: '/' })} title="Sign out"
              className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5">
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
          <Link href="/" className="mt-2 flex items-center justify-center gap-1.5 text-xs text-zinc-600 hover:text-white transition-colors py-1">
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* ── Right: topbar + content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 sticky top-0 z-20 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 gap-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setOpen(true)} className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold">{pageTitle}</h1>
              <p className="text-xs text-zinc-600 hidden sm:block">Admin · TechFuel</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
            </button>
            <Link href="/" className="hidden sm:flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white border border-white/10 hover:border-white/20 px-3 py-1.5 rounded-lg transition-colors">
              View Site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {open && (
        <button onClick={() => setOpen(false)} className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#18181b] border border-white/10 rounded-lg text-zinc-400 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
