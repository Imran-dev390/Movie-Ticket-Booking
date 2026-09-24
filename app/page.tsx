"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

type User = {
name: string;
email: string;
};

export default function Page() {
const router = useRouter();

useEffect(() => {
const checkUser = () => {
const storedUser = localStorage.getItem("user");

  // No user found → go to signup
  if (!storedUser) {
    router.replace("/signup");
    return;
  }

  try {
    const parsedUser: User = JSON.parse(storedUser);

    // Make sure the stored user has the required data
    if (
      !parsedUser ||
      typeof parsedUser.name !== "string" ||
      typeof parsedUser.email !== "string" ||
      !parsedUser.name.trim() ||
      !parsedUser.email.trim()
    ) {
      localStorage.removeItem("user");
      router.replace("/signup");
      return;
    }

    // Valid user → go to home
    router.replace("/home");
  } catch (error) {
    // Corrupted localStorage data
    console.error("Invalid user data:", error);

    localStorage.removeItem("user");
    router.replace("/signup");
  }
};

checkUser();


}, [router]);

return (
<main className="min-h-screen bg-[#080808] text-white flex items-center justify-center">
<div className="flex flex-col items-center justify-center text-center px-6">

    {/* Logo */}
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/20">
      <span className="text-3xl">🎬</span>
    </div>

    {/* Brand */}
    <h1 className="text-2xl font-black mt-5">
      CineBook
    </h1>

    <p className="text-xs text-zinc-600 uppercase tracking-[0.25em] mt-1">
      Movie Tickets
    </p>

    {/* Loading spinner */}
    <div className="mt-8">
      <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />
    </div>

    {/* Loading text */}
    <p className="text-zinc-500 text-sm mt-5">
      Checking your account...
    </p>

  </div>
</main>


);
}