import { Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden border border-white/5 rounded-2xl bg-white/[0.02] p-8 sm:p-12">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-green-500/10 blur-[80px] rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto mb-6">
              <Mail className="w-5 h-5" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold">Stay Updated</h2>
            <p className="text-zinc-500 mt-3 leading-relaxed">
              Get the latest AI tutorials, developer tips, and platform updates
              delivered to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors"
              />
              <button className="bg-green-500 hover:bg-green-400 text-black px-6 py-3 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>

            <p className="text-xs text-zinc-600 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
