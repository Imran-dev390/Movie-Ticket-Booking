"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Unable to create account.");
        return;
      }

      // Store the logged-in user
      // This matches:
      // { message: "User Created", user: newUser }
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      // Go to home
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

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(220,38,38,0.18),transparent_35%),radial-gradient(circle_at_85%_80%,rgba(249,115,22,0.12),transparent_35%)]" />

        <div className="absolute top-[-150px] right-[-150px] w-[420px] h-[420px] rounded-full bg-red-600/10 blur-3xl" />

        <div className="absolute bottom-[-150px] left-[-150px] w-[420px] h-[420px] rounded-full bg-orange-500/10 blur-3xl" />

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

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-xl shadow-lg shadow-red-900/30 group-hover:scale-105 transition">
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

            {/* Login */}

            <button
              onClick={() => router.push("/login")}
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              Already a member?{" "}
              <span className="text-red-400 font-semibold">
                Sign in
              </span>
            </button>

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <section className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">

        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ================================================= */}
          {/* LEFT SIDE */}
          {/* ================================================= */}

          <div className="hidden lg:block">

            <div className="max-w-lg">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider">

                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />

                Join CineBook

              </div>

              <h1 className="text-6xl font-black leading-[1.05] mt-7">

                Your seat.
                <br />

                Your movie.
                <br />

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                  Your night.
                </span>

              </h1>

              <p className="text-zinc-500 text-lg leading-relaxed mt-7 max-w-md">
                Create your CineBook account and make movie nights
                easier. Browse movies, choose your seats, and book
                your tickets in seconds.
              </p>

              {/* BENEFITS */}

              <div className="space-y-4 mt-10">

                <Benefit
                  icon="🎬"
                  title="Discover Movies"
                  description="Explore the latest movies and upcoming releases."
                />

                <Benefit
                  icon="💺"
                  title="Choose Your Seats"
                  description="Pick exactly where you want to sit before checkout."
                />

                <Benefit
                  icon="🎟️"
                  title="Easy Ticket Booking"
                  description="Complete your cinema booking in just a few clicks."
                />

              </div>

            </div>

          </div>

          {/* ================================================= */}
          {/* SIGNUP CARD */}
          {/* ================================================= */}

          <div className="w-full max-w-md mx-auto">

            <div className="bg-[#101010]/90 backdrop-blur-2xl border border-white/10 rounded-[28px] shadow-2xl shadow-black/50 p-6 sm:p-8">

              {/* Mobile Logo */}

              <div className="lg:hidden flex justify-center mb-7">

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-3xl shadow-xl shadow-red-900/30">
                  🎬
                </div>

              </div>

              {/* HEADING */}

              <div className="text-center">

                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 mb-4">
                  🎟️
                </div>

                <h2 className="text-3xl font-black">
                  Create account
                </h2>

                <p className="text-zinc-500 text-sm mt-2">
                  Join CineBook and start booking movies.
                </p>

              </div>

              {/* FORM */}

              <form
                onSubmit={handleSignup}
                className="mt-8 space-y-5"
              >

                {/* NAME */}

                <div>

                  <label
                    htmlFor="name"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Full Name
                  </label>

                  <div className="relative">

                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600">
                      👤
                    </span>

                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      required
                      autoComplete="name"
                      className="w-full bg-[#080808] border border-white/10 rounded-xl pl-11 pr-4 py-4 text-sm text-white placeholder:text-zinc-700 outline-none transition focus:border-red-500 focus:ring-4 focus:ring-red-500/10 hover:border-white/20"
                    />

                  </div>

                </div>

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

                  <label
                    htmlFor="password"
                    className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2"
                  >
                    Password
                  </label>

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
                      placeholder="Create a password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      required
                      minLength={4}
                      autoComplete="new-password"
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

                  <p className="text-[11px] text-zinc-700 mt-2">
                    Password must contain at least 4 characters.
                  </p>

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

                {/* TERMS */}

                <div className="flex items-start gap-3">

                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 accent-red-600"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs text-zinc-500 leading-relaxed cursor-pointer"
                  >
                    I agree to the CineBook terms and understand
                    that this is a demo movie-ticket booking system.
                  </label>

                </div>

                {/* SIGNUP BUTTON */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-500 hover:to-orange-400 disabled:from-red-900 disabled:to-red-900 text-white font-bold py-4 rounded-xl transition-all duration-300 shadow-xl shadow-red-900/20 hover:shadow-red-900/40 active:scale-[0.98]"
                >

                  <span className="relative z-10 flex items-center justify-center gap-2">

                    {loading ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create account
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

              {/* LOGIN */}

              <div className="text-center">

                <p className="text-sm text-zinc-500">

                  Already have an account?{" "}

                  <button
                    type="button"
                    onClick={() => router.push("/login")}
                    className="text-red-400 hover:text-red-300 font-bold transition"
                  >
                    Sign in
                  </button>

                </p>

              </div>

              {/* SECURITY */}

              <div className="mt-7 pt-6 border-t border-white/5">

                <div className="flex items-center justify-center gap-2 text-xs text-zinc-700">

                  <span className="text-green-500">
                    🔒
                  </span>

                  Secure account creation

                  <span>•</span>

                  CineBook Demo

                </div>

              </div>

            </div>

            {/* FOOTER */}

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
/* BENEFIT COMPONENT */
/* ================================================= */

function Benefit({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4 group">

      <div className="w-12 h-12 shrink-0 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-center text-xl group-hover:bg-red-500/10 group-hover:border-red-500/20 transition">
        {icon}
      </div>

      <div>

        <h3 className="font-bold text-sm">
          {title}
        </h3>

        <p className="text-xs text-zinc-600 mt-1">
          {description}
        </p>

      </div>

    </div>
  );
}
