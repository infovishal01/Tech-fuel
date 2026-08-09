'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  MessageSquare,
  FolderKanban,
  User,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  Bell,
  Search,
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

type Props = {
  children: ReactNode;
};

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'AI Chat', href: '/dashboard/chat', icon: MessageSquare },
  { label: 'Projects', href: '/dashboard/projects', icon: FolderKanban },
  { label: 'Profile', href: '/profile', icon: User },
  { label: 'Settings', href: '/settings', icon: Settings },
];

export default function DashboardLayout({ children }: Props) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Derive current page label for topbar breadcrumb
  const currentPage =
    navItems.find((item) => item.href === pathname)?.label ?? 'Dashboard';

  return (
    <div className="min-h-screen bg-[#09090b] flex">

      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-40
          w-64 flex flex-col
          border-r border-white/5 bg-[#0a0a0c]
          transition-transform duration-200 ease-in-out
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:flex
        `}
      >
        {/* Sidebar logo */}
        <div className="h-16 flex items-center px-5 border-b border-white/5 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center flex-shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <p className="text-base font-bold tracking-tight">
                Tech<span className="text-green-500">Fuel</span>
              </p>
              <p className="text-[10px] text-zinc-600 leading-none">Workspace</p>
            </div>
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-green-500/10 text-green-400 shadow-[inset_0_0_0_1px_rgba(34,197,94,0.15)]'
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer — user profile */}
        <div className="p-3 border-t border-white/5 flex-shrink-0">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="w-8 h-8 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">
                {session?.user?.name ?? 'User'}
              </p>
              <p className="text-[10px] text-zinc-600 truncate">
                {session?.user?.email ?? ''}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              title="Sign out"
              className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors rounded-lg hover:bg-red-500/5"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Right panel: topbar + content ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-0">

        {/* Top bar */}
        <header className="h-16 flex-shrink-0 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl flex items-center justify-between px-4 sm:px-6 gap-4 sticky top-0 z-20">
          {/* Left: hamburger (mobile) + page title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-semibold text-white leading-tight">
                {currentPage}
              </h1>
              <p className="text-xs text-zinc-600 leading-none hidden sm:block">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>

          {/* Right: search + bell + avatar */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:flex items-center gap-2 h-9 px-3 rounded-lg bg-white/[0.04] border border-white/8 text-zinc-500 text-sm hover:border-white/15 transition-colors cursor-text">
              <Search className="w-3.5 h-3.5" />
              <span className="text-xs">Search...</span>
              <kbd className="ml-2 text-[10px] border border-white/10 rounded px-1 py-0.5 text-zinc-600">⌘K</kbd>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-green-500 rounded-full" />
            </button>

            {/* Avatar */}
            <div className="w-8 h-8 rounded-full bg-green-500/15 text-green-400 flex items-center justify-center text-xs font-bold border border-green-500/20 cursor-default">
              {session?.user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>

      {/* Close mobile sidebar with X button inside sidebar on mobile */}
      {mobileOpen && (
        <button
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#18181b] border border-white/10 rounded-lg text-zinc-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
