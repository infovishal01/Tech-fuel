'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Plus, Edit3, Trash2, Search, Brain, X, Save, Loader2, ChevronDown } from 'lucide-react';

const SUBJECTS = [
  { id: 'os',   label: 'Operating Systems', color: 'text-green-400  bg-green-400/10',  topics: ['Processes & Threads', 'CPU Scheduling', 'Memory Management', 'Deadlocks', 'File Systems', 'Synchronisation', 'Virtual Memory', 'I/O Systems'] },
  { id: 'dbms', label: 'DBMS',              color: 'text-sky-400    bg-sky-400/10',    topics: ['ER Diagrams', 'Normalisation (1NF–BCNF)', 'Transactions & ACID', 'SQL Queries', 'Indexing & B-Trees', 'Concurrency Control', 'Recovery', 'NoSQL Intro'] },
  { id: 'cn',   label: 'Computer Networks', color: 'text-violet-400 bg-violet-400/10', topics: ['OSI Model', 'TCP/IP Stack', 'HTTP & HTTPS', 'DNS', 'Routing Algorithms', 'Flow & Congestion Control', 'Socket Programming', 'Security Basics'] },
  { id: 'oop',  label: 'OOP & Design',      color: 'text-orange-400 bg-orange-400/10', topics: ['Classes & Objects', 'Inheritance & Polymorphism', 'SOLID Principles', 'Design Patterns', 'UML Diagrams', 'OOPS in Java/C++', 'Abstraction', 'Encapsulation'] },
];

interface Note { id: string; subject: string; topic: string; content: string; tags: string; createdAt: string; }

const SAMPLE_NOTES: Note[] = [
  { id: '1', subject: 'os',   topic: 'Processes & Threads', content: '# Processes\n\nA process is an instance of a program in execution...', tags: 'interview, basics', createdAt: '2026-08-01' },
  { id: '2', subject: 'dbms', topic: 'Normalisation (1NF–BCNF)', content: '# Normalisation\n\n## 1NF\nEach column must contain atomic values...', tags: 'normalisation, sql', createdAt: '2026-08-02' },
  { id: '3', subject: 'cn',   topic: 'OSI Model', content: '# OSI Model\n\n7 layers: Application, Presentation, Session...', tags: 'networking, osi', createdAt: '2026-08-03' },
  { id: '4', subject: 'oop',  topic: 'SOLID Principles', content: '# SOLID\n\n**S** - Single Responsibility Principle...', tags: 'design, solid', createdAt: '2026-08-04' },
];

const FIELD = 'w-full bg-[#0d0d0f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

