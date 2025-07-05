// Community page for Rune Drive
// Enhanced with comprehensive community information and engagement features

import RuneDriveHeader from "../components/RuneDriveHeader";
import { Users, MessageSquare, Rss, Calendar, Award, Zap, Star, ArrowRight, Heart, BookOpen } from 'lucide-react';
import Link from "next/link";

const communityLinks = [
  { 
    name: 'Discord Server', 
    description: 'Join 500+ members for live discussions, development updates, and community events.', 
    href: 'https://discord.gg/RQWDbbXSPG', 
    icon: MessageSquare,
    members: '500+',
    status: 'Live'
  },
  { 
    name: 'Development Blog', 
    description: 'Get the latest news, feature deep-dives, and behind-the-scenes insights.', 
    href: '/runedrive/blog', 
    icon: Rss,
    members: 'Weekly',
    status: 'Active'
  },
  { 
    name: 'Community Events', 
    description: 'Participate in playtests, workshops, and community-driven storytelling sessions.', 
    href: '#events', 
    icon: Calendar,
    members: 'Monthly',
    status: 'Upcoming'
  },
];

const upcomingEvents = [
  {
    title: "Community World-Building Workshop",
    date: "January 15, 2025",
    time: "7:00 PM EST",
    description: "Join us for a collaborative session where we'll build a new region of the Abyss together.",
    type: "Workshop"
  },
  {
    title: "Beta Feature Playtest",
    date: "January 22, 2025",
    time: "8:00 PM EST",
    description: "Test the latest collaborative tools and provide feedback to the development team.",
    type: "Playtest"
  },
  {
    title: "Creator Spotlight: Stories of the Abyss",
    date: "January 29, 2025",
    time: "6:00 PM EST",
    description: "Meet the creators behind our flagship setting and learn about their creative process.",
    type: "Showcase"
  }
];

export default function RuneDriveCommunity() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Join the Community
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                Connect with fellow storytellers, help shape the future of collaborative TTRPGs, 
                and be part of something revolutionary.
              </p>
            </div>

            {/* Community Stats */}
            <div className="grid md:grid-cols-4 gap-6 mb-16">
              <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-300 mb-1">500+</div>
                <div className="text-indigo-200 text-sm">Community Members</div>
              </div>
              <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
                <Heart className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-300 mb-1">50+</div>
                <div className="text-indigo-200 text-sm">Active Creators</div>
              </div>
              <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
                <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-300 mb-1">25+</div>
                <div className="text-indigo-200 text-sm">Worlds Created</div>
              </div>
              <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 text-center">
                <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-purple-300 mb-1">1000+</div>
                <div className="text-indigo-200 text-sm">Stories Shared</div>
              </div>
            </div>

            {/* Community Platforms */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Connect With Us
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {communityLinks.map((link) => (
                  <div key={link.name} className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <link.icon className="w-10 h-10 text-purple-400" />
                      <div className="text-right">
                        <div className="text-sm text-purple-300 font-semibold">{link.members}</div>
                        <div className="text-xs text-green-400">{link.status}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-purple-300 mb-3">{link.name}</h3>
                    <p className="text-indigo-200 text-sm leading-relaxed mb-4">{link.description}</p>
                    {link.href.startsWith('http') ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1"
                      >
                        Join Now
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors group-hover:translate-x-1"
                      >
                        Visit
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="mb-20" id="events">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Upcoming Events
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        event.type === 'Workshop' ? 'bg-blue-600/30 text-blue-300' :
                        event.type === 'Playtest' ? 'bg-green-600/30 text-green-300' :
                        'bg-purple-600/30 text-purple-300'
                      }`}>
                        {event.type}
                      </span>
                      <Calendar className="w-5 h-5 text-indigo-400" />
                    </div>
                    <h3 className="text-lg font-bold text-purple-300 mb-2">{event.title}</h3>
                    <div className="text-sm text-indigo-300 mb-3">
                      {event.date} • {event.time}
                    </div>
                    <p className="text-indigo-200 text-sm leading-relaxed">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Features */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Community Features
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Award className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Recognition System</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Earn badges and recognition for your contributions to the community. 
                    From helpful feedback to creative content, every contribution matters.
                  </p>
                  <ul className="text-indigo-200 text-sm space-y-2">
                    <li>• Beta Tester badges</li>
                    <li>• Creator recognition</li>
                    <li>• Community contributor awards</li>
                    <li>• Special event participation</li>
                  </ul>
                </div>

                <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                  <div className="flex items-center mb-4">
                    <Zap className="w-6 h-6 text-purple-400 mr-3" />
                    <h3 className="text-xl font-bold text-purple-300">Direct Influence</h3>
                  </div>
                  <p className="text-indigo-200 mb-4">
                    Your feedback directly shapes the development of Rune Drive. 
                    Participate in polls, discussions, and feature requests.
                  </p>
                  <ul className="text-indigo-200 text-sm space-y-2">
                    <li>• Feature voting system</li>
                    <li>• Development roadmap input</li>
                    <li>• Beta testing opportunities</li>
                    <li>• Direct developer communication</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="mb-20">
              <div className="bg-black/40 p-8 rounded-xl border border-purple-500/30">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Community Guidelines
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-300">Our Values</h3>
                    <ul className="text-indigo-200 space-y-3">
                      <li>• <strong>Inclusivity:</strong> Everyone is welcome, regardless of experience level</li>
                      <li>• <strong>Collaboration:</strong> We build together, not in competition</li>
                      <li>• <strong>Creativity:</strong> All forms of storytelling are valued</li>
                      <li>• <strong>Respect:</strong> Treat others with kindness and understanding</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-purple-300">What We Don't Tolerate</h3>
                    <ul className="text-indigo-200 space-y-3">
                      <li>• Harassment or discrimination</li>
                      <li>• Spam or self-promotion</li>
                      <li>• Sharing of inappropriate content</li>
                      <li>• Disruptive behavior</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center bg-black/20 p-12 rounded-xl border border-purple-500/20">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Join the Revolution?
              </h2>
              <p className="text-xl text-indigo-200 mb-8 max-w-2xl mx-auto">
                Be part of the community that's shaping the future of collaborative storytelling. 
                Your voice matters, your stories matter, and together we're building something amazing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://discord.gg/RQWDbbXSPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Join Discord
                  <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <Link
                  href="/runedrive/beta"
                  className="inline-flex items-center border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-8 rounded-lg hover:bg-indigo-400/20 transition-all"
                >
                  Join Beta Waitlist
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 