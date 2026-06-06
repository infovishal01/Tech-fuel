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

  return (
    <div className="min-h-screen flex">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-xl flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-green-500 text-black flex items-center justify-center">
            <Zap className="w-3 h-3" />
          </div>
          <span className="text-sm font-bold">
            Tech<span className="text-green-500">Fuel</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-1.5 text-zinc-400 hover:text-white"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-[260px] border-r border-white/5 bg-[#0a0a0c]
          flex flex-col justify-between p-4
          transition-transform duration-200
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          lg:flex
          mt-14 lg:mt-0
        `}
      >
        {/* Top */}
        <div>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-8 px-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-lg font-bold">
                Tech<span className="text-green-500">Fuel</span>
              </h1>
              <p className="text-[10px] text-zinc-600 -mt-0.5">Workspace</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="space-y-0.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
                    ${
                      active
                        ? 'bg-green-500/10 text-green-500'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile */}
        <div className="border border-white/5 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-sm font-bold">
              {session?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {session?.user?.name || 'User'}
              </p>
              <p className="text-xs text-zinc-600 truncate">
                {session?.user?.email}
              </p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-3 w-full flex items-center justify-center gap-2 text-xs text-zinc-500 hover:text-red-400 py-2 rounded-lg hover:bg-red-500/5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <section className="flex-1 mt-14 lg:mt-0 p-4 sm:p-6 lg:p-8 overflow-auto">
        {children}
      </section>
    </div>
  );
}
