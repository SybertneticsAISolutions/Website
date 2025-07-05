// Demo page for Rune Drive
// Enhanced with comprehensive demo information and feature previews

import RuneDriveHeader from "../components/RuneDriveHeader";
import Link from "next/link";
import { Play, Users, Zap, ArrowRight, Star, Eye } from "lucide-react";

const featurePreviews = [
  {
    title: "Real-time Collaboration",
    description: "Watch multiple users edit the same world simultaneously with live conflict resolution and version control.",
    icon: Users,
    status: "Coming Soon"
  },
  {
    title: "Persistent World Mechanics",
    description: "See how player actions ripple across multiple campaigns and shape the evolving narrative of the world.",
    icon: Star,
    status: "In Development"
  },
  {
    title: "AI-Powered Tools",
    description: "Experience intelligent content suggestions, conflict detection, and automated consistency checks.",
    icon: Zap,
    status: "Beta Testing"
  },
  {
    title: "Creator Dashboard",
    description: "Explore the comprehensive dashboard for world creators, including analytics and revenue tracking.",
    icon: Eye,
    status: "Coming Soon"
  }
];

export default function RuneDriveDemo() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Demo Coming Soon
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                We&apos;re working hard to bring you a comprehensive demo of Rune Drive. 
                Join our beta waitlist to be among the first to experience the future of collaborative storytelling.
              </p>
            </div>

            {/* Main Demo Placeholder */}
            <div className="mb-20">
              <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-12 rounded-xl border border-purple-500/30">
                <div className="aspect-video bg-black/40 rounded-lg border border-purple-500/20 flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Play className="w-10 h-10 text-purple-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">Demo Coming Soon</h3>
                    <p className="text-indigo-200 max-w-md mx-auto">
                      Our comprehensive demo video is currently in production. 
                      Join our beta waitlist to be among the first to see it in action.
                    </p>
                  </div>
                </div>
                <div className="text-center">
                  <Link
                    href="/runedrive/beta"
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Join Beta Waitlist
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature Previews */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                What to Expect
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {featurePreviews.map((feature, index) => (
                  <div key={index} className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-600/20 p-3 rounded-lg">
                        <feature.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-lg font-bold text-purple-300">{feature.title}</h3>
                          <span className="text-xs text-indigo-300 bg-indigo-800/50 px-2 py-1 rounded">
                            {feature.status}
                          </span>
                        </div>
                        <p className="text-indigo-200 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What You'll See */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                What You&apos;ll See in the Demo
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Platform Walkthrough</h3>
                  <ul className="text-indigo-200 space-y-3">
                    <li>• Intuitive world-building interface</li>
                    <li>• Real-time collaborative editing</li>
                    <li>• Version control and conflict resolution</li>
                    <li>• Player integration and impact tracking</li>
                    <li>• Advanced search and discovery tools</li>
                  </ul>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Live Examples</h3>
                  <ul className="text-indigo-200 space-y-3">
                    <li>• Multiple GMs working on the same world</li>
                    <li>• Player choices affecting the narrative</li>
                    <li>• AI-powered content suggestions</li>
                    <li>• Community voting and feedback systems</li>
                    <li>• Revenue sharing and creator tools</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Stay Updated */}
            <div className="text-center mb-20">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <h2 className="text-2xl font-bold mb-4 text-purple-300">Stay Updated</h2>
                <p className="text-indigo-200 mb-6 max-w-2xl mx-auto">
                  Be the first to know when our demo is ready. Join our beta waitlist and follow our development progress.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/runedrive/beta"
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Join Beta Waitlist
                  </Link>
                  <Link
                    href="/runedrive/community"
                    className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    Join Community
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 