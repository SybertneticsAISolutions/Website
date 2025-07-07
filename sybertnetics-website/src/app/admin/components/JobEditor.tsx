"use client";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import type { Job } from "@/types";
import RichTextEditor from "./RichTextEditor";

export default function JobEditor({ job, onSave, onCancel }: { job: Partial<Job>, onSave: (jobData: Job) => void, onCancel: () => void }) {
  const [title, setTitle] = useState(job?.title || "");
  const [location, setLocation] = useState(job?.location || "");
  const [description, setDescription] = useState(job?.description || "");
  const [posterEmail, setPosterEmail] = useState(job?.posterEmail || "");
  const [customQuestions, setCustomQuestions] = useState(job?.customQuestions || []);

  const handleSave = () => {
    const slug = job.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    onSave({ slug, title, location, description, posterEmail, customQuestions });
  };

  const addQuestion = () => {
    setCustomQuestions([...customQuestions, { question: "", required: false }]);
  };

  const updateQuestionText = (index: number, text: string) => {
    const newQuestions = [...customQuestions];
    newQuestions[index].question = text;
    setCustomQuestions(newQuestions);
  };

  const updateQuestionRequired = (index: number, required: boolean) => {
    const newQuestions = [...customQuestions];
    newQuestions[index].required = required;
    setCustomQuestions(newQuestions);
  };

  const removeQuestion = (index: number) => {
    setCustomQuestions(customQuestions.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Job Title</label>
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
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
        <input
          id="location"
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="posterEmail" className="block text-sm font-medium text-gray-700">Hiring Contact Email</label>
        <input
          id="posterEmail"
          type="email"
          value={posterEmail}
          onChange={e => setPosterEmail(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Job Description</label>
        <div className="mt-1">
          <RichTextEditor value={description} onChange={setDescription} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Custom Questions</h3>
        {customQuestions.map((q, index) => (
          <div key={index} className="flex items-center space-x-2 p-2 border rounded-md">
            <input 
              type="text" 
              placeholder="e.g., 'What is your expected salary?'" 
              value={q.question} 
              onChange={(e) => updateQuestionText(index, e.target.value)} 
              className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
            <label className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                checked={q.required} 
                onChange={(e) => updateQuestionRequired(index, e.target.checked)}
                className="h-4 w-4 text-emerald-600 border-gray-300 rounded"
              />
              <span>Required</span>
            </label>
            <button onClick={() => removeQuestion(index)} className="text-red-500 hover:text-red-700">
              <Trash2 size={18} />
            </button>
          </div>
        ))}
        <button 
          type="button" 
          onClick={addQuestion} 
          className="inline-flex items-center px-3 py-1.5 border border-dashed border-gray-400 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
        >
          <PlusCircle size={16} className="mr-2" /> 
          Add Question
        </button>
      </div>

      <div className="flex justify-end space-x-4">
        <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="button" onClick={handleSave} className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700">
          Save Job
        </button>
      </div>
    </div>
  );
} 