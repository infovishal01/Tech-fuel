'use client';

import { useEffect, useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit3, Trash2, Eye, Search, BookOpen, X, Save, Loader2 } from 'lucide-react';

interface Tutorial { _id: string; title: string; description: string; content: string; category: string; author: string; createdAt: string; }

const CATEGORIES = ['AI', 'DSA', 'System Design', 'Backend', 'Core CS', 'Frontend', 'DevOps'];

const FIELD = 'w-full bg-[#0d0d0f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Tutorial | null>(null);
  const [form, setForm] = useState({ title: '', description: '', content: '', category: 'AI' });
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const r = await fetch('/api/tutorials');
      const d = await r.json();
      setTutorials(d.tutorials ?? []);
    } catch { setTutorials([]); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTutorials(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: '', description: '', content: '', category: 'AI' }); setShowForm(true); };
  const openEdit = (t: Tutorial) => { setEditing(t); setForm({ title: t.title, description: t.description, content: t.content, category: t.category }); setShowForm(true); };

  const handleSave = async () => {
    if (!form.title || !form.description || !form.content) { showToast('All fields are required', 'error'); return; }
    setSaving(true);
    try {
      const url = editing ? `/api/tutorials/${editing._id}` : '/api/tutorials';
      const method = editing ? 'PUT' : 'POST';
      const r = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const d = await r.json();
      if (!r.ok) { showToast(d.message || 'Error', 'error'); return; }
      showToast(editing ? 'Tutorial updated!' : 'Tutorial created!');
      setShowForm(false);
      fetchTutorials();
    } catch { showToast('Something went wrong', 'error'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tutorial?')) return;
    try {
      await fetch(`/api/tutorials/${id}`, { method: 'DELETE' });
      showToast('Deleted');
      fetchTutorials();
    } catch { showToast('Delete failed', 'error'); }
  };

  const filtered = tutorials.filter(t =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-xl border ${toast.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Tutorials</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{tutorials.length} tutorials total</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all hover:shadow-[0_0_16px_rgba(34,197,94,0.3)]">
          <Plus className="w-4 h-4" /> New Tutorial
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tutorials..." className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors" />
      </div>

      {/* Table */}
      <div className="border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/5 text-xs text-zinc-600 font-medium uppercase tracking-wider">
          <span className="col-span-5">Title</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-3 hidden lg:block">Created</span>
          <span className="col-span-2 text-right">Actions</span>
        </div>

        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="grid grid-cols-12 gap-3 px-4 py-3.5 border-b border-white/5">
              <div className="col-span-5"><div className="skeleton w-48 h-4 rounded" /></div>
              <div className="col-span-2"><div className="skeleton w-16 h-4 rounded" /></div>
              <div className="col-span-3 hidden lg:block"><div className="skeleton w-24 h-4 rounded" /></div>
              <div className="col-span-2" />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-zinc-600 text-sm">No tutorials found. <button onClick={openCreate} className="text-green-500 hover:text-green-400">Create one →</button></div>
        ) : filtered.map(t => (
          <div key={t._id} className="grid grid-cols-12 gap-3 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] items-center">
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{t.title}</p>
                <p className="text-xs text-zinc-600 truncate hidden sm:block">{t.description}</p>
              </div>
            </div>
            <div className="col-span-2">
              <span className="text-xs px-2 py-0.5 rounded-md bg-white/5 text-zinc-400">{t.category}</span>
            </div>
            <div className="col-span-3 hidden lg:block text-xs text-zinc-600">
              {new Date(t.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </div>
            <div className="col-span-2 flex items-center justify-end gap-1">
              <button className="p-1.5 text-zinc-600 hover:text-white rounded-lg hover:bg-white/5 transition-colors"><Eye className="w-3.5 h-3.5" /></button>
              <button onClick={() => openEdit(t)} className="p-1.5 text-zinc-600 hover:text-green-400 rounded-lg hover:bg-white/5 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(t._id)} className="p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#111113] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="font-semibold">{editing ? 'Edit Tutorial' : 'New Tutorial'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Master ChatGPT Prompts" className={FIELD} />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Description *</label>
                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Short description..." className={FIELD} />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={FIELD}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Content (Markdown) *</label>
                <textarea rows={10} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder="Write tutorial content in Markdown..." className={`${FIELD} resize-none font-mono text-xs`} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold rounded-lg transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Tutorial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
