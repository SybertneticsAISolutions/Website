// About page for RuneDrive
// Enhanced with comprehensive information about the platform

import Link from 'next/link';
import { Target, Eye, Users, Code, Shield, Zap, GitBranch, BookOpen, Sparkles, ArrowRight, Star, Globe } from "lucide-react";
import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveAbout() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                About RuneDrive
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                We&apos;re building the future of collaborative tabletop RPGs, where players and GMs work together 
                as co-creators, not just participants. RuneDrive provides the tools and framework
                for building persistent, living worlds that evolve with every session.
              </p>
            </div>

            {/* Mission Section */}
            <div className="mb-20">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <Sparkles className="w-8 h-8 text-purple-400 mr-3" />
                  <h2 className="text-3xl font-bold text-purple-300">Our Mission</h2>
                </div>
                <p className="text-lg text-indigo-200 leading-relaxed mb-6">
                  We believe that the best TTRPG experiences happen when everyone at the table feels like they have 
                  a stake in the world. RuneDrive is designed to break down the barriers between players and GMs, 
                  creating a truly collaborative storytelling experience where every choice matters and every story 
                  contributes to a living, breathing universe.
                </p>
                <p className="text-lg text-indigo-200 leading-relaxed">
                  Our platform combines the best of digital tools with the creativity and flexibility of tabletop gaming, 
                  making it easier than ever to build, manage, and evolve complex worlds together.
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Core Values
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Collaboration First</h3>
                  </div>
                  <p className="text-indigo-200">
                    Every feature is designed to encourage teamwork and shared ownership of the story. 
                    We believe that the best worlds are built together.
                  </p>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <GitBranch className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Flexibility & Freedom</h3>
                  </div>
                  <p className="text-indigo-200">
                    Use any TTRPG system you want. RuneDrive adapts to your playstyle, not the other way around.
                  </p>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Story Preservation</h3>
                  </div>
                  <p className="text-indigo-200">
                    Every session, every choice, every character leaves a mark on the world. 
                    Nothing is forgotten, everything builds toward something greater.
                  </p>
                </div>
              </div>
            </div>

            {/* The Problem We Solve */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                The Problem We Solve
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-red-900/20 p-8 rounded-xl border border-red-500/20">
                  <h3 className="text-xl font-bold mb-4 text-red-300">Traditional TTRPG Limitations</h3>
                  <ul className="text-red-200 space-y-3">
                    <li>• Worlds reset when campaigns end</li>
                    <li>• Player choices have limited impact</li>
                    <li>• Collaboration is difficult to manage</li>
                    <li>• Lore and continuity are hard to track</li>
                    <li>• GMs work in isolation</li>
                  </ul>
                </div>
                <div className="bg-green-900/20 p-8 rounded-xl border border-green-500/20">
                  <h3 className="text-xl font-bold mb-4 text-green-300">RuneDrive Solution</h3>
                  <ul className="text-green-200 space-y-3">
                    <li>• Persistent worlds that grow over time</li>
                    <li>• Every choice shapes the universe</li>
                    <li>• Built-in collaboration tools</li>
                    <li>• Comprehensive lore management</li>
                    <li>• Multi-GM support</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Technology */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Built for the Future
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Real-time Collaboration</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Multiple users can work on the same world simultaneously with live updates, 
                    conflict resolution, and version control.
                  </p>
                  <ul className="text-indigo-200 text-sm space-y-2">
                    <li>• Live editing with conflict detection</li>
                    <li>• Git-like version control for world elements</li>
                    <li>• Comment and review system</li>
                    <li>• Real-time notifications</li>
                  </ul>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Cross-Platform</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Access your worlds from anywhere. Web-based with mobile apps coming soon.
                  </p>
                  <ul className="text-indigo-200 text-sm space-y-2">
                    <li>• Web-based platform</li>
                    <li>• Mobile apps in development</li>
                    <li>• Offline capability</li>
                    <li>• Cross-device synchronization</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                The Team
              </h2>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <p className="text-lg text-indigo-200 leading-relaxed mb-6">
                  RuneDrive is developed by a small, passionate team of TTRPG enthusiasts, software engineers, 
                  and storytellers. We&apos;re building the platform we always wished we had for our own games.
                </p>
                <p className="text-lg text-indigo-200 leading-relaxed">
                  Our development process is community-driven, with regular feedback from beta testers, 
                  Discord members, and the broader TTRPG community helping to ensure that RuneDrive grows into exactly what the TTRPG community needs.
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black/20 p-12 rounded-xl border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Build Something Amazing?
              </h2>
              <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                Join our community and be part of the future of collaborative storytelling. 
                Your voice matters in shaping what RuneDrive becomes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/runedrive/beta"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
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