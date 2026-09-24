import { Suspense } from "react";
import BookingContext from "./BookingContext";

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin mx-auto" />

            <p className="text-zinc-400 mt-4">
              Loading booking...
            </p>
          </div>
        </main>
      }
    >
      <BookingContext />
    </Suspense>
  );
}
