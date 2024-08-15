import { UserButton } from "@clerk/nextjs";

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  { href: '/history', label: 'History' },
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex bg-gradient-to-r from-gray-50 to-blue-50">
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="h-20 flex items-center justify-center border-b border-gray-200">
          <h2 className="text-3xl font-bold text-indigo-700">Mood</h2>
        </div>
        <ul className="mt-6 space-y-2 pl-6">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a
                href={href}
                className="block py-3 px-4 rounded-lg text-lg font-medium text-gray-800 hover:bg-indigo-100 hover:text-indigo-900 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white shadow-md flex items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-2xl font-semibold text-indigo-800">Dashboard</h1>
          <UserButton />
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-gray-100 rounded-tl-lg">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
