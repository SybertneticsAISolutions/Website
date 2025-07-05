"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/home', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/blog', label: 'Blog' },
  { href: '/news', label: 'News' },
  { href: '/runedrive', label: 'Rune Drive' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-gray-900 font-semibold text-xl">Sybertnetics</span>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-emerald-600 font-medium"
                    : "text-gray-600 hover:text-gray-900 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/contact"
            className="hidden md:flex bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-700 transition-all duration-300"
          >
            Get Started
          </Link>

          {/* TODO: Add a mobile menu button here */}
        </div>
      </div>
    </header>
  );
} 