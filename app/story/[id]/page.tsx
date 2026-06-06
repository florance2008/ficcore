"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StoryPage() {
  const { id } = useParams();

  const [story, setStory] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/stories`);
      const data = await res.json();

      const found = data.stories.find((s: any) => s.id == id);
      setStory(found);
    };

    const loadChapters = async () => {
      const res = await fetch(`/api/chapters?storyId=${id}`);
      const data = await res.json();
      setChapters(data.chapters || []);
    };

    load();
    loadChapters();
  }, [id]);

  if (!story) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0b0614] text-white p-8">

      {/* STORY INFO */}
      <h1 className="text-3xl font-bold text-purple-300">
        {story.title}
      </h1>

      <p className="text-gray-300 mt-3">
        {story.summary}
      </p>

      <div className="mt-4 text-sm text-gray-400 space-y-1">
        <p>Author: {story.author}</p>
        <p>Genre: {story.genre}</p>
        <p>Rating: {story.rating}</p>
        <p>Status: {story.status}</p>
      </div>

      {/* CHAPTERS */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-white mb-3">
          Chapters
        </h2>

        {chapters.length === 0 ? (
          <p className="text-gray-400">No chapters yet</p>
        ) : (
          <div className="space-y-2">
            {chapters.map((ch) => (
              <div
                key={ch.id}
                onClick={() => setSelectedChapter(ch)}
                className="p-3 bg-white/10 rounded cursor-pointer hover:bg-white/20"
              >
                {ch.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ================= CHAPTER MODAL (ADDED) ================= */}
      {selectedChapter && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedChapter(null)}
        >
          <div
            className="bg-[#1d1230] w-full max-w-2xl p-6 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-purple-300">
              {selectedChapter.title}
            </h2>

            <p className="mt-4 text-gray-200 whitespace-pre-wrap">
              {selectedChapter.content}
            </p>

            <button
              className="mt-6 bg-purple-600 px-4 py-2 rounded"
              onClick={() => setSelectedChapter(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}