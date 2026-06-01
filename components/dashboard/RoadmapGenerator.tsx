"use client";

import { useState }
from "react";

export default function RoadmapGenerator() {

  const [career, setCareer] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [roadmap, setRoadmap] =
    useState("");

  // Generate
  const generateRoadmap =
    async () => {

      try {

        setLoading(true);

        const response =
          await fetch(
            "/api/roadmap",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                career,
              }),
            }
          );

        const data =
          await response.json();

        setRoadmap(
          data.roadmap
        );

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

          AI Career System

        </p>

        <h2 className="text-4xl font-black mt-3">

          Generate Learning Roadmap

        </h2>

      </div>

      {/* Input */}
      <input
        type="text"
        placeholder="
          Example:
          AI Engineer
        "
        value={career}
        onChange={(e) =>
          setCareer(
            e.target.value
          )
        }
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

      {/* Button */}
      <button
        onClick={
          generateRoadmap
        }
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
          ? "Generating..."
          : "Generate Roadmap"}

      </button>

      {/* Result */}
      {roadmap && (

        <div className="
          mt-8
          border
          border-zinc-800
          rounded-2xl
          p-6
          bg-black/40
        ">

          <pre className="
            whitespace-pre-wrap
            text-zinc-300
            leading-relaxed
            font-sans
          ">

            {roadmap}

          </pre>

        </div>
      )}

    </div>
  );
}