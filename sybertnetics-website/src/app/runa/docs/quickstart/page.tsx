"use client";

import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Code, FileText } from 'lucide-react';

export default function RunaQuickStartPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/runa/docs" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Documentation
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              RUNA Development Status
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              RUNA is currently in closed beta testing. The engine is under development and will be available for public release in October 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Current Status */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-300">Current Status</h2>
            <p className="text-indigo-200 mb-6">
              RUNA is in active development with closed beta testing underway.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center text-indigo-200">
                <Clock className="w-5 h-5 text-purple-400 mr-3" />
                <span>Status: Closed Beta Testing</span>
              </div>
              <div className="flex items-center text-indigo-200">
                <Calendar className="w-5 h-5 text-purple-400 mr-3" />
                <span>Public Release: October 2025</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Development Progress */}
      <section className="py-12 px-4 sm:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Development Progress
          </h2>
          
          <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 text-center">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">What's Happening Now</h3>
            <p className="text-indigo-200 mb-6">
              The RUNA team is actively working on core engine development and testing.
            </p>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">Current Development Areas:</h4>
              <ul className="text-indigo-200 space-y-2 text-left max-w-2xl mx-auto">
                <li>• Core engine implementation and testing</li>
                <li>• Language specification refinement</li>
                <li>• Protocol framework development</li>
                <li>• Performance optimization</li>
                <li>• Security validation</li>
                <li>• Documentation preparation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Release */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Coming October 2025
          </h2>
          
          <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 text-center">
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Public Release</h3>
            <p className="text-indigo-200 mb-6">
              RUNA will be publicly available in October 2025 with full documentation, 
              installation guides, and working examples.
            </p>
            <div className="bg-slate-800 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-purple-300 mb-4">What to Expect:</h4>
              <ul className="text-indigo-200 space-y-2 text-left max-w-2xl mx-auto">
                <li>• Complete language specification</li>
                <li>• Installation packages for all platforms</li>
                <li>• Comprehensive documentation and tutorials</li>
                <li>• Working examples and use cases</li>
                <li>• Community support and resources</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learn More */}
      <section className="py-12 px-4 sm:px-8 bg-black/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Learn More
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Link 
              href="/sybercraft"
              className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center hover:bg-indigo-900/60 transition-all"
            >
              <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">SyberCraft Architecture</h3>
              <p className="text-indigo-200 text-sm">
                Learn about the federated AI architecture that RUNA is designed for
              </p>
            </Link>
            
            <Link 
              href="/runa/docs"
              className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center hover:bg-indigo-900/60 transition-all"
            >
              <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Documentation</h3>
              <p className="text-indigo-200 text-sm">
                Explore the planned documentation structure and resources
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 text-center border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-indigo-300 mb-4">A Sybertnetics Innovation</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/runa/docs" className="text-purple-400 hover:text-purple-300 transition-colors">
              Back to Documentation
            </Link>
            <span className="text-indigo-400">•</span>
            <Link href="/runa" className="text-purple-400 hover:text-purple-300 transition-colors">
              Back to RUNA
            </Link>
            <span className="text-indigo-400">•</span>
            <Link href="/sybercraft" className="text-purple-400 hover:text-purple-300 transition-colors">
              SyberCraft Architecture
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 