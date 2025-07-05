"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/runedrive', label: 'Home' },
  { href: '/runedrive/about', label: 'About' },
  { href: '/runedrive/universe', label: 'Universe' },
  { href: '/runedrive/creators', label: 'Creators' },
  { href: '/runedrive/community', label: 'Community' },
  { href: '/runedrive/blog', label: 'Blog' },
];

export default function RuneDriveHeader() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/runedrive" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Rune Drive
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-purple-300 font-medium"
                    : "text-indigo-200 hover:text-purple-300 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/runedrive/beta"
            className="hidden md:flex bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
          >
            Join Beta
          </Link>
        </div>
      </div>
    </header>
  );
} 