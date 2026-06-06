"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function AddChapterPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const publishChapter = async () => {
    const res = await fetch("/api/chapters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        story_id: id,
        title,
        content,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Chapter Published!");
      router.push(`/story/${id}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0614] text-white p-8">
      <div className="max-w-3xl mx-auto">

        <h1 className="text-3xl font-bold text-purple-300 mb-6">
          Add New Chapter
        </h1>

        <input
          type="text"
          placeholder="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/10 mb-4"
        />

        <textarea
          placeholder="Chapter Content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-80 p-3 rounded-xl bg-white/10"
        />

        <button
          onClick={publishChapter}
          className="mt-4 bg-purple-600 px-6 py-3 rounded-xl"
        >
          Publish Chapter
        </button>

      </div>
    </main>
  );
}