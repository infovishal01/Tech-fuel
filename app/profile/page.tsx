'use client';

import { useEffect, useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Mail, Shield } from 'lucide-react';

interface User {
  _id?: string;
  name: string;
  email: string;
  role?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load user data from localStorage on mount
    // This is a valid pattern for client-side hydration
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        console.error('Failed to parse user data');
      }
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {!user ? (
          <div className="text-center py-20">
            <p className="text-zinc-500">Please log in to view your profile.</p>
          </div>
        ) : (
          <div className="border border-white/5 rounded-xl bg-white/[0.02] p-8">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-green-500 text-black flex items-center justify-center text-2xl font-bold mb-6">
              {user.name?.charAt(0)?.toUpperCase()}
            </div>

            <h1 className="text-2xl font-bold">{user.name}</h1>

            <div className="flex items-center gap-2 mt-2 text-zinc-500">
              <Mail className="w-4 h-4" />
              <span className="text-sm">{user.email}</span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-sm text-green-500 capitalize">
                {user.role || 'student'}
              </span>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
