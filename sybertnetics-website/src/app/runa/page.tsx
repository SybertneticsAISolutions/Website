"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, BookOpen, Zap, Globe, Download, FileText, Play, Terminal } from 'lucide-react';

export default function RunaLanguagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Image
              src="/runalogo.png"
              alt="RUNA Language Logo"
              width={300}
              height={100}
              className="max-w-full h-auto"
              priority
            />
          </div>
          
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            The RUNA Language
          </h1>
          
          <p className="text-xl sm:text-2xl text-indigo-200 max-w-4xl mx-auto mb-8 leading-relaxed">
            A formal, verifiable, and efficient AI-to-AI communication protocol designed for 
            the next generation of artificial intelligence systems.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link 
              href="/runa/download" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              <span className="flex items-center">
                <Download className="mr-2 w-5 h-5" />
                Download RUNA
              </span>
            </Link>
            <Link 
              href="#getting-started" 
              className="border-2 border-indigo-400 text-indigo-200 font-bold py-4 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
            >
              <span className="flex items-center">
                <Play className="mr-2 w-5 h-5" />
                Get Started
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* What is RUNA Section */}
      <section className="py-20 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              What is RUNA?
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              RUNA is a specialized programming language designed to enable precise, verifiable communication 
              between AI systems in federated architectures like SyberCraft.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">AI-Native Language</h3>
              <p className="text-indigo-200 leading-relaxed">
                Built specifically for AI-to-AI communication, RUNA eliminates ambiguity and provides 
                formal verification capabilities that human-readable protocols lack.
              </p>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">High Performance</h3>
              <p className="text-indigo-200 leading-relaxed">
                Optimized binary format enables real-time communication between AI systems with 
                minimal overhead and maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Use Cases
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              RUNA is designed for scenarios where AI systems need to communicate with precision, 
              reliability, and formal verification.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Federated AI Systems</h3>
              <p className="text-indigo-200 mb-4">
                Enable secure communication between specialized AI agents in distributed architectures.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Multi-agent coordination</li>
                <li>• Distributed consensus</li>
                <li>• Secure data exchange</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">AI Governance</h3>
              <p className="text-indigo-200 mb-4">
                Provide verifiable communication protocols for AI oversight and control systems.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Policy enforcement</li>
                <li>• Audit trails</li>
                <li>• Compliance verification</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Research & Development</h3>
              <p className="text-indigo-200 mb-4">
                Accelerate AI research by providing standardized communication protocols.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Reproducible experiments</li>
                <li>• Standardized interfaces</li>
                <li>• Collaborative development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section id="getting-started" className="py-20 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Getting Started
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              Start using RUNA in your AI projects with our comprehensive documentation and examples.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <Terminal className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">Quick Start</h3>
              <p className="text-indigo-200 mb-4">
                Get RUNA running in minutes with our step-by-step installation guide.
              </p>
              <Link 
                href="/runa/docs/quickstart" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                Read Quick Start Guide
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <FileText className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">Documentation</h3>
              <p className="text-indigo-200 mb-4">
                Explore the complete RUNA language reference and tutorials.
              </p>
              <Link 
                href="/runa/docs" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                Browse Documentation
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Version Section */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-8 rounded-xl border border-purple-500/20">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-purple-300">Latest Release: RUNA 1.0.0</h3>
              <p className="text-indigo-200 mb-6">
                The first stable release of RUNA is now available for production use in AI systems.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/runa/download" 
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                >
                  <span className="flex items-center">
                    <Download className="mr-2 w-4 h-4" />
                    Download RUNA 1.0.0
                  </span>
                </Link>
                <Link 
                  href="/runa/docs/changelog" 
                  className="border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-6 rounded-lg hover:bg-indigo-400/20 transition-all"
                >
                  View Changelog
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 text-center border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-indigo-300 mb-4">A Sybertnetics Innovation</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/home" className="text-purple-400 hover:text-purple-300 transition-colors">
              Back to Sybertnetics Home
            </Link>
            <span className="text-indigo-400">•</span>
            <Link href="/sybercraft" className="text-purple-400 hover:text-purple-300 transition-colors">
              SyberCraft Architecture
            </Link>
            <span className="text-indigo-400">•</span>
            <Link href="/runedrive" className="text-purple-400 hover:text-purple-300 transition-colors">
              RuneDrive Platform
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
} 