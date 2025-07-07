"use client";
import { useState } from 'react';
import { marked } from 'marked';
import type { Post } from '@/types';

interface PostEditorProps {
  post: Partial<Post>;
  onSave: (post: Post) => Promise<void>;
  onCancel: () => void;
  contentType: 'blog' | 'news';
}

export default function PostEditor({ post, onSave, onCancel, contentType }: PostEditorProps) {
  const [title, setTitle] = useState(post.title || '');
  const [slug, setSlug] = useState(post.slug || '');
  const [content, setContent] = useState(post.content || '');
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      alert('Title and slug are required');
      return;
    }

    setIsSaving(true);
    try {
      const postData: Post = {
        title: title.trim(),
        slug: slug.trim(),
        content: content,
        lastModified: new Date().toISOString(),
        type: contentType
      };
      await onSave(postData);
    } finally {
      setIsSaving(false);
    }
  };

  const renderPreview = () => {
    try {
      return marked(content);
    } catch {
      return '<p>Error rendering preview</p>';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {post.slug ? `Edit ${contentType}` : `Create New ${contentType}`}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              {previewMode ? 'Edit' : 'Preview'}
            </button>
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder={`Enter ${contentType} title...`}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slug
          </label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="enter-slug-here"
          />
        </div>

        {previewMode ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content Preview
            </label>
            <div className="prose max-w-none p-4 border border-gray-300 rounded-md bg-gray-50">
              <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
            </div>
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content (Markdown)
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your markdown content here..."
            />
          </div>
        )}
      </div>
    </div>
  );
} 