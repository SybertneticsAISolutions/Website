"use client";

import Link from 'next/link';
import { ArrowLeft, BookOpen, Code, Play, FileText, Download, Search, Lightbulb } from 'lucide-react';

export default function RunaDocsPage() {
  const docSections = [
    {
      title: "Getting Started",
      description: "Learn the basics and get RUNA running quickly",
      items: [
        { title: "Quick Start Guide", href: "/runa/docs/quickstart", icon: Play },
        { title: "Installation", href: "/runa/docs/installation", icon: Download },
        { title: "First Program", href: "/runa/docs/tutorial", icon: Code },
        { title: "Examples", href: "/runa/docs/examples", icon: Lightbulb }
      ]
    },
    {
      title: "Language Reference",
      description: "Complete reference for the RUNA language",
      items: [
        { title: "Syntax", href: "/runa/docs/syntax", icon: Code },
        { title: "Types", href: "/runa/docs/types", icon: FileText },
        { title: "Protocols", href: "/runa/docs/protocols", icon: BookOpen },
        { title: "Serialization", href: "/runa/docs/serialization", icon: FileText }
      ]
    },
    {
      title: "Advanced Topics",
      description: "Advanced concepts and best practices",
      items: [
        { title: "Federation Patterns", href: "/runa/docs/federation", icon: BookOpen },
        { title: "Performance", href: "/runa/docs/performance", icon: Lightbulb },
        { title: "Security", href: "/runa/docs/security", icon: FileText },
        { title: "Debugging", href: "/runa/docs/debugging", icon: Code }
      ]
    },
    {
      title: "API Reference",
      description: "Complete API documentation",
      items: [
        { title: "Core API", href: "/runa/docs/api/core", icon: Code },
        { title: "Protocol API", href: "/runa/docs/api/protocols", icon: FileText },
        { title: "Serialization API", href: "/runa/docs/api/serialization", icon: BookOpen },
        { title: "Utilities", href: "/runa/docs/api/utilities", icon: Lightbulb }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Header */}
      <section className="pt-24 pb-8 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            href="/runa" 
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to RUNA
          </Link>
          
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              RUNA Documentation
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-8">
              Complete documentation for the RUNA language, including tutorials, reference guides, and examples.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search documentation..."
                className="w-full bg-indigo-900/40 border border-purple-500/30 rounded-lg py-3 pl-10 pr-4 text-white placeholder-indigo-300 focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Documentation Sections */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {docSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-3 text-purple-300">{section.title}</h2>
                <p className="text-indigo-200 mb-6">{section.description}</p>
                
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      href={item.href}
                      className="flex items-center p-3 bg-purple-600/20 hover:bg-purple-600/30 rounded-lg border border-purple-500/30 transition-all group"
                    >
                      <item.icon className="w-5 h-5 text-purple-400 mr-3 group-hover:text-purple-300" />
                      <span className="text-indigo-200 group-hover:text-indigo-100">{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Quick Links
            </h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <Link 
              href="/runa/download"
              className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 rounded-xl border border-purple-500/20 text-center hover:from-purple-600/30 hover:to-indigo-600/30 transition-all"
            >
              <Download className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Download</h3>
              <p className="text-indigo-200 text-sm">Get the latest version of RUNA</p>
            </Link>
            
            <Link 
              href="/runa/docs/changelog"
              className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 rounded-xl border border-purple-500/20 text-center hover:from-purple-600/30 hover:to-indigo-600/30 transition-all"
            >
              <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Changelog</h3>
              <p className="text-indigo-200 text-sm">See what's new in each release</p>
            </Link>
            
            <Link 
              href="/runa/docs/examples"
              className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 rounded-xl border border-purple-500/20 text-center hover:from-purple-600/30 hover:to-indigo-600/30 transition-all"
            >
              <Code className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">Examples</h3>
              <p className="text-indigo-200 text-sm">Working code examples and patterns</p>
            </Link>
            
            <Link 
              href="/sybercraft"
              className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-6 rounded-xl border border-purple-500/20 text-center hover:from-purple-600/30 hover:to-indigo-600/30 transition-all"
            >
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-2 text-purple-300">SyberCraft</h3>
              <p className="text-indigo-200 text-sm">Learn about the federated architecture</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-8 text-center border-t border-purple-500/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-indigo-300 mb-4">A Sybertnetics Innovation</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Link href="/runa" className="text-purple-400 hover:text-purple-300 transition-colors">
              Back to RUNA
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