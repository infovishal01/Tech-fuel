'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit3, Trash2, Search, Layers, X, Save, Loader2 } from 'lucide-react';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];
const CATS = ['URL Shortener', 'Social Media', 'Messaging', 'Search Engine', 'E-Commerce', 'Streaming', 'Storage', 'Payment', 'Other'];

interface Case { id: string; title: string; level: string; category: string; desc: string; tags: string; }
const SAMPLE: Case[] = [
  { id: '1', title: 'Design TinyURL', level: 'Intermediate', category: 'URL Shortener', desc: 'Capacity estimation, hash function, DB schema, API design, caching, rate limiting.', tags: 'hashing,caching,scaling' },
  { id: '2', title: 'Design Instagram', level: 'Advanced', category: 'Social Media', desc: 'Feed generation, media storage, CDN, notifications, search, hashtag system.', tags: 'cdn,nosql,feed' },
  { id: '3', title: 'Design WhatsApp', level: 'Advanced', category: 'Messaging', desc: 'Real-time messaging with WebSockets, message queue, presence system, media.', tags: 'websockets,kafka,realtime' },
  { id: '4', title: 'Design YouTube', level: 'Advanced', category: 'Streaming', desc: 'Video upload pipeline, transcoding, CDN distribution, recommendation engine.', tags: 'streaming,cdn,transcoding' },
];

const LEVEL_COLOR: Record<string, string> = {
  Beginner: 'text-green-400 bg-green-400/10',
  Intermediate: 'text-yellow-400 bg-yellow-400/10',
  Advanced: 'text-red-400 bg-red-400/10',
};

const FIELD = 'w-full bg-[#0d0d0f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

export default function AdminSystemDesignPage() {
  const [cases, setCases] = useState<Case[]>(SAMPLE);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Case | null>(null);
  const [form, setForm] = useState({ title: '', level: 'Intermediate', category: 'Other', desc: '', tags: '', requirements: '', hld: '', components: '' });

  const openCreate = () => { setEditing(null); setForm({ title: '', level: 'Intermediate', category: 'Other', desc: '', tags: '', requirements: '', hld: '', components: '' }); setShowForm(true); };
  const openEdit = (c: Case) => { setEditing(c); setForm({ title: c.title, level: c.level, category: c.category, desc: c.desc, tags: c.tags, requirements: '', hld: '', components: '' }); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setCases(cs => cs.filter(c => c.id !== id)); };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    if (editing) setCases(cs => cs.map(c => c.id === editing.id ? { ...c, ...form } : c));
    else setCases(cs => [{ id: Date.now().toString(), ...form } as Case, ...cs]);
    setSaving(false); setShowForm(false);
  };

  const filtered = cases.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">System Design</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{cases.length} case studies</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          <Plus className="w-4 h-4" /> Add Case Study
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search case studies..." className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(c => (
          <div key={c.id} className="border border-white/5 rounded-xl p-5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center flex-shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => openEdit(c)} className="p-1.5 text-zinc-600 hover:text-green-400 rounded-lg hover:bg-white/5"><Edit3 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(c.id)} className="p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-white/5"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
            <h3 className="font-semibold text-sm mb-1">{c.title}</h3>
            <p className="text-xs text-zinc-500 mb-3 line-clamp-2">{c.desc}</p>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${LEVEL_COLOR[c.level]}`}>{c.level}</span>
              <span className="text-[10px] px-2 py-0.5 bg-white/5 text-zinc-600 rounded-full">{c.category}</span>
            </div>
            {c.tags && (
              <div className="flex flex-wrap gap-1 mt-2">
                {c.tags.split(',').map(t => <span key={t} className="text-[10px] text-zinc-700">#{t.trim()}</span>)}
              </div>
            )}
          </div>
        ))}
        <button onClick={openCreate} className="border border-dashed border-white/10 rounded-xl p-5 flex flex-col items-center justify-center gap-2 text-zinc-600 hover:text-white hover:border-white/20 transition-colors">
          <Plus className="w-6 h-6" />
          <span className="text-sm">Add Case Study</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#111113] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="font-semibold">{editing ? 'Edit Case Study' : 'New System Design Case'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Title</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Design TinyURL" className={FIELD} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-zinc-400 mb-1.5 block">Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={FIELD}>{CATS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
                <div><label className="text-xs text-zinc-400 mb-1.5 block">Level</label><select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} className={FIELD}>{LEVELS.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
              </div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Short Description</label><input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Brief overview..." className={FIELD} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Tags (comma-separated)</label><input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="e.g. caching,cdn,nosql" className={FIELD} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Requirements (Markdown)</label><textarea rows={4} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} placeholder="Functional & non-functional requirements..." className={`${FIELD} resize-none`} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">High-Level Design (Markdown)</label><textarea rows={6} value={form.hld} onChange={e => setForm(f => ({ ...f, hld: e.target.value }))} placeholder="## Architecture\n\nDescribe the high-level design..." className={`${FIELD} resize-none font-mono text-xs`} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Key Components</label><textarea rows={3} value={form.components} onChange={e => setForm(f => ({ ...f, components: e.target.value }))} placeholder="Load Balancer, Cache (Redis), DB (PostgreSQL)..." className={`${FIELD} resize-none`} /></div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-zinc-400 border border-white/10 rounded-lg hover:border-white/20 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold rounded-lg transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
