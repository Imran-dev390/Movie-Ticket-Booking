"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const cinemas = [
  {
    name: "CineBook Islamabad",
    city: "Islamabad",
    area: "F-7 Markaz",
    rating: "4.9",
    screens: 8,
    seats: 920,
    features: ["Dolby Atmos", "4K", "Recliners", "IMAX"],
    emoji: "🏛️",
    color: "from-blue-950 via-indigo-900 to-black",
  },
  {
    name: "CineBook Lahore",
    city: "Lahore",
    area: "Gulberg III",
    rating: "4.8",
    screens: 10,
    seats: 1150,
    features: ["Dolby Atmos", "4K", "Recliners"],
    emoji: "🌆",
    color: "from-red-950 via-orange-900 to-black",
  },
  {
    name: "CineBook Karachi",
    city: "Karachi",
    area: "Clifton",
    rating: "4.7",
    screens: 12,
    seats: 1400,
    features: ["Dolby Atmos", "4K", "IMAX"],
    emoji: "🌊",
    color: "from-cyan-950 via-blue-900 to-black",
  },
  {
    name: "CineBook Peshawar",
    city: "Peshawar",
    area: "University Road",
    rating: "4.8",
    screens: 6,
    seats: 680,
    features: ["Dolby Atmos", "4K", "Recliners"],
    emoji: "🏔️",
    color: "from-emerald-950 via-teal-900 to-black",
  },
];

export default function CinemasPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [city, setCity] = useState("All");

  useEffect(() => {
    const stored = localStorage.getItem("user");

    if (!stored) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const normalized = parsed?.user ?? parsed;

      if (!normalized?.name) throw new Error();

      setUser(normalized);
    } catch {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
      </main>
    );
  }

  const filtered =
    city === "All"
      ? cinemas
      : cinemas.filter((cinema) => cinema.city === city);

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-20 flex items-center justify-between">

            <button
              onClick={() => router.push("/home")}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                🎬
              </div>

              <div className="text-left">
                <p className="font-bold text-xl">CineBook</p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-widest">
                  Movie Tickets
                </p>
              </div>
            </button>

            <div className="hidden md:flex gap-8">
              <button
                onClick={() => router.push("/home")}
                className="text-zinc-400 hover:text-white"
              >
                Home
              </button>

              <button
                onClick={() => router.push("/movies")}
                className="text-zinc-400 hover:text-white"
              >
                Movies
              </button>

              <button className="text-red-500 font-semibold">
                Cinemas
              </button>

              <button
                onClick={() => router.push("/tickets")}
                className="text-zinc-400 hover:text-white"
              >
                My Tickets
              </button>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("user");
                router.push("/login");
              }}
              className="text-sm text-zinc-400 hover:text-red-400"
            >
              Logout
            </button>

          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-purple-950/30 to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">

          <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
            Our Locations
          </p>

          <h1 className="text-5xl sm:text-6xl font-black mt-3">
            Find your cinema.
          </h1>

          <p className="text-zinc-400 text-lg max-w-xl mt-5">
            Premium screens, comfortable seats and unforgettable
            movie experiences near you.
          </p>

        </div>
      </section>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">

        <div className="flex gap-2 overflow-x-auto">
          {["All", "Islamabad", "Lahore", "Karachi", "Peshawar"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setCity(item)}
                className={`shrink-0 px-5 py-3 rounded-xl font-semibold text-sm ${
                  city === item
                    ? "bg-red-600"
                    : "bg-[#151515] border border-white/10 text-zinc-400"
                }`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

          {filtered.map((cinema) => (
            <article
              key={cinema.name}
              className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-red-500/30 transition"
            >

              <div
                className={`h-64 bg-gradient-to-br ${cinema.color} relative flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <span className="text-8xl">
                  {cinema.emoji}
                </span>

                <div className="absolute bottom-5 left-6">
                  <p className="text-red-400 text-xs font-bold uppercase">
                    CineBook Cinema
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    {cinema.name}
                  </h2>
                </div>

                <div className="absolute top-5 right-5 bg-black/60 backdrop-blur px-3 py-2 rounded-xl">
                  ⭐ {cinema.rating}
                </div>
              </div>

              <div className="p-6">

                <div className="flex justify-between">
                  <div>
                    <p className="text-zinc-300">
                      📍 {cinema.area}, {cinema.city}
                    </p>

                    <p className="text-sm text-zinc-500 mt-2">
                      {cinema.screens} screens • {cinema.seats} seats
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-5">
                  {cinema.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-zinc-400"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => router.push("/movies")}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 py-3 rounded-xl font-bold"
                >
                  Browse Movies →
                </button>

              </div>
            </article>
          ))}

        </div>

      </section>

      <footer className="border-t border-white/10 bg-black py-8 text-center text-sm text-zinc-600">
        © 2026 CineBook. Movie tickets made simple.
      </footer>

    </main>
  );
}
