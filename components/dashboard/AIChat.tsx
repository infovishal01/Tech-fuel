"use client";

import { useState }
from "react";

import ReactMarkdown
from "react-markdown";

export default function AIChat() {

  const [message, setMessage] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // Send
  const sendMessage =
    async () => {

      try {

        setLoading(true);

        setResponse("");

        const res =
          await fetch(
            "/api/ai-chat",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                message,
              }),
            }
          );

        if (!res.body) return;

        const reader =
          res.body.getReader();

        const decoder =
          new TextDecoder();

        while (true) {

          const {
            done,
            value,
          } = await reader.read();

          if (done) break;

          const chunk =
            decoder.decode(
              value
            );

          setResponse(
            (prev) =>
              prev + chunk
          );
        }

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

  return (

    <div className="
      border
      border-zinc-800
      bg-zinc-950
      rounded-3xl
      p-8
    ">

      {/* Heading */}
      <div className="mb-8">

        <p className="text-green-500 text-sm font-medium">

          AI Assistant

        </p>

        <h2 className="text-4xl font-black mt-3">

          Real-Time AI Chat

        </h2>

      </div>

      {/* Input */}
      <textarea
        rows={5}
        value={message}
        onChange={(e) =>
          setMessage(
            e.target.value
          )
        }
        placeholder="
          Ask anything...
        "
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
        onClick={sendMessage}
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

        {loading
          ? "Thinking..."
          : "Ask AI"}

      </button>

      {/* Output */}
      {response && (

        <div className="
          mt-8
          border
          border-zinc-800
          rounded-2xl
          p-6
          bg-black/40
          prose
          prose-invert
          max-w-none
        ">

          <ReactMarkdown>

            {response}

          </ReactMarkdown>

        </div>
      )}

    </div>
  );
}