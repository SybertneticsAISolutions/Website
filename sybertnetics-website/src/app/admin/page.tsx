"use client";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Briefcase, Newspaper, PenSquare, LogOut } from 'lucide-react';

// Admin dashboard placeholder
// TODO: Add content management features and protect this route with JWT authentication

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = async () => {
    // Call the API route to clear the auth cookie
    await fetch('/api/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  const navLinks = [
    { href: '/admin/careers', label: 'Manage Careers', icon: Briefcase },
    { href: '/admin/blog', label: 'Manage Blog', icon: PenSquare },
    { href: '/admin/news', label: 'Manage News', icon: Newspaper },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed inset-y-0 left-0 bg-white w-64 p-4 shadow-md">
        <div className="flex items-center space-x-2 mb-10">
          <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">S</span>
          </div>
          <span className="text-gray-900 font-semibold text-xl">Admin Panel</span>
        </div>
        
        <nav className="space-y-2">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 p-2 rounded-md">
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <button 
          onClick={handleLogout} 
          className="absolute bottom-4 left-4 right-4 flex items-center space-x-3 text-red-600 hover:bg-red-50 p-2 rounded-md"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </aside>

      <main className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin</h1>
        <p className="text-gray-600 mt-2">
          Select a section from the sidebar to manage your website's content.
        </p>
      </main>
    </div>
  );
} 