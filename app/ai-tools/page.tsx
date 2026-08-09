'use client';

import { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import {
  Bot, Code2, Brain, MapPin, Lightbulb,
  Send, Loader2, ArrowRight, RefreshCw, ChevronDown,
} from 'lucide-react';

// ─── Tab definitions ──────────────────────────────────────────────────────────
const TABS = [
  { id: 'chat',      label: 'AI Chat',         icon: Bot },
  { id: 'codegen',   label: 'Code Generator',  icon: Code2 },
  { id: 'interview', label: 'Mock Interview',  icon: Brain },
  { id: 'roadmap',   label: 'Roadmap',         icon: MapPin },
  { id: 'projects',  label: 'Project Ideas',   icon: Lightbulb },
] as const;

type TabId = (typeof TABS)[number]['id'];

// ─── Shared input styles ──────────────────────────────────────────────────────
const FIELD = 'w-full bg-black border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

// ─── AI Chat ──────────────────────────────────────────────────────────────────
interface Message { role: 'user' | 'assistant'; content: string; }

function AIChatTool() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const msg = input.trim();
    setInput('');
    setMessages(m => [...m, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let reply = '';
      setMessages(m => [...m, { role: 'assistant', content: '' }]);

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          reply += decoder.decode(value);
          setMessages(m => m.map((msg, i) => i === m.length - 1 ? { ...msg, content: reply } : msg));
        }
      }
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: '⚠️ Sorry, the AI service is unavailable. Please add your OPENAI_API_KEY to .env.local.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col h-[520px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium">Ask your AI Tutor anything</p>
            <p className="text-xs text-zinc-600 max-w-xs">Ask about DSA problems, system design, backend concepts, career advice — anything tech.</p>
            <div className="flex flex-wrap gap-2 justify-center mt-2">
              {['Explain Binary Search', 'How does TCP work?', 'What is SOLID?', 'Explain Big O notation'].map(q => (
                <button key={q} onClick={() => setInput(q)}
                  className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 transition-colors">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.role === 'user' ? 'bg-green-500 text-black rounded-br-sm' : 'bg-white/5 text-zinc-200 rounded-bl-sm'}`}>
              {m.content || (m.role === 'assistant' && loading && <span className="flex gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay:'0ms'}} /><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{animationDelay:'300ms'}} /></span>)}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="border-t border-white/5 p-4">
        <div className="flex gap-2">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask anything about tech, DSA, system design..." className={`${FIELD} py-2.5`} />
          <button onClick={sendMessage} disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-xl bg-green-500 hover:bg-green-400 disabled:opacity-50 text-black flex items-center justify-center flex-shrink-0 transition-colors">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Code Generator ───────────────────────────────────────────────────────────
function CodeGeneratorTool() {
  const [prompt, setPrompt]   = useState('');
  const [result, setResult]   = useState('');
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!prompt.trim()) return;
    setLoading(true); setResult('');
    try {
      const res  = await fetch('/api/code-generator', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.code || data.message || 'No response');
    } catch { setResult('⚠️ Service unavailable. Add OPENAI_API_KEY to .env.local'); }
    finally  { setLoading(false); }
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="text-xs text-zinc-400 block mb-2">Describe what you want to build</label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={3}
          placeholder="e.g. Build a REST API with Node.js and MongoDB for a task management app with auth, CRUD, and pagination"
          className={`${FIELD} resize-none`} />
      </div>
      <div className="flex flex-wrap gap-2">
        {['REST API with Express + MongoDB', 'Next.js App with Auth', 'Python FastAPI with PostgreSQL', 'React Dashboard with Charts'].map(e => (
          <button key={e} onClick={() => setPrompt(e)}
            className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-zinc-500 hover:text-white hover:border-white/20 transition-colors">{e}</button>
        ))}
      </div>
      <button onClick={generate} disabled={loading || !prompt.trim()}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating...</> : <><Code2 className="w-4 h-4" /> Generate Code</>}
      </button>
      {result && (
        <div className="border border-white/10 rounded-xl bg-black p-4 max-h-80 overflow-y-auto">
          <pre className="text-xs text-zinc-300 whitespace-pre-wrap font-mono leading-relaxed">{result}</pre>
        </div>
      )}
    </div>
  );
}

// ─── Mock Interview ───────────────────────────────────────────────────────────
const INTERVIEW_QS = [
  'What is the time complexity of quicksort? When would you use it over mergesort?',
  'Explain the difference between a process and a thread.',
  'What is database indexing? When should you add an index?',
  'Describe how you would design a URL shortener like TinyURL.',
  'What is the difference between SQL and NoSQL databases?',
  'Explain SOLID principles with examples.',
];

function MockInterviewTool() {
  const [qIndex, setQIndex]     = useState(0);
  const [answer, setAnswer]     = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading]   = useState(false);

  const submit = async () => {
    if (!answer.trim()) return;
    setLoading(true); setFeedback('');
    try {
      const res  = await fetch('/api/mock-interview', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: INTERVIEW_QS[qIndex], answer }),
      });
      const data = await res.json();
      setFeedback(data.feedback || data.message);
    } catch { setFeedback('⚠️ Service unavailable. Add OPENAI_API_KEY to .env.local'); }
    finally  { setLoading(false); }
  };

  const nextQ = () => { setQIndex(i => (i + 1) % INTERVIEW_QS.length); setAnswer(''); setFeedback(''); };

  return (
    <div className="space-y-4 p-4">
      <div className="border border-white/5 rounded-xl p-4 bg-white/[0.02]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-green-500 font-medium uppercase tracking-wide">Question {qIndex + 1} of {INTERVIEW_QS.length}</span>
          <button onClick={nextQ} className="flex items-center gap-1 text-xs text-zinc-500 hover:text-white transition-colors">
            <RefreshCw className="w-3.5 h-3.5" /> Next question
          </button>
        </div>
        <p className="text-sm font-medium leading-relaxed">{INTERVIEW_QS[qIndex]}</p>
      </div>
      <div>
        <label className="text-xs text-zinc-400 block mb-1.5">Your answer</label>
        <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={5}
          placeholder="Type your answer here. Be as detailed as you can — mention time/space complexity, edge cases, examples..."
          className={`${FIELD} resize-none`} />
      </div>
      <button onClick={submit} disabled={loading || !answer.trim()}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Evaluating...</> : <><Brain className="w-4 h-4" /> Get AI Feedback</>}
      </button>
      {feedback && (
        <div className="border border-green-500/20 rounded-xl bg-green-500/5 p-4 max-h-64 overflow-y-auto">
          <p className="text-xs text-green-400 font-semibold mb-2 uppercase tracking-wide">AI Feedback</p>
          <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{feedback}</p>
        </div>
      )}
    </div>
  );
}

