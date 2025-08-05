"use client";

// Main landing page for RuneDrive
// Enhanced with better content and visual improvements

import Link from 'next/link';
import { Gamepad2, GitBranch, BookOpen, Users, Sparkles, ArrowRight, Star, Zap } from "lucide-react";
import RuneDriveHeader from './components/RuneDriveHeader';
import { useState, useEffect } from 'react';
import { getDiscordMemberCount } from '@/utils/supabaseFunctions';
import Image from 'next/image';

// Cache busting update - Dec 19 2024 - forcing fresh deployment

// Enhanced starlight background with better performance
const styles = `
  .starlight-background {
    background-color: #0c0a1f;
    background-image:
      radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 40px),
      radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 30px),
      radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 40px),
      radial-gradient(rgba(255,255,255,.4), rgba(255,255,255,.1) 2px, transparent 30px);
    background-size: 550px 550px, 350px 350px, 250px 250px, 150px 150px;
    background-position: 0 0, 40px 60px, 130px 270px, 70px 100px;
    animation: starlight-float 20s ease-in-out infinite;
  }
  
  @keyframes starlight-float {
    0%, 100% { background-position: 0 0, 40px 60px, 130px 270px, 70px 100px; }
    50% { background-position: 20px 20px, 60px 80px, 150px 290px, 90px 120px; }
  }
  
  .cosmic-glow {
    box-shadow: 0 0 30px rgba(147, 51, 234, 0.3), 0 0 60px rgba(99, 102, 241, 0.2);
  }
  
  .text-glow {
    text-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
  }
`;

