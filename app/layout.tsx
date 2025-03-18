import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mood - Your Personal Journal',
  description: 'Track your emotions and discover yourself with AI-powered insights',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className={`${inter.className} min-h-full`}>
          <div className="min-h-screen flex flex-col">
            <main className="flex-grow flex flex-col">
              {children}
            </main>
            <footer className="py-6 px-4 bg-gradient-to-r from-teal-900 to-teal-800">
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-white/80">
                <p className="text-sm">&copy; {new Date().getFullYear()} Mood Journal. All rights reserved.</p>
                <div className="flex gap-6 mt-4 sm:mt-0">
                  <a href="#" className="hover:text-white transition-colors">Privacy</a>
                  <a href="#" className="hover:text-white transition-colors">Terms</a>
                  <a href="#" className="hover:text-white transition-colors">Contact</a>
                </div>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
