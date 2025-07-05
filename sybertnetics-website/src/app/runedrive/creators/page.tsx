import Link from 'next/link';
import { Palette, Users, DollarSign, Zap, Star, Award, BookOpen } from "lucide-react";
import RuneDriveHeader from "../components/RuneDriveHeader";

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
                Creator Program
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                Build your own universe, share your stories with the world, and earn from your creativity. 
                Join the next generation of collaborative storytelling.
              </p>
            </div>

            {/* What is the Creator Program */}
            <div className="mb-20">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-6">
                  <Palette className="w-8 h-8 text-purple-400 mr-3" />
                  <h2 className="text-3xl font-bold text-purple-300">What is the Creator Program?</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-indigo-200 leading-relaxed mb-4">
                      The Rune Drive Creator Program empowers Game Masters, world-builders, and 
                      storytellers to create their own collaborative universes on our platform.
                    </p>
                    <p className="text-indigo-200 leading-relaxed">
                      Whether you&apos;re a veteran GM with years of experience or a newcomer with 
                      a unique vision, our tools and community support will help you bring your 
                      stories to life and share them with players around the world.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-purple-300">Who Can Join?</h3>
                    <ul className="text-indigo-200 space-y-2">
                      <li>• Experienced Game Masters</li>
                      <li>• World-builders and lore creators</li>
                      <li>• Content creators and streamers</li>
                      <li>• Indie game designers</li>
                      <li>• Anyone with a story to tell</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-purple-600/20 rounded-lg text-center">
                  <p className="text-purple-200 text-lg font-semibold">
                    <strong>Anyone with access to the Worldbuilder is a creator. There is no application process or gatekeeping.</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Why Build on Rune Drive?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Powerful Tools</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Access to our full suite of world-building tools, including collaborative 
                    editing, version control, and AI-powered content suggestions.
                  </p>
                </div>

                <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Growing Community</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Connect with thousands of players actively seeking new worlds to explore 
                    and stories to experience.
                  </p>
                </div>

                <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                    <DollarSign className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Fair Revenue Sharing</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Earn from your creations with our transparent revenue sharing model. 
                    Keep up to 80% of revenue from your content.
                  </p>
                </div>

                <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                    <Star className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Creator Recognition</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Build your reputation as a creator with our recognition system, 
                    featuring creator profiles and achievement badges.
                  </p>
                </div>

                <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Educational Resources</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Access to workshops, tutorials, and mentorship from experienced creators 
                    to help you develop your skills.
                  </p>
                </div>

                <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-4">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-purple-300">Early Access</h3>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    Be among the first to test new features and provide feedback that 
                    shapes the future of the platform.
                  </p>
                </div>
              </div>
            </div>

            {/* Creator Tiers */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Creator Tiers
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">Novice Creator</h3>
                    <p className="text-indigo-200 text-sm">Perfect for getting started</p>
                  </div>
                  <ul className="text-indigo-200 space-y-3 mb-6">
                    <li>• Basic world-building tools</li>
                    <li>• Community support</li>
                    <li>• 60% revenue share</li>
                    <li>• Access to tutorials</li>
                    <li>• Basic analytics</li>
                  </ul>
                  <div className="text-center">
                    <span className="text-purple-400 font-semibold">Free to join</span>
                  </div>
                </div>

                <div className="bg-purple-900/40 p-8 rounded-xl border border-purple-400/30 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">Established Creator</h3>
                    <p className="text-indigo-200 text-sm">For active creators</p>
                  </div>
                  <ul className="text-indigo-200 space-y-3 mb-6">
                    <li>• Advanced collaboration tools</li>
                    <li>• Priority support</li>
                    <li>• 70% revenue share</li>
                    <li>• Creator workshops</li>
                    <li>• Advanced analytics</li>
                    <li>• Early feature access</li>
                  </ul>
                  <div className="text-center">
                    <span className="text-purple-400 font-semibold">$9.99/month</span>
                  </div>
                </div>

                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-purple-300 mb-2">Master Creator</h3>
                    <p className="text-indigo-200 text-sm">For top-tier creators</p>
                  </div>
                  <ul className="text-indigo-200 space-y-3 mb-6">
                    <li>• All platform features</li>
                    <li>• Dedicated support</li>
                    <li>• 80% revenue share</li>
                    <li>• Personal mentorship</li>
                    <li>• Custom branding</li>
                    <li>• Platform partnership</li>
                  </ul>
                  <div className="text-center">
                    <span className="text-purple-400 font-semibold">Invitation only</span>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Get Started */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                How to Get Started
              </h2>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 text-center">
                <h3 className="text-xl font-bold mb-4 text-purple-300">Start Creating Instantly</h3>
                <p className="text-indigo-200 text-lg mb-4">
                  If you have access to the Worldbuilder, you are already a creator! There is no application, no vetting, and no gatekeeping. Just start building your world and sharing your stories.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                  <Link
                    href="/runedrive/beta"
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    Get Worldbuilder Access
                  </Link>
                  <a
                    href="https://discord.gg/RQWDbbXSPG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
                  >
                    Join Creator Discord
                  </a>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black/20 p-12 rounded-xl border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Create Your Universe?
              </h2>
              <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                Start building your world today. Your stories deserve to be shared with the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/runedrive/beta"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Get Worldbuilder Access
                </Link>
                <a
                  href="https://discord.gg/RQWDbbXSPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
                >
                  Join Creator Discord
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}