// ─── Roadmap Generator ────────────────────────────────────────────────────────
const ROLES = ['Full Stack Developer', 'Backend Developer', 'Frontend Developer', 'Data Scientist', 'DevOps Engineer', 'Mobile Developer', 'AI/ML Engineer'];

function RoadmapTool() {
  const [role, setRole]           = useState('Full Stack Developer');
  const [experience, setExperience] = useState('1');
  const [roadmap, setRoadmap]     = useState('');
  const [loading, setLoading]     = useState(false);

  const generate = async () => {
    setLoading(true); setRoadmap('');
    try {
      const res  = await fetch('/api/roadmap', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, experience }),
      });
      const data = await res.json();
      setRoadmap(data.roadmap || data.message);
    } catch { setRoadmap('⚠️ Service unavailable. Add OPENAI_API_KEY to .env.local'); }
    finally  { setLoading(false); }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-zinc-400 block mb-1.5">Target role</label>
          <div className="relative">
            <select value={role} onChange={e => setRole(e.target.value)} className={`${FIELD} appearance-none pr-8`}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
          </div>
        </div>
        <div>
          <label className="text-xs text-zinc-400 block mb-1.5">Years of experience</label>
          <div className="relative">
            <select value={experience} onChange={e => setExperience(e.target.value)} className={`${FIELD} appearance-none pr-8`}>
              {['0', '1', '2', '3', '4', '5+'].map(y => <option key={y} value={y}>{y === '0' ? 'Fresher / Student' : `${y} year${y !== '1' ? 's' : ''}`}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600 pointer-events-none" />
          </div>
        </div>
      </div>
      <button onClick={generate} disabled={loading}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating roadmap...</> : <><MapPin className="w-4 h-4" /> Generate My Roadmap</>}
      </button>
      {roadmap && (
        <div className="border border-white/10 rounded-xl bg-black p-4 max-h-80 overflow-y-auto">
          <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{roadmap}</p>
        </div>
      )}
    </div>
  );
}

