"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TICKET_PRICE = 800;

// Seats that are already booked
const occupiedSeats = [
  "A3",
  "A4",
  "B6",
  "C2",
  "C3",
  "D5",
  "E1",
  "F4",
  "G7",
];

const rows = ["A", "B", "C", "D", "E", "F", "G", "H"];
const seatsPerRow = 8;

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Get booking information from URL
  const movie = searchParams.get("movie") || "Unknown Movie";
  const cinema = searchParams.get("cinema") || "CineBook Islamabad";
  const date = searchParams.get("date") || "Today";
  const time = searchParams.get("time") || "";
  const tickets = Number(searchParams.get("tickets")) || 1;

  const total = tickets * TICKET_PRICE;

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

  function toggleSeat(seat: string) {
    // Do nothing if seat is occupied
    if (occupiedSeats.includes(seat)) {
      return;
    }

    // If already selected, remove it
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(
        selectedSeats.filter((selected) => selected !== seat)
      );
      return;
    }

    // Don't allow more seats than purchased
    if (selectedSeats.length >= tickets) {
      return;
    }

    setSelectedSeats([...selectedSeats, seat]);
  }

  function continueToPayment() {
    if (selectedSeats.length !== tickets) {
      alert(
        `Please select exactly ${tickets} ${
          tickets === 1 ? "seat" : "seats"
        }.`
      );
      return;
    }

    const seats = selectedSeats.join(",");

    router.push(
      `/payment?movie=${encodeURIComponent(
        movie
      )}&cinema=${encodeURIComponent(
        cinema
      )}&date=${encodeURIComponent(
        date
      )}&time=${encodeURIComponent(
        time
      )}&tickets=${tickets}&seats=${encodeURIComponent(seats)}`
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />

          <p className="text-zinc-500">
            Loading booking...
          </p>

        </div>
      </main>
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

              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-900/20">
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

            <div className="hidden sm:flex items-center gap-3 text-sm">

              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <span className="text-zinc-400">
                {user.name}
              </span>

            </div>

          </div>

        </div>

      </nav>

      {/* ================================================= */}
      {/* PROGRESS */}
      {/* ================================================= */}

      <div className="border-b border-white/10 bg-[#0d0d0d]">

        <div className="max-w-5xl mx-auto px-4 py-5">

          <div className="flex items-center justify-center">

            {/* Step 1 */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                ✓
              </div>

              <span className="hidden sm:block text-sm font-semibold text-white">
                Show
              </span>

            </div>

            <div className="w-12 sm:w-24 h-px bg-red-600 mx-3" />

            {/* Step 2 */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                2
              </div>

              <span className="hidden sm:block text-sm font-semibold text-white">
                Seats
              </span>

            </div>

            <div className="w-12 sm:w-24 h-px bg-white/10 mx-3" />

            {/* Step 3 */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-sm text-zinc-500 font-bold">
                3
              </div>

              <span className="hidden sm:block text-sm text-zinc-500">
                Payment
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* HEADER */}

        <div className="mb-8">

          <button
            onClick={() => router.back()}
            className="text-sm text-zinc-500 hover:text-white transition mb-5"
          >
            ← Back
          </button>

          <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
            Step 2 of 3
          </p>

          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            Choose your seats
          </h1>

          <p className="text-zinc-500 mt-2">
            Select {tickets} {tickets === 1 ? "seat" : "seats"} for your movie.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

          {/* ================================================= */}
          {/* SEAT AREA */}
          {/* ================================================= */}

          <div className="bg-[#111] border border-white/10 rounded-3xl p-5 sm:p-8">

            {/* Movie information */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-7 border-b border-white/10">

              <div>

                <h2 className="font-bold text-lg">
                  {movie}
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {cinema}
                </p>

              </div>

              <div className="text-left sm:text-right">

                <p className="text-sm font-semibold">
                  {date}
                </p>

                <p className="text-sm text-red-400 font-semibold mt-1">
                  {time || "Showtime"}
                </p>

              </div>

            </div>

            {/* SCREEN */}

            <div className="mt-10">

              <div className="relative mx-auto max-w-2xl">

                <div className="h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full blur-sm" />

                <div className="h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                <p className="text-center text-[10px] text-zinc-600 uppercase tracking-[0.4em] mt-4">
                  Screen
                </p>

              </div>

            </div>

            {/* SEATS */}

            <div className="mt-12 overflow-x-auto">

              <div className="min-w-[520px]">

                {rows.map((row) => (

                  <div
                    key={row}
                    className="flex items-center justify-center gap-2 sm:gap-3 mb-3"
                  >

                    {/* Row label */}

                    <span className="w-6 text-xs text-zinc-600 font-bold">
                      {row}
                    </span>

                    {Array.from(
                      { length: seatsPerRow },
                      (_, index) => {

                        const seatNumber = index + 1;
                        const seat = `${row}${seatNumber}`;

                        const isOccupied =
                          occupiedSeats.includes(seat);

                        const isSelected =
                          selectedSeats.includes(seat);

                        return (
                          <button
                            key={seat}
                            onClick={() => toggleSeat(seat)}
                            disabled={isOccupied}
                            className={`
                              relative
                              w-10
                              h-10
                              sm:w-11
                              sm:h-11
                              rounded-t-xl
                              rounded-b-md
                              text-xs
                              font-bold
                              transition
                              border
                              ${
                                isOccupied
                                  ? "bg-zinc-800 border-zinc-700 text-zinc-600 cursor-not-allowed"
                                  : isSelected
                                  ? "bg-red-600 border-red-500 text-white shadow-lg shadow-red-900/40 scale-105"
                                  : "bg-zinc-900 border-white/10 text-zinc-400 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400"
                              }
                            `}
                          >
                            {seatNumber}

                            {/* Seat back decoration */}

                            <span
                              className={`absolute left-1/2 -translate-x-1/2 bottom-[-3px] w-6 h-1 rounded-full ${
                                isOccupied
                                  ? "bg-zinc-700"
                                  : isSelected
                                  ? "bg-red-400"
                                  : "bg-white/10"
                              }`}
                            />

                          </button>
                        );
                      }
                    )}

                    <span className="w-6 text-xs text-zinc-600 font-bold">
                      {row}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* LEGEND */}

            <div className="flex flex-wrap justify-center gap-6 mt-10 pt-7 border-t border-white/10">

              <Legend
                color="bg-zinc-900 border-white/10"
                label="Available"
              />

              <Legend
                color="bg-red-600 border-red-500"
                label="Selected"
              />

              <Legend
                color="bg-zinc-800 border-zinc-700"
                label="Occupied"
              />

            </div>

          </div>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <aside className="lg:sticky lg:top-28 h-fit">

            <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden">

              {/* Header */}

              <div className="p-6 border-b border-white/10">

                <p className="text-xs text-red-500 font-bold uppercase tracking-widest">
                  Your booking
                </p>

                <h2 className="text-xl font-bold mt-2">
                  Order Summary
                </h2>

              </div>

              {/* Movie */}

              <div className="p-6 border-b border-white/10">

                <div className="flex gap-4">

                  <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-red-950 to-black border border-white/10 flex items-center justify-center text-3xl">
                    🎬
                  </div>

                  <div className="flex-1">

                    <h3 className="font-bold leading-tight">
                      {movie}
                    </h3>

                    <p className="text-xs text-zinc-500 mt-2">
                      {cinema}
                    </p>

                    <p className="text-xs text-zinc-500 mt-1">
                      {date} • {time}
                    </p>

                  </div>

                </div>

              </div>

              {/* Selected seats */}

              <div className="p-6 border-b border-white/10">

                <div className="flex justify-between items-center">

                  <p className="text-sm font-semibold">
                    Selected Seats
                  </p>

                  <span className="text-xs text-zinc-500">
                    {selectedSeats.length}/{tickets}
                  </span>

                </div>

                {selectedSeats.length === 0 ? (

                  <div className="mt-4 bg-[#080808] border border-dashed border-white/10 rounded-xl py-5 text-center">

                    <p className="text-sm text-zinc-600">
                      No seats selected
                    </p>

                  </div>

                ) : (

                  <div className="flex flex-wrap gap-2 mt-4">

                    {selectedSeats.map((seat) => (

                      <button
                        key={seat}
                        onClick={() => toggleSeat(seat)}
                        className="px-3 py-2 rounded-lg bg-red-600/15 border border-red-500/30 text-red-400 text-sm font-bold hover:bg-red-600 hover:text-white transition"
                      >
                        {seat} ×
                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* Price */}

              <div className="p-6">

                <div className="flex justify-between text-sm">

                  <span className="text-zinc-500">
                    Ticket price
                  </span>

                  <span>
                    PKR {TICKET_PRICE.toLocaleString()}
                  </span>

                </div>

                <div className="flex justify-between text-sm mt-3">

                  <span className="text-zinc-500">
                    Tickets
                  </span>

                  <span>
                    × {tickets}
                  </span>

                </div>

                <div className="border-t border-white/10 mt-5 pt-5">

                  <div className="flex items-end justify-between">

                    <span className="text-zinc-400">
                      Total
                    </span>

                    <span className="text-2xl font-black">
                      PKR {total.toLocaleString()}
                    </span>

                  </div>

                </div>

                {/* Continue */}

                <button
                  onClick={continueToPayment}
                  className={`
                    w-full
                    mt-6
                    py-4
                    rounded-xl
                    font-bold
                    transition
                    ${
                      selectedSeats.length === tickets
                        ? "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30"
                        : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                    }
                  `}
                >
                  Continue to Payment →
                </button>

                <p className="text-center text-[11px] text-zinc-600 mt-4">
                  🔒 Secure booking
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-black py-8 mt-8">

        <div className="max-w-7xl mx-auto px-4 text-center">

          <p className="text-sm text-zinc-600">
            © 2026 CineBook. Movie tickets made simple.
          </p>

        </div>

      </footer>

    </main>
  );
}


/* ================================================= */
/* LEGEND COMPONENT */
/* ================================================= */

function Legend({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`w-4 h-4 rounded-md border ${color}`}
      />

      <span className="text-xs text-zinc-500">
        {label}
      </span>

    </div>
  );
}
