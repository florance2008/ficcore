"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const endpoint = isRegister ? "/api/register" : "/api/login";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("user", JSON.stringify({
  username: username
}));
      router.push("/");
    } else {
      alert(data.error || "Error");
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0f0718] text-white p-6">
      <div className="w-full max-w-md bg-[#1a102d] p-8 rounded-3xl border border-purple-500/20">

        <h1 className="text-4xl font-bold text-center text-purple-300 mb-2">
          FicCore
        </h1>

        <p className="text-center text-zinc-400 mb-6">
          Stories • Fanfiction • Manhwa
        </p>

        <input
          className="w-full p-3 rounded-xl bg-black/40 mb-3"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-3 rounded-xl bg-black/40 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={submit}
          className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-bold"
        >
          {isRegister ? "Create Account" : "Login"}
        </button>

        <button
          onClick={() => setIsRegister(!isRegister)}
          className="w-full mt-3 text-purple-300"
        >
          {isRegister
            ? "Already have an account?"
            : "Create new account"}
        </button>

        <div className="mt-6 text-center text-red-400 text-sm">
          ⚠ ممکن است محتوای این سایت +18 باشد.
          <br />
          مسئولیت مطالعه بر عهده خود خواننده است.
        </div>

      </div>
    </main>
  );
}