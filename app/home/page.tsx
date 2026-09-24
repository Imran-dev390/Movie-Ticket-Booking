"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
};

const movies = [
  {
    id: 1,
    title: "The Last Horizon",
    genre: "Action • Sci-Fi",
    rating: "8.7",
    duration: "2h 18m",
    language: "English",
    color: "from-indigo-950 via-purple-900 to-black",
    emoji: "🚀",
  },
  {
    id: 2,
    title: "Midnight Run",
    genre: "Action • Thriller",
    rating: "8.2",
    duration: "2h 05m",
    language: "English",
    color: "from-red-950 via-red-800 to-black",
    emoji: "🌃",
  },
  {
    id: 3,
    title: "Lost in Paris",
    genre: "Romance • Drama",
    rating: "8.5",
    duration: "1h 52m",
    language: "French",
    color: "from-pink-950 via-rose-800 to-black",
    emoji: "🗼",
  },
  {
    id: 4,
    title: "Shadow Protocol",
    genre: "Action • Thriller",
    rating: "9.0",
    duration: "2h 25m",
    language: "English",
    color: "from-slate-950 via-blue-900 to-black",
    emoji: "🕶️",
  },
];

const comingSoon = [
  {
    title: "Beyond Earth",
    genre: "Sci-Fi",
    date: "Oct 18",
    emoji: "🌌",
    color: "from-blue-950 to-cyan-900",
  },
  {
    title: "The Detective",
    genre: "Mystery",
    date: "Oct 25",
    emoji: "🔎",
    color: "from-slate-900 to-zinc-700",
  },
  {
    title: "Summer Hearts",
    genre: "Romance",
    date: "Nov 02",
    emoji: "❤️",
    color: "from-rose-950 to-orange-800",
  },
];

export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("Today");
  const [location, setLocation] = useState("Islamabad");

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (!storedUser) {
//       router.push("/login");
//       return;
//     }

//     try {
//       setUser(JSON.parse(storedUser));
//     } catch {
//       localStorage.removeItem("user");
//       router.push("/login");
//     }
//   }, [router]);

  
useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    router.push("/login");
    return;
  }

  try {
    const parsedUser = JSON.parse(storedUser);

    // Handle either:
    // { name, email }
    // or accidentally nested { user: { name, email } }
    const normalizedUser = parsedUser?.user ?? parsedUser;

    if (!normalizedUser?.name || !normalizedUser?.email) {
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    setUser({
      name: normalizedUser.name,
      email: normalizedUser.email,
    });
  } catch {
    localStorage.removeItem("user");
    router.push("/login");
  }
}, [router]);

function logout() {
    localStorage.removeItem("user");
    router.push("/login");
  }

  function bookMovie(movie: string) {
    router.push(`/movies/${movie.toLowerCase().replaceAll(" ", "-")}`);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#070707] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto" />

          <p className="text-zinc-400 mt-4">
            Loading Cinema...
          </p>
        </div>
      </main>
    );
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

      <nav className="sticky top-0 z-50 bg-[#080808]/95 backdrop-blur-xl border-b border-white/10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="h-20 flex items-center justify-between">

            {/* Logo */}

            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => router.push("/home")}
            >
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
                <span className="text-xl">
                  🎬
                </span>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-tight">
                  CineBook
                </h1>

                <p className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">
                  Movie Tickets
                </p>
              </div>
            </div>

            {/* Navigation */}

            <div className="hidden md:flex items-center gap-8">

             <button
  onClick={() => router.push("/home")}
  className="text-red-500 font-semibold"
>
  Home
</button>

<button
  onClick={() => router.push("/movies")}
  className="text-zinc-400 hover:text-white transition"
>
  Movies
</button>

<button
  onClick={() => router.push("/cinemas")}
  className="text-zinc-400 hover:text-white transition"
>
  Cinemas
</button>

<button
  onClick={() => router.push("/tickets")}
  className="text-zinc-400 hover:text-white transition"
>
  My Tickets
