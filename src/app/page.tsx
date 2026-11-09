"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateContent = async () => {
    if (!idea.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idea }),
      });

      const data = await res.json();

      setResult(data.result);
    } catch {
      setResult("❌ حدث خطأ أثناء الاتصال بالذكاء الاصطناعي");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-950 via-black to-red-950 text-white">
      <div className="max-w-5xl mx-auto p-6">

        <div className="text-center mb-10">
          <h1 className="text-7xl font-bold text-red-500 mb-3">
            Mahi GPT
          </h1>

          <p className="text-zinc-400 text-lg">
            Your Personal AI Assistant
          </p>
        </div>

        <div className="bg-zinc-900 border border-red-950 rounded-3xl p-6 shadow-2xl">

          <textarea
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Ask Mahi GPT anything..."
            className="w-full h-40 bg-zinc-950 border border-red-900 rounded-2xl p-5 text-white outline-none text-lg"
          />

          <button
            onClick={generateContent}
            disabled={loading}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 py-4 rounded-2xl font-bold text-lg transition-all"
          >
            {loading ? "🤔 Thinking..." : "🚀 Ask Mahi GPT"}
          </button>
        </div>

        {result && (
          <div className="mt-8 bg-zinc-900 border border-red-950 rounded-3xl p-8 shadow-2xl">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-red-500">
                ✨ Response
              </h2>

              <button
                onClick={() => navigator.clipboard.writeText(result)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl"
              >
                📋 Copy
              </button>
            </div>

            <div className="prose prose-invert max-w-none text-lg">

              <ReactMarkdown>
                {result}
              </ReactMarkdown>

            </div>

          </div>
        )}
      </div>
    </main>
  );
}