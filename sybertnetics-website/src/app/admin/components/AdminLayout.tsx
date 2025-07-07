"use client";
import { useRouter } from 'next/navigation';
import { Briefcase, Newspaper, PenSquare, LogOut, FileText, Globe, Loader2 } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '@/utils/firebase';
import { useAuth } from '@/utils/useAuth';
import Link from 'next/link';

const navLinks = [
  { href: '/admin/content', label: 'Content Management', icon: FileText },
  { href: '/admin/page-content', label: 'Page Content', icon: Globe },
  { href: '/admin/careers', label: 'Manage Careers', icon: Briefcase },
  { href: '/admin/blog', label: 'Manage Blog', icon: PenSquare },
  { href: '/admin/news', label: 'Manage News', icon: Newspaper },
];

export default function AdminLayout({ children, title }: { children: React.ReactNode, title: string }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/admin/login');
    return null;
  }

  // Debug: Log user info to console
  console.log('Admin user authenticated:', {
    uid: user.uid,
    email: user.email,
    emailVerified: user.emailVerified,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <aside className="fixed inset-y-0 left-0 bg-white w-64 p-4 shadow-md flex flex-col">
        <div className="flex items-center space-x-2 mb-10">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <span className="text-gray-900 font-semibold text-xl">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-grow">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="flex items-center space-x-3 text-gray-600 hover:bg-gray-100 p-2 rounded-md">
              <link.icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="border-t pt-4">
          <div className="text-sm text-gray-500 mb-2 px-2">
            Signed in as: {user.email}
          </div>
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-3 text-red-600 hover:bg-red-50 p-2 rounded-md w-full"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{title}</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {children}
        </div>
      </main>
    </div>
  );
} 