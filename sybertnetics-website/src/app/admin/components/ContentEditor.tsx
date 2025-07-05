"use client";
import { useState } from "react";
import type { Post } from "@/types";
import RichTextEditor from "./RichTextEditor";

export default function ContentEditor({
  content,
  onSave,
  onCancel,
  contentType,
}: {
  content: Partial<Post>;
  onSave: (contentData: Post) => void;
  onCancel: () => void;
  contentType: 'blog' | 'news';
}) {
  const [title, setTitle] = useState(content?.title || "");
  const [body, setBody] = useState(content?.content || "");

  const handleSave = () => {
    const slug = content.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const date = content.date || new Date().toISOString();
    onSave({ slug, title, date, content: body });
  };

  const singularType = contentType.slice(0, -1);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">{singularType.charAt(0).toUpperCase() + singularType.slice(1)} Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content</label>
        <div className="mt-1">
          <RichTextEditor value={body} onChange={setBody} />
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
          Save {singularType.charAt(0).toUpperCase() + singularType.slice(1)}
        </button>
      </div>
    </div>
  );
} 