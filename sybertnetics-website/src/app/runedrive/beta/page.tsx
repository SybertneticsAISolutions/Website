"use client";
import { useState } from "react";
import RuneDriveHeader from "../components/RuneDriveHeader";
import { addBetaSignup } from "@/utils/firebaseFunctions";

export default function RuneDriveBeta() {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    experience: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const result = await addBetaSignup(formData);

      if (result.success) {
        setIsSuccess(true);
        setMessage(result.message || 'Successfully joined the beta waitlist!');
        setFormData({ email: '', name: '', experience: '' });
      } else {
        setIsSuccess(false);
        setMessage(result.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setIsSuccess(false);
      setMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Kickstarter Waitlist
              </h1>
              <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                Get notified when our Kickstarter launches and receive exclusive updates about RuneDrive development. 
                Beta access will be exclusive to Kickstarter supporters.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Waitlist Signup Form */}
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Join the Waitlist</h2>
                
                {message && (
                  <div className={`mb-4 p-3 rounded-md ${isSuccess ? 'bg-green-900/50 text-green-200' : 'bg-red-900/50 text-red-200'}`}>
                    {message}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-indigo-200 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-indigo-200 mb-2">
                      Name (Optional)
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-indigo-200 mb-2">
                      TTRPG Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 bg-gray-800 border border-purple-500/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
                    >
                      <option value="">Select your experience level</option>
                      <option value="new">New to TTRPGs</option>
                      <option value="casual">Casual player</option>
                      <option value="experienced">Experienced player</option>
                      <option value="gm">Game Master</option>
                      <option value="veteran">Veteran (5+ years)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
                  >
                    {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                  </button>
                </form>
                <p className="text-xs text-indigo-300 mt-4">
                  We&apos;ll never spam you. Unsubscribe at any time.
                </p>
              </div>

              {/* Community & Updates */}
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Stay Connected</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Discord Community</h3>
                    <p className="text-indigo-200 mb-4">
                      Join our active Discord server for the latest updates, discussions, and direct access to the development team.
                    </p>
                    <a
                      href="https://discord.gg/RQWDbbXSPG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                      </svg>
                      Join Discord
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">What You&apos;ll Get</h3>
                    <ul className="text-indigo-200 space-y-2">
                      <li>• Kickstarter launch notifications</li>
                      <li>• Exclusive development updates</li>
                      <li>• Early access to campaign details</li>
                      <li>• Community events and announcements</li>
                      <li>• Direct feedback opportunities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-black/20 p-8 rounded-xl border border-purple-500/20">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Frequently Asked Questions</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">When does the beta start?</h3>
                  <p className="text-indigo-200 text-sm">We&apos;re targeting Q2 2026 for the first beta release. Beta access will be exclusive to Kickstarter supporters.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How do I get beta access?</h3>
                  <p className="text-indigo-200 text-sm">Beta access will be available exclusively to Kickstarter backers. Join the waitlist to be notified when our Kickstarter launches!</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">What platforms?</h3>
                  <p className="text-indigo-200 text-sm">Initially web-based, with mobile apps planned for later releases.</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">How can I help?</h3>
                  <p className="text-indigo-200 text-sm">Join our Discord to provide feedback, report bugs, and suggest features!</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 