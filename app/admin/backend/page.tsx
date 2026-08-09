'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit3, Trash2, Search, Server, X, Save, Loader2 } from 'lucide-react';

const LANGS = ['Node.js', 'Python', 'Go', 'Java', 'TypeScript'];
const CATS = ['REST API', 'Authentication', 'Database', 'Caching', 'Messaging', 'Docker', 'Deployment', 'Security', 'Testing'];

interface Example { id: string; title: string; language: string; category: string; desc: string; }
const SAMPLE: Example[] = [
  { id: '1', title: 'Node.js REST API with MongoDB', language: 'Node.js', category: 'REST API', desc: 'Full CRUD API with Express, Mongoose, and JWT authentication.' },
  { id: '2', title: 'JWT Auth — Refresh Tokens', language: 'Node.js', category: 'Authentication', desc: 'Secure auth with access + refresh tokens, bcrypt, RBAC middleware.' },
  { id: '3', title: 'Redis Caching Strategy', language: 'Node.js', category: 'Caching', desc: 'Cache-aside pattern with Redis, TTL management, and cache invalidation.' },
  { id: '4', title: 'Dockerize a Next.js App', language: 'TypeScript', category: 'Docker', desc: 'Multi-stage Dockerfile, docker-compose, and CI/CD pipeline with GitHub Actions.' },
];

const LANG_COLOR: Record<string, string> = {
  'Node.js': 'text-green-400 bg-green-400/10',
  'Python': 'text-blue-400 bg-blue-400/10',
  'Go': 'text-sky-400 bg-sky-400/10',
  'Java': 'text-orange-400 bg-orange-400/10',
  'TypeScript': 'text-blue-300 bg-blue-300/10',
};

const FIELD = 'w-full bg-[#0d0d0f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

export default function AdminBackendPage() {
  const [examples, setExamples] = useState<Example[]>(SAMPLE);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Example | null>(null);
  const [form, setForm] = useState({ title: '', language: 'Node.js', category: 'REST API', desc: '', code: '', explanation: '' });

  const openCreate = () => { setEditing(null); setForm({ title: '', language: 'Node.js', category: 'REST API', desc: '', code: '', explanation: '' }); setShowForm(true); };
  const openEdit = (e: Example) => { setEditing(e); setForm({ title: e.title, language: e.language, category: e.category, desc: e.desc, code: '', explanation: '' }); setShowForm(true); };
  const handleDelete = (id: string) => { if (confirm('Delete?')) setExamples(es => es.filter(e => e.id !== id)); };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    if (editing) setExamples(es => es.map(e => e.id === editing.id ? { ...e, ...form } : e));
    else setExamples(es => [{ id: Date.now().toString(), ...form } as Example, ...es]);
    setSaving(false); setShowForm(false);
  };

  const filtered = examples.filter(e => e.title.toLowerCase().includes(search.toLowerCase()) || e.language.toLowerCase().includes(search.toLowerCase()) || e.category.toLowerCase().includes(search.toLowerCase()));

  return (
    <AdminLayout>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Backend Examples</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{examples.length} examples · {LANGS.join(', ')}</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          <Plus className="w-4 h-4" /> Add Example
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search examples..." className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors" />
      </div>

      <div className="border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/5 text-xs text-zinc-600 font-medium uppercase tracking-wider">
          <span className="col-span-5">Title</span><span className="col-span-2">Language</span><span className="col-span-3">Category</span><span className="col-span-2 text-right">Actions</span>
        </div>
        {filtered.map(e => (
          <div key={e.id} className="grid grid-cols-12 gap-3 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] items-center">
            <div className="col-span-5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center flex-shrink-0"><Server className="w-4 h-4" /></div>
              <div><p className="text-sm font-medium truncate">{e.title}</p><p className="text-xs text-zinc-600 truncate hidden sm:block">{e.desc}</p></div>
            </div>
            <div className="col-span-2"><span className={`text-xs px-2 py-0.5 rounded-full ${LANG_COLOR[e.language] ?? 'text-zinc-400 bg-white/5'}`}>{e.language}</span></div>
            <div className="col-span-3 text-xs text-zinc-500">{e.category}</div>
            <div className="col-span-2 flex items-center justify-end gap-1">
              <button onClick={() => openEdit(e)} className="p-1.5 text-zinc-600 hover:text-green-400 rounded-lg hover:bg-white/5 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(e.id)} className="p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#111113] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="font-semibold">{editing ? 'Edit Example' : 'New Backend Example'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Title</label><input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Node.js REST API with MongoDB" className={FIELD} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className="text-xs text-zinc-400 mb-1.5 block">Language</label><select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} className={FIELD}>{LANGS.map(l => <option key={l} value={l}>{l}</option>)}</select></div>
                <div><label className="text-xs text-zinc-400 mb-1.5 block">Category</label><select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={FIELD}>{CATS.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              </div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Description</label><input value={form.desc} onChange={e => setForm(f => ({ ...f, desc: e.target.value }))} placeholder="Short description..." className={FIELD} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Code</label><textarea rows={8} value={form.code} onChange={e => setForm(f => ({ ...f, code: e.target.value }))} placeholder="// Paste your code here..." className={`${FIELD} resize-none font-mono text-xs`} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Explanation (Markdown)</label><textarea rows={4} value={form.explanation} onChange={e => setForm(f => ({ ...f, explanation: e.target.value }))} placeholder="Explain the code..." className={`${FIELD} resize-none`} /></div>
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
