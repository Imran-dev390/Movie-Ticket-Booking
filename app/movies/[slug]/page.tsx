"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const movieData: Record<string, any> = {
  "the-last-horizon": {
    title: "The Last Horizon",
    genre: "Action • Sci-Fi",
    rating: "8.7",
    duration: "2h 18m",
    language: "English",
    emoji: "🚀",
    color: "from-indigo-950 via-purple-900 to-black",
    description:
      "Humanity's final mission begins beyond the edge of the known universe. A fearless crew must cross the last horizon to save millions of lives.",
  },

  "midnight-run": {
    title: "Midnight Run",
    genre: "Action • Thriller",
    rating: "8.2",
    duration: "2h 05m",
    language: "English",
    emoji: "🌃",
    color: "from-red-950 via-red-800 to-black",
    description:
      "One night. One dangerous mission. A race against time through a city that never sleeps.",
  },

  "lost-in-paris": {
    title: "Lost in Paris",
    genre: "Romance • Drama",
    rating: "8.5",
    duration: "1h 52m",
    language: "French",
    emoji: "🗼",
    color: "from-pink-950 via-rose-800 to-black",
    description:
      "Two strangers meet in Paris and discover that sometimes getting lost is the best way to find something unexpected.",
  },

  "shadow-protocol": {
    title: "Shadow Protocol",
    genre: "Action • Thriller",
    rating: "9.0",
    duration: "2h 25m",
    language: "English",
    emoji: "🕶️",
    color: "from-slate-950 via-blue-900 to-black",
    description:
      "A secret agent is forced out of hiding when a classified protocol threatens to expose the world's most powerful organization.",
  },
};

const showtimes = [
  "10:30 AM",
  "01:45 PM",
  "04:30 PM",
  "07:00 PM",
  "09:45 PM",
];

const TICKET_PRICE = 800;

export default function MoviePage() {
  const router = useRouter();
  const params = useParams();

  const [user, setUser] = useState<any>(null);

  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCinema, setSelectedCinema] =
    useState("CineBook Islamabad");
  const [selectedDate, setSelectedDate] = useState("Today");

  // NEW: ticket quantity
  const [ticketQuantity, setTicketQuantity] = useState(1);

  const slug = params.slug as string;
  const movie = movieData[slug];

  // Calculate total
  const subtotal = ticketQuantity * TICKET_PRICE;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      setUser(JSON.parse(storedUser));
    } catch {
      localStorage.removeItem("user");
      router.push("/login");
    }
  }, [router]);

  if (!user) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-6xl">
            🎬
          </div>

          <h1 className="text-3xl font-bold mt-5">
            Movie not found
          </h1>

          <p className="text-zinc-500 mt-2">
            We couldn't find this movie.
          </p>

          <button
            onClick={() => router.push("/home")}
            className="mt-6 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-bold"
          >
            Back to Movies
          </button>

        </div>

      </main>
    );
  }

  function increaseTickets() {
    if (ticketQuantity < 10) {
      setTicketQuantity((current) => current + 1);
    }
  }

  function decreaseTickets() {
    if (ticketQuantity > 1) {
      setTicketQuantity((current) => current - 1);
    }
  }

  function continueBooking() {
    if (!selectedTime) {
      alert("Please select a showtime.");
      return;
    }

    router.push(
      `/booking?movie=${encodeURIComponent(
        movie.title
      )}&cinema=${encodeURIComponent(
        selectedCinema
      )}&date=${encodeURIComponent(
        selectedDate
      )}&time=${encodeURIComponent(
        selectedTime
      )}&tickets=${ticketQuantity}`
    );
  }

  return (
    <main className="min-h-screen bg-[#080808] text-white">

      {/* ================================================= */}
      {/* NAVBAR */}
      {/* ================================================= */}

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

                <p className="text-xl font-bold">
                  CineBook
                </p>

                <p className="text-[9px] text-zinc-500 uppercase tracking-[0.2em]">
                  Movie Tickets
                </p>

              </div>

            </button>

            <button
              onClick={() => router.push("/home")}
              className="text-sm text-zinc-400 hover:text-white transition"
            >
              ← Back to Movies
            </button>

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* MOVIE HERO */}
      {/* ================================================= */}

      <section className="relative overflow-hidden">

        <div
          className={`absolute inset-0 bg-gradient-to-br ${movie.color}`}
        />

        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-black/20" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 items-center">

            {/* POSTER */}

            <div className="h-[420px] rounded-3xl bg-black/30 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl">

              <span className="text-[120px]">
                {movie.emoji}
              </span>

            </div>

            {/* DETAILS */}

            <div>

              <div className="flex flex-wrap gap-2">

                <span className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold">
                  NOW SHOWING
                </span>

                <span className="px-3 py-1.5 rounded-lg bg-white/10 text-zinc-300 text-xs">
                  {movie.language}
                </span>

              </div>

              <h1 className="text-5xl sm:text-6xl font-black mt-5">
                {movie.title}
              </h1>

              <p className="text-xl text-zinc-300 mt-4">
                {movie.genre}
              </p>

              <div className="flex flex-wrap items-center gap-5 mt-6 text-sm">

                <span className="text-yellow-400 font-bold">
                  ⭐ {movie.rating}
                </span>

                <span className="text-zinc-400">
                  ⏱ {movie.duration}
                </span>

                <span className="text-zinc-400">
                  🎧 Dolby Atmos
                </span>

                <span className="text-zinc-400">
                  🖥️ 4K
                </span>

              </div>

              <p className="max-w-2xl text-zinc-400 leading-relaxed mt-7">
                {movie.description}
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* ================================================= */}
      {/* BOOKING SECTION */}
      {/* ================================================= */}

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-16">

        <div className="mb-10">

          <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
            Book Tickets
          </p>

          <h2 className="text-3xl sm:text-4xl font-bold mt-2">
            Plan your movie night
          </h2>

          <p className="text-zinc-500 mt-2">
            Choose your cinema, date, showtime and number of tickets.
          </p>

        </div>

        {/* ================================================= */}
        {/* CINEMA */}
        {/* ================================================= */}

        <div className="bg-[#111] border border-white/10 rounded-2xl p-6">

          <label className="text-sm font-bold text-zinc-300">
            Cinema
          </label>

          <select
            value={selectedCinema}
            onChange={(e) => setSelectedCinema(e.target.value)}
            className="w-full mt-3 bg-[#080808] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-red-500"
          >

            <option>
              CineBook Islamabad
            </option>

            <option>
              CineBook Lahore
            </option>

            <option>
              CineBook Karachi
            </option>

          </select>

        </div>

        {/* ================================================= */}
        {/* DATE */}
        {/* ================================================= */}

        <div className="mt-8">

          <h3 className="font-bold text-lg">
            Select Date
          </h3>

          <div className="flex flex-wrap gap-3 mt-4">

            {["Today", "Tomorrow", "Oct 12", "Oct 13"].map(
              (date) => (

                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`px-6 py-4 rounded-xl border transition ${
                    selectedDate === date
                      ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/20"
                      : "bg-[#111] border-white/10 text-zinc-400 hover:border-red-500/50"
                  }`}
                >
                  {date}
                </button>

              )
            )}

          </div>

        </div>

        {/* ================================================= */}
        {/* SHOWTIMES */}
        {/* ================================================= */}

        <div className="mt-10">

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-bold text-lg">
                Select Showtime
              </h3>

              <p className="text-sm text-zinc-500 mt-1">
                {selectedCinema}
              </p>

            </div>

            <span className="text-sm text-zinc-500">
              {selectedDate}
            </span>

          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-5">

            {showtimes.map((time) => (

              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-4 rounded-xl border font-semibold transition ${
                  selectedTime === time
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/30"
                    : "bg-[#111] border-white/10 text-zinc-300 hover:border-red-500 hover:text-white"
                }`}
              >
                {time}
              </button>

            ))}

          </div>

        </div>

        {/* ================================================= */}
        {/* TICKET QUANTITY */}
        {/* ================================================= */}

        <div className="mt-10 bg-[#111] border border-white/10 rounded-2xl p-6">

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">

            <div>

              <h3 className="font-bold text-lg">
                How many tickets?
              </h3>

              <p className="text-sm text-zinc-500 mt-1">
                Maximum 10 tickets per booking
              </p>

            </div>

            {/* QUANTITY CONTROL */}

            <div className="flex items-center gap-3">

              <button
                type="button"
                onClick={decreaseTickets}
                disabled={ticketQuantity === 1}
                className="w-12 h-12 rounded-xl bg-[#080808] border border-white/10 text-2xl font-semibold hover:border-red-500 hover:text-red-500 transition disabled:opacity-30 disabled:hover:border-white/10 disabled:hover:text-white"
              >
                −
              </button>

              <div className="w-16 h-12 rounded-xl bg-white text-black flex items-center justify-center">

                <span className="text-xl font-black">
                  {ticketQuantity}
                </span>

              </div>

              <button
                type="button"
                onClick={increaseTickets}
                disabled={ticketQuantity === 10}
                className="w-12 h-12 rounded-xl bg-red-600 hover:bg-red-700 text-2xl font-semibold transition disabled:opacity-30"
              >
                +
              </button>

            </div>

          </div>

          {/* TICKET PRICE */}

          <div className="mt-6 pt-6 border-t border-white/10">

            <div className="flex items-center justify-between text-sm">

              <span className="text-zinc-500">
                Ticket price
              </span>

              <span>
                PKR {TICKET_PRICE.toLocaleString()}
              </span>

            </div>

            <div className="flex items-center justify-between text-sm mt-3">

              <span className="text-zinc-500">
                Quantity
              </span>

              <span>
                × {ticketQuantity}
              </span>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* ORDER SUMMARY */}
        {/* ================================================= */}

        <div className="mt-8 bg-gradient-to-br from-[#171717] to-[#101010] border border-white/10 rounded-3xl p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
              🎟️
            </div>

            <div>

              <h3 className="font-bold">
                Booking Summary
              </h3>

              <p className="text-xs text-zinc-500">
                Review your order
              </p>

            </div>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                Movie
              </span>

              <span className="font-semibold">
                {movie.title}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                Cinema
              </span>

              <span>
                {selectedCinema}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                Date
              </span>

              <span>
                {selectedDate}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                Showtime
              </span>

              <span className="text-red-400 font-semibold">
                {selectedTime || "Not selected"}
              </span>

            </div>

            <div className="flex justify-between text-sm">

              <span className="text-zinc-500">
                Tickets
              </span>

              <span>
                {ticketQuantity}{" "}
                {ticketQuantity === 1 ? "ticket" : "tickets"}
              </span>

            </div>

          </div>

          {/* TOTAL */}

          <div className="border-t border-white/10 mt-6 pt-6">

            <div className="flex items-end justify-between">

              <div>

                <p className="text-sm text-zinc-500">
                  Total
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  {ticketQuantity} × PKR{" "}
                  {TICKET_PRICE.toLocaleString()}
                </p>

              </div>

              <p className="text-3xl font-black text-white">
                PKR {subtotal.toLocaleString()}
              </p>

            </div>

          </div>

          {/* CONTINUE */}

          <button
            onClick={continueBooking}
            className="w-full mt-7 bg-red-600 hover:bg-red-700 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-red-900/30"
          >
            Continue to Seat Selection →
          </button>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-black py-8">

        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-zinc-600">
          © 2026 CineBook. Movie tickets made simple.
        </div>

      </footer>

    </main>
  );
}
