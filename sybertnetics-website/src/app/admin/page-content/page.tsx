"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Edit, FileText, ArrowRight } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const pages = [
  { path: 'runedrive/demo', name: 'RuneDrive Demo Page' },
  { path: 'runedrive/community', name: 'RuneDrive Community Page' },
  { path: 'runedrive/blog', name: 'RuneDrive Blog Page' },
  { path: 'runedrive/creators', name: 'RuneDrive Creators Page' },
  { path: 'runedrive/universe', name: 'RuneDrive Universe Page' },
  { path: 'runedrive/about', name: 'RuneDrive About Page' },
];

export default function PageContentManager() {
  return (
    <AdminLayout title="Page Content Manager">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <div
            key={page.path}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <FileText className="w-5 h-5 text-emerald-600 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">{page.name}</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">Path: {page.path}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Link
                href={`/admin/page-content/${page.path}`}
                className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors"
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit Content
              </Link>
              <Link
                href={`/runedrive/${page.path.replace('runedrive/', '')}`}
                target="_blank"
                className="inline-flex items-center border border-gray-300 text-gray-700 text-sm font-medium py-2 px-3 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowRight className="w-4 h-4 mr-1" />
                View Page
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">How to Use</h3>
        <ul className="text-blue-800 space-y-1 text-sm">
          <li>• Click &quot;Edit Content&quot; to modify the markdown content for each page</li>
          <li>• Changes are saved automatically as you type</li>
          <li>• Use &quot;View Page&quot; to see how your changes look on the live site</li>
          <li>• All content is version controlled and can be reverted if needed</li>
        </ul>
      </div>
    </AdminLayout>
  );
} 