import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Frontend Developer",
    text: "Tech Fuel helped me understand AI tools and integrate them into my workflow. The tutorials are practical and easy to follow.",
    rating: 5,
  },
  {
    name: "Anjali Patel",
    role: "CS Student",
    text: "The mock interview feature is amazing. It helped me prepare for my tech interviews and land my first internship.",
    rating: 5,
  },
  {
    name: "Amit Kumar",
    role: "Full Stack Developer",
    text: "Best platform for learning AI and modern development. The code generator saves me hours every week.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold">
            What Our Users Say
          </h2>
          <p className="text-zinc-500 mt-2">
            Join thousands of developers learning with Tech Fuel
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="border border-white/5 rounded-xl p-6 bg-white/[0.02]"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-green-500 text-green-500"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm text-zinc-400 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-xs font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{testimonial.name}</p>
                    <p className="text-xs text-zinc-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
