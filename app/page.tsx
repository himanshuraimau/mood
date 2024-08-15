import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = "/new-user";
  if (userId) {
    href = "/journal";
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-700 via-blue-700 to-blue-500 flex flex-col justify-center items-center text-white">
      <div className="w-full max-w-[600px] mx-auto text-center p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-sm">
        <h1 className="text-4xl font-bold mb-4 animate-fadeIn">
          Mood: Your Personal Journal
        </h1>
        <p className="text-xl text-white/70 mb-6 animate-fadeIn delay-1">
          Reflect on your day, track your emotions, and discover yourself.
        </p>
        <div className="flex justify-center gap-4">
          <Link href={href}>
            <button className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-lg text-lg transition-all duration-300 shadow-md transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </div>
      </div>

      {/* Additional Content Section */}
     
    </div>
  );
}
