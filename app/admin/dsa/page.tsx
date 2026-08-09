'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit3, Trash2, Search, Code2, X, Save, Loader2, ChevronDown } from 'lucide-react';

const CATEGORIES = ['Arrays', 'Strings', 'Linked List', 'Trees', 'Graphs', 'DP', 'Binary Search', 'Stack & Queue', 'Recursion', 'Greedy', 'Sorting', 'Hashing', 'Two Pointers', 'Sliding Window', 'Bit Manipulation', 'Math'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const COMPANIES = ['Google', 'Amazon', 'Microsoft', 'Meta', 'Apple', 'Netflix', 'Flipkart', 'Adobe', 'Uber'];

interface Problem { id: string; title: string; difficulty: 'Easy' | 'Medium' | 'Hard'; category: string; companies: string[]; leetcode?: string; }

// Static sample data — replace with API calls
const SAMPLE: Problem[] = [
  { id: '1', title: 'Two Sum', difficulty: 'Easy', category: 'Arrays', companies: ['Google', 'Amazon'], leetcode: '1' },
  { id: '2', title: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', category: 'Sliding Window', companies: ['Amazon', 'Microsoft'], leetcode: '3' },
  { id: '3', title: 'Merge K Sorted Lists', difficulty: 'Hard', category: 'Linked List', companies: ['Google', 'Amazon', 'Meta'], leetcode: '23' },
  { id: '4', title: 'Maximum Subarray', difficulty: 'Medium', category: 'DP', companies: ['Amazon'], leetcode: '53' },
  { id: '5', title: 'Binary Tree Level Order Traversal', difficulty: 'Medium', category: 'Trees', companies: ['Google', 'Microsoft'], leetcode: '102' },
  { id: '6', title: 'Climbing Stairs', difficulty: 'Easy', category: 'DP', companies: ['Amazon', 'Adobe'], leetcode: '70' },
];

const DIFF_COLOR: Record<string, string> = {
  Easy: 'text-green-400 bg-green-400/10',
  Medium: 'text-yellow-400 bg-yellow-400/10',
  Hard: 'text-red-400 bg-red-400/10',
};

const FIELD = 'w-full bg-[#0d0d0f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

export default function AdminDSAPage() {
  const [problems, setProblems] = useState<Problem[]>(SAMPLE);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [filterDiff, setFilterDiff] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Problem | null>(null);
  const [form, setForm] = useState({ title: '', difficulty: 'Medium', category: 'Arrays', companies: [] as string[], leetcode: '', description: '', solution: '' });

  const openCreate = () => { setEditing(null); setForm({ title: '', difficulty: 'Medium', category: 'Arrays', companies: [], leetcode: '', description: '', solution: '' }); setShowForm(true); };
  const openEdit = (p: Problem) => { setEditing(p); setForm({ title: p.title, difficulty: p.difficulty, category: p.category, companies: p.companies, leetcode: p.leetcode ?? '', description: '', solution: '' }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600)); // simulate API
    if (editing) {
      setProblems(ps => ps.map(p => p.id === editing.id ? { ...p, ...form } : p));
    } else {
      setProblems(ps => [{ id: Date.now().toString(), ...form } as Problem, ...ps]);
    }
    setSaving(false); setShowForm(false);
  };

  const handleDelete = (id: string) => { if (confirm('Delete?')) setProblems(ps => ps.filter(p => p.id !== id)); };

  const toggleCompany = (c: string) => setForm(f => ({ ...f, companies: f.companies.includes(c) ? f.companies.filter(x => x !== c) : [...f.companies, c] }));

  const filtered = problems.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchDiff = filterDiff === 'All' || p.difficulty === filterDiff;
    return matchSearch && matchCat && matchDiff;
  });

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">DSA Problems</h2>
          <p className="text-sm text-zinc-500 mt-0.5">{problems.length} problems across {CATEGORIES.length} categories</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          <Plus className="w-4 h-4" /> Add Problem
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search problems..." className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors" />
        </div>
        <div className="relative">
          <select value={filterCat} onChange={e => setFilterCat(e.target.value)} className="appearance-none bg-white/[0.03] border border-white/8 rounded-xl px-4 py-2.5 pr-8 text-sm text-zinc-300 outline-none focus:border-green-500 transition-colors cursor-pointer">
            <option value="All">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
        </div>
        <div className="relative">
          <select value={filterDiff} onChange={e => setFilterDiff(e.target.value)} className="appearance-none bg-white/[0.03] border border-white/8 rounded-xl px-4 py-2.5 pr-8 text-sm text-zinc-300 outline-none focus:border-green-500 transition-colors cursor-pointer">
            <option value="All">All Levels</option>
            {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
        </div>
      </div>

      {/* Category pills summary */}
      <div className="flex flex-wrap gap-2 mb-4">
        {CATEGORIES.slice(0, 8).map(c => (
          <button key={c} onClick={() => setFilterCat(filterCat === c ? 'All' : c)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${filterCat === c ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'border-white/5 text-zinc-600 hover:text-white hover:border-white/10'}`}>
            {c} <span className="ml-1 text-zinc-700">{problems.filter(p => p.category === c).length}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="border border-white/5 rounded-xl overflow-hidden">
        <div className="grid grid-cols-12 gap-3 px-4 py-3 bg-white/[0.02] border-b border-white/5 text-xs text-zinc-600 font-medium uppercase tracking-wider">
          <span className="col-span-1">#</span>
          <span className="col-span-4">Problem</span>
          <span className="col-span-2">Category</span>
          <span className="col-span-2">Difficulty</span>
          <span className="col-span-2 hidden lg:block">Companies</span>
          <span className="col-span-1 text-right">Actions</span>
        </div>
        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center text-zinc-600 text-sm">No problems match your filter.</div>
        ) : filtered.map((p, i) => (
          <div key={p.id} className="grid grid-cols-12 gap-3 px-4 py-3.5 border-b border-white/5 last:border-0 hover:bg-white/[0.02] items-center">
            <span className="col-span-1 text-xs text-zinc-700 font-mono">{i + 1}</span>
            <div className="col-span-4 flex items-center gap-2">
              <Code2 className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium">{p.title}</p>
                {p.leetcode && <p className="text-[10px] text-zinc-700">LC #{p.leetcode}</p>}
              </div>
            </div>
            <div className="col-span-2 text-xs text-zinc-500">{p.category}</div>
            <div className="col-span-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${DIFF_COLOR[p.difficulty]}`}>{p.difficulty}</span>
            </div>
            <div className="col-span-2 hidden lg:flex flex-wrap gap-1">
              {p.companies.slice(0, 2).map(c => (
                <span key={c} className="text-[10px] px-1.5 py-0.5 bg-white/5 text-zinc-600 rounded">{c}</span>
              ))}
              {p.companies.length > 2 && <span className="text-[10px] text-zinc-700">+{p.companies.length - 2}</span>}
            </div>
            <div className="col-span-1 flex items-center justify-end gap-1">
              <button onClick={() => openEdit(p)} className="p-1.5 text-zinc-600 hover:text-green-400 rounded-lg hover:bg-white/5 transition-colors"><Edit3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => handleDelete(p.id)} className="p-1.5 text-zinc-600 hover:text-red-400 rounded-lg hover:bg-white/5 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-zinc-700 mt-2 text-right">{filtered.length} of {problems.length} problems</p>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-xl bg-[#111113] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="font-semibold">{editing ? 'Edit Problem' : 'New DSA Problem'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Problem Title *</label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Two Sum" className={FIELD} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 mb-1.5 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className={FIELD}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-1.5 block">Difficulty</label>
                  <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value as 'Easy' | 'Medium' | 'Hard' }))} className={FIELD}>
                    {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">LeetCode # (optional)</label>
                <input value={form.leetcode} onChange={e => setForm(f => ({ ...f, leetcode: e.target.value }))} placeholder="e.g. 1" className={FIELD} />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Companies</label>
                <div className="flex flex-wrap gap-2 mt-1">
                  {COMPANIES.map(c => (
                    <button key={c} type="button" onClick={() => toggleCompany(c)}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${form.companies.includes(c) ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'border-white/10 text-zinc-500 hover:border-white/20'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Problem Description</label>
                <textarea rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Problem statement..." className={`${FIELD} resize-none`} />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Solution (Markdown)</label>
                <textarea rows={5} value={form.solution} onChange={e => setForm(f => ({ ...f, solution: e.target.value }))} placeholder="Write solution with code blocks..." className={`${FIELD} resize-none font-mono text-xs`} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-zinc-400 border border-white/10 rounded-lg hover:border-white/20 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold rounded-lg transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Problem'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
