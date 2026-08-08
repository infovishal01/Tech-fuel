'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

const PERKS = [
  'Weekly curated tutorials & DSA problems',
  'AI tool updates and how-to guides',
  'Interview tips from industry engineers',
  'No spam — unsubscribe any time',
];

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call (wire to a real endpoint / Mailchimp / ConvertKit)
    await new Promise((r) => setTimeout(r, 900));
    setStatus('success');
    setEmail('');
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden border border-white/5 rounded-2xl p-8 sm:p-12">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_80%_at_50%_120%,rgba(34,197,94,0.08),transparent)] pointer-events-none" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-green-500/5 blur-[80px] rounded-full pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="text-center mb-8">
              {/* Icon */}
              <div className="inline-flex w-12 h-12 rounded-xl bg-green-500/10 text-green-500 items-center justify-center mb-5">
                <Mail className="w-5 h-5" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold">
                Stay Ahead of the Curve
              </h2>
              <p className="text-zinc-500 mt-3 text-sm sm:text-base">
                Get weekly tutorials, AI tool updates, and career tips
                delivered straight to your inbox.
              </p>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {PERKS.map((perk) => (
                <div key={perk} className="flex items-center gap-2 text-sm text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                  {perk}
                </div>
              ))}
            </div>

            {/* Form */}
            {status === 'success' ? (
              <div className="flex items-center justify-center gap-2 py-4 text-green-400 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5" />
                You&apos;re on the list! Check your inbox for a confirmation.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="flex-1 relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-black border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black font-semibold text-sm px-6 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] whitespace-nowrap"
                >
                  {status === 'loading' ? (
                    'Subscribing…'
                  ) : (
                    <>
                      Subscribe Free
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-center text-xs text-red-400 mt-3">
                Something went wrong. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
