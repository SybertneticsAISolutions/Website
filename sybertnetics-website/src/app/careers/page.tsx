import fs from 'fs/promises';
import path from 'path';
import Link from "next/link";
import { ArrowRight, Brain, Shield, Zap, Users, Target, Heart, Star } from "lucide-react";
import type { Job } from '@/types';

// This function runs on the server during the build process
async function getJobs(): Promise<Partial<Job>[]> {
  const jobsDirectory = path.join(process.cwd(), 'src/content/careers');
  try {
    const files = await fs.readdir(jobsDirectory);
    const jobs = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(jobsDirectory, file), 'utf-8');
          const jobData = JSON.parse(content);
          // Return only essential data for the list page
          return {
            slug: jobData.slug,
            title: jobData.title,
            description: jobData.description.substring(0, 150) + '...', // Short preview
          };
        })
    );
    return jobs;
  } catch (error) {
    // If the directory doesn't exist or there's an error, return an empty array
    console.error("Could not read job postings:", error);
    return [];
  }
}

export default async function CareersPage() {
  const jobs = await getJobs();

  return (
    <div className="min-h-screen bg-white">
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
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
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
              Join Our
              <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                {" "}Mission
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Be part of a team that&apos;s shaping the future of artificial intelligence. 
              While we&apos;re not currently hiring, we&apos;re planning to expand our team soon.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Join Sybertnetics?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer more than just a job – we offer the opportunity to be part of something revolutionary
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Brain className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cutting-Edge Technology</h3>
              <p className="text-gray-600">
                Work with the latest AI technologies and contribute to groundbreaking innovations
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Users className="w-12 h-12 text-blue-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Small Team Impact</h3>
              <p className="text-gray-600">
                Your contributions directly shape our products and company direction
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Zap className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rapid Growth</h3>
              <p className="text-gray-600">
                Grow your skills and career alongside our expanding company
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Shield className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Ethical AI</h3>
              <p className="text-gray-600">
                Be part of building responsible AI that benefits humanity
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Target className="w-12 h-12 text-emerald-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Clear Mission</h3>
              <p className="text-gray-600">
                Work toward a meaningful goal of democratizing AI technology
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
              <Heart className="w-12 h-12 text-pink-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Passionate Team</h3>
              <p className="text-gray-600">
                Collaborate with dedicated professionals who love what they do
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Opportunities */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Future Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These are the types of roles we&apos;ll be looking to fill as we grow our team
            </p>
          </div>

          <div className="space-y-6 max-w-4xl mx-auto">
            {jobs.length > 0 ? (
              <div className="job-listings">
                {jobs.map(job => (
                  <div key={job.slug} className="job-card">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{job.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>
                    <Link 
                      href={`/careers/${job.slug}`} 
                      className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      View Details and Apply
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p>There are currently no open positions. Please check back later.</p>
            )}
          </div>

          {/* Don't see a fit? */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Don&apos;t See the Perfect Role?</h3>
              <p className="text-gray-600 mb-6">
                We&apos;re always interested in hearing from talented individuals who are passionate 
                about AI and want to make a difference. Send us your resume and tell us how 
                you&apos;d like to contribute to our mission.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300"
              >
                Get in Touch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Culture
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in creating an environment where innovation thrives and everyone can do their best work
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from code quality to customer service
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We work together as a team, sharing knowledge and supporting each other&apos;s growth
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We encourage creative thinking and aren&apos;t afraid to challenge conventional approaches
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Benefits & Perks
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We take care of our team so they can focus on doing their best work
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Work</h3>
              <p className="text-white/80 text-sm">Remote and hybrid options available</p>
            </div>

            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Learning Budget</h3>
              <p className="text-white/80 text-sm">Continuous learning and development</p>
            </div>

            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Health Coverage</h3>
              <p className="text-white/80 text-sm">Comprehensive health benefits</p>
            </div>

            <div className="text-center text-white">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="font-semibold mb-2">Equity Options</h3>
              <p className="text-white/80 text-sm">Share in our company&apos;s success</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Join Our Team?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Take the next step in your career and help us shape the future of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="group bg-gradient-to-r from-emerald-500 to-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:from-emerald-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center"
            >
              Apply Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/about" 
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-all duration-300"
            >
              Learn More About Us
            </Link>
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
                Pioneering the future of artificial intelligence through innovative 
                technology and ethical design.
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