export default function AdminCoreCsPage() {
  const [notes, setNotes] = useState<Note[]>(SAMPLE_NOTES);
  const [activeSubject, setActiveSubject] = useState('all');
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Note | null>(null);
  const [form, setForm] = useState({ subject: 'os', topic: '', content: '', tags: '' });

  const openCreate = () => { setEditing(null); setForm({ subject: 'os', topic: '', content: '', tags: '' }); setShowForm(true); };
  const openEdit = (n: Note) => { setEditing(n); setForm({ subject: n.subject, topic: n.topic, content: n.content, tags: n.tags }); setShowForm(true); };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    if (editing) {
      setNotes(ns => ns.map(n => n.id === editing.id ? { ...n, ...form } : n));
    } else {
      setNotes(ns => [{ id: Date.now().toString(), ...form, createdAt: new Date().toISOString().slice(0, 10) }, ...ns]);
    }
    setSaving(false); setShowForm(false);
  };

  const handleDelete = (id: string) => { if (confirm('Delete this note?')) setNotes(ns => ns.filter(n => n.id !== id)); };

  const filtered = notes.filter(n => {
    const matchSub = activeSubject === 'all' || n.subject === activeSubject;
    const matchSearch = n.topic.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase());
    return matchSub && matchSearch;
  });

  const subjectTopics = (subId: string) => SUBJECTS.find(s => s.id === subId)?.topics ?? [];

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold">Core CS Notes</h2>
          <p className="text-sm text-zinc-500 mt-0.5">OS · DBMS · Computer Networks · OOP — {notes.length} notes</p>
        </div>
        <button onClick={openCreate} className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-4 py-2.5 rounded-xl transition-all">
          <Plus className="w-4 h-4" /> Add Note
        </button>
      </div>

      {/* Subject tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setActiveSubject('all')}
          className={`text-sm px-4 py-2 rounded-xl border transition-colors ${activeSubject === 'all' ? 'bg-white/10 text-white border-white/15' : 'border-white/5 text-zinc-500 hover:text-white hover:border-white/10'}`}>
          All Subjects <span className="ml-1 text-zinc-600 text-xs">{notes.length}</span>
        </button>
        {SUBJECTS.map(s => (
          <button key={s.id} onClick={() => setActiveSubject(s.id)}
            className={`text-sm px-4 py-2 rounded-xl border transition-colors ${activeSubject === s.id ? `${s.color} border-current/20` : 'border-white/5 text-zinc-500 hover:text-white hover:border-white/10'}`}>
            {s.label} <span className="ml-1 text-zinc-600 text-xs">{notes.filter(n => n.subject === s.id).length}</span>
          </button>
        ))}
      </div>

      {/* Subject cards overview */}
      {activeSubject === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {SUBJECTS.map(s => (
            <div key={s.id} onClick={() => setActiveSubject(s.id)}
              className="border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] cursor-pointer transition-all group">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
                <Brain className="w-4 h-4" />
              </div>
              <p className="text-sm font-semibold group-hover:text-green-400 transition-colors">{s.label}</p>
              <p className="text-xs text-zinc-600 mt-0.5">{notes.filter(n => n.subject === s.id).length} notes · {s.topics.length} topics</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {s.topics.slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] px-1.5 py-0.5 bg-white/5 text-zinc-700 rounded">{t}</span>
                ))}
                {s.topics.length > 3 && <span className="text-[10px] text-zinc-700">+{s.topics.length - 3}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search notes..." className="w-full bg-white/[0.03] border border-white/8 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors" />
      </div>

      {/* Notes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-3 py-12 text-center text-zinc-600 text-sm">No notes found. <button onClick={openCreate} className="text-green-500">Add one →</button></div>
        ) : filtered.map(n => {
          const sub = SUBJECTS.find(s => s.id === n.subject);
          return (
            <div key={n.id} className="border border-white/5 rounded-xl p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${sub?.color}`}>{sub?.label}</span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(n)} className="p-1 text-zinc-600 hover:text-green-400 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                  <button onClick={() => handleDelete(n.id)} className="p-1 text-zinc-600 hover:text-red-400 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              <h3 className="text-sm font-semibold mb-1">{n.topic}</h3>
              <p className="text-xs text-zinc-600 line-clamp-2 font-mono">{n.content.replace(/[#*]/g, '').slice(0, 120)}...</p>
              <div className="flex items-center gap-2 mt-3">
                {n.tags.split(',').map(t => t.trim()).filter(Boolean).slice(0, 3).map(t => (
                  <span key={t} className="text-[10px] px-2 py-0.5 bg-white/5 text-zinc-600 rounded-full">{t}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[#111113] border border-white/10 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h3 className="font-semibold">{editing ? 'Edit Note' : 'New Core CS Note'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-white/5"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-5 space-y-3 max-h-[65vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 mb-1.5 block">Subject</label>
                  <select value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value, topic: '' }))} className={FIELD}>
                    {SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-zinc-400 mb-1.5 block">Topic</label>
                  <div className="relative">
                    <select value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} className={FIELD}>
                      <option value="">Select or type topic...</option>
                      {subjectTopics(form.subject).map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-600 pointer-events-none" />
                  </div>
                </div>
              </div>
              {!form.topic && (
                <input value={form.topic} onChange={e => setForm(f => ({ ...f, topic: e.target.value }))} placeholder="Or type a custom topic..." className={FIELD} />
              )}
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Tags (comma-separated)</label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="e.g. interview, basics, important" className={FIELD} />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1.5 block">Content (Markdown)</label>
                <textarea rows={12} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} placeholder={`# ${form.topic || 'Topic Title'}\n\nWrite your notes in Markdown...\n\n## Key Concepts\n- Concept 1\n- Concept 2\n\n\`\`\`\ncode example\n\`\`\``} className={`${FIELD} resize-none font-mono text-xs leading-relaxed`} />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 px-5 py-4 border-t border-white/5">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-zinc-400 border border-white/10 rounded-lg hover:border-white/20 transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold rounded-lg transition-colors">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