</button>


            </div>

            {/* User */}

            <div className="flex items-center gap-4">

              <div className="hidden sm:flex items-center gap-3">

                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-zinc-500">
                    Movie Lover
                  </p>
                </div>

                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-bold">
                  {user.name.charAt(0).toUpperCase() || "U"}
                </div>

              </div>

              <button
                onClick={logout}
                className="text-sm text-zinc-400 hover:text-red-400 transition"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <section className="relative min-h-[570px] overflow-hidden">

        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20 z-10" />

        <div className="absolute inset-0 bg-gradient-to-br from-red-950 via-purple-950 to-black" />

        {/* Decorative cinema lights */}

        <div className="absolute top-20 right-20 w-72 h-72 bg-red-600/20 rounded-full blur-[100px]" />

        <div className="absolute bottom-0 right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />

        {/* Fake movie visual */}

        <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:flex items-center justify-center">

          <div className="relative w-[430px] h-[430px] rounded-full bg-gradient-to-br from-red-600/40 via-purple-800/30 to-transparent blur-[2px]">

            <div className="absolute inset-16 rounded-full border border-white/10 flex items-center justify-center">

              <span className="text-[130px]">
                🎬
              </span>

            </div>

          </div>

        </div>

        {/* Hero Content */}

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-36">

          <div className="max-w-2xl">

            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-2 rounded-full text-sm">
              🔥 Now showing in your city
            </div>

            <h2 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight">

              Your movie.
              <br />

              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
                Your seat.
              </span>

            </h2>

            <p className="mt-7 text-lg text-zinc-400 max-w-xl leading-relaxed">
              Discover the latest movies, choose your favorite
              cinema, pick your perfect seat, and book your
              movie night in seconds.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <button
                onClick={() =>
                  document
                    .getElementById("movies")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-xl shadow-red-900/30 transition"
              >
                Browse Movies →
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("cinemas")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition"
              >
                Find a Cinema
              </button>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* QUICK BOOKING */}
      {/* ================================================= */}

      <section className="relative -mt-20 z-30">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="bg-[#151515] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl">

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              {/* Location */}

              <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl px-5 py-4">

                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                  Location
                </p>

                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-2 w-full bg-transparent text-white outline-none font-semibold"
                >
                  <option className="bg-zinc-900">
                    Islamabad
                  </option>

                  <option className="bg-zinc-900">
                    Lahore
                  </option>

                  <option className="bg-zinc-900">
                    Karachi
                  </option>

                  <option className="bg-zinc-900">
                    Peshawar
                  </option>
                </select>

              </div>

              {/* Date */}

              <div className="bg-[#0d0d0d] border border-white/10 rounded-2xl px-5 py-4">

                <p className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                  Date
                </p>

                <div className="flex gap-2 mt-2">

                  {["Today", "Tomorrow"].map((day) => (

                    <button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`text-sm font-semibold transition ${
                        selectedDate === day
                          ? "text-red-500"
                          : "text-zinc-500 hover:text-white"
                      }`}
                    >
                      {day}
                    </button>

                  ))}

                </div>

              </div>

              {/* Search */}

              <div className="md:col-span-2 bg-[#0d0d0d] border border-white/10 rounded-2xl px-5 py-4 flex items-center gap-3">

                <span className="text-xl">
                  🔎
                </span>

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search movies..."
                  className="w-full bg-transparent outline-none text-white placeholder:text-zinc-600"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* MOVIES */}
      {/* ================================================= */}

      <section
        id="movies"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

          <div>

            <p className="text-red-500 font-bold text-sm uppercase tracking-widest">
              Now Showing
            </p>

            <h3 className="text-3xl sm:text-4xl font-bold mt-2">
              Movies in cinemas
            </h3>

            <p className="text-zinc-500 mt-2">
              Playing today in {location}
            </p>

          </div>

          <button className="text-red-500 font-semibold hover:text-red-400 transition">
            View all movies →
          </button>

        </div>

        {filteredMovies.length === 0 ? (

          <div className="border border-white/10 bg-[#111] rounded-2xl p-12 text-center">

            <div className="text-5xl">
              🎬
            </div>

            <h4 className="text-xl font-bold mt-4">
              No movies found
            </h4>

            <p className="text-zinc-500 mt-2">
              Try searching for another movie.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {filteredMovies.map((movie) => (

              <div
                key={movie.id}
                className="group bg-[#111] border border-white/10 rounded-2xl overflow-hidden hover:border-red-500/30 hover:-translate-y-1 transition duration-300"
              >

                {/* Poster */}

                <div
                  className={`h-[330px] bg-gradient-to-br ${movie.color} relative flex items-center justify-center overflow-hidden`}
                >

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                  <span className="text-8xl group-hover:scale-110 transition duration-500">
                    {movie.emoji}
                  </span>

                  {/* Rating */}

                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-1">
                    ⭐
                    <span className="font-bold">
                      {movie.rating}
                    </span>
                  </div>

                  {/* Language */}

                  <span className="absolute top-4 right-4 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs">
                    {movie.language}
                  </span>

                </div>

                {/* Details */}

                <div className="p-5">

                  <h4 className="font-bold text-lg">
                    {movie.title}
                  </h4>

                  <p className="text-sm text-zinc-500 mt-1">
                    {movie.genre}
                  </p>

                  <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500">

                    <span>
                      ⏱ {movie.duration}
                    </span>

                    <span>
                      •
                    </span>

                    <span>
                      Dolby Atmos
                    </span>

                  </div>

                  <button
                    onClick={() => bookMovie(movie.title)}
                    className="w-full mt-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 font-bold transition"
                  >
                    Book Tickets
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* ================================================= */}
      {/* CINEMA EXPERIENCE */}
      {/* ================================================= */}

      <section
        id="cinemas"
        className="border-y border-white/10 bg-[#0d0d0d]"
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Visual */}

            <div className="relative">

              <div className="aspect-video rounded-3xl bg-gradient-to-br from-red-950 via-purple-950 to-black border border-white/10 flex items-center justify-center overflow-hidden">

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2),transparent_50%)]" />

                <div className="text-center relative">

                  <div className="text-7xl">
                    🍿
                  </div>

                  <p className="text-2xl font-bold mt-5">
                    Premium Cinema
                  </p>

                  <p className="text-zinc-500 mt-2">
                    Dolby Atmos • 4K • Recliner Seats
                  </p>

                </div>

              </div>

            </div>

            {/* Content */}

            <div>

              <p className="text-red-500 font-bold text-sm uppercase tracking-widest">
                The Cinema Experience
              </p>

              <h3 className="text-4xl font-bold mt-3">
                More than just a movie.
              </h3>

              <p className="text-zinc-500 leading-relaxed mt-5">
                Enjoy your favorite movies in premium theaters
                with immersive sound, crystal-clear screens,
                comfortable seating, and an experience worth
                remembering.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <CinemaFeature
                  icon="🎧"
                  title="Dolby Atmos"
                  description="Immersive sound"
                />

                <CinemaFeature
                  icon="🖥️"
                  title="4K Screens"
                  description="Crystal clear picture"
                />

                <CinemaFeature
                  icon="💺"
                  title="Recliners"
                  description="Premium comfort"
                />

                <CinemaFeature
                  icon="🍿"
                  title="Snacks"
                  description="Fresh cinema snacks"
                />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* COMING SOON */}
      {/* ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        <div className="mb-8">

          <p className="text-red-500 font-bold text-sm uppercase tracking-widest">
            Coming Soon
          </p>

          <h3 className="text-3xl sm:text-4xl font-bold mt-2">
            Movies you'll love
          </h3>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {comingSoon.map((movie) => (

            <div
              key={movie.title}
              className={`relative h-64 rounded-2xl overflow-hidden bg-gradient-to-br ${movie.color} border border-white/10 group`}
            >

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">

                <span className="text-7xl group-hover:scale-110 transition duration-500">
                  {movie.emoji}
                </span>

              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-red-400 text-xs font-bold uppercase tracking-wider">
                      Coming {movie.date}
                    </p>

                    <h4 className="text-xl font-bold mt-1">
                      {movie.title}
                    </h4>

                    <p className="text-sm text-zinc-400 mt-1">
                      {movie.genre}
                    </p>

                  </div>

                  <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-600 flex items-center justify-center transition">
                    →
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* ================================================= */}
      {/* CTA */}
      {/* ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-700 via-red-600 to-orange-600 p-8 sm:p-12">

          <div className="absolute -right-20 -top-32 w-96 h-96 bg-white/10 rounded-full blur-2xl" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-8">

            <div>

              <p className="text-red-100 font-semibold">
                READY FOR MOVIE NIGHT?
              </p>

              <h3 className="text-3xl sm:text-4xl font-black mt-2">
                Grab your popcorn.
                <br />
                We'll handle the tickets.
              </h3>

            </div>

            <button
              onClick={() =>
                document
                  .getElementById("movies")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="shrink-0 bg-white text-red-600 px-7 py-4 rounded-xl font-bold hover:bg-red-50 transition shadow-xl"
            >
              Browse Movies →
            </button>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* FOOTER */}
      {/* ================================================= */}

      <footer className="border-t border-white/10 bg-black">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

            <div className="md:col-span-2">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
                  🎬
                </div>

                <span className="text-xl font-bold">
                  CineBook
                </span>

              </div>

              <p className="text-zinc-500 text-sm max-w-md mt-4 leading-relaxed">
                Your simple way to discover movies, find
                nearby cinemas, choose your seats, and book
                unforgettable movie nights.
              </p>

            </div>

            <div>

              <h4 className="font-bold mb-4">
                Explore
              </h4>

              <div className="space-y-3 text-sm text-zinc-500">
                <p className="hover:text-white cursor-pointer">
                  Now Showing
                </p>

                <p className="hover:text-white cursor-pointer">
                  Coming Soon
                </p>

                <p className="hover:text-white cursor-pointer">
                  Cinemas
                </p>

                <p className="hover:text-white cursor-pointer">
                  Offers
                </p>
              </div>

            </div>

            <div>

              <h4 className="font-bold mb-4">
                Support
              </h4>

              <div className="space-y-3 text-sm text-zinc-500">
                <p className="hover:text-white cursor-pointer">
                  Help Center
                </p>

                <p className="hover:text-white cursor-pointer">
                  Contact
                </p>

                <p className="hover:text-white cursor-pointer">
                  Privacy
                </p>

                <p className="hover:text-white cursor-pointer">
                  Terms
                </p>
              </div>

            </div>

          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-sm text-zinc-600">
            © 2026 CineBook. All rights reserved.
          </div>

        </div>

      </footer>

    </main>
  );
}


/* ================================================= */
/* CINEMA FEATURE */
/* ================================================= */

function CinemaFeature({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-[#151515] border border-white/10 rounded-xl p-4">
      <div className="text-2xl">
        {icon}
      </div>

      <p className="font-semibold mt-3">
        {title}
      </p>

      <p className="text-xs text-zinc-500 mt-1">
        {description}
      </p>
    </div>
  );
}
