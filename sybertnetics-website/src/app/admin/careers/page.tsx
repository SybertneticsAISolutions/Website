"use client";
import { useState, useEffect } from "react";
import JobEditor from "../components/JobEditor";

const API_URL = "/.netlify/functions/manage-jobs";

interface Job {
  slug: string;
  title: string;
  description: string;
  posterEmail: string;
  customQuestions: {
    question: string;
    required: boolean;
  }[];
}

function getAuthHeader(): Record<string, string> {
  const token = typeof window !== 'undefined' ? localStorage.getItem("admin_jwt") : null;
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

async function fetchJobs() {
  const res = await fetch(API_URL, { headers: getAuthHeader() });
  if (!res.ok) {
    if (res.status === 401) window.location.href = '/admin/login';
    throw new Error(`Failed to fetch jobs: ${res.statusText}`);
  }
  return res.json();
}

async function saveJob(jobData: Job) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { ...getAuthHeader(), 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData)
  });
}

async function deleteJob(slug: string) {
  return fetch(`${API_URL}?slug=${slug}`, {
    method: 'DELETE',
    headers: getAuthHeader()
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while loading jobs.");
      }
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

  if (isLoading) return <p>Loading job postings...</p>;
  if (editingJob) {
    return <JobEditor job={editingJob} onSave={handleSave} onCancel={() => setEditingJob(null)} />;
  }

  return (
    <div>
      <h1>Manage Careers</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={() => setEditingJob({})}>Create New Job</button>
      <ul>
        {jobs.map(job => (
          <li key={job.slug}>
            {job.title}
            <button onClick={() => setEditingJob(job)}>Edit</button>
            <button onClick={() => handleDelete(job.slug)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
} 