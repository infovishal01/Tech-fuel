'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GitHub, Twitter, LinkedIn, BookOpen, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: 'Home', href: '/' },
      { name: 'Learning', href: '/learning' },
      { name: 'AI Tools', href: '/ai-tools' },
      { name: 'Vlog', href: '/vlog' },
      { name: 'Job Prep', href: '/job-prep' },
    ],
    learning: [
      { name: 'DSA Practice', href: '/learning/dsa' },
      { name: 'System Design', href: '/learning/system-design' },
      { name: 'Core CS', href: '/learning/core-cs' },
      { name: 'Backend Dev', href: '/learning/backend-dev' },
    ],
    ai: [
      { name: 'AI Chat', href: '/ai-tools/chat' },
      { name: 'Code Generator', href: '/ai-tools/code-generator' },
      { name: 'Mock Interview', href: '/ai-tools/mock-interview' },
      { name: 'Project Generator', href: '/ai-tools/project-generator' },
    ],
    resources: [
      { name: 'Documentation', href: 'https://github.com/infovishal01/Tech-fuel' },
      { name: 'GitHub', href: 'https://github.com/infovishal01/Tech-fuel' },
      { name: 'Contributing', href: 'https://github.com/infovishal01/Tech-fuel/blob/main/CONTRIBUTING.md' },
      { name: 'Issues', href: 'https://github.com/infovishal01/Tech-fuel/issues' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'License', href: 'https://github.com/infovishal01/Tech-fuel/blob/main/LICENSE' },
    ],
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Learning
            </h3>
            <ul className="space-y-2">
              {footerLinks.learning.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              AI Tools
            </h3>
            <ul className="space-y-2">
              {footerLinks.ai.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : ''}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mr-4">
                Connect With Us
              </h3>
              <Link
                href="https://github.com/infovishal01/Tech-fuel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <GitHub size={20} />
              </Link>
              <Link
                href="https://twitter.com/TechFuelHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="https://linkedin.com/company/techfuel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <LinkedIn size={20} />
              </Link>
            </div>

            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} Tech Fuel. All rights reserved.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                Made with <Heart size={14} className="inline text-red-500" /> for 
                developers worldwide
              </p>
            </div>
          </div>

          {/* Bottom Note */}
          <div className="mt-8 text-center">
            <motion.p
              whileHover={{ scale: 1.02 }}
              className="text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center space-x-1"
            >
              <BookOpen size={12} />
              <span>
                Check out our{' '}
                <Link
                  href="https://github.com/infovishal01/Tech-fuel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  open-source repository
                </Link>{' '}
                on GitHub
              </span>
            </motion.p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
