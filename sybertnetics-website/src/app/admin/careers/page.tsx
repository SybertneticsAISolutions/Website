"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import JobEditor from "../components/JobEditor";
import type { Job } from "@/types";

const API_URL = "/.netlify/functions/manage-jobs";

async function fetchJobs() {
  const res = await fetch(API_URL);
  if (!res.ok) {
    if (res.status === 401) window.location.href = '/admin/login';
    throw new Error(`Failed to fetch jobs: ${res.statusText}`);
  }
  return res.json();
}

async function saveJob(jobData: Job) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
}

async function deleteJob(slug: string) {
  return fetch(`${API_URL}?slug=${slug}`, {
    method: 'DELETE',
  });
}

export default function CareersAdmin() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [editingJob, setEditingJob] = useState<Partial<Job> | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadJobs = async () => {
    try {
      setIsLoading(true);
      setError("");
      const jobsData = await fetchJobs();
      setJobs(jobsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSave = async (jobData: Job) => {
    const res = await saveJob(jobData);
    if (res.ok) {
      await loadJobs();
      setEditingJob(null);
    } else {
      const err = await res.json();
      setError(err.error || "Failed to save job.");
    }
  };
  
  const handleDelete = async (slug: string) => {
    if (window.confirm("Are you sure you want to delete this job posting?")) {
      const res = await deleteJob(slug);
      if (res.ok) {
        await loadJobs();
      } else {
        const err = await res.json();
        setError(err.error || "Failed to delete job.");
      }
    }
  };

  if (editingJob) {
    return (
      <AdminLayout title={editingJob.slug ? "Edit Job Posting" : "Create New Job"}>
        <JobEditor job={editingJob} onSave={handleSave} onCancel={() => setEditingJob(null)} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Manage Careers">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditingJob({})}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create New Job
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          <p className="ml-2 text-gray-500">Loading jobs...</p>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-md mb-4">
          <AlertTriangle className="w-5 h-5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {jobs.map(job => (
                <tr key={job.slug}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{job.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => setEditingJob(job)} className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(job.slug)} className="text-red-600 hover:text-red-900">
                       <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
} 