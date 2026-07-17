'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Pages that should have minimal layout
  const minimalPages = ['/login', '/signup', '/admin'];
  const isMinimal = minimalPages.some((page) => pathname?.startsWith(page));

  if (isMinimal) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-900 dark:to-gray-800">
      <Header />
      <div className="flex">
        <Sidebar />
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-6 lg:p-8"
        >
          <div className="max-w-7xl mx-auto w-full">{children}</div>
        </motion.main>
      </div>
      <Footer />
    </div>
  );
}
