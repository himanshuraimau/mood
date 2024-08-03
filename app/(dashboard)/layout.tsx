import { UserButton } from "@clerk/nextjs";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex bg-zinc-200/50">
      <aside className="w-64 bg-white shadow-lg">
        <div className="h-20 pt-5 pl-[25%] border-b">
          <h2 className="text-3xl font-semibold text-indigo-700">Mood</h2>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white shadow-sm flex items-center justify-between px-6">
          <h1 className="text-2xl font-bold text-gray-700 p-4">Dashboard</h1>
          <UserButton afterSignOutUrl="/" />
        </header>
        <main className="flex-1 overflow-y-auto p-6 bg-white shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
