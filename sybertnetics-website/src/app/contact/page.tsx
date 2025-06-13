'use client';

import React, { useState } from 'react';
import Link from "next/link";
import { Mail, MapPin, Phone, Send, ArrowRight, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Ensure form-name is included
    formData.set('form-name', 'contact');

    try {
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setSubmitStatus('success');
        form.reset();
        // Redirect to thank you page after a short delay
        setTimeout(() => {
          window.location.href = '/thank-you/';
        }, 2000);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Failed to send message. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hidden form for Netlify detection - must match visible form exactly */}
      <div dangerouslySetInnerHTML={{
        __html: `
          <form name="contact" method="POST" action="/thank-you/" data-netlify="true" data-netlify-honeypot="bot-field" hidden>
            <input type="hidden" name="form-name" value="contact" />
            <div style="display: none;">
              <label>Don't fill this out if you're human: <input name="bot-field" /></label>
            </div>
            <input type="text" name="name" required />
            <input type="email" name="email" required />
            <input type="text" name="company" />
            <select name="subject" required>
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="solutions">AI Solutions</option>
              <option value="partnership">Partnership Opportunity</option>
              <option value="investment">Investment Inquiry</option>
              <option value="careers">Career Opportunities</option>
              <option value="support">Technical Support</option>
              <option value="other">Other</option>
            </select>
            <textarea name="message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        `
      }} />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-gray-900 font-semibold text-xl">Sybertnetics</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Landing
              </Link>
              <Link href="/home" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/solutions" className="text-gray-600 hover:text-gray-900 transition-colors">
                Solutions
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-emerald-600 font-medium">
                Contact
              </Link>
            </div>
            <Link 
              href="/contact" 
              className="bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-2 rounded-full hover:from-emerald-600 hover:to-blue-700 transition-all duration-300"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get in
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Touch
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to transform your business with cutting-edge AI solutions? We&apos;d love to hear from you and discuss how we can help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              <p className="text-gray-600 mb-8">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>

              <form
                name="contact"
                method="POST"
                action="/thank-you/"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                
                {/* Honeypot field */}
                <div style={{ display: 'none' }}>
                  <label>
                    Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors placeholder:text-gray-500 text-gray-900"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors placeholder:text-gray-500 text-gray-900"
                      placeholder="your.email@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors placeholder:text-gray-500 text-gray-900"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors text-gray-900"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="solutions">AI Solutions</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="investment">Investment Inquiry</option>
                    <option value="careers">Career Opportunities</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-none placeholder:text-gray-500 text-gray-900"
                    placeholder="Tell us about your project, goals, or how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center">
                  <CheckCircle className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-emerald-800 font-medium">Message sent successfully!</p>
                    <p className="text-emerald-700 text-sm">Redirecting to thank you page...</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-red-800 font-medium">Failed to send message</p>
                    <p className="text-red-700 text-sm">{errorMessage}</p>
                    <p className="text-red-700 text-sm mt-1">
                      You can also email us directly at{' '}
                      <a href="mailto:support@sybertnetics.com" className="underline font-medium">
                        support@sybertnetics.com
                      </a>
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                <p className="text-lg text-gray-600 mb-8">
                  We&apos;re here to help and answer any questions you might have. We look forward to hearing from you.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <p className="text-gray-600 mb-2">For general inquiries and support</p>
                    <a 
                      href="mailto:support@sybertnetics.com" 
                      className="text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      support@sybertnetics.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">LinkedIn</h3>
                    <p className="text-gray-600 mb-2">Connect with us professionally</p>
                    <a 
                      href="https://linkedin.com/company/sybertnetics" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      linkedin.com/company/sybertnetics
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Response Time</h3>
                    <p className="text-gray-600">
                      We typically respond to inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  <Link 
                    href="/solutions" 
                    className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Explore Our AI Solutions
                  </Link>
                  <Link 
                    href="/about" 
                    className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Learn About Our Team
                  </Link>
                  <Link 
                    href="/careers" 
                    className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Career Opportunities
                  </Link>
                  <Link 
                    href="/blog" 
                    className="flex items-center text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Read Our Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about our AI solutions and services
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What types of AI solutions do you offer?
              </h3>
              <p className="text-gray-600">
                We specialize in intelligent reasoning systems, specialized domain AI, and adaptive learning platforms tailored to your specific business needs.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do you ensure AI ethics and safety?
              </h3>
              <p className="text-gray-600">
                Ethics is built into our core design principles. We implement comprehensive safeguards and transparent decision-making processes in all our AI systems.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What industries do you work with?
              </h3>
              <p className="text-gray-600">
                Our AI solutions are adaptable across industries including enterprise, security, data analytics, and customer experience optimization.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                How do I get started with your services?
              </h3>
              <p className="text-gray-600">
                Simply fill out our contact form or email us directly. We&apos;ll schedule a consultation to discuss your needs and how we can help.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
                <span className="text-white font-semibold text-xl">Sybertnetics AI Solutions</span>
              </div>
              <p className="text-gray-400 mb-4">
                Pioneering the future of artificial intelligence through innovative technology and ethical design.
              </p>
              <div className="flex space-x-4">
                <a 
                  href="https://linkedin.com/company/sybertnetics" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a 
                  href="mailto:support@sybertnetics.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Solutions</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/solutions" className="hover:text-white transition-colors">AI Systems</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2019-2025 Sybertnetics AI Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
} 