export default function RuneDriveLanding() {
  const [discordMembers, setDiscordMembers] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Force deployment trigger - updated beta date to Q2 2026
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch Discord member count
        const discordResult = await getDiscordMemberCount();
        setDiscordMembers(discordResult);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Format numbers with proper fallbacks
  const formatDiscordMembers = () => {
    if (isLoading) return "Loading...";
    if (discordMembers === null) return "Growing";
    return `${discordMembers}+`;
  };

  return (
    <>
      <style>{styles}</style>
      <RuneDriveHeader />
      <div className="starlight-background text-white font-sans">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 sm:p-8">
          <div className="bg-black/40 backdrop-blur-md rounded-3xl p-6 sm:p-8 lg:p-12 border border-purple-500/30 cosmic-glow max-w-5xl w-full">
            <div className="flex flex-col items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400 mb-2" />
              <span className="text-purple-300 font-semibold text-sm sm:text-base text-center">Revolutionary TTRPG Platform</span>
            </div>
            
            {/* RuneDrive Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/runedrive-logo.png"
                alt="RuneDrive Logo"
                width={400}
                height={120}
                className="max-w-full h-auto cosmic-glow"
                priority
              />
            </div>
            
            {/* Fallback text title if logo doesn't load */}
            <h1 className="sr-only">RuneDrive</h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-indigo-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              The collaborative campaign engine for building persistent, player-driven TTRPG universes. 
              Where every story matters and every choice shapes the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
              <Link href="/runedrive/beta" className="group bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-lg transition-all transform hover:scale-105 cosmic-glow">
                <span className="flex items-center">
                  Join the Beta
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link href="/runedrive/demo" className="border-2 border-indigo-400 text-indigo-200 font-bold py-4 px-8 rounded-lg hover:bg-indigo-400/20 transition-all backdrop-blur-sm">
                Watch the Demo
              </Link>
            </div>
            <div className="flex items-center justify-center text-sm text-indigo-300">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              <span>Join our growing community of creators</span>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Why RuneDrive?
              </h2>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                We&apos;re reimagining how tabletop RPGs work in the digital age, bringing together 
                the best of collaborative storytelling with powerful digital tools.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group">
                <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6 group-hover:bg-purple-600/30 transition-colors">
                  <Gamepad2 className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Persistent Worlds</h3>
                <p className="text-indigo-200 leading-relaxed">
                  Player actions have lasting consequences that ripple across campaigns. 
                  See the world evolve from session to session, with every choice building 
                  a richer, more dynamic universe.
                </p>
              </div>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group">
                <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6 group-hover:bg-purple-600/30 transition-colors">
                  <GitBranch className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-purple-300">Collaborative Storytelling</h3>
                <p className="text-indigo-200 leading-relaxed">
                  Game Masters and players build the canon together in a shared, 
                  version-controlled environment. Every contribution matters and 
                  becomes part of the living world.
                </p>
              </div>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group">
                <div className="bg-purple-600/20 p-3 rounded-lg w-fit mb-6 group-hover:bg-purple-600/30 transition-colors">
                  <BookOpen className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-purple-300">System Agnostic</h3>
                <p className="text-indigo-200 leading-relaxed">
                  Bring your favorite TTRPG system. RuneDrive handles the world 
                  management, lore tracking, and collaborative tools while you focus 
                  on the rules and gameplay you love.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-8 bg-black/20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                How It Works
              </h2>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto">
                RuneDrive makes collaborative world-building seamless and engaging
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">1</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-purple-300">Create Your World</h3>
                <p className="text-indigo-200 text-sm">
                  Create your own world using our templates or your own system
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">2</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-purple-300">Get Approved & Shared</h3>
                <p className="text-indigo-200 text-sm">
                  Once approved, it will be shared in our universe to other DMs, either self promote or let it be natural
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">3</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-purple-300">Build Together</h3>
                <p className="text-indigo-200 text-sm">
                  Collaborate with other DMs to expand and enhance your world
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-600/20 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-purple-400">4</span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-purple-300">Watch It Grow</h3>
                <p className="text-indigo-200 text-sm">
                  See your world evolve as players make choices that affect the entire universe
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Preview */}
        <section className="py-20 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Powerful Features
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <Zap className="w-6 h-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-bold text-purple-300">Real-time Collaboration</h3>
                </div>
                <p className="text-indigo-200 mb-4">
                  Multiple GMs can work on the same world simultaneously, with live updates 
                  and conflict resolution tools.
                </p>
                <ul className="text-indigo-200 text-sm space-y-2">
                  <li>• Live editing with conflict detection</li>
                  <li>• Version control for all world elements</li>
                  <li>• Comment and review system</li>
                </ul>
              </div>
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-purple-400 mr-3" />
                  <h3 className="text-xl font-bold text-purple-300">Player Integration</h3>
                </div>
                <p className="text-indigo-200 mb-4">
                  Players can contribute to the world through their actions and choices, 
                  with GM approval workflows.
                </p>
                <ul className="text-indigo-200 text-sm space-y-2">
                  <li>• Player character impact tracking</li>
                  <li>• Community voting on world changes</li>
                  <li>• Achievement and contribution badges</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 px-8 text-center bg-black/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Join Our Community
            </h2>
            <p className="text-xl text-indigo-200 max-w-3xl mx-auto mb-8 leading-relaxed">
              Connect with other creators, get development updates, and help shape the future of RuneDrive. 
              Our community is already building amazing worlds together.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a
                href="https://discord.gg/RQWDbbXSPG"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-4 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                </svg>
                Join Discord
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href="/runedrive/beta"
                className="group inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 px-8 rounded-lg transition-all transform hover:scale-105"
              >
                Join Beta Waitlist
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">{formatDiscordMembers()}</div>
                <div className="text-indigo-200">Active Discord Members</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400 mb-2">Q2 2026</div>
                <div className="text-indigo-200">Beta Launch Target</div>
              </div>
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
              <Link href="/runedrive/about" className="text-purple-400 hover:text-purple-300 transition-colors">
                About RuneDrive
              </Link>
              <span className="text-indigo-400">•</span>
              <Link href="/runedrive/universe" className="text-purple-400 hover:text-purple-300 transition-colors">
                Stories of the Abyss
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 