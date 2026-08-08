import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rahul Sharma',
    role: 'Frontend Developer',
    company: 'Startup',
    avatar: 'RS',
    rating: 5,
    text: 'Tech Fuel is the most practical learning platform I\'ve found. The AI chat tutor helped me understand complex React patterns in minutes, not hours.',
  },
  {
    name: 'Anjali Patel',
    role: 'CS Final Year Student',
    company: 'IIT',
    avatar: 'AP',
    rating: 5,
    text: 'The mock interview feature is incredible. It gave me real feedback on my DSA answers and helped me spot weak points before my campus placements.',
  },
  {
    name: 'Amit Kumar',
    role: 'Full Stack Developer',
    company: 'Mid-stage SaaS',
    avatar: 'AK',
    rating: 5,
    text: 'Code Generator alone saves me 2–3 hours a week. I describe a feature and get a production-ready implementation with folder structure and tests.',
  },
  {
    name: 'Priya Singh',
    role: 'SDE-2',
    company: 'E-commerce Co.',
    avatar: 'PS',
    rating: 5,
    text: 'The system design tutorials are the best I\'ve read. Clear diagrams, real-world constraints, and structured walk-throughs that actually prepare you for interviews.',
  },
  {
    name: 'Arjun Mehta',
    role: 'Backend Engineer',
    company: 'Fintech',
    avatar: 'AM',
    rating: 5,
    text: 'Went from zero to hired in 3 months. The career roadmap told me exactly what to study, and the tutorials covered each topic thoroughly.',
  },
  {
    name: 'Kavya Reddy',
    role: 'DevOps Engineer',
    company: 'Cloud Company',
    avatar: 'KR',
    rating: 5,
    text: 'Finally a platform that treats developers as professionals. The content quality and depth is something you\'d pay hundreds for on other platforms.',
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs text-green-500 font-medium uppercase tracking-widest mb-2">
            Community
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold">
            Loved by Developers
          </h2>
          <p className="text-zinc-500 mt-3 max-w-md mx-auto text-sm sm:text-base">
            Join thousands of developers who&apos;ve accelerated their careers
            with Tech Fuel.
          </p>
        </div>

        {/* Rating summary */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
            ))}
          </div>
          <span className="text-sm text-zinc-400">
            <span className="text-white font-semibold">4.9 / 5</span> from 500+ developers
          </span>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
            >
              {/* Quote icon */}
              <Quote className="w-5 h-5 text-green-500/40 mb-3" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-green-500 text-green-500" />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {t.name}
                  </p>
                  <p className="text-xs text-zinc-600 truncate">
                    {t.role} · {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
