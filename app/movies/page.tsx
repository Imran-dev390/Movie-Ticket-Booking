"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const movies = [
  {
    slug: "the-last-horizon",
    title: "The Last Horizon",
    genre: "Action • Sci-Fi",
    category: "Action",
    rating: "8.7",
    duration: "2h 18m",
    language: "English",
    emoji: "🚀",
    color: "from-indigo-950 via-purple-900 to-black",
  },
  {
    slug: "midnight-run",
    title: "Midnight Run",
    genre: "Action • Thriller",
    category: "Thriller",
    rating: "8.2",
    duration: "2h 05m",
    language: "English",
    emoji: "🌃",
    color: "from-red-950 via-red-800 to-black",
  },
  {
    slug: "lost-in-paris",
    title: "Lost in Paris",
    genre: "Romance • Drama",
    category: "Romance",
    rating: "8.5",
    duration: "1h 52m",
    language: "French",
    emoji: "🗼",
    color: "from-pink-950 via-rose-800 to-black",
  },
  {
    slug: "shadow-protocol",
    title: "Shadow Protocol",
    genre: "Action • Thriller",
    category: "Thriller",
    rating: "9.0",
    duration: "2h 25m",
    language: "English",
    emoji: "🕶️",
    color: "from-slate-950 via-blue-900 to-black",
  },
  {
    slug: "beyond-earth",
    title: "Beyond Earth",
    genre: "Sci-Fi • Adventure",
    category: "Sci-Fi",
    rating: "8.9",
    duration: "2h 10m",
    language: "English",
    emoji: "🌌",
    color: "from-blue-950 via-cyan-900 to-black",
  },
  {
    slug: "the-detective",
    title: "The Detective",
    genre: "Mystery • Crime",
    category: "Mystery",
    rating: "8.6",
    duration: "2h 02m",
    language: "English",
    emoji: "🔎",
    color: "from-slate-900 via-zinc-800 to-black",
  },
];

const genres = ["All", "Action", "Thriller", "Romance", "Sci-Fi", "Mystery"];

export default function MoviesPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      const normalized = parsed?.user ?? parsed;

      if (!normalized?.name) {
        throw new Error("Invalid user");
      }

      setUser(normalized);
    } catch {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const matchesSearch =
        movie.title.toLowerCase().includes(search.toLowerCase()) ||
        movie.genre.toLowerCase().includes(search.toLowerCase());

      const matchesGenre =
        genre === "All" || movie.category === genre;

      return matchesSearch && matchesGenre;
    });
  }, [search, genre]);

  function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-20 flex items-center justify-between">

            <button
              onClick={() => router.push("/home")}
              className="flex items-center gap-3"
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                🎬
              </div>

              <div className="text-left">
                <p className="text-xl font-bold">CineBook</p>
                <p className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">
                  Movie Tickets
                </p>
              </div>
            </button>

            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => router.push("/home")}
                className="text-zinc-400 hover:text-white"
              >
                Home
              </button>

              <button className="text-red-500 font-semibold">
                Movies
              </button>

              <button
                onClick={() => router.push("/cinemas")}
                className="text-zinc-400 hover:text-white"
              >
                Cinemas
              </button>

              <button
                onClick={() => router.push("/tickets")}
                className="text-zinc-400 hover:text-white"
              >
                My Tickets
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 items-center justify-center font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <button
                onClick={logout}
                className="text-sm text-zinc-400 hover:text-red-400"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* HEADER */}

      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-purple-950/30 to-black" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <p className="text-red-500 text-sm font-bold uppercase tracking-[0.2em]">
            CineBook Movies
          </p>

          <h1 className="text-5xl sm:text-6xl font-black mt-3">
            Find your next
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              {" "}movie.
            </span>
          </h1>

          <p className="text-zinc-400 max-w-xl mt-5 text-lg">
            Explore what's playing, discover new releases, and
            book your perfect movie night.
          </p>

          {/* Search */}

          <div className="max-w-2xl mt-8 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
              🔎
            </span>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search movies, genres..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-14 pr-5 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
            />
          </div>

        </div>
      </section>

      {/* MOVIES */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Filters */}

        <div className="flex gap-2 overflow-x-auto pb-2">
          {genres.map((item) => (
            <button
              key={item}
              onClick={() => setGenre(item)}
              className={`shrink-0 px-5 py-2.5 rounded-xl text-sm font-semibold transition ${
                genre === item
                  ? "bg-red-600 text-white"
                  : "bg-[#151515] border border-white/10 text-zinc-400 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-end justify-between mt-10 mb-7">
          <div>
            <p className="text-zinc-500 text-sm">
              {filteredMovies.length} movies available
            </p>

            <h2 className="text-3xl font-bold mt-1">
              Now Showing
            </h2>
          </div>
        </div>

        {filteredMovies.length === 0 ? (
          <div className="bg-[#111] border border-white/10 rounded-3xl p-16 text-center">
            <div className="text-6xl">🎬</div>
            <h3 className="text-2xl font-bold mt-5">
              No movies found
            </h3>
            <p className="text-zinc-500 mt-2">
              Try another search or genre.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredMovies.map((movie) => (
              <article
                key={movie.slug}
                className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/40 hover:-translate-y-1 transition duration-300"
              >

                <div
                  className={`h-[360px] bg-gradient-to-br ${movie.color} relative flex items-center justify-center overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <span className="text-[100px] group-hover:scale-110 transition duration-500">
                    {movie.emoji}
                  </span>

                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg">
                    ⭐ {movie.rating}
                  </div>

                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs">
                    {movie.language}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-xl">
                    {movie.title}
                  </h3>

                  <p className="text-sm text-zinc-500 mt-1">
                    {movie.genre}
                  </p>

                  <div className="flex gap-3 text-xs text-zinc-500 mt-4">
                    <span>⏱ {movie.duration}</span>
                    <span>•</span>
                    <span>🎧 Dolby Atmos</span>
                  </div>

                  <button
                    onClick={() =>
                      router.push(`/movies/${movie.slug}`)
                    }
                    className="w-full mt-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-bold transition"
                  >
                    Book Tickets
                  </button>
                </div>

              </article>
            ))}

          </div>
        )}
      </section>

      <footer className="border-t border-white/10 bg-black py-8 text-center text-sm text-zinc-600">
        © 2026 CineBook. Movie tickets made simple.
      </footer>

    </main>
  );
}
