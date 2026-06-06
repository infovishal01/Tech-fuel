'use client';

import { useState } from 'react';

export default function CodeGenerator() {
  const [prompt, setPrompt] = useState('');

  const [loading, setLoading] = useState(false);

  const [code, setCode] = useState('');

  // Generate
  const generateCode = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/code-generator', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      setCode(data.code);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
      border
      border-zinc-800
      bg-zinc-950
      rounded-3xl
      p-8
    "
    >
      {/* Heading */}
      <div className="mb-8">
        <p className="text-green-500 text-sm font-medium">
          AI Coding Workspace
        </p>

        <h2 className="text-4xl font-black mt-3">AI Code Generator</h2>
      </div>

      {/* Input */}
      <textarea
        rows={6}
        placeholder="
          Example:
          Create JWT authentication in Next.js
        "
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-2xl
          p-5
          text-white
          outline-none
          focus:border-green-500
          transition
          resize-none
        "
      />

      {/* Button */}
      <button
        onClick={generateCode}
        className="
          mt-5
          bg-green-500
          hover:bg-green-400
          text-black
          px-6
          py-4
          rounded-2xl
          font-semibold
          transition
        "
      >
        {loading ? 'Generating...' : 'Generate Code'}
      </button>

      {/* Output */}
      {code && (
        <div
          className="
          mt-8
          border
          border-zinc-800
          rounded-2xl
          p-6
          bg-black/40
          overflow-x-auto
        "
        >
          <pre
            className="
            whitespace-pre-wrap
            text-zinc-300
            leading-relaxed
            font-mono
            text-sm
          "
          >
            {code}
          </pre>
        </div>
      )}
    </div>
  );
}
