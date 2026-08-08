import Link from 'next/link';
import { Zap, Globe, Code2, Share2 } from 'lucide-react';

const FOOTER_LINKS = {
  Learn: [
    { href: '/tutorials', label: 'All Tutorials' },
    { href: '/tutorials?cat=dsa', label: 'DSA Practice' },
    { href: '/tutorials?cat=system-design', label: 'System Design' },
    { href: '/tutorials?cat=core-cs', label: 'Core CS' },
    { href: '/tutorials?cat=backend', label: 'Backend Dev' },
  ],
  'AI Tools': [
    { href: '/ai-tools', label: 'AI Chat' },
    { href: '/dashboard', label: 'Code Generator' },
    { href: '/dashboard', label: 'Mock Interview' },
    { href: '/dashboard', label: 'Roadmap Generator' },
    { href: '/dashboard', label: 'Project Ideas' },
  ],
  Company: [
    { href: '/about', label: 'About' },
    { href: '/about', label: 'Blog' },
    { href: '/about', label: 'Job Prep' },
    {
      href: 'https://github.com/infovishal01/Tech-fuel',
      label: 'GitHub',
      external: true,
    },
    {
      href: 'https://github.com/infovishal01/Tech-fuel/issues',
      label: 'Report Issue',
      external: true,
    },
  ],
  Legal: [
    { href: '/about', label: 'Privacy Policy' },
    { href: '/about', label: 'Terms of Service' },
    { href: '/about', label: 'License' },
  ],
};

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com/infovishal01/Tech-fuel',
    icon: Code2,
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/TechFuelHQ',
    icon: Share2,
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/company/techfuel',
    icon: Globe,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-500 text-black flex items-center justify-center">
                <Zap className="w-4 h-4" />
              </div>
              <span className="text-base font-bold tracking-tight">
                Tech<span className="text-green-500">Fuel</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-[200px]">
              The modern platform for developers learning AI, system design, and
              career skills.
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-white/20 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-white mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={(link as { external?: boolean }).external ? '_blank' : undefined}
                      rel={(link as { external?: boolean }).external ? 'noopener noreferrer' : undefined}
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

        {/* Bottom bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} TechFuel. Built for developers, by
            developers.
          </p>
          <div className="flex items-center gap-1 text-xs text-zinc-600">
            <span>Open source on</span>
            <a
              href="https://github.com/infovishal01/Tech-fuel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
