"use client";
import { useState, useEffect } from 'react';
import { marked } from 'marked';

interface PageContentEditorProps {
  pagePath: string;
  onSave: (content: string) => Promise<void>;
  onCancel: () => void;
}

export default function PageContentEditor({ pagePath, onSave, onCancel }: PageContentEditorProps) {
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const loadContent = async () => {
    try {
      const response = await fetch(`/api/content/${pagePath}`);
      if (response.ok) {
        const data = await response.json();
        setContent(data.content || '');
      }
    } catch (err) {
      console.error('Error loading content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePath]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(content);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Edit Page: {pagePath}</h2>
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

      <div className="p-4">
        {previewMode ? (
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: renderPreview() }} />
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter your markdown content here..."
          />
        )}
      </div>
    </div>
  );
} 