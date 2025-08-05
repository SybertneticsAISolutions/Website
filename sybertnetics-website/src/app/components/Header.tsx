"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { ChevronDown, Settings, LogOut } from 'lucide-react';
import { useSupabaseAuth } from '../../utils/useSupabaseAuth';
// import { auth } from '../../utils/firebase';
// import { signOut } from 'firebase/auth';

const navLinks = [
  { href: '/', label: 'Landing' },
  { href: '/home', label: 'Home' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

const projectLinks = [
  { href: '/sybercraft', label: 'SyberCraft' },
  { href: '/runa', label: 'RUNA' },
  { href: '/runedrive', label: 'RuneDrive' },
];

const adminLinks = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/careers', label: 'Careers' },
  { href: '/admin/blog', label: 'Blog' },
  { href: '/admin/news', label: 'News' },
  { href: '/admin/beta-signups', label: 'Beta Signups' },
  { href: '/admin/newsletter', label: 'Newsletter' },
];

export default function Header() {
  const pathname = usePathname();
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);
  const { user, isAdmin, loading, signOut } = useSupabaseAuth();

  const handleLogout = async () => {
    await signOut();
    setShowAdminDropdown(false);
    window.location.href = '/';
  };

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
          
          <nav className="hidden md:flex space-x-8 items-center">
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
            
            {/* Projects Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <span>Projects</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showProjectsDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                  {projectLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowProjectsDropdown(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* Admin Dropdown */}
            {!loading && isAdmin && (
              <div className="relative">
                <button
                  onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  <span>Admin</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {showAdminDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1">
                    {adminLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowAdminDropdown(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}
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