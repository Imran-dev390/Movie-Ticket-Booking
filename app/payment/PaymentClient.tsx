"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TICKET_PRICE = 800;

type PaymentMethod = "jazzcash" | "easypaisa" | "bank";

export default function PaymentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [user, setUser] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>("jazzcash");

  const [phone, setPhone] = useState("");
  const [accountName, setAccountName] = useState("");
  const [processing, setProcessing] = useState(false);

  // Get booking details
  const movie = searchParams.get("movie") || "Unknown Movie";
  const cinema =
    searchParams.get("cinema") || "CineBook Islamabad";
  const date = searchParams.get("date") || "Today";
  const time = searchParams.get("time") || "";
  const tickets = Number(searchParams.get("tickets")) || 1;

  const seatsParam = searchParams.get("seats") || "";
  const seats = seatsParam
    ? seatsParam.split(",").filter(Boolean)
    : [];

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

  function selectPaymentMethod(method: PaymentMethod) {
    setPaymentMethod(method);
  }

  function handlePayment(e: React.FormEvent) {
    e.preventDefault();

    if (!phone) {
      alert("Please enter your wallet/mobile number.");
      return;
    }

    if (phone.length < 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    setProcessing(true);

    // Demo payment simulation
    setTimeout(() => {
      setProcessing(false);

      const booking = {
        id: `CB-${Date.now()}`,
        movie,
        cinema,
        date,
        time,
        tickets,
        seats,
        total,
        paymentMethod,
        phone,
        accountName,
        createdAt: new Date().toISOString(),
      };

      // Save booking locally for demo purposes
      localStorage.setItem(
        "lastBooking",
        JSON.stringify(booking)
      );

      router.push(
        `/success?bookingId=${encodeURIComponent(
          booking.id
        )}`
      );
    }, 1500);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-[#080808] flex items-center justify-center">

        <div className="flex flex-col items-center gap-4">

          <div className="w-10 h-10 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin" />

          <p className="text-zinc-500">
            Loading payment...
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

            <div className="flex items-center gap-2 text-xs text-zinc-500">
              🔒 Secure Checkout
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

            {/* Show */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                ✓
              </div>

              <span className="hidden sm:block text-sm font-semibold">
                Show
              </span>

            </div>

            <div className="w-10 sm:w-24 h-px bg-red-600 mx-3" />

            {/* Seats */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                ✓
              </div>

              <span className="hidden sm:block text-sm font-semibold">
                Seats
              </span>

            </div>

            <div className="w-10 sm:w-24 h-px bg-red-600 mx-3" />

            {/* Payment */}

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-red-600 flex items-center justify-center text-sm font-bold">
                3
              </div>

              <span className="hidden sm:block text-sm font-semibold">
                Payment
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* PAGE */}
      {/* ================================================= */}

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="mb-8">

          <button
            onClick={() => router.back()}
            className="text-sm text-zinc-500 hover:text-white transition mb-5"
          >
            ← Back to seats
          </button>

          <p className="text-red-500 text-sm font-bold uppercase tracking-widest">
            Step 3 of 3
          </p>

          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            Complete your payment
          </h1>

          <p className="text-zinc-500 mt-2">
            Choose your preferred payment method to confirm your tickets.
          </p>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_370px] gap-8">

          {/* ================================================= */}
          {/* PAYMENT */}
          {/* ================================================= */}

          <form onSubmit={handlePayment}>

            <div className="bg-[#111] border border-white/10 rounded-3xl p-5 sm:p-8">

              <h2 className="text-xl font-bold">
                Payment method
              </h2>

              <p className="text-sm text-zinc-500 mt-1">
                Select how you want to pay.
              </p>

              {/* PAYMENT METHODS */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-7">

                {/* JAZZCASH */}

                <button
                  type="button"
                  onClick={() =>
                    selectPaymentMethod("jazzcash")
                  }
                  className={`
                    text-left p-4 rounded-2xl border transition
                    ${
                      paymentMethod === "jazzcash"
                        ? "border-red-500 bg-red-500/10"
                        : "border-white/10 bg-[#0b0b0b] hover:border-white/20"
                    }
                  `}
                >

                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white font-black text-xs">
                    JC
                  </div>

                  <p className="font-bold mt-4">
                    JazzCash
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    Mobile wallet
                  </p>

                  {paymentMethod === "jazzcash" && (
                    <div className="text-red-500 text-xs font-bold mt-3">
                      ✓ Selected
                    </div>
                  )}

                </button>

                {/* EASYPAISA */}

                <button
                  type="button"
                  onClick={() =>
                    selectPaymentMethod("easypaisa")
                  }
                  className={`
                    text-left p-4 rounded-2xl border transition
                    ${
                      paymentMethod === "easypaisa"
                        ? "border-green-500 bg-green-500/10"
                        : "border-white/10 bg-[#0b0b0b] hover:border-white/20"
                    }
                  `}
                >

                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center text-white font-black text-xs">
                    EP
                  </div>

                  <p className="font-bold mt-4">
                    Easypaisa
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    Mobile wallet
                  </p>

                  {paymentMethod === "easypaisa" && (
                    <div className="text-green-400 text-xs font-bold mt-3">
                      ✓ Selected
                    </div>
                  )}

                </button>

                {/* BANK */}

                <button
                  type="button"
                  onClick={() =>
                    selectPaymentMethod("bank")
                  }
                  className={`
                    text-left p-4 rounded-2xl border transition
                    ${
                      paymentMethod === "bank"
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 bg-[#0b0b0b] hover:border-white/20"
                    }
                  `}
                >

                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                    🏦
                  </div>

                  <p className="font-bold mt-4">
                    Bank Wallet
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    Online banking
                  </p>

                  {paymentMethod === "bank" && (
                    <div className="text-blue-400 text-xs font-bold mt-3">
                      ✓ Selected
                    </div>
                  )}

                </button>

              </div>

              {/* ================================================= */}
              {/* PAYMENT FORM */}
              {/* ================================================= */}

              <div className="mt-8 pt-8 border-t border-white/10">

                {paymentMethod === "jazzcash" && (
                  <div>

                    <div className="flex items-center gap-3 mb-6">

                      <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-xs font-black">
                        JC
                      </div>

                      <div>
                        <h3 className="font-bold">
                          Pay with JazzCash
                        </h3>

                        <p className="text-xs text-zinc-500">
                          Enter your JazzCash mobile number.
                        </p>
                      </div>

                    </div>

                    <PaymentInput
                      label="JazzCash Mobile Number"
                      placeholder="03XX XXXXXXX"
                      value={phone}
                      onChange={setPhone}
                    />

                  </div>
                )}

                {paymentMethod === "easypaisa" && (
                  <div>

                    <div className="flex items-center gap-3 mb-6">

                      <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center text-xs font-black">
                        EP
                      </div>

                      <div>
                        <h3 className="font-bold">
                          Pay with Easypaisa
                        </h3>

                        <p className="text-xs text-zinc-500">
                          Enter your Easypaisa mobile number.
                        </p>
                      </div>

                    </div>

                    <PaymentInput
                      label="Easypaisa Mobile Number"
                      placeholder="03XX XXXXXXX"
                      value={phone}
                      onChange={setPhone}
                    />

                  </div>
                )}

                {paymentMethod === "bank" && (
                  <div>

                    <div className="flex items-center gap-3 mb-6">

                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                        🏦
                      </div>

                      <div>
                        <h3 className="font-bold">
                          Bank Wallet
                        </h3>

                        <p className="text-xs text-zinc-500">
                          Enter your bank wallet details.
                        </p>
                      </div>

                    </div>

                    <div className="space-y-5">

                      <div>

                        <label className="text-sm font-semibold text-zinc-300">
                          Account Name
                        </label>

                        <input
                          value={accountName}
                          onChange={(e) =>
                            setAccountName(e.target.value)
                          }
                          placeholder="Enter account name"
                          className="w-full mt-2 bg-[#080808] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-blue-500 transition"
                        />

                      </div>

                      <PaymentInput
                        label="Mobile / Account Number"
                        placeholder="03XX XXXXXXX"
                        value={phone}
                        onChange={setPhone}
                      />

                    </div>

                  </div>
                )}

              </div>

              {/* SECURITY */}

              <div className="mt-8 bg-[#080808] border border-white/5 rounded-2xl p-4">

                <div className="flex gap-3">

                  <div className="text-green-500">
                    🔒
                  </div>

                  <div>

                    <p className="text-sm font-semibold">
                      Secure checkout
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">
                      Your payment information is protected.
                    </p>

                  </div>

                </div>

              </div>

              {/* PAY BUTTON */}

              <button
                type="submit"
                disabled={processing}
                className="w-full mt-7 bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:text-red-300 py-4 rounded-xl font-bold text-lg transition shadow-lg shadow-red-900/30"
              >
                {processing
                  ? "Processing payment..."
                  : `Pay PKR ${total.toLocaleString()}`}
              </button>

            </div>

          </form>

          {/* ================================================= */}
          {/* ORDER SUMMARY */}
          {/* ================================================= */}

          <aside className="lg:sticky lg:top-28 h-fit">

            <div className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden">

              <div className="p-6 border-b border-white/10">

                <p className="text-xs text-red-500 font-bold uppercase tracking-widest">
                  Order Summary
                </p>

                <h2 className="text-xl font-bold mt-2">
                  Your tickets
                </h2>

              </div>

              {/* MOVIE */}

              <div className="p-6 border-b border-white/10">

                <div className="flex gap-4">

                  <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-red-950 to-black border border-white/10 flex items-center justify-center text-3xl">
                    🎬
                  </div>

                  <div className="flex-1">

                    <h3 className="font-bold">
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

              {/* DETAILS */}

              <div className="p-6 border-b border-white/10 space-y-4">

                <div className="flex justify-between text-sm">

                  <span className="text-zinc-500">
                    Tickets
                  </span>

                  <span>
                    {tickets}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-zinc-500">
                    Seats
                  </span>

                  <span className="text-right">
                    {seats.length > 0
                      ? seats.join(", ")
                      : "Not selected"}
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-zinc-500">
                    Price / ticket
                  </span>

                  <span>
                    PKR {TICKET_PRICE.toLocaleString()}
                  </span>

                </div>

              </div>

              {/* TOTAL */}

              <div className="p-6">

                <div className="flex items-end justify-between">

                  <div>

                    <p className="text-sm text-zinc-500">
                      Total
                    </p>

                    <p className="text-xs text-zinc-600 mt-1">
                      {tickets} × PKR{" "}
                      {TICKET_PRICE.toLocaleString()}
                    </p>

                  </div>

                  <p className="text-2xl font-black">
                    PKR {total.toLocaleString()}
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-black py-8 mt-8">

        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-zinc-600">
          © 2026 CineBook. Movie tickets made simple.
        </div>

      </footer>

    </main>
  );
}


/* ================================================= */
/* PAYMENT INPUT */
/* ================================================= */

function PaymentInput({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="text-sm font-semibold text-zinc-300">
        {label}
      </label>

      <input
        type="tel"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full mt-2 bg-[#080808] border border-white/10 rounded-xl px-4 py-4 text-white outline-none focus:border-red-500 transition"
      />

    </div>
  );
}
