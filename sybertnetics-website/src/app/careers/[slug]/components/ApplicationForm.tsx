"use client";
import { useState } from 'react';

// This is a simplified list. In a real application, this might come from a library.
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

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

export default function ApplicationForm({ job }: { job: Job }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: '' });

    const formData = new FormData(event.currentTarget);
    // Append job details for the backend
    formData.append('jobTitle', job.title);
    formData.append('posterEmail', job.posterEmail);

    try {
      const response = await fetch('/.netlify/functions/submit-application', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong.');
      }
      
      setSubmitStatus({ success: true, message: 'Your application has been submitted successfully!' });
      event.currentTarget.reset(); // Clear form on success
    } catch (error) {
      if (error instanceof Error) {
        setSubmitStatus({ success: false, message: error.message });
      } else {
        setSubmitStatus({ success: false, message: 'An unknown error occurred.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus.success) {
    return (
      <div className="application-success">
        <h3>Thank You!</h3>
        <p>{submitStatus.message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {/* Personal Information */}
      <fieldset>
        <legend>Personal Information</legend>
        <label>Full Name <input type="text" name="fullName" required /></label>
        <label>Email Address <input type="email" name="email" required /></label>
        <label>State
          <select name="state" required>
            <option value="">Select a State</option>
            {states.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
      </fieldset>

      {/* Documents */}
      <fieldset>
        <legend>Documents</legend>
        <label>Resume (PDF, DOCX) <input type="file" name="resume" accept=".pdf,.docx" required /></label>
        <label>Cover Letter (Optional) <textarea name="coverLetter" rows={5}></textarea></label>
      </fieldset>

      {/* Custom Questions */}
      {job.customQuestions && job.customQuestions.length > 0 && (
        <fieldset>
          <legend>Additional Questions</legend>
          {job.customQuestions.map((q, i) => (
            <label key={i}>
              {q.question} {q.required && '*'}
              <input type="text" name={`custom_question_${i}`} required={q.required} />
            </label>
          ))}
        </fieldset>
      )}

      {/* Legal & EEO */}
      <fieldset>
        <legend>Legal & Equal Opportunity</legend>
        <div className="form-group">
          <p>Have you ever been convicted of a felony? A conviction record will not necessarily be a bar to employment. We will consider the nature and gravity of the offense, the time that has passed, and its relevance to the job for which you have applied.</p>
          <label><input type="radio" name="felony_conviction" value="yes" required /> Yes</label>
          <label><input type="radio" name="felony_conviction" value="no" /> No</label>
        </div>
        <hr/>
        <p>We are an equal opportunity employer. The following information is voluntary and used for compliance reporting only.</p>
        <label>Gender
          <select name="eeo_gender">
            <option value="prefer_not_to_say">Prefer not to say</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non_binary">Non-binary</option>
          </select>
        </label>
      </fieldset>
      
      {submitStatus.message && <p className="error">{submitStatus.message}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Application'}
      </button>
    </form>
  );
} 