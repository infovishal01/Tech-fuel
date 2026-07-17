'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  Bot,
  FileText,
  Briefcase,
  Code,
  Database,
  Cpu,
  Users,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';

export default function Sidebar() {
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({
    learning: false,
    ai: false,
    jobPrep: false,
  });

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const learningItems = [
    { name: 'DSA Practice', href: '/learning/dsa', icon: Code },
    { name: 'System Design', href: '/learning/system-design', icon: Cpu },
    { name: 'Core CS', href: '/learning/core-cs', icon: Database },
    { name: 'Backend Dev', href: '/learning/backend-dev', icon: Code },
  ];

  const aiItems = [
    { name: 'AI Chat', href: '/ai-tools/chat', icon: Bot },
    { name: 'Code Generator', href: '/ai-tools/code-generator', icon: Code },
    { name: 'Mock Interview', href: '/ai-tools/mock-interview', icon: Users },
    { name: 'Project Generator', href: '/ai-tools/project-generator', icon: Briefcase },
    { name: 'Career Roadmap', href: '/ai-tools/roadmap', icon: FileText },
  ];

  const jobPrepItems = [
    { name: 'Resume Templates', href: '/job-prep/resume-templates', icon: FileText },
    { name: 'Interview Questions', href: '/job-prep/interview-questions', icon: Briefcase },
    { name: 'Remote Tips', href: '/job-prep/remote-tips', icon: Users },
  ];

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden lg:flex flex-col w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 sticky top-0"
    >
      <div className="p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          Navigation
        </h2>

        {/* Dashboard */}
        <Link
          href="/dashboard"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 mb-2"
        >
          <LayoutDashboard size={20} />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* Learning Section */}
        <div className="mb-2">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            onClick={() => toggleMenu('learning')}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <BookOpen size={20} />
              <span className="font-medium">Learning Modules</span>
            </div>
            {expandedMenus.learning ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </motion.button>

          {expandedMenus.learning && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-7 space-y-1 overflow-hidden"
            >
              {learningItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* AI Tools Section */}
        <div className="mb-2">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            onClick={() => toggleMenu('ai')}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Bot size={20} />
              <span className="font-medium">AI Tools</span>
            </div>
            {expandedMenus.ai ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </motion.button>

          {expandedMenus.ai && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-7 space-y-1 overflow-hidden"
            >
              {aiItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* Job Prep Section */}
        <div className="mb-2">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
            onClick={() => toggleMenu('jobPrep')}
            className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center space-x-3">
              <Briefcase size={20} />
              <span className="font-medium">Job Preparation</span>
            </div>
            {expandedMenus.jobPrep ? (
              <ChevronDown size={20} />
            ) : (
              <ChevronRight size={20} />
            )}
          </motion.button>

          {expandedMenus.jobPrep && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="pl-7 space-y-1 overflow-hidden"
            >
              {jobPrepItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </div>

        {/* Vlog */}
        <Link
          href="/vlog"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200 mb-2"
        >
          <FileText size={20} />
          <span className="font-medium">Vlog & Blog</span>
        </Link>

        {/* Admin */}
        <Link
          href="/admin"
          className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg transition-colors duration-200"
        >
          <Users size={20} />
          <span className="font-medium">Admin Panel</span>
        </Link>
      </div>

      <div className="mt-auto p-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl text-white text-center"
        >
          <p className="text-xs font-medium mb-1">Tech Fuel</p>
          <p className="text-2xl font-bold">2.0</p>
          <p className="text-xs mt-1 opacity-90">Learning Platform</p>
        </motion.div>
      </div>
    </motion.aside>
  );
}
