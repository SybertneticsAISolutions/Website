// Demo page for Rune Drive
// Enhanced with comprehensive demo information and feature previews

import RuneDriveHeader from "../components/RuneDriveHeader";
import Link from "next/link";
import { Play, Calendar, Users, Zap, ArrowRight, Star, Eye, Clock } from "lucide-react";

const upcomingDemos = [
  {
    title: "Core Platform Demo",
    date: "January 20, 2025",
    time: "7:00 PM EST",
    description: "A comprehensive walkthrough of Rune Drive's core features, including world-building tools, collaborative editing, and persistent world mechanics.",
    type: "Live Stream",
    duration: "45 minutes"
  },
  {
    title: "Stories of the Abyss Demo",
    date: "January 27, 2025",
    time: "8:00 PM EST",
    description: "Experience our flagship setting in action as we demonstrate collaborative storytelling with multiple GMs and players.",
    type: "Interactive",
    duration: "60 minutes"
  },
  {
    title: "Creator Tools Deep Dive",
    date: "February 3, 2025",
    time: "6:00 PM EST",
    description: "Detailed demonstration of creator tools, revenue sharing features, and community management capabilities.",
    type: "Workshop",
    duration: "90 minutes"
  }
];

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
                Watch the Demo
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                See Rune Drive in action and discover how it revolutionizes collaborative storytelling. 
                Experience the future of tabletop RPGs firsthand.
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

            {/* Upcoming Live Demos */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Upcoming Live Demos
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {upcomingDemos.map((demo, index) => (
                  <div key={index} className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        demo.type === 'Live Stream' ? 'bg-red-600/30 text-red-300' :
                        demo.type === 'Interactive' ? 'bg-green-600/30 text-green-300' :
                        'bg-blue-600/30 text-blue-300'
                      }`}>
                        {demo.type}
                      </span>
                      <div className="flex items-center gap-1 text-indigo-300 text-sm">
                        <Clock className="w-4 h-4" />
                        {demo.duration}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-purple-300 mb-3">{demo.title}</h3>
                    <div className="text-sm text-indigo-300 mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4" />
                        {demo.date} • {demo.time}
                      </div>
                    </div>
                    <p className="text-indigo-200 text-sm leading-relaxed mb-4">{demo.description}</p>
                    <button className="w-full bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 font-medium py-2 px-4 rounded-lg transition-colors">
                      Set Reminder
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Feature Previews */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Feature Previews
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
                What You'll See in the Demo
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

            {/* Demo Request */}
            <div className="mb-20">
              <div className="bg-black/40 p-8 rounded-xl border border-purple-500/30">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                    Request a Private Demo
                  </h2>
                  <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                    Are you a content creator, game master, or interested in bringing Rune Drive to your organization? 
                    We'd love to show you a personalized demo.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/runedrive/beta"
                      className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                    >
                      <Zap className="w-5 h-5 mr-2" />
                      Request Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <a
                      href="https://discord.gg/RQWDbbXSPG"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
                    >
                      Ask on Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black/20 p-12 rounded-xl border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Experience the Future?
              </h2>
              <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                Join our beta waitlist to be among the first to experience Rune Drive in action. 
                Your feedback will help shape the future of collaborative storytelling.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/runedrive/beta"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Join Beta Waitlist
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <a
                  href="https://discord.gg/RQWDbbXSPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
                >
                  Join Discord
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 