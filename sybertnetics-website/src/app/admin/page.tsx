"use client";
import AdminLayout from './components/AdminLayout';
import Link from 'next/link';
import { Briefcase, Newspaper, PenSquare, FileText, Globe, Users, Mail } from 'lucide-react';

const adminFeatures = [
  { 
    href: '/admin/content', 
    label: 'Content Management', 
    icon: FileText,
    description: 'Manage markdown content for all pages'
  },
  { 
    href: '/admin/page-content', 
    label: 'Page Content', 
    icon: Globe,
    description: 'Edit RuneDrive page content'
  },
  { 
    href: '/admin/careers', 
    label: 'Manage Careers', 
    icon: Briefcase,
    description: 'Add and edit job postings'
  },
  { 
    href: '/admin/blog', 
    label: 'Manage Blog', 
    icon: PenSquare,
    description: 'Create and edit blog posts'
  },
  { 
    href: '/admin/news', 
    label: 'Manage News', 
    icon: Newspaper,
    description: 'Manage news articles'
  },
  { 
    href: '/admin/beta-signups', 
    label: 'Beta Signups', 
    icon: Users,
    description: 'View waitlist registrations'
  },
  { 
    href: '/admin/newsletter', 
    label: 'Newsletter', 
    icon: Mail,
    description: 'Manage newsletter subscriptions'
  },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to the Admin Dashboard</h2>
          <p className="text-gray-600">
            Manage your website content, view analytics, and control all aspects of your site from this central hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="block p-6 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center mb-4">
                <feature.icon className="w-8 h-8 text-emerald-600 mr-3" />
                <h3 className="text-lg font-semibold text-gray-900">{feature.label}</h3>
              </div>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-blue-700">Beta Signups</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-blue-700">Contact Messages</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-blue-700">Newsletter Subscribers</div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 