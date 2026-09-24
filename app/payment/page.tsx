import { Suspense } from "react";
import PaymentClient from "./PaymentClient";

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />

            <p className="text-zinc-500">
              Loading payment...
            </p>
          </div>
        </main>
      }
    >
      <PaymentClient />
    </Suspense>
  );
}
