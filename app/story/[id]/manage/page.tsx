"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ManageStory() {
  const { id } = useParams();
  const router = useRouter();

  const [story, setStory] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // load story + chapters
  useEffect(() => {
    fetch(`/api/stories/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data.story);
        setChapters(data.chapters || []);
      });
  }, [id]);

  // ADD CHAPTER
  const addChapter = async () => {
    const res = await fetch(`/api/stories/${id}/chapters`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setChapters((prev) => [...prev, data.chapter]);
      setTitle("");
      setContent("");
    }
  };

  // DELETE CHAPTER
  const deleteChapter = async (chapterId: number) => {
    await fetch(`/api/chapters/${chapterId}`, {
      method: "DELETE",
    });

    setChapters((prev) => prev.filter((c) => c.id !== chapterId));
  };

  return (
    <main className="min-h-screen bg-[#0b0614] text-white p-6">

      <h1 className="text-2xl font-bold text-purple-300 mb-2">
        Manage Story
      </h1>

      {story && (
        <p className="text-gray-400 mb-6">
          {story.title}
        </p>
      )}

      {/* ADD CHAPTER */}
      <div className="bg-white/5 p-4 rounded-xl mb-6">
        <h2 className="font-bold mb-3">Add Chapter</h2>

        <input
          placeholder="Chapter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 mb-2 bg-black/40 rounded"
        />

        <textarea
          placeholder="Chapter content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 mb-2 bg-black/40 rounded min-h-[150px]"
        />

        <button
          onClick={addChapter}
          className="bg-purple-600 px-4 py-2 rounded"
        >
          Add Chapter
        </button>
      </div>

      {/* CHAPTER LIST */}
      <div className="space-y-3">
        {chapters.map((ch) => (
          <div
            key={ch.id}
            className="bg-white/5 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{ch.title}</p>
              <p className="text-xs text-gray-400">
                Chapter #{ch.chapterNumber || "?"}
              </p>
            </div>

            <button
              onClick={() => deleteChapter(ch.id)}
              className="text-red-400"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </main>
  );
}