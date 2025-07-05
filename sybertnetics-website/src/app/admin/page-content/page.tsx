"use client";
import { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import PageContentEditor from '../components/PageContentEditor';

const PAGES = [
  { path: 'runedrive/demo', name: 'Rune Drive Demo Page' },
  { path: 'runedrive/community', name: 'Rune Drive Community Page' },
  { path: 'runedrive/blog', name: 'Rune Drive Blog Page' },
  { path: 'runedrive/creators', name: 'Rune Drive Creators Page' },
  { path: 'runedrive/universe', name: 'Rune Drive Universe Page' },
  { path: 'runedrive/about', name: 'Rune Drive About Page' },
];

export default function PageContentManagement() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [message, setMessage] = useState('');

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

  return (
    <AdminLayout title="Page Content Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Page Content Management</h1>
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
          <PageContentEditor
            pagePath={selectedPage}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        )}
      </div>
    </AdminLayout>
  );
} 