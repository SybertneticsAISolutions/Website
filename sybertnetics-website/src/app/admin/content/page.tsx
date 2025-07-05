"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '../components/AdminLayout';
import ContentEditor from '../components/ContentEditor';

const PAGES = [
  { path: 'home', name: 'Home Page' },
  { path: 'about', name: 'About Page' },
  { path: 'runedrive', name: 'RuneDrive Main Page' },
  { path: 'runedrive/about', name: 'RuneDrive About Page' },
  { path: 'runedrive/universe', name: 'RuneDrive Universe Page' },
  { path: 'runedrive/creators', name: 'RuneDrive Creators Page' },
  { path: 'runedrive/community', name: 'RuneDrive Community Page' },
  { path: 'runedrive/blog', name: 'RuneDrive Blog Page' },
  { path: 'runedrive/demo', name: 'RuneDrive Demo Page' },
  { path: 'solutions', name: 'Solutions Page' },
  { path: 'contact', name: 'Contact Page' },
  { path: 'careers', name: 'Careers Page' },
];

export default function ContentManagement() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth-check', {
          method: 'GET',
          credentials: 'include'
        });
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleSave = async (content: string) => {
    if (!selectedPage) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`/api/content/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        setMessage('Content saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      } else {
        const error = await response.json();
        setMessage(`Error: ${error.error}`);
        setTimeout(() => setMessage(''), 5000);
      }
    } catch {
      setMessage('Network error. Please try again.');
      setTimeout(() => setMessage(''), 5000);
    }
  };

  const handleCancel = () => {
    setSelectedPage(null);
    setMessage('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-4">You must be logged in to access this page.</p>
          <Link
            href="/admin/login"
            className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout title="Content Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Content Management</h1>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${
            message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
          }`}>
            {message}
          </div>
        )}

        {!selectedPage ? (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Select a page to edit:</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {PAGES.map((page) => (
                  <button
                    key={page.path}
                    onClick={() => setSelectedPage(page.path)}
                    className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left"
                  >
                    <h3 className="font-medium text-gray-900">{page.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Path: {page.path}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <ContentEditor
            pagePath={selectedPage}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </AdminLayout>
  );
} 