// About page for Rune Drive
// Enhanced with comprehensive content about the platform

import Link from 'next/link';
import { Target, Eye, Users, Code, Shield, Zap } from "lucide-react";
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
                About Rune Drive
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                We're building the future of collaborative tabletop RPGs, where every story matters 
                and every player can shape the world they play in.
              </p>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-12 mb-20">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <Target className="w-8 h-8 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-bold text-purple-300">Our Mission</h2>
                </div>
                <p className="text-indigo-200 leading-relaxed mb-4">
                  To democratize world-building and make collaborative storytelling accessible to 
                  every tabletop RPG group, regardless of size or experience level.
                </p>
                <p className="text-indigo-200 leading-relaxed">
                  We believe that the best stories emerge when players and Game Masters work together 
                  as co-creators, not just participants. Rune Drive provides the tools and framework 
                  to make this collaboration seamless and rewarding.
                </p>
              </div>

              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <Eye className="w-8 h-8 text-purple-400 mr-3" />
                  <h2 className="text-2xl font-bold text-purple-300">Our Vision</h2>
                </div>
                <p className="text-indigo-200 leading-relaxed mb-4">
                  A world where every TTRPG campaign contributes to a living, breathing universe 
                  that grows richer with each session.
                </p>
                <p className="text-indigo-200 leading-relaxed">
                  We envision a future where players can see their choices ripple across multiple 
                  campaigns, where GMs can build upon each other's work, and where the line between 
                  creator and participant becomes beautifully blurred.
                </p>
              </div>
            </div>

            {/* Core Principles */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Core Principles
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Collaboration First</h3>
                  <p className="text-indigo-200">
                    Every feature is designed to enhance collaboration between GMs and players, 
                    making world-building a shared experience.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">GM Empowerment</h3>
                  <p className="text-indigo-200">
                    GMs retain full creative control while gaining powerful tools to manage 
                    complex, evolving worlds and multiple campaigns.
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">System Agnostic</h3>
                  <p className="text-indigo-200">
                    Built to work with any TTRPG system, focusing on world management rather 
                    than rule enforcement.
                  </p>
                </div>
              </div>
            </div>

            {/* Technical Approach */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Technical Approach
              </h2>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-300">Modern Architecture</h3>
                    <p className="text-indigo-200 mb-4">
                      Built with cutting-edge web technologies for real-time collaboration, 
                      ensuring smooth performance even with large groups.
                    </p>
                    <ul className="text-indigo-200 space-y-2">
                      <li>• Real-time synchronization</li>
                      <li>• Offline capability</li>
                      <li>• Cross-platform compatibility</li>
                      <li>• Scalable infrastructure</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-300">AI-Powered Features</h3>
                    <p className="text-indigo-200 mb-4">
                      Intelligent tools that enhance creativity without replacing human imagination.
                    </p>
                    <ul className="text-indigo-200 space-y-2">
                      <li>• Smart content suggestions</li>
                      <li>• Conflict detection</li>
                      <li>• Automated consistency checks</li>
                      <li>• Intelligent search and discovery</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Team & Development */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Development & Team
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Development Philosophy</h3>
                  <p className="text-indigo-200 mb-4">
                    We believe in building in public, with our community guiding every major decision. 
                    Your feedback shapes the platform's evolution.
                  </p>
                  <p className="text-indigo-200">
                    Our development process is iterative and community-driven, ensuring that 
                    Rune Drive grows into exactly what the TTRPG community needs.
                  </p>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <h3 className="text-xl font-bold mb-4 text-purple-300">Community First</h3>
                  <p className="text-indigo-200 mb-4">
                    Every feature, every decision, every update is informed by our growing 
                    community of creators and players.
                  </p>
                  <p className="text-indigo-200">
                    Join our Discord to participate in development discussions, beta testing, 
                    and help shape the future of collaborative TTRPGs.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black/20 p-12 rounded-xl border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Join the Revolution?
              </h2>
              <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                Be part of the future of collaborative tabletop RPGs. Join our beta waitlist 
                and help shape the platform that will change how we tell stories together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/runedrive/beta"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Join Beta Waitlist
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