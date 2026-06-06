"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [page, setPage] = useState<"home" | "publish" | "profile">("home");

  const [loggedUser, setLoggedUser] = useState("guest");

  const [stories, setStories] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedStory, setSelectedStory] = useState<any>(null);

  const router = useRouter();
  const [cover, setCover] = useState<string | null>(null);
const [storyChapters, setStoryChapters] = useState<any[]>([]);
  // ======================
  // PROFILE
  // ======================
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [username, setUsername] = useState("");

  // ======================
  // FILTERS (RESTORED FULL)
  // ======================
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [filterRelationship, setFilterRelationship] = useState("all");
  const [filterType, setFilterType] = useState("all");

  // ======================
  // PUBLISH FIELDS (FULL RESTORE)
  // ======================
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");

  const [type, setType] = useState("fanfiction");
  const [fandom, setFandom] = useState("");

  const [authorName, setAuthorName] = useState("");
  const [translatorName, setTranslatorName] = useState("");

  const [mainCouple, setMainCouple] = useState("");
  const [sideCouples, setSideCouples] = useState("");

  const [relationship, setRelationship] = useState("BL");
  const [genre, setGenre] = useState("Romance");
  const [rating, setRating] = useState("Teen");
  const [status, setStatus] = useState("Ongoing");
const [chapterMode, setChapterMode] = useState<any>(null);
const [chapterTitle, setChapterTitle] = useState("");
const [chapterContent, setChapterContent] = useState("");
  // ======================
  // LOAD
  // ======================
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const u = JSON.parse(savedUser);
      setLoggedUser(u.username);
      setUsername(u.username);
    }
    fetchStories();
  }, []);
