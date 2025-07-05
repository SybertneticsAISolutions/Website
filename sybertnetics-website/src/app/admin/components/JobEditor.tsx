import { PlusCircle, Trash } from "lucide-react";
import { useState } from "react";

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

// TODO: Replace with a proper rich text editor
function RichTextEditor({ value, onChange }: { value: string; onChange: (newValue: string) => void }) {
  return <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={10} required />;
}

export default function JobEditor({ job, onSave, onCancel }: { job: Partial<Job>, onSave: (jobData: Job) => void, onCancel: () => void }) {
  const [title, setTitle] = useState(job?.title || "");
  const [description, setDescription] = useState(job?.description || "");
  const [posterEmail, setPosterEmail] = useState(job?.posterEmail || "");
  const [customQuestions, setCustomQuestions] = useState(job?.customQuestions || []);

  const handleSave = () => {
    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    onSave({ slug, title, description, posterEmail, customQuestions });
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
    <div className="job-editor">
      <h2>{job?.slug ? 'Edit Job' : 'Create New Job'}</h2>
      <label>Job Title
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
      </label>
      <label>Poster Email
        <input type="email" value={posterEmail} onChange={e => setPosterEmail(e.target.value)} required />
      </label>
      <label>Job Description
        <RichTextEditor value={description} onChange={setDescription} />
      </label>

      <h3>Custom Questions</h3>
      {customQuestions.map((q, index) => (
        <div key={index} className="custom-question">
          <input 
            type="text" 
            placeholder="Question" 
            value={q.question} 
            onChange={(e) => updateQuestionText(index, e.target.value)} 
          />
          <label>
            <input 
              type="checkbox" 
              checked={q.required} 
              onChange={(e) => updateQuestionRequired(index, e.target.checked)} 
            />
            Required
          </label>
          <button onClick={() => removeQuestion(index)}><Trash size={16} /></button>
        </div>
      ))}
      <button onClick={addQuestion}><PlusCircle size={16} /> Add Question</button>

      <div className="actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
} 