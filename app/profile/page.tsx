'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import {
  Mail, Shield, Edit3, Save, X, BookOpen,
  Zap, Calendar, CheckCircle2, Loader2,
} from 'lucide-react';

export default function ProfilePage() {
  const { data: session, status } = useSession();

  // Also try localStorage for users who logged in with custom JWT
  const [localUser, setLocalUser] = useState<{ name: string; email: string; role?: string } | null>(null);
  const [editing, setEditing]     = useState(false);
  const [newName, setNewName]     = useState('');
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState('');
  const [savedCount]              = useState(0); // placeholder until real API

  useEffect(() => {
    try {
      const u = localStorage.getItem('user');
      if (u) setLocalUser(JSON.parse(u));
    } catch { /* ignore */ }
  }, []);

  const user = session?.user ?? localUser;
  const displayName  = user?.name  ?? 'Developer';
  const displayEmail = user?.email ?? '';
  const displayRole  = (user as { role?: string })?.role ?? 'student';
  const initials     = displayName.charAt(0).toUpperCase();
  const joinDate     = 'Aug 2026'; // placeholder

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const token = document.cookie.match(/token=([^;]+)/)?.[1];
      await fetch('/api/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name: newName.trim() }),
      });
      // Update localStorage if present
      try {
        const u = localStorage.getItem('user');
        if (u) {
          const parsed = JSON.parse(u);
          localStorage.setItem('user', JSON.stringify({ ...parsed, name: newName.trim() }));
          setLocalUser(p => p ? { ...p, name: newName.trim() } : p);
        }
      } catch { /* ignore */ }
      setToast('Name updated!');
      setTimeout(() => setToast(''), 3000);
    } catch { setToast('Failed to update.'); }
    finally  { setSaving(false); setEditing(false); }
  };

  if (status === 'loading') {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
          <div className="w-16 h-16 rounded-full bg-zinc-900 border border-white/5 flex items-center justify-center">
            <Shield className="w-8 h-8 text-zinc-700" />
          </div>
          <h2 className="text-xl font-semibold">You&apos;re not signed in</h2>
          <p className="text-zinc-500 text-sm">Please log in to view your profile.</p>
          <Link href="/login" className="bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
            Sign in →
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium bg-green-500/10 border border-green-500/20 text-green-400 shadow-xl">
          {toast}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-2xl font-bold mb-8">Your Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* ── Left: identity card ──────────────────────────────────── */}
          <div className="lg:col-span-1">
            <div className="border border-white/5 rounded-2xl p-6 bg-white/[0.02] text-center">
              {/* Avatar */}
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt={displayName} className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-green-500/30" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-black flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {initials}
                </div>
              )}

              {/* Name with edit */}
              {editing ? (
                <div className="flex items-center gap-2 justify-center mb-1">
                  <input
                    value={newName}
                    onChange={e => setNewName(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSaveName()}
                    autoFocus
                    className="bg-black border border-white/10 rounded-lg px-2 py-1 text-sm text-white outline-none focus:border-green-500 text-center w-36"
                  />
                  <button onClick={handleSaveName} disabled={saving} className="p-1 text-green-400 hover:text-green-300">
                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setEditing(false)} className="p-1 text-zinc-500 hover:text-white"><X className="w-4 h-4" /></button>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h2 className="text-lg font-bold">{displayName}</h2>
                  <button onClick={() => { setNewName(displayName); setEditing(true); }} className="p-1 text-zinc-600 hover:text-white transition-colors">
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-sm text-zinc-500 mb-1">
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate text-xs">{displayEmail}</span>
              </div>

              <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium mt-2 ${displayRole === 'admin' ? 'bg-green-500/10 text-green-400' : 'bg-white/5 text-zinc-500'}`}>
                <Shield className="w-3 h-3" />
                {displayRole}
              </span>

              <div className="border-t border-white/5 mt-5 pt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> Joined</span>
                  <span className="text-zinc-400">{joinDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-600 flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> Saved</span>
                  <span className="text-zinc-400">{savedCount} tutorials</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: stats + quick links ────────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Progress stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: 'Tutorials Completed', value: '12', icon: BookOpen, color: 'text-sky-400 bg-sky-400/10' },
                { label: 'Learning Streak', value: '7d 🔥', icon: Zap, color: 'text-orange-400 bg-orange-400/10' },
                { label: 'Problems Solved', value: '34', icon: CheckCircle2, color: 'text-green-400 bg-green-400/10' },
              ].map(s => (
                <div key={s.label} className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 ${s.color}`}><s.icon className="w-4 h-4" /></div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div className="border border-white/5 rounded-xl bg-white/[0.02]">
              <div className="px-5 pt-4 pb-3 border-b border-white/5">
                <h3 className="text-sm font-semibold">Recent Activity</h3>
              </div>
              <div className="divide-y divide-white/5">
                {[
                  { action: 'Completed', item: 'Master ChatGPT Prompts', time: '2 hours ago', color: 'text-green-400' },
                  { action: 'Started', item: 'Build with Next.js 16', time: '5 hours ago', color: 'text-sky-400' },
                  { action: 'Practiced', item: 'System Design Interview', time: '1 day ago', color: 'text-violet-400' },
                ].map((a, i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3">
                    <div>
                      <span className={`text-xs font-medium ${a.color}`}>{a.action}</span>
                      <span className="text-sm text-zinc-400 ml-2">{a.item}</span>
                    </div>
                    <span className="text-xs text-zinc-600">{a.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Browse Tutorials', href: '/tutorials', icon: BookOpen },
                { label: 'AI Tools', href: '/ai-tools', icon: Zap },
              ].map(({ label, href, icon: Icon }) => (
                <Link key={href} href={href}
                  className="flex items-center gap-3 border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                  <div className="w-8 h-8 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