// ─── Project Ideas ────────────────────────────────────────────────────────────
const SKILLS_OPTIONS = ['React', 'Node.js', 'Python', 'TypeScript', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Next.js', 'Express', 'FastAPI', 'Redis'];

function ProjectIdeasTool() {
  const [selected, setSelected] = useState<string[]>(['React', 'Node.js']);
  const [level, setLevel]       = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate');
  const [ideas, setIdeas]       = useState('');
  const [loading, setLoading]   = useState(false);

  const toggle = (s: string) => setSelected(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);

  const generate = async () => {
    if (!selected.length) return;
    setLoading(true); setIdeas('');
    try {
      const res  = await fetch('/api/project-generator', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skills: selected, level }),
      });
      const data = await res.json();
      setIdeas(data.ideas || data.message);
    } catch { setIdeas('⚠️ Service unavailable. Add OPENAI_API_KEY to .env.local'); }
    finally  { setLoading(false); }
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <label className="text-xs text-zinc-400 block mb-2">Your tech stack (select all that apply)</label>
        <div className="flex flex-wrap gap-2">
          {SKILLS_OPTIONS.map(s => (
            <button key={s} onClick={() => toggle(s)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${selected.includes(s) ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'border-white/10 text-zinc-500 hover:text-white hover:border-white/20'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="text-xs text-zinc-400 block mb-2">Experience level</label>
        <div className="flex gap-2">
          {(['beginner', 'intermediate', 'advanced'] as const).map(l => (
            <button key={l} onClick={() => setLevel(l)}
              className={`text-xs px-4 py-2 rounded-xl border transition-colors capitalize ${level === l ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'border-white/10 text-zinc-500 hover:text-white'}`}>
              {l}
            </button>
          ))}
        </div>
      </div>
      <button onClick={generate} disabled={loading || !selected.length}
        className="flex items-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
        {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Finding ideas...</> : <><Lightbulb className="w-4 h-4" /> Get Project Ideas</>}
      </button>
      {ideas && (
        <div className="border border-white/10 rounded-xl bg-black p-4 max-h-80 overflow-y-auto">
          <p className="text-sm text-zinc-300 whitespace-pre-wrap leading-relaxed">{ideas}</p>
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function AIToolsPage() {
  const [active, setActive] = useState<TabId>('chat');

  const panels: Record<TabId, React.ReactNode> = {
    chat:      <AIChatTool />,
    codegen:   <CodeGeneratorTool />,
    interview: <MockInterviewTool />,
    roadmap:   <RoadmapTool />,
    projects:  <ProjectIdeasTool />,
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs text-green-500 font-medium uppercase tracking-widest mb-2">AI-Powered</p>
          <h1 className="text-2xl sm:text-3xl font-bold">Developer AI Toolkit</h1>
          <p className="text-zinc-500 mt-2 text-sm max-w-lg">
            Five tools built for developers — ask your tutor, generate code, practice interviews, build your roadmap, and discover projects.
          </p>
        </div>

        {/* Tool tabs */}
        <div className="flex gap-1 overflow-x-auto pb-1 mb-0 border-b border-white/5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActive(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 border-b-2 -mb-px ${
                active === id
                  ? 'text-green-400 border-green-500'
                  : 'text-zinc-500 border-transparent hover:text-white'
              }`}>
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="border border-white/5 border-t-0 rounded-b-2xl bg-white/[0.02] min-h-[400px]">
          {panels[active]}
        </div>

        {/* API key notice */}
        <div className="mt-4 border border-yellow-500/20 bg-yellow-500/5 rounded-xl px-4 py-3 flex items-start gap-3">
          <span className="text-yellow-400 text-lg flex-shrink-0">⚡</span>
          <div>
            <p className="text-xs font-medium text-yellow-400">Add your OpenAI API key to enable AI features</p>
            <p className="text-xs text-zinc-600 mt-0.5">Set <code className="bg-white/5 px-1.5 py-0.5 rounded text-zinc-400">OPENAI_API_KEY</code> in your <code className="bg-white/5 px-1.5 py-0.5 rounded text-zinc-400">.env.local</code> file to activate all AI tools.</p>
          </div>
          <a href="/tutorials" className="ml-auto flex items-center gap-1 text-xs text-green-500 hover:text-green-400 whitespace-nowrap">
            Tutorials <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
