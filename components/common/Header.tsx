'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User, LogIn, LogOut } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'AI Tools', href: '/ai-tools' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090b]/90 backdrop-blur-lg border-b border-white/5 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
              <span className="text-black font-bold text-xl">TF</span>
            </div>
            <span className="text-xl font-bold text-white">Tech Fuel</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm font-medium flex items-center space-x-1"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    setIsLoggedIn(false);
                  }}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors rounded-lg text-sm font-medium flex items-center space-x-1"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-green-500 hover:bg-green-400 text-black transition-colors rounded-lg text-sm font-medium flex items-center space-x-1"
              >
                <LogIn size={16} />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#09090b] border-t border-white/5 rounded-b-lg overflow-hidden">
            <div className="px-4 py-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-2 border-t border-white/5">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-zinc-400 hover:text-white transition-colors rounded-lg hover:bg-white/5 text-sm font-medium"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        localStorage.removeItem('user');
                        setIsLoggedIn(false);
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 bg-red-500 hover:bg-red-600 text-white transition-colors rounded-lg text-sm font-medium mt-2"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-2 bg-green-500 hover:bg-green-400 text-black transition-colors rounded-lg text-sm font-medium text-center"
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
