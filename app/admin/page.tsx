'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

interface Stats {
  success: boolean;
  totalUsers: number;
  totalTutorials: number;
  latestUsers: Array<{ _id: string; name: string; email: string }>;
  latestTutorials: Array<{ _id: string; title: string }>;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handlePublish = async () => {
    try {
      const response = await fetch('/api/tutorials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, content, category: 'AI' }),
      });
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      alert('Tutorial Published Successfully');
      setTitle('');
      setDescription('');
      setContent('');
    } catch (error) {
      console.log(error);
      alert('Something went wrong');
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-20">
          <p className="text-zinc-500">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-1">
            Manage tutorials and users
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Tutorials', value: stats?.totalTutorials || 0 },
            { label: 'Users', value: stats?.totalUsers || 0 },
            { label: 'Monthly Views', value: '48K' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="border border-white/5 rounded-xl p-4 bg-white/[0.02]"
            >
              <p className="text-xs text-zinc-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Create Tutorial */}
        <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
          <h2 className="font-semibold mb-4">Create Tutorial</h2>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Tutorial Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors"
            />
            <input
              type="text"
              placeholder="Tutorial Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors"
            />
            <textarea
              rows={8}
              placeholder="Tutorial Content (Markdown)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors resize-none"
            />
            <button
              onClick={handlePublish}
              className="bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Publish Tutorial
            </button>
          </div>
        </div>

        {/* Recent Users & Tutorials */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
            <h2 className="font-semibold mb-4">Recent Users</h2>
            {stats?.latestUsers?.length > 0 ? (
              <div className="space-y-3">
                {stats.latestUsers.map((user) => (
                  <div
                    key={user._id}
                    className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-xs font-bold">
                      {user.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm">{user.name}</p>
                      <p className="text-xs text-zinc-600">{user.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">No users found</p>
            )}
          </div>

          <div className="border border-white/5 rounded-xl p-6 bg-white/[0.02]">
            <h2 className="font-semibold mb-4">Latest Tutorials</h2>
            {stats?.latestTutorials?.length > 0 ? (
              <div className="space-y-3">
                {stats.latestTutorials.map((tutorial) => (
                  <div
                    key={tutorial._id}
                    className="py-2 border-b border-white/5 last:border-0"
                  >
                    <p className="text-sm font-medium">{tutorial.title}</p>
                    <p className="text-xs text-zinc-600 mt-1">
                      {tutorial.category}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">No tutorials found</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
