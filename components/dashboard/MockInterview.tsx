'use client';

import { useState } from 'react';

export default function MockInterview() {
  const [role, setRole] = useState('');

  const [answer, setAnswer] = useState('');

  const [feedback, setFeedback] = useState('');

  const [loading, setLoading] = useState(false);

  // Submit
  const submitInterview = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/mock-interview', {
        method: 'POST',

        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          role,

          answer,
        }),
      });

      const data = await response.json();

      setFeedback(data.feedback);
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
          AI Interview System
        </p>

        <h2 className="text-4xl font-black mt-3">Mock Interview</h2>
      </div>

      {/* Role */}
      <input
        type="text"
        placeholder="
          Example:
          Frontend Developer
        "
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="
          w-full
          bg-black
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-4
          text-white
          outline-none
          focus:border-green-500
          transition
        "
      />

      {/* Answer */}
      <textarea
        rows={10}
        placeholder="
          Write your interview answer...
        "
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="
          mt-5
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
        onClick={submitInterview}
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
        {loading ? 'Evaluating...' : 'Evaluate Answer'}
      </button>

      {/* Feedback */}
      {feedback && (
        <div
          className="
          mt-8
          border
          border-zinc-800
          rounded-2xl
          p-6
          bg-black/40
        "
        >
          <pre
            className="
            whitespace-pre-wrap
            text-zinc-300
            leading-relaxed
            font-sans
          "
          >
            {feedback}
          </pre>
        </div>
      )}
    </div>
  );
}
