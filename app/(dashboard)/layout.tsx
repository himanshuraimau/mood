import { UserButton } from "@clerk/nextjs";

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
  {href: '/history', label: 'History'},
];

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex bg-gradient-to-r from-indigo-50 to-blue-100">
      <aside className="w-64 bg-white shadow-xl">
        <div className="h-20 flex items-center justify-center border-b">
          <h2 className="text-3xl font-bold text-indigo-600">Mood</h2>
        </div>
        <ul className="mt-6 space-y-2">
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <a
                href={href}
                className="block py-3 px-6 rounded-lg text-lg font-medium text-gray-700 hover:bg-indigo-100 hover:text-indigo-800 transition-colors"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white shadow-md flex items-center justify-between px-6">
          <h1 className="text-3xl font-bold text-indigo-700">Dashboard</h1>
          <UserButton  />
        </header>
        <main className="flex-1 overflow-y-auto p-8 bg-white shadow-inner rounded-tl-xl">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
