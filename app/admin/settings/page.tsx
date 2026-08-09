'use client';

import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Save, Loader2, Globe, Key, Bell, Shield, Database } from 'lucide-react';

const FIELD = 'w-full bg-[#0d0d0f] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-green-500 transition-colors';

export default function AdminSettingsPage() {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(false);
  const [site, setSite] = useState({ name: 'TechFuel', tagline: 'AI-Powered Developer Learning Platform', url: 'https://techfuel.dev', supportEmail: 'support@techfuel.dev' });
  const [features, setFeatures] = useState({ aiChat: true, mockInterview: true, codeGenerator: true, newsletter: true, googleAuth: true });

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false); setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <AdminLayout>
      {toast && (
        <div className="fixed top-4 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium bg-green-500/10 border border-green-500/20 text-green-400 shadow-xl">
          Settings saved successfully!
        </div>
      )}

      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-xl font-bold">Settings</h2>
          <p className="text-sm text-zinc-500 mt-0.5">Configure TechFuel platform settings.</p>
        </div>

        {/* Site Settings */}
        <div className="border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <Globe className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold">Site Settings</h3>
          </div>
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Site Name</label><input value={site.name} onChange={e => setSite(s => ({ ...s, name: e.target.value }))} className={FIELD} /></div>
              <div><label className="text-xs text-zinc-400 mb-1.5 block">Support Email</label><input value={site.supportEmail} onChange={e => setSite(s => ({ ...s, supportEmail: e.target.value }))} className={FIELD} /></div>
            </div>
            <div><label className="text-xs text-zinc-400 mb-1.5 block">Tagline</label><input value={site.tagline} onChange={e => setSite(s => ({ ...s, tagline: e.target.value }))} className={FIELD} /></div>
            <div><label className="text-xs text-zinc-400 mb-1.5 block">Site URL</label><input value={site.url} onChange={e => setSite(s => ({ ...s, url: e.target.value }))} className={FIELD} /></div>
          </div>
        </div>

        {/* Feature Flags */}
        <div className="border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <Shield className="w-4 h-4 text-violet-400" />
            <h3 className="text-sm font-semibold">Feature Flags</h3>
          </div>
          <div className="divide-y divide-white/5">
            {[
              { key: 'aiChat', label: 'AI Chat Tutor', desc: 'Enable the AI chat feature for users' },
              { key: 'mockInterview', label: 'Mock Interview', desc: 'Enable AI mock interview practice' },
              { key: 'codeGenerator', label: 'Code Generator', desc: 'Enable the AI code generation tool' },
              { key: 'newsletter', label: 'Newsletter', desc: 'Show newsletter signup on homepage' },
              { key: 'googleAuth', label: 'Google OAuth', desc: 'Allow sign in with Google account' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-zinc-600 mt-0.5">{desc}</p>
                </div>
                <button
                  onClick={() => setFeatures(f => ({ ...f, [key]: !f[key as keyof typeof features] }))}
                  className={`relative w-11 h-6 rounded-full transition-colors ${features[key as keyof typeof features] ? 'bg-green-500' : 'bg-white/10'}`}
                >
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${features[key as keyof typeof features] ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Env Variables reminder */}
        <div className="border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <Key className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-semibold">Environment Variables</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { key: 'MONGODB_URI', status: 'configured', color: 'text-green-400' },
              { key: 'JWT_SECRET', status: 'configured', color: 'text-green-400' },
              { key: 'NEXTAUTH_SECRET', status: 'configured', color: 'text-green-400' },
              { key: 'OPENAI_API_KEY', status: 'not set', color: 'text-yellow-400' },
              { key: 'GOOGLE_CLIENT_ID', status: 'not set', color: 'text-yellow-400' },
            ].map(({ key, status, color }) => (
              <div key={key} className="flex items-center justify-between py-1.5">
                <code className="text-xs text-zinc-400 bg-white/5 px-2 py-1 rounded">{key}</code>
                <span className={`text-xs font-medium ${color}`}>{status}</span>
              </div>
            ))}
            <p className="text-xs text-zinc-600 pt-2">Edit <code className="bg-white/5 px-1.5 py-0.5 rounded">.env.local</code> to configure environment variables.</p>
          </div>
        </div>

        {/* DB status */}
        <div className="border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <Database className="w-4 h-4 text-green-400" />
            <h3 className="text-sm font-semibold">Database</h3>
          </div>
          <div className="p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm text-green-400 font-medium">Connected</span>
              <span className="text-xs text-zinc-600">MongoDB 7.0 · Local</span>
            </div>
            <p className="text-xs text-zinc-600">Database: <code className="bg-white/5 px-1.5 py-0.5 rounded">tech-fuel-local</code></p>
          </div>
        </div>

        {/* Notification settings */}
        <div className="border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-white/[0.02]">
            <Bell className="w-4 h-4 text-rose-400" />
            <h3 className="text-sm font-semibold">Notifications</h3>
          </div>
          <div className="p-5">
            <p className="text-sm text-zinc-500 mb-3">Email notifications for admin events.</p>
            <div className="space-y-2">
              {['New user registration', 'New tutorial published', 'Error alerts'].map(n => (
                <label key={n} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-green-500" />
                  <span className="text-sm text-zinc-400">{n}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-400 disabled:opacity-60 text-black text-sm font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </AdminLayout>
  );
}
