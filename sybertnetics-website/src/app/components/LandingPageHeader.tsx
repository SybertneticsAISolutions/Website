"use client";

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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

export default function LandingPageHeader() {
  const [showProjectsDropdown, setShowProjectsDropdown] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="font-semibold text-xl">
              <span className="text-blue-400">Syber</span>
              <span className="text-emerald-400">t</span>
              <span className="text-white">netics</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            
            {/* Projects Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProjectsDropdown(!showProjectsDropdown)}
                className="flex items-center space-x-1 text-white/80 hover:text-white transition-colors"
              >
                <span>Projects</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {showProjectsDropdown && (
                <div className="absolute left-0 mt-2 w-48 bg-white/10 backdrop-blur-md rounded-md shadow-lg border border-white/20 py-1">
                  {projectLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block px-4 py-2 text-sm text-white/80 hover:bg-white/20 hover:text-white"
                      onClick={() => setShowProjectsDropdown(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <Link
            href="/contact"
            className="hidden md:flex bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Link>

          {/* TODO: Add a mobile menu button here */}
        </div>
      </div>
    </header>
  );
} 