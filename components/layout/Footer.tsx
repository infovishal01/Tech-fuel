import Link from 'next/link';
import { Zap } from 'lucide-react';

const footerLinks = {
  Platform: [
    { href: '/tutorials', label: 'Tutorials' },
    { href: '/ai-tools', label: 'AI Tools' },
    { href: '/dashboard', label: 'Dashboard' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/about', label: 'Contact' },
    { href: '/about', label: 'Careers' },
  ],
  Legal: [
    { href: '/about', label: 'Privacy' },
    { href: '/about', label: 'Terms' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Tech<span className="text-green-500">Fuel</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-xs">
              The modern platform for learning AI, coding, and building
              future-ready skills.
            </p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-zinc-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} TechFuel. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-xs text-zinc-600 hover:text-white transition-colors"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-xs text-zinc-600 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-xs text-zinc-600 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