useEffect(() => {
  if (!selectedStory) return;

  const loadChapters = async () => {
    const res = await fetch(`/api/chapters?storyId=${selectedStory.id}`);
    const data = await res.json();
    setStoryChapters(data.chapters || []);
  };

  loadChapters();
}, [selectedStory]);
  const fetchStories = async () => {
    const res = await fetch("/api/stories");
    const data = await res.json();
    setStories(data.stories || []);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setLoggedUser("guest");
  };

  // ======================
  // PUBLISH
  // ======================
  const publishStory = async () => {
    const res = await fetch("/api/stories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary,
        content,
        type,
        fandom,
        author: authorName || loggedUser,
        translator: translatorName,
        mainCouple,
        sideCouples,
        genre,
        relationship,
        rating,
        status,
        cover: cover || "",
      }),
    });

    const data = await res.json();

    if (data.success) {
      setTitle("");
      setSummary("");
      setContent("");
      setFandom("");
      setAuthorName("");
      setTranslatorName("");
      setMainCouple("");
      setSideCouples("");
      setCover(null);

      setPage("home");
      fetchStories();
    }
  };

  // ======================
  // FILTER LOGIC (RESTORED)
  // ======================
  const filteredStories = stories.filter((s) => {
    return (
      (filterGenre === "all" || s.genre === filterGenre) &&
      (filterRelationship === "all" || s.relationship === filterRelationship) &&
      (filterStatus === "all" || s.status === filterStatus) &&
      (filterRating === "all" || s.rating === filterRating) &&
      (filterType === "all" || s.type === filterType) &&
      (search === "" || s.title.toLowerCase().includes(search.toLowerCase()))
    );
  });

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0b0614] via-[#12091f] to-[#09050f] text-white px-6 py-8">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-purple-300">FicCore</h1>

        <div className="flex gap-3 items-center">
          {loggedUser !== "guest" && (
            <button onClick={() => setPage("profile")}
              className="px-3 py-1 bg-white/10 rounded-xl">
              Profile
            </button>
          )}

          {loggedUser !== "guest" ? (
            <button onClick={logout} className="text-xs text-gray-400">
              Logout
            </button>
          ) : (
            <a href="/login" className="text-purple-300">Login</a>
          )}
        </div>
      </div>

      {/* NAV */}
      <div className="flex gap-3 mb-8">
        <button onClick={() => setPage("home")} className="px-4 py-2 bg-white/10 rounded-xl">Home</button>
       {loggedUser !== "guest" && (
  <button
    onClick={() => setPage("publish")}
    className="px-4 py-2 bg-purple-600 rounded-xl"
  >
    Publish
  </button>
)}
      </div>

      {/* ================= HOME ================= */}
      {page === "home" && (
        <div>

          <input
            placeholder="Search stories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-4 p-3 rounded-xl bg-black/40"
          />

          {/* FILTERS (RESTORED FULL) */}
          <div className="flex gap-3 mb-6 flex-wrap">

            <select onChange={(e) => setFilterGenre(e.target.value)} className="bg-black/40 p-2 rounded">
              <option value="all">All Genres</option>
              <option value="Romance">Romance</option>
              <option value="Angst">Angst</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Fluff">Fluff</option>
              <option value="Horror">Horror</option>
              <option value="Mystery">Mystery</option>
              <option value="Drama">Drama</option>
            </select>

            <select onChange={(e) => setFilterStatus(e.target.value)} className="bg-black/40 p-2 rounded">
              <option value="all">All Status</option>
              <option value="Ongoing">Ongoing</option>
              <option value="Completed">Completed</option>
              <option value="Hiatus">Hiatus</option>
            </select>

            <select onChange={(e) => setFilterRating(e.target.value)} className="bg-black/40 p-2 rounded">
              <option value="all">All Rating</option>
              <option value="General">General</option>
              <option value="Teen">Teen</option>
              <option value="Mature">Mature</option>
              <option value="Smut">Smut</option>
            </select>

            <select onChange={(e) => setFilterRelationship(e.target.value)} className="bg-black/40 p-2 rounded">
              <option value="all">All Relationships</option>
              <option value="BL">BL</option>
              <option value="GL">GL</option>
              <option value="Straight">Straight</option>
            </select>

            <select onChange={(e) => setFilterType(e.target.value)} className="bg-black/40 p-2 rounded">
              <option value="all">All Types</option>
              <option value="fanfiction">Fanfiction</option>
              <option value="novel">Novel</option>
              <option value="manhwa">Manhwa</option>
              <option value="oneshot">One-shot</option>
            </select>

          </div>

          {/* STORIES */}
          <div className="grid md:grid-cols-3 gap-5">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className="bg-white/5 p-4 rounded-2xl cursor-pointer"
              >
                <div className="h-40 rounded-xl mb-3 overflow-hidden bg-purple-900/30 flex items-center justify-center">
                  {story.cover ? (
                    <img src={story.cover} className="w-full h-full object-cover" />
                  ) : (
                    "📖"
                  )}
                </div>

                <h2 className="text-purple-200 font-bold">{story.title}</h2>
                {loggedUser === story.author && (
  <button
    className="mt-2 px-3 py-1 bg-purple-600 rounded"
    onClick={(e) => {
      e.stopPropagation();
      setChapterMode(story);
    }}
  >
    + Chapter
  </button>
)}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= PROFILE ================= */}
{page === "profile" && (
  <div className="max-w-xl mx-auto">

    {/* PROFILE CARD */}
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10">

      <div className="flex items-center gap-4">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-purple-800 overflow-hidden flex items-center justify-center">
          {profileImage ? (
            <img src={profileImage} className="w-full h-full object-cover" />
          ) : (
            "👤"
          )}
        </div>

        {/* Info */}
        <div>
          <h2 className="text-xl font-bold">{username}</h2>
          <p className="text-gray-400 text-sm">@{loggedUser}</p>
        </div>

      </div>

      {/* EDIT BUTTON */}
      <button
        onClick={() => setEditingProfile(!editingProfile)}
        className="mt-4 bg-white/10 px-3 py-1 rounded-xl"
      >
        {editingProfile ? "Close Edit" : "Edit Profile"}
      </button>

      {/* EDIT PROFILE */}
      {editingProfile && (
        <div className="mt-4 space-y-3">

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 bg-black/40 rounded"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;

              const reader = new FileReader();
              reader.onloadend = () =>
                setProfileImage(reader.result as string);
              reader.readAsDataURL(file);
            }}
            className="w-full"
          />

        </div>
      )}

    </div>

    {/* ================= MY STORIES ================= */}
    <h3 className="mt-6 text-lg font-bold text-purple-300">
      My Stories
    </h3>

    <div className="grid gap-4 mt-3">

      {stories
        .filter((s) => s.author === loggedUser)
        .map((story) => (
          <div
            key={story.id}
            className="bg-white/5 p-4 rounded-xl border border-white/10"
          >

            <h2 className="font-bold text-purple-200">
              {story.title}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              {story.genre} • {story.status}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">

              <button
                className="px-3 py-1 bg-purple-600 rounded"
                onClick={() => router.push(`/story/${story.id}`)}
              >
                View
              </button>

              <button
                className="px-3 py-1 bg-white/10 rounded"
                onClick={() => setSelectedStory(story)}
              >
                Edit (later)
              </button>

              <button
                onClick={async () => {
                  await fetch(`/api/stories?id=${story.id}`, {
                    method: "DELETE",
                  });
                  fetchStories();
                }}
                className="px-3 py-1 bg-red-500/40 rounded"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

    </div>

  </div>
)}

      {/* ================= PUBLISH ================= */}
{page === "publish" && (
  <div className="max-w-xl mx-auto bg-white/5 p-6 rounded-2xl border border-white/10">

    <h2 className="text-xl font-bold text-purple-300 mb-4">
      Publish Story
    </h2>

    <input
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <input
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Fandom"
      value={fandom}
      onChange={(e) => setFandom(e.target.value)}
    />

    <input
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Author name"
      value={authorName}
      onChange={(e) => setAuthorName(e.target.value)}
    />

    <input
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Translator (optional)"
      value={translatorName}
      onChange={(e) => setTranslatorName(e.target.value)}
    />

    <input
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Main Couple"
      value={mainCouple}
      onChange={(e) => setMainCouple(e.target.value)}
    />

    <input
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Side Couples"
      value={sideCouples}
      onChange={(e) => setSideCouples(e.target.value)}
    />

    <select
      className="w-full p-3 mb-3 bg-black/40 rounded"
      value={relationship}
      onChange={(e) => setRelationship(e.target.value)}
    >
      <option value="BL">BL</option>
      <option value="GL">GL</option>
      <option value="Straight">Straight</option>
    </select>

    <select
      className="w-full p-3 mb-3 bg-black/40 rounded"
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
    >
      <option value="Romance">Romance</option>
      <option value="Angst">Angst</option>
      <option value="Fantasy">Fantasy</option>
      <option value="Fluff">Fluff</option>
      <option value="Horror">Horror</option>
      <option value="Mystery">Mystery</option>
      <option value="Drama">Drama</option>
    </select>

    <select
      className="w-full p-3 mb-3 bg-black/40 rounded"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
    >
      <option value="General">General</option>
      <option value="Teen">Teen</option>
      <option value="Mature">Mature</option>
      <option value="Smut">Smut</option>
    </select>

    <select
      className="w-full p-3 mb-3 bg-black/40 rounded"
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >
      <option value="Ongoing">Ongoing</option>
      <option value="Completed">Completed</option>
      <option value="Hiatus">Hiatus</option>
    </select>

    <textarea
      className="w-full p-3 mb-3 bg-black/40 rounded"
      placeholder="Summary"
      value={summary}
      onChange={(e) => setSummary(e.target.value)}
    />

    <textarea
      className="w-full p-3 mb-3 min-h-[160px] bg-black/40 rounded"
      placeholder="Story"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    <input
      type="file"
      accept="image/*"
      className="w-full p-3 mb-3 bg-black/40 rounded"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => setCover(reader.result as string);
        reader.readAsDataURL(file);
      }}
    />

    <button
      onClick={publishStory}
      className="w-full bg-purple-600 py-3 rounded-xl font-bold"
    >
      Publish 🚀
    </button>

  </div>
  
)}
   
   {chapterMode && (
  <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4">
    
    <div className="bg-[#1d1230] w-full max-w-xl p-6 rounded-2xl">

      <h2 className="text-xl font-bold text-purple-300 mb-3">
        Add Chapter → {chapterMode.title}
      </h2>

      <input
        className="w-full p-3 mb-3 bg-black/40 rounded"
        placeholder="Chapter Title"
        value={chapterTitle}
        onChange={(e) => setChapterTitle(e.target.value)}
      />

      <textarea
        className="w-full p-3 mb-3 min-h-[200px] bg-black/40 rounded"
        placeholder="Chapter Content"
        value={chapterContent}
        onChange={(e) => setChapterContent(e.target.value)}
      />

      <div className="flex gap-2">

        <button
          className="flex-1 bg-purple-600 py-2 rounded"
          onClick={async () => {
           const res = await fetch("/api/chapters", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    storyId: chapterMode.id,
    title: chapterTitle,
    content: chapterContent,
  }),
});

const data = await res.json();

console.log(data);
alert(JSON.stringify(data));
            setChapterTitle("");
            setChapterContent("");
            setChapterMode(null);
          }}
        >
          Publish
        </button>

        <button
          className="flex-1 bg-white/10 py-2 rounded"
          onClick={() => setChapterMode(null)}
        >
          Cancel
        </button>

      </div>

    </div>
  </div>
)}
{/* ================= STORY INFO MODAL ================= */}
{selectedStory && (
  <div
    className="fixed inset-0 bg-black/80 flex items-center justify-center p-4"
    onClick={() => setSelectedStory(null)}
  >
    <div
      className="bg-[#1d1230] w-full max-w-2xl p-6 rounded-2xl max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >

      {/* TITLE */}
      <h2 className="text-2xl font-bold text-purple-300">
        {selectedStory.title}
      </h2>

      {/* SUMMARY */}
      <p className="text-gray-300 mt-2">
        {selectedStory.summary}
      </p>

      {/* INFO GRID */}
      <div className="grid grid-cols-1 gap-3 mt-6">

        <div className="flex justify-between bg-white/5 p-4 rounded-xl">
          <span className="text-white font-semibold">Author</span>
          <span className="text-gray-300">{selectedStory.author}</span>
        </div>

        <div className="flex justify-between bg-white/5 p-4 rounded-xl">
          <span className="text-white font-semibold">Genre</span>
          <span className="text-gray-300">{selectedStory.genre}</span>
        </div>

        <div className="flex justify-between bg-white/5 p-4 rounded-xl">
          <span className="text-white font-semibold">Rating</span>
          <span className="text-gray-300">{selectedStory.rating}</span>
        </div>

        <div className="flex justify-between bg-white/5 p-4 rounded-xl">
          <span className="text-white font-semibold">Status</span>
          <span className="text-gray-300">{selectedStory.status}</span>
        </div>

        <div className="flex justify-between bg-white/5 p-4 rounded-xl">
          <span className="text-white font-semibold">Type</span>
          <span className="text-gray-300">{selectedStory.type}</span>
        </div>

        <div className="flex justify-between bg-white/5 p-4 rounded-xl">
          <span className="text-white font-semibold">Fandom</span>
          <span className="text-gray-300">{selectedStory.fandom}</span>
        </div>

      </div>

      {/* META */}
      <div className="mt-4 text-sm text-gray-400">
        Genre: {selectedStory.genre} | Status: {selectedStory.status}
      </div>

      {/* READ BUTTON */}
      <button
        className="mt-4 px-4 py-2 bg-purple-600 rounded"
        onClick={() => router.push(`/story/${selectedStory.id}`)}
      >
        Read Story 📖
      </button>

      {/* CHAPTERS */}
      <div className="mt-6">
        <h3 className="text-lg font-bold text-white mb-2">
          Chapters
        </h3>

        {storyChapters.length === 0 ? (
          <p className="text-gray-400 text-sm">
            هنوز چپتری نیست
          </p>
        ) : (
          <div className="space-y-2">
            {storyChapters.map((ch) => (
              <div
                key={ch.id}
                className="p-3 bg-black/30 rounded-lg border border-white/10"
              >
                <p className="font-bold text-purple-200">
                  {ch.title}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  </div>
)}
</main>
  );
}