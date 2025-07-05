"use client";
import { useState, useEffect } from "react";
import { Download, Mail, Calendar, Users, Loader2, AlertTriangle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

interface BetaSignup {
  email: string;
  name: string;
  experience: string;
  timestamp: string;
  ip: string;
}

export default function BetaSignupsPage() {
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSignups, setSelectedSignups] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadSignups();
  }, []);

  const loadSignups = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch('/.netlify/functions/get-beta-signups');
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin/login';
          return;
        }
        throw new Error(`Failed to fetch signups: ${response.statusText}`);
      }
      const data = await response.json();
      setSignups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Email', 'Name', 'Experience', 'Signup Date', 'IP Address'];
    const csvContent = [
      headers.join(','),
      ...signups.map(signup => [
        signup.email,
        signup.name || '',
        signup.experience || '',
        new Date(signup.timestamp).toLocaleString(),
        signup.ip
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beta-signups-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportEmails = () => {
    const emails = signups.map(signup => signup.email).join(', ');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beta-emails-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleSelectAll = () => {
    if (selectedSignups.size === signups.length) {
      setSelectedSignups(new Set());
    } else {
      setSelectedSignups(new Set(signups.map(signup => signup.email)));
    }
  };

  const toggleSelectSignup = (email: string) => {
    const newSelected = new Set(selectedSignups);
    if (newSelected.has(email)) {
      newSelected.delete(email);
    } else {
      newSelected.add(email);
    }
    setSelectedSignups(newSelected);
  };

  const experienceLabels: Record<string, string> = {
    'new': 'New to TTRPGs',
    'casual': 'Casual Player',
    'experienced': 'Experienced Player',
    'gm': 'Game Master',
    'veteran': 'Veteran (5+ years)',
  };

  return (
    <AdminLayout title="Beta Signups">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Signups</p>
              <p className="text-2xl font-bold text-gray-900">{signups.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {signups.filter(s => {
                  const signupDate = new Date(s.timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return signupDate > weekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">
                {signups.filter(s => {
                  const signupDate = new Date(s.timestamp);
                  const today = new Date();
                  return signupDate.toDateString() === today.toDateString();
                }).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">GMs</p>
              <p className="text-2xl font-bold text-gray-900">
                {signups.filter(s => s.experience === 'gm').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-4">
          <button
            onClick={exportToCSV}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </button>
          <button
            onClick={exportEmails}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Mail className="w-5 h-5 mr-2" />
            Export Emails
          </button>
        </div>
        <button
          onClick={loadSignups}
          className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Refresh
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          <p className="ml-2 text-gray-500">Loading signups...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md mb-4">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedSignups.size === signups.length && signups.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Experience
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signup Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {signups.map((signup) => (
                  <tr key={signup.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedSignups.has(signup.email)}
                        onChange={() => toggleSelectSignup(signup.email)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {signup.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {signup.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {experienceLabels[signup.experience] || signup.experience || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(signup.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {signups.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No signups yet</h3>
              <p className="text-gray-500">
                Beta signups will appear here once people start registering.
              </p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
} 