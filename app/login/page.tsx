"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password.");
        return;
      }

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      router.push("/home");
    } catch {
      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#050505] text-white relative overflow-hidden">

      {/* ================================================= */}
      {/* BACKGROUND */}
      {/* ================================================= */}

      <div className="absolute inset-0">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.18),transparent_35%),radial-gradient(circle_at_80%_80%,rgba(249,115,22,0.12),transparent_35%)]" />

        <div className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl" />

      </div>

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="relative z-20 border-b border-white/10 bg-black/30 backdrop-blur-xl">

        <div className="max-w-7xl mx-auto px-5 sm:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* Logo */}

            <button
              onClick={() => router.push("/")}
              className="flex items-center gap-3 group"
            >

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-900/30 group-hover:scale-105 transition">
                🎬
              </div>

              <div className="text-left">

                <p className="text-xl font-black tracking-tight">
                  CineBook
                </p>

                <p className="text-[9px] text-zinc-500 uppercase tracking-[0.25em]">
                  Movie Tickets
                </p>

              </div>

            </button>

            {/* Signup */}

            <button
              onClick={() => router.push("/signup")}
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              New here?{" "}
              <span className="text-red-400 font-semibold">
                Create account
              </span>
            </button>

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <section className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="hidden lg:block">

            <div className="max-w-lg">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Your movie night starts here
              </div>

              <h1 className="text-6xl font-black leading-[1.05] mt-7">

                Movies.
                <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                  Seats.
                </span>

                <br />

                Memories.

              </h1>

              <p className="text-zinc-500 text-lg leading-relaxed mt-7 max-w-md">
                Sign in to discover movies, choose your favorite seats,
                and book your next cinema experience in just a few clicks.
              </p>

              {/* Feature cards */}

              <div className="grid grid-cols-3 gap-3 mt-10">

                <MiniFeature
                  icon="🎬"
                  title="Movies"
                />

                <MiniFeature
                  icon="💺"
                  title="Best Seats"
                />

                <MiniFeature
                  icon="🎟️"
                  title="Easy Booking"
                />

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* LOGIN CARD */}
          {/* ================================================= */}

          <div className="w-full max-w-md mx-auto">

            <div className="bg-[#101010]/90 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl shadow-black/50 p-6 sm:p-8">

              {/* Mobile logo */}

              <div className="lg:hidden flex justify-center mb-7">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-red-900/30">
                  🎬
                </div>

              </div>

              {/* Heading */}

              <div className="text-center">

                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
                  👋
                </div>

                <h2 className="text-3xl font-black">
                  Welcome back
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Sign in to continue your movie experience.
                </p>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleLogin}
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}

                <div>

                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                      ✉️
                    </span>

                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      required
                      autoComplete="email"
                      className="w-full bg-[#080808] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder:text-zinc-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 hover:border-white/20"
                    />

                  </div>

                </div>

                {/* PASSWORD */}

                <div>

                  <div className="flex items-center justify-between mb-2">

                    <label
                      htmlFor="password"
                      className="block text-xs font-bold uppercase tracking-wider text-zinc-400"
                    >
                      Password
                    </label>

                    <button
                      type="button"
                      className="text-xs text-zinc-600 hover:text-red-400 transition"
                    >
                      Forgot password?
                    </button>

                  </div>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                      🔒
                    </span>

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      autoComplete="current-password"
                      className="w-full bg-[#080808] border border-white/10 rounded-xl pl-11 pr-12 py-4 text-sm text-white placeholder:text-zinc-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 hover:border-white/20"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white transition"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>

                  </div>

                </div>

                {/* ERROR */}

                {error && (

                  <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">

                    <span className="text-red-400">
                      ⚠️
                    </span>

                    <p className="text-sm text-red-400">
                      {error}
                    </p>

                  </div>

                )}

                {/* REMEMBER */}

                <div className="flex items-center gap-2">

                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 accent-red-600"
                  />

                  <label
                    htmlFor="remember"
                    className="text-xs text-zinc-500 cursor-pointer"
                  >
                    Keep me signed in
                  </label>

                </div>

                {/* LOGIN BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 disabled:from-red-900 disabled:to-red-900 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl shadow-red-900/20 hover:shadow-red-900/40 active:scale-[0.98]"
                >

                  <span className="relative z-10 flex items-center justify-center gap-2">

                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign in
                        <span className="group-hover:translate-x-1 transition">
                          →
                        </span>
                      </>
                    )}

                  </span>

                </button>

              </form>

              {/* DIVIDER */}

              <div className="flex items-center gap-4 my-7">

                <div className="h-px bg-white/10 flex-1" />

                <span className="text-xs text-zinc-700">
                  OR
                </span>

                <div className="h-px bg-white/10 flex-1" />

              </div>

              {/* SIGNUP */}

              <div className="text-center">

                <p className="text-sm text-zinc-500">

                  Don't have an account?{" "}

                  <button
                    onClick={() => router.push("/signup")}
                    className="text-red-400 hover:text-red-300 font-bold transition"
                  >
                    Create one
                  </button>

                </p>

              </div>

              {/* SECURITY */}

              <div className="mt-7 pt-6 border-t border-white/5">

                <div className="flex items-center justify-center gap-2 text-xs text-zinc-700">

                  <span className="text-green-500">
                    🔒
                  </span>

                  Secure CineBook login

                  <span>•</span>

                  Your data stays private

                </div>

              </div>

            </div>

            {/* Footer */}

            <p className="text-center text-xs text-zinc-700 mt-6">
              © 2026 CineBook • Movie tickets made simple.
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}


/* ================================================= */
/* MINI FEATURE */
/* ================================================= */

function MiniFeature({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 hover:bg-white/[0.06] transition">

      <div className="text-xl">
        {icon}
      </div>

      <p className="text-xs text-zinc-500 font-semibold mt-3">
        {title}
      </p>

    </div>
  );
}
