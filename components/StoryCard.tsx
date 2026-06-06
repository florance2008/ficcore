export default function StoryCard() {
  return (
    <div className="bg-zinc-900 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition">

      <div className="h-72 bg-zinc-800 flex items-center justify-center text-zinc-500">
        Poster
      </div>

      <div className="p-4">
        <h2 className="text-xl font-bold text-white">
          Shadow Fall
        </h2>

        <p className="text-zinc-400 mt-2">
          Romance • Thriller • BL
        </p>

        <p className="text-yellow-400 mt-3">
          ★★★★★
        </p>
      </div>

    </div>
  );
}