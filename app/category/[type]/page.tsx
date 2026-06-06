"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function CategoryPage() {
  const { type } = useParams();

  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        const filtered = (data.stories || []).filter((story: any) =>
          story.type?.toLowerCase() === type
        );

        setStories(filtered);
      });
  }, [type]);

  return (
    <main className="min-h-screen bg-[#0b0614] text-white p-6">

      <h1 className="text-3xl text-purple-300 mb-6">
        Category: {type}
      </h1>

      {stories.length === 0 && (
        <p className="text-gray-400">No stories found...</p>
      )}

      <div className="grid md:grid-cols-3 gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="p-4 bg-white/5 rounded-xl border border-white/10"
          >
            <h2 className="text-purple-200 font-bold">
              {story.title}
            </h2>

            <p className="text-sm text-gray-400 mt-2">
              {story.summary}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}