"use client";
import { useState, useEffect, useCallback } from "react";
import { Download, Mail, Users, Filter, Loader2, AlertTriangle } from "lucide-react";
import AdminLayout from "../components/AdminLayout";

interface NewsletterSubscription {
  email: string;
  name: string;
  interests: string[];
  source: string;
  timestamp: string;
  status: string;
  ip: string;
}

export default function NewsletterPage() {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [filteredSubscriptions, setFilteredSubscriptions] = useState<NewsletterSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadSubscriptions();
  }, []);

  const filterSubscriptions = useCallback(() => {
    let filtered = subscriptions;
    
    if (selectedFilter !== "all") {
      filtered = subscriptions.filter(sub => 
        sub.interests.includes(selectedFilter) || sub.source === selectedFilter
      );
    }
    
    setFilteredSubscriptions(filtered);
  }, [subscriptions, selectedFilter]);

  useEffect(() => {
    filterSubscriptions();
  }, [filterSubscriptions]);

  const loadSubscriptions = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch('/.netlify/functions/get-newsletter-subscriptions');
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/admin/login';
          return;
        }
        throw new Error(`Failed to fetch subscriptions: ${response.statusText}`);
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = (subs = filteredSubscriptions) => {
    const headers = ['Email', 'Name', 'Interests', 'Source', 'Signup Date', 'Status'];
    const csvContent = [
      headers.join(','),
      ...subs.map(sub => [
        sub.email,
        sub.name || '',
        sub.interests.join(';'),
        sub.source,
        new Date(sub.timestamp).toLocaleString(),
        sub.status
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-subscriptions-${selectedFilter}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportEmails = (subs = filteredSubscriptions) => {
    const emails = subs.map(sub => sub.email).join(', ');
    const blob = new Blob([emails], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `newsletter-emails-${selectedFilter}-${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const toggleSelectAll = () => {
    if (selectedSubscriptions.size === filteredSubscriptions.length) {
      setSelectedSubscriptions(new Set());
    } else {
      setSelectedSubscriptions(new Set(filteredSubscriptions.map(sub => sub.email)));
    }
  };

  const toggleSelectSubscription = (email: string) => {
    const newSelected = new Set(selectedSubscriptions);
    if (newSelected.has(email)) {
      newSelected.delete(email);
    } else {
      newSelected.add(email);
    }
    setSelectedSubscriptions(newSelected);
  };

  const getUniqueInterests = () => {
    const interests = new Set<string>();
    subscriptions.forEach(sub => {
      sub.interests.forEach(interest => interests.add(interest));
    });
    return Array.from(interests);
  };

  const getUniqueSources = () => {
    const sources = new Set<string>();
    subscriptions.forEach(sub => sources.add(sub.source));
    return Array.from(sources);
  };

  return (
    <AdminLayout title="Newsletter Management">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Subscribers</p>
              <p className="text-2xl font-bold text-gray-900">{subscriptions.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Mail className="w-8 h-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscriptions.filter(s => s.status === 'active').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Filter className="w-8 h-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Filtered View</p>
              <p className="text-2xl font-bold text-gray-900">{filteredSubscriptions.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">
                {subscriptions.filter(s => {
                  const signupDate = new Date(s.timestamp);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return signupDate > weekAgo;
                }).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Subscribers</option>
            <optgroup label="Interests">
              {getUniqueInterests().map(interest => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </optgroup>
            <optgroup label="Sources">
              {getUniqueSources().map(source => (
                <option key={source} value={source}>{source}</option>
              ))}
            </optgroup>
          </select>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={() => exportToCSV()}
            className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
          >
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => exportEmails()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Mail className="w-5 h-5 mr-2" />
            Export Emails
          </button>
          <button
            onClick={loadSubscriptions}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          <p className="ml-2 text-gray-500">Loading subscriptions...</p>
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
                      checked={selectedSubscriptions.size === filteredSubscriptions.length && filteredSubscriptions.length > 0}
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
                    Interests
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Signup Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((subscription) => (
                  <tr key={subscription.email} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedSubscriptions.has(subscription.email)}
                        onChange={() => toggleSelectSubscription(subscription.email)}
                        className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {subscription.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.name || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.interests.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {subscription.interests.map(interest => (
                            <span key={interest} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {subscription.source}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(subscription.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        subscription.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscription.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredSubscriptions.length === 0 && (
            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No subscriptions found</h3>
              <p className="text-gray-500">
                {selectedFilter === 'all' 
                  ? 'Newsletter subscriptions will appear here once people start signing up.'
                  : `No subscriptions found for "${selectedFilter}".`
                }
              </p>
            </div>
          )}
        </div>
      )}
    </AdminLayout>
  );
}