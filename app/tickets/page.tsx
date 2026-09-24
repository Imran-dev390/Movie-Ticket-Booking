"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Ticket = {
  id: string;
  movie: string;
  cinema: string;
  date: string;
  time: string;
  seats: string[];
  total: number;
  status: "Confirmed" | "Pending" | "Cancelled";
};

export default function TicketsPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(storedUser);
      const normalized = parsed?.user ?? parsed;

      if (!normalized?.name) throw new Error();

      setUser(normalized);

      const storedTickets = localStorage.getItem("tickets");

      if (storedTickets) {
        setTickets(JSON.parse(storedTickets));
      }
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

  const visibleTickets =
    filter === "All"
      ? tickets
      : tickets.filter((ticket) => ticket.status === filter);

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

              <button
                onClick={() => router.push("/cinemas")}
                className="text-zinc-400 hover:text-white"
              >
                Cinemas
              </button>

              <button className="text-red-500 font-semibold">
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

      {/* HEADER */}

      <section className="border-b border-white/10 bg-gradient-to-br from-red-950/30 to-black">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">

          <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
            Your Account
          </p>

          <h1 className="text-5xl font-black mt-3">
            My Tickets
          </h1>

          <p className="text-zinc-500 mt-4">
            Manage your movie bookings and upcoming cinema visits.
          </p>

        </div>

      </section>

      {/* TICKETS */}

      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">

        {/* FILTER */}

        <div className="flex gap-2 mb-8">

          {["All", "Confirmed", "Pending", "Cancelled"].map(
            (item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold ${
                  filter === item
                    ? "bg-red-600"
                    : "bg-[#151515] border border-white/10 text-zinc-400"
                }`}
              >
                {item}
              </button>
            )
          )}

        </div>

        {visibleTickets.length === 0 ? (

          <div className="bg-[#111] border border-white/10 rounded-3xl p-14 text-center">

            <div className="w-20 h-20 mx-auto rounded-2xl bg-red-500/10 flex items-center justify-center text-4xl">
              🎟️
            </div>

            <h2 className="text-2xl font-bold mt-6">
              No tickets yet
            </h2>

            <p className="text-zinc-500 mt-2">
              Your movie bookings will appear here.
            </p>

            <button
              onClick={() => router.push("/movies")}
              className="mt-6 px-7 py-3 bg-red-600 hover:bg-red-700 rounded-xl font-bold"
            >
              Book a Movie →
            </button>

          </div>

        ) : (

          <div className="space-y-5">

            {visibleTickets.map((ticket) => (

              <article
                key={ticket.id}
                className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden"
              >

                <div className="flex flex-col md:flex-row">

                  {/* Movie visual */}

                  <div className="md:w-52 h-48 md:h-auto bg-gradient-to-br from-red-950 via-purple-950 to-black flex items-center justify-center text-7xl">
                    🎬
                  </div>

                  {/* Details */}

                  <div className="flex-1 p-6">

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                      <div>
                        <p className="text-xs text-red-500 font-bold uppercase tracking-wider">
                          Movie Ticket
                        </p>

                        <h2 className="text-2xl font-bold mt-1">
                          {ticket.movie}
                        </h2>
                      </div>

                      <span
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          ticket.status === "Confirmed"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : ticket.status === "Pending"
                            ? "bg-yellow-500/10 text-yellow-400"
                            : "bg-red-500/10 text-red-400"
                        }`}
                      >
                        {ticket.status}
                      </span>

                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-6">

                      <div>
                        <p className="text-xs text-zinc-600">
                          Cinema
                        </p>
                        <p className="text-sm text-zinc-300 mt-1">
                          {ticket.cinema}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Date
                        </p>
                        <p className="text-sm text-zinc-300 mt-1">
                          {ticket.date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Showtime
                        </p>
                        <p className="text-sm text-zinc-300 mt-1">
                          {ticket.time}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600">
                          Seats
                        </p>
                        <p className="text-sm text-zinc-300 mt-1">
                          {ticket.seats.join(", ")}
                        </p>
                      </div>

                    </div>

                    <div className="border-t border-white/10 mt-6 pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                      <div>
                        <p className="text-xs text-zinc-600">
                          Booking ID
                        </p>

                        <p className="text-sm font-mono text-zinc-400 mt-1">
                          {ticket.id}
                        </p>
                      </div>

                      <div className="flex items-center gap-5">

                        <div className="text-right">
                          <p className="text-xs text-zinc-600">
                            Total
                          </p>

                          <p className="text-xl font-bold">
                            PKR {ticket.total.toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            router.push(
                              `/ticket/${ticket.id}`
                            )
                          }
                          className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-red-600 transition font-semibold"
                        >
                          View Ticket
                        </button>

                      </div>

                    </div>

                  </div>

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
