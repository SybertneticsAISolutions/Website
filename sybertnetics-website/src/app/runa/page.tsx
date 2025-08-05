"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, BookOpen, Zap, Globe, Users } from 'lucide-react';

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
              href="#overview" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              <span className="flex items-center">
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </span>
            </Link>
            <Link 
              href="#specification" 
              className="border-2 border-indigo-400 text-indigo-200 font-bold py-4 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
            >
              View Specification
            </Link>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              What is RUNA?
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              RUNA is a specialized language designed to enable precise, verifiable communication 
              between AI systems, particularly in federated architectures like SyberCraft.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <Code className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">Formal & Verifiable</h3>
              <p className="text-indigo-200 leading-relaxed">
                Built with mathematical rigor, RUNA ensures that AI communications are 
                unambiguous and can be formally verified for correctness.
              </p>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <Zap className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">High Performance</h3>
              <p className="text-indigo-200 leading-relaxed">
                Optimized for speed and efficiency, RUNA enables real-time communication 
                between AI systems with minimal overhead.
              </p>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6">
                <Globe className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-purple-300">AI-Native Design</h3>
              <p className="text-indigo-200 leading-relaxed">
                Designed specifically for AI-to-AI communication, RUNA eliminates the 
                ambiguity and inefficiency of human-readable protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Key Features
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Type Safety</h3>
              <p className="text-indigo-200 mb-4">
                Strong type system ensures that AI systems can only exchange data in 
                well-defined, compatible formats.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Compile-time error detection</li>
                <li>• Automatic type inference</li>
                <li>• Runtime type validation</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Protocol Verification</h3>
              <p className="text-indigo-200 mb-4">
                Built-in verification ensures that communication protocols are followed 
                correctly and consistently.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Protocol compliance checking</li>
                <li>• Message sequence validation</li>
                <li>• Error recovery mechanisms</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Efficient Serialization</h3>
              <p className="text-indigo-200 mb-4">
                Optimized binary format for fast parsing and minimal bandwidth usage 
                in AI-to-AI communications.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Binary message format</li>
                <li>• Zero-copy deserialization</li>
                <li>• Compression support</li>
              </ul>
            </div>
            
            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
              <h3 className="text-xl font-bold mb-4 text-purple-300">Federation Support</h3>
              <p className="text-indigo-200 mb-4">
                Designed specifically for federated AI architectures, enabling seamless 
                communication between specialized AI agents.
              </p>
              <ul className="text-indigo-200 text-sm space-y-2">
                <li>• Multi-agent coordination</li>
                <li>• Distributed consensus</li>
                <li>• Fault tolerance</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Specification Section */}
      <section id="specification" className="py-20 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Language Specification
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              RUNA is currently in active development. The full specification will be 
              available as part of our SyberCraft documentation.
            </p>
          </div>
          
          <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 text-center">
            <BookOpen className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-purple-300">Coming Soon</h3>
            <p className="text-indigo-200 mb-6">
              The complete RUNA language specification, including syntax, semantics, 
              and implementation details, will be published alongside the SyberCraft 
              architecture documentation.
            </p>
            <Link 
              href="/sybercraft" 
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
            >
              <span className="flex items-center">
                Learn About SyberCraft
                <ArrowRight className="ml-2 w-4 h-4" />
              </span>
            </Link>
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