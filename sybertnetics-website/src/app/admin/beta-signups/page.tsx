"use client";
import { useState, useEffect, useCallback } from "react";
import { Download, Mail, Calendar, Users, Loader2, AlertTriangle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { getBetaSignups } from "@/utils/firebaseFunctions";
import { useAuth } from "@/utils/useAuth";

interface BetaSignup {
  id: string;
  email: string;
  name: string;
  discord?: string;
  experience: string;
  interests?: string[];
  timestamp: { toDate: () => Date } | Date; // Firestore timestamp or Date
}

export default function BetaSignupsPage() {
  const [signups, setSignups] = useState<BetaSignup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSignups, setSelectedSignups] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const loadSignups = useCallback(async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const token = await user.getIdToken();
      const result = await getBetaSignups(token);
      
      if (result.success && result.data?.signups) {
        setSignups(result.data.signups);
      } else {
        throw new Error(result.error || 'Failed to fetch signups');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadSignups();
  }, [loadSignups]);



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

  // Helper function to format timestamp
  const formatTimestamp = (timestamp: { toDate: () => Date } | Date) => {
    if (timestamp && typeof timestamp === 'object' && 'toDate' in timestamp) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  // Helper function to check if signup is recent
  const isRecent = (timestamp: { toDate: () => Date } | Date, days: number) => {
    const signupDate = timestamp && typeof timestamp === 'object' && 'toDate' in timestamp ? timestamp.toDate() : new Date(timestamp);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    return signupDate > cutoffDate;
  };

  // Helper function to check if signup is today
  const isToday = (timestamp: { toDate: () => Date } | Date) => {
    const signupDate = timestamp && typeof timestamp === 'object' && 'toDate' in timestamp ? timestamp.toDate() : new Date(timestamp);
    const today = new Date();
    return signupDate.toDateString() === today.toDateString();
  };



  const handleExport = () => {
    const csvContent = signups.map((signup: BetaSignup) => {
      const timestamp = signup.timestamp && typeof signup.timestamp === 'object' && 'toDate' in signup.timestamp 
        ? signup.timestamp.toDate().toLocaleString() 
        : new Date(signup.timestamp).toLocaleString();
      
      return `${signup.email},${signup.name || ''},${signup.discord || ''},${signup.experience || ''},${(signup.interests || []).join('; ')},${timestamp}`;
    }).join('\n');
    
    const csvHeader = 'Email,Name,Discord,Experience,Interests,Signup Date\n';
    const blob = new Blob([csvHeader + csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'beta-signups.csv';
    a.click();
    window.URL.revokeObjectURL(url);
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
                {signups.filter(s => isRecent(s.timestamp, 7)).length}
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
                {signups.filter(s => isToday(s.timestamp)).length}
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
            onClick={handleExport}
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

      {loading && (
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

      {!loading && !error && (
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
                      {formatTimestamp(signup.timestamp)}
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