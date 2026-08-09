'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Search, Shield, ShieldOff, Trash2, Users, RefreshCw } from 'lucide-react';

interface User { _id: string; name: string; email: string; role: string; createdAt: string; savedTutorials: string[]; }

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'admin' | 'user'>('all');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 3000); };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/admin/stats');
      const d = await r.json();
      setUsers(d.latestUsers ?? []);
    } catch { setUsers([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchUsers(); }, []);

  const promoteToAdmin = async (id: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    // Optimistic update
    setUsers(us => us.map(u => u._id === id ? { ...u, role: newRole } : u));
    showToast(`User ${newRole === 'admin' ? 'promoted to admin' : 'reverted to user'}`);
  };

  const deleteUser = (id: string) => {
    if (!confirm('Delete this user? This cannot be undone.')) return;
    setUsers(us => us.filter(u => u._id !== id));
    showToast('User deleted');
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase());
    const matchRole = filter === 'all' || u.role === filter;
    return matchSearch && matchRole;
  });

  const adminCount = users.filter(u => u.role === 'admin').length;
  const userCount = users.filter(u => u.role === 'user').length;

  return (
    <AdminLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium bg-green-500/10 border border-green-500/20 text-green-400 shadow-xl">{toast}</div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Users</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{users.length} total · {adminCount} admins · {userCount} users</p>
        </div>
        <button onClick={fetchUsers} className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm px-4 py-2.5 rounded-xl transition-colors">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total Users', value: users.length, icon: Users, color: 'text-sky-400 bg-sky-400/10' },
          { label: 'Admins', value: adminCount, icon: Shield, color: 'text-green-400 bg-green-400/10' },
          { label: 'Regular Users', value: userCount, icon: ShieldOff, color: 'text-zinc-400 bg-zinc-400/10' },
        ].map(s => (
          <div key={s.label} className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-zinc-500">{s.label}</span>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${s.color}`}><s.icon className="w-3.5 h-3.5" /></div>
            </div>
            <p className="text-2xl font-bold">{loading ? '—' : s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..." className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors" />
        </div>
        <div className="flex gap-2">
          {(['all', 'admin', 'user'] as const).map(r => (
            <button key={r} onClick={() => setFilter(r)}
              className={`px-4 py-2 text-sm rounded-xl border transition-colors capitalize ${filter === r ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'border-white/8 text-zinc-500 hover:text-white hover:border-white/15'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/5 text-xs text-zinc-600 font-medium uppercase tracking-wider">
          <span className="col-span-4">User</span>
          <span className="col-span-3">Email</span>
          <span className="col-span-2">Role</span>
          <span className="col-span-2 hidden lg:block">Joined</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 px-4 py-4 border-b border-white/5 items-center">
              <div className="col-span-4 flex items-center gap-3"><div className="skeleton w-8 h-8 rounded-full" /><div className="skeleton w-28 h-3 rounded" /></div>
              <div className="col-span-3"><div className="skeleton w-36 h-3 rounded" /></div>
              <div className="col-span-2"><div className="skeleton w-12 h-5 rounded-full" /></div>
              <div className="col-span-2 hidden lg:block"><div className="skeleton w-20 h-3 rounded" /></div>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-zinc-600 text-sm">No users found.</div>
        ) : filtered.map(u => (
          <div key={u._id} className="grid grid-cols-12 gap-3 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] items-center">
            <div className="col-span-4 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                {u.name?.charAt(0)?.toUpperCase() ?? '?'}
              </div>
              <p className="text-sm font-medium truncate">{u.name}</p>
            </div>
            <div className="col-span-3 text-sm text-zinc-500 truncate">{u.email}</div>
            <div className="col-span-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${u.role === 'admin' ? 'text-green-400 bg-green-400/10' : 'text-zinc-500 bg-white/5'}`}>
                {u.role}
              </span>
            </div>
            <div className="col-span-2 hidden lg:block text-xs text-zinc-600">
              {u.createdAt ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}
            </div>
            <div className="col-span-1 flex items-center justify-end gap-1">
              <button onClick={() => promoteToAdmin(u._id, u.role)} title={u.role === 'admin' ? 'Revoke admin' : 'Make admin'}
                className={`p-1.5 rounded-lg hover:bg-white/5 transition-colors ${u.role === 'admin' ? 'text-green-400 hover:text-zinc-400' : 'text-zinc-600 hover:text-green-400'}`}>
                <Shield className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => deleteUser(u._id)} className="p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
}
