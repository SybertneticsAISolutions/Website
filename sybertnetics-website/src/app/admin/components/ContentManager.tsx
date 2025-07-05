"use client";
import { useState, useEffect } from "react";
import { PlusCircle, Edit, Trash2, AlertTriangle, Loader2 } from "lucide-react";
import AdminLayout from "./AdminLayout";
import ContentEditor from "./ContentEditor";
import type { Post } from "@/types";

interface ContentManagerProps {
  contentType: 'blog' | 'news';
}

const API_URL = "/.netlify/functions/manage-content";

async function fetchPosts(contentType: string) {
  const res = await fetch(`${API_URL}?type=${contentType}`);
  if (!res.ok) {
    if (res.status === 401) window.location.href = '/admin/login';
    throw new Error(`Failed to fetch posts: ${res.statusText}`);
  }
  return res.json();
}

async function savePost(postData: Post, contentType: string) {
  return fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...postData, type: contentType })
  });
}

async function deletePost(slug: string, contentType: string) {
  return fetch(`${API_URL}?type=${contentType}&slug=${slug}`, {
    method: 'DELETE',
  });
}

export default function ContentManager({ contentType }: ContentManagerProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Partial<Post> | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      setError("");
      const postsData = await fetchPosts(contentType);
      setPosts(postsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, [contentType]);

  const handleSave = async (postData: Post) => {
    const res = await savePost(postData, contentType);
    if (res.ok) {
      await loadPosts();
      setEditingPost(null);
    } else {
      const err = await res.json();
      setError(err.error || `Failed to save ${contentType}.`);
    }
  };

  const handleDelete = async (slug: string) => {
    if (window.confirm(`Are you sure you want to delete this ${contentType} post?`)) {
      const res = await deletePost(slug, contentType);
      if (res.ok) {
        await loadPosts();
      } else {
        const err = await res.json();
        setError(err.error || `Failed to delete ${contentType}.`);
      }
    }
  };
  
  const singularType = contentType.slice(0, -1);
  const title = `Manage ${contentType.charAt(0).toUpperCase() + contentType.slice(1)}`;

  if (editingPost) {
    return (
      <AdminLayout title={editingPost.slug ? `Edit ${singularType}` : `Create New ${singularType}`}>
        <ContentEditor
          content={editingPost}
          onSave={handleSave}
          onCancel={() => setEditingPost(null)}
          contentType={contentType}
        />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title={title}>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditingPost({})}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Create New {singularType}
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
          <p className="ml-2 text-gray-500">Loading posts...</p>
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
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map(post => (
                <tr key={post.slug}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                    <button onClick={() => setEditingPost(post)} className="text-indigo-600 hover:text-indigo-900">
                      <Edit className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleDelete(post.slug)} className="text-red-600 hover:text-red-900">
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