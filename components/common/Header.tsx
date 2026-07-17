'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sun, Moon, User, LogIn, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check if user is logged in (simplified - replace with actual auth check)
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Learning', href: '/learning' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'Vlog', href: '/vlog' },
    { name: 'Job Prep', href: '/job-prep' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center"
            >
              <span className="text-white font-bold text-xl">TF</span>
            </motion.div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Tech Fuel
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </motion.button>

            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium flex items-center space-x-1"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 rounded-lg text-sm font-medium flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </motion.button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 rounded-lg text-sm font-medium flex items-center space-x-1"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg rounded-b-lg overflow-hidden"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                >
                  <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </motion.button>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg text-sm font-medium"
                    >
                      Profile
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        localStorage.removeItem('user');
                        setIsLoggedIn(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors duration-200 rounded-lg text-sm font-medium"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200 rounded-lg text-sm font-medium text-center"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
