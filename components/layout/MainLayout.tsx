'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Menu,
  X,
  Zap,
  ChevronDown,
  BookOpen,
  Code2,
  Brain,
  LayoutDashboard,
  User,
  LogOut,
  Rss,
  Briefcase,
} from 'lucide-react';
import Footer from './Footer';

// ─── Navigation structure ─────────────────────────────────────────────────────

const LEARN_DROPDOWN = [
  { href: '/tutorials', label: 'All Tutorials', icon: BookOpen, desc: 'Browse all guides' },
  { href: '/tutorials?cat=dsa', label: 'DSA Practice', icon: Code2, desc: 'Data structures & algorithms' },
  { href: '/tutorials?cat=system-design', label: 'System Design', icon: Brain, desc: 'Design scalable systems' },
  { href: '/tutorials?cat=core-cs', label: 'Core CS', icon: BookOpen, desc: 'OS, DBMS, Networks' },
  { href: '/tutorials?cat=backend', label: 'Backend Dev', icon: Code2, desc: 'Node.js, APIs & more' },
];

const AI_DROPDOWN = [
  { href: '/ai-tools', label: 'AI Chat', icon: Brain, desc: 'Ask your AI tutor' },
  { href: '/dashboard#code-gen', label: 'Code Generator', icon: Code2, desc: 'Generate production code' },
  { href: '/dashboard#mock', label: 'Mock Interview', icon: Briefcase, desc: 'Practice interviews with AI' },
  { href: '/dashboard#roadmap', label: 'Roadmap Generator', icon: LayoutDashboard, desc: 'Build your career plan' },
];

const PRIMARY_NAV = [
  { href: '/tutorials', label: 'Learn' },
  { href: '/ai-tools', label: 'AI Tools' },
  { href: '/about', label: 'Blog', icon: Rss },
  { href: '/about', label: 'Job Prep', icon: Briefcase },
];

// ─── Dropdown component ───────────────────────────────────────────────────────

interface DropdownItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  desc: string;
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: DropdownItem[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
        {label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 mt-1 w-64 rounded-xl border border-white/10 bg-[#18181b] shadow-xl z-50 p-1.5">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
              onClick={() => setOpen(false)}
            >
              <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                <item.icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col">
      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#09090b]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Tech<span className="text-green-500">Fuel</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            <NavDropdown label="Learn" items={LEARN_DROPDOWN} />
            <NavDropdown label="AI Tools" items={AI_DROPDOWN} />
            <Link
              href="/about"
              className={`px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 ${
                isActive('/about')
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className={`px-4 py-2 text-sm transition-colors rounded-lg hover:bg-white/5 ${
                isActive('/job-prep')
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Job Prep
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {status === 'loading' ? (
              <div className="w-24 h-9 bg-zinc-800 rounded-lg animate-pulse" />
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors rounded-lg ${
                    isActive('/dashboard')
                      ? 'text-white bg-white/5'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  Dashboard
                </Link>

                <div className="flex items-center gap-1.5 group relative">
                  {/* Avatar */}
                  {session.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={session.user.image}
                      alt={session.user.name || ''}
                      className="w-8 h-8 rounded-full border border-white/10"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-green-500 text-black flex items-center justify-center text-xs font-bold">
                      {session.user?.name?.charAt(0)?.toUpperCase() ?? 'U'}
                    </div>
                  )}
                  <span className="text-sm text-zinc-300 max-w-[120px] truncate hidden xl:block">
                    {session.user?.name}
                  </span>

                  {/* Hover dropdown */}
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/10 bg-[#18181b] shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 p-1.5">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* ── Mobile Menu ───────────────────────────────────────────────────── */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/5 bg-[#09090b] px-4 py-4 space-y-1">
            <p className="text-xs text-zinc-600 uppercase tracking-widest px-3 pb-1">
              Learn
            </p>
            {LEARN_DROPDOWN.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}

            <div className="pt-2">
              <p className="text-xs text-zinc-600 uppercase tracking-widest px-3 pb-1">
                AI Tools
              </p>
              {AI_DROPDOWN.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <p className="text-xs text-zinc-600 uppercase tracking-widest px-3 pb-1">
                More
              </p>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Rss className="w-4 h-4" />
                Blog
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              >
                <Briefcase className="w-4 h-4" />
                Job Prep
              </Link>
            </div>

            <div className="border-t border-white/5 pt-3 mt-2">
              {session ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm text-zinc-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      signOut({ callbackUrl: '/' });
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded-lg text-left transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-1">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-sm text-center text-zinc-300 border border-white/10 hover:border-white/20 hover:text-white rounded-lg transition-colors"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-2.5 text-sm text-center bg-green-500 hover:bg-green-400 text-black font-semibold rounded-lg transition-colors"
                  >
                    Get Started Free
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* ── Page Content ──────────────────────────────────────────────────── */}
      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
