"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, Calendar, Tag, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export default function RunaDownloadPage() {
  const versions = [
    {
      version: "0.1.0",
      date: "2025-08-04",
      status: "closed-beta",
      description: "Closed beta testing - RUNA engine under development",
      changes: [
        "Core engine implementation",
        "Basic language specification",
        "Initial protocol framework",
        "Development and testing tools",
        "Internal documentation"
      ],
      breaking: [],
      downloads: {
        "Linux x64": "#",
        "macOS x64": "#", 
        "Windows x64": "#",
        "Source": "#"
      }
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable': return 'text-green-400 bg-green-400/20';
      case 'beta': return 'text-yellow-400 bg-yellow-400/20';
      case 'closed-beta': return 'text-orange-400 bg-orange-400/20';
      case 'alpha': return 'text-red-400 bg-red-400/20';
      default: return 'text-gray-400 bg-gray-400/20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'stable': return <CheckCircle className="w-4 h-4" />;
      case 'beta': return <AlertCircle className="w-4 h-4" />;
      case 'alpha': return <AlertCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

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
              Download RUNA
            </h1>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
              RUNA is currently in closed beta testing. The engine is under development and will be available for public release in October 2025.
            </p>
          </div>
        </div>
      </section>

      {/* Version List */}
      <section className="py-12 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          {versions.map((version, index) => (
            <div key={version.version} className="mb-12">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                {/* Version Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
                  <div className="flex items-center mb-4 sm:mb-0">
                    <h2 className="text-2xl font-bold text-purple-300 mr-4">
                      RUNA {version.version}
                    </h2>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(version.status)}`}>
                      {getStatusIcon(version.status)}
                      <span className="ml-1 capitalize">{version.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center text-indigo-300 text-sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    {version.date}
                  </div>
                </div>

                {/* Description */}
                <p className="text-indigo-200 mb-6">
                  {version.description}
                </p>

                {/* Downloads */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">Downloads</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(version.downloads).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        className="flex items-center justify-center bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-purple-200 py-3 px-4 rounded-lg border border-purple-500/30 transition-all"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Changes */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-purple-300 mb-4">What's New</h3>
                  <ul className="space-y-2">
                    {version.changes.map((change, changeIndex) => (
                      <li key={changeIndex} className="flex items-start text-indigo-200">
                        <span className="text-purple-400 mr-2">•</span>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Breaking Changes */}
                {version.breaking.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-red-400 mb-4">Breaking Changes</h3>
                    <ul className="space-y-2">
                      {version.breaking.map((change, changeIndex) => (
                        <li key={changeIndex} className="flex items-start text-red-300">
                          <span className="text-red-400 mr-2">⚠</span>
                          {change}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Documentation Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href={`/runa/docs/changelog#${version.version}`}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Detailed Changelog
                  </Link>
                  <Link 
                    href={`/runa/docs/${version.version}`}
                    className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Version Documentation
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 px-4 sm:px-8 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Additional Resources
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
              <FileText className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-purple-300">Documentation</h3>
              <p className="text-indigo-200 mb-4">
                Complete language reference, tutorials, and examples.
              </p>
              <Link 
                href="/runa/docs" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                Browse Docs
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
            
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
              <Tag className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-purple-300">Release Notes</h3>
              <p className="text-indigo-200 mb-4">
                Detailed information about each release and version history.
              </p>
              <Link 
                href="/runa/docs/changelog" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                View Releases
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
            
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
              <Download className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3 text-purple-300">Installation</h3>
              <p className="text-indigo-200 mb-4">
                Step-by-step installation guides for different platforms.
              </p>
              <Link 
                href="/runa/docs/installation" 
                className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
              >
                Installation Guide
                <ArrowLeft className="w-4 h-4 ml-2 rotate-180" />
              </Link>
            </div>
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