"use client";
import { useState } from 'react';
import type { Job } from '@/types';

// This is a simplified list. In a real application, this might come from a library.
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

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
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold text-green-800 mb-2">Thank You!</h3>
        <p className="text-green-700">{submitStatus.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
        {/* Personal Information */}
        <fieldset className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-gray-900 mb-4 px-2">Personal Information</legend>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input 
                  type="text" 
                  name="fullName" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input 
                  type="email" 
                  name="email" 
                  required 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <select 
                name="state" 
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
              >
                <option value="">Select a State</option>
                {states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </fieldset>

        {/* Documents */}
        <fieldset className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-gray-900 mb-4 px-2">Documents</legend>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resume (PDF, DOCX) *
              </label>
              <input 
                type="file" 
                name="resume" 
                accept=".pdf,.docx" 
                required 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Letter (Optional)
              </label>
              <textarea 
                name="coverLetter" 
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-900"
                placeholder="Write your cover letter here..."
              />
            </div>
          </div>
        </fieldset>

        {/* Custom Questions */}
        {job.customQuestions && job.customQuestions.length > 0 && (
          <fieldset className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <legend className="text-xl font-semibold text-gray-900 mb-4 px-2">Additional Questions</legend>
            <div className="space-y-4">
              {job.customQuestions.map((q, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {q.question} {q.required && <span className="text-red-500">*</span>}
                  </label>
                  <input 
                    type="text" 
                    name={`custom_question_${i}`} 
                    required={q.required}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                    placeholder="Your answer..."
                  />
                </div>
              ))}
            </div>
          </fieldset>
        )}

        {/* Legal & EEO */}
        <fieldset className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <legend className="text-xl font-semibold text-gray-900 mb-4 px-2">Legal & Equal Opportunity</legend>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-700 mb-4">
                Have you ever been convicted of a felony? A conviction record will not necessarily be a bar to employment. 
                We will consider the nature and gravity of the offense, the time that has passed, and its relevance to the job for which you have applied.
              </p>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="felony_conviction" 
                    value="yes" 
                    required 
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">Yes</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    name="felony_conviction" 
                    value="no"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <span className="text-sm text-gray-700">No</span>
                </label>
              </div>
            </div>
            
            <hr className="border-gray-200" />
            
            <div>
              <p className="text-sm text-gray-700 mb-4">
                We are an equal opportunity employer. The following information is voluntary and used for compliance reporting only.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select 
                  name="eeo_gender"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-gray-900"
                >
                  <option value="prefer_not_to_say">Prefer not to say</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non_binary">Non-binary</option>
                </select>
              </div>
            </div>
          </div>
        </fieldset>
        
        {submitStatus.message && !submitStatus.success && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{submitStatus.message}</p>
          </div>
        )}

        <div className="flex justify-center">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Submitting...
              </>
            ) : (
              'Submit Application'
            )}
          </button>
        </div>
      </form>
    </div>
  );
} 