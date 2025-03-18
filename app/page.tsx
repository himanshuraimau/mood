import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();
  let href = "/new-user";
  if (userId) {
    href = "/journal";
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-teal-400 via-teal-200 to-teal-600 flex flex-col justify-center items-center text-gray-800">
      <div className="w-full max-w-[700px] mx-auto text-center p-8 rounded-2xl shadow-2xl bg-white/20 backdrop-blur-md border border-white/30 hover:bg-white/25 transition-all duration-300">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-900 to-teal-700 bg-clip-text text-transparent animate-fadeIn">
          Mood: Your Personal Journal
        </h1>
        <p className="text-2xl text-gray-800/90 mb-8 animate-fadeIn delay-1 font-light">
          Reflect on your day, track your emotions, and discover yourself.
        </p>
        <div className="flex flex-col gap-6 items-center">
          <Link href={href} className="w-full max-w-md">
            <button className="w-full bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 px-8 py-4 rounded-xl text-xl font-semibold text-white transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Begin Your Journey
            </button>
          </Link>
          <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mt-12">
            <div className="p-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <h3 className="font-semibold text-teal-900">Daily Reflections</h3>
              <p className="text-sm text-gray-700">Track your thoughts and feelings</p>
            </div>
            <div className="p-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <h3 className="font-semibold text-teal-900">Mood Analysis</h3>
              <p className="text-sm text-gray-700">Understand your emotions</p>
            </div>
            <div className="p-4 rounded-lg bg-white/30 backdrop-blur-sm hover:bg-white/40 transition-all duration-300">
              <h3 className="font-semibold text-teal-900">AI Insights</h3>
              <p className="text-sm text-gray-700">Get personalized feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
