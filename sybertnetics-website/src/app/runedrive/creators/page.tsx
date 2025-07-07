import Link from 'next/link';
import RuneDriveHeader from "../components/RuneDriveHeader";
import { Users, GitBranch, BookOpen, Zap, Globe, Award, ArrowRight } from 'lucide-react';

export default function RuneDriveCreators() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                For Creators
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                The RuneDrive Creator Program empowers Game Masters, world-builders, and
                storytellers to build amazing worlds together. Anyone with Worldbuilder access is a creator.
              </p>
            </div>

            {/* Creator Benefits */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Why Build on RuneDrive?
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Users className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Collaborative World-Building</h3>
                  </div>
                  <p className="text-indigo-200">
                    Work with other creators to build rich, detailed worlds that grow beyond what any single person could create alone.
                  </p>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <GitBranch className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Version Control</h3>
                  </div>
                  <p className="text-indigo-200">
                    Every change is tracked, every contribution is preserved. Build with confidence knowing your work is safe and organized.
                  </p>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <BookOpen className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">System Agnostic</h3>
                  </div>
                  <p className="text-indigo-200">
                    Create worlds for any TTRPG system. RuneDrive focuses on world management, not rule enforcement.
                  </p>
                </div>
              </div>
            </div>

            {/* Creator Tools */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Creator Tools
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">World Builder</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Create and manage locations, NPCs, items, and storylines with our intuitive world-building tools.
                  </p>
                  <ul className="text-indigo-200 text-sm space-y-2">
                    <li>• Interactive maps and location management</li>
                    <li>• Character and NPC creation tools</li>
                    <li>• Storyline and quest tracking</li>
                    <li>• Lore and history management</li>
                  </ul>
                </div>
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Globe className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Collaboration Hub</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Work with other creators in real-time, with built-in communication and review tools.
                  </p>
                  <ul className="text-indigo-200 text-sm space-y-2">
                    <li>• Real-time collaborative editing</li>
                    <li>• Comment and review system</li>
                    <li>• Conflict resolution tools</li>
                    <li>• Creator permissions and roles</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Creator Recognition */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Creator Recognition
              </h2>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <Award className="w-8 h-8 text-purple-400 mr-3" />
                  <h3 className="text-2xl font-bold text-purple-300">Your Work Matters</h3>
                </div>
                <p className="text-lg text-indigo-200 leading-relaxed mb-6">
                  Every creator who contributes to RuneDrive worlds is recognized and celebrated. Your name is attached to your contributions, 
                  and the community can see and appreciate the work you&apos;ve done to build amazing worlds.
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">Creator Profiles</div>
                    <p className="text-indigo-200 text-sm">Showcase your contributions and build your reputation in the community</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">Contribution Tracking</div>
                    <p className="text-indigo-200 text-sm">See the impact of your work across multiple worlds and campaigns</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">Community Recognition</div>
                    <p className="text-indigo-200 text-sm">Get feedback and recognition from other creators and players</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black/20 p-12 rounded-xl border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Create Something Amazing?
              </h2>
              <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                Join our community of creators and start building worlds that will inspire players for years to come. 
                Your imagination is the only limit.
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