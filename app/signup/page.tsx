'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Zap, Mail, Lock, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [name, setName]         = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed]     = useState(false);
  const [loading, setLoading]   = useState(false);
  const [oauthLoading, setOauthLoading] = useState(false);
  const [error, setError]       = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { setError('Please agree to the Terms of Service.'); return; }
    setLoading(true); setError('');
    try {
      const res  = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.message || 'Signup failed'); return; }
      router.push('/login?registered=1');
    } catch { setError('Something went wrong. Please try again.'); }
    finally   { setLoading(false); }
  };

  const handleGoogle = async () => {
    setOauthLoading(true);
    await signIn('google', { callbackUrl: '/dashboard' });
  };

  return (
    <div className="min-h-screen flex bg-[#09090b]">
      {/* Branding panel */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-green-500/8 via-[#09090b] to-[#09090b] border-r border-white/5">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-green-500 text-black flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">Tech<span className="text-green-500">Fuel</span></span>
        </Link>

        <div>
          <div className="inline-flex items-center gap-2 text-xs text-green-400 font-medium bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded-full mb-6">
            <CheckCircle2 className="w-3.5 h-3.5" /> Free forever — no credit card needed
          </div>
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Join <span className="text-green-500">5,000+</span><br />
            developers already<br />
            levelling up
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed">
            Get instant access to DSA sheets, system design case studies, Core CS notes, and 5 AI-powered learning tools.
          </p>
        </div>

        <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-bold">R</div>
            <div>
              <p className="text-xs font-semibold">Rahul S.</p>
              <p className="text-[10px] text-zinc-600">Got placed at Flipkart</p>
            </div>
          </div>
          <p className="text-xs text-zinc-400 italic">&ldquo;TechFuel&apos;s DSA sheet + mock interview AI got me placed in 3 months. Best decision ever.&rdquo;</p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="flex items-center gap-2 mb-10 lg:hidden">
          <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <span className="text-lg font-bold">Tech<span className="text-green-500">Fuel</span></span>
        </Link>

        <div className="w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-1">Create your account</h1>
          <p className="text-sm text-zinc-500 mb-7">Start learning for free today.</p>

          {/* Google */}
          <button onClick={handleGoogle} disabled={oauthLoading}
            className="w-full flex items-center justify-center gap-3 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.06] text-white text-sm font-medium py-3 rounded-xl transition-all mb-4 disabled:opacity-60">
            {oauthLoading
              ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>}
            {oauthLoading ? 'Redirecting...' : 'Sign up with Google'}
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px bg-white/8" />
            <span className="text-xs text-zinc-600">or with email</span>
            <div className="flex-1 h-px bg-white/8" />
          </div>

          {error && (
            <div className="mb-4 border border-red-500/20 bg-red-500/5 text-red-400 text-sm px-4 py-3 rounded-xl">{error}</div>
          )}

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Full name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="text" required value={name} onChange={e => setName(e.target.value)} placeholder="Vishal Kumar"
                  className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 mb-1.5">Password <span className="text-zinc-700">(min. 8 characters)</span></label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                <input type="password" required minLength={8} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-700 outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-green-500 flex-shrink-0" />
              <span className="text-xs text-zinc-500">
                I agree to the <Link href="/about" className="text-green-500 hover:text-green-400">Terms of Service</Link> and <Link href="/about" className="text-green-500 hover:text-green-400">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black py-3 rounded-xl text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
              {loading
                ? <><div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Creating account...</>
                : <>Create account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="text-center text-sm text-zinc-600 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-green-500 hover:text-green-400 font-medium transition-colors">Sign in →</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
