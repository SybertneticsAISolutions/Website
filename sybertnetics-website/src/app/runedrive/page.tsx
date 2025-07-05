// Main landing page for Rune Drive
// TODO: Apply dark theme and cosmic accents
// TODO: Replace placeholders with final content and assets

import Link from 'next/link';
import { Gamepad2, GitBranch, BookOpen } from "lucide-react";
import RuneDriveHeader from './components/RuneDriveHeader';

// TODO: The styles for this page should be moved to a dedicated CSS module
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
  }
`;

export default function RuneDriveLanding() {
  return (
    <>
      <style>{styles}</style>
      <RuneDriveHeader />
      <div className="starlight-background text-white font-sans">
        
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center p-8">
          <div className="bg-black/30 backdrop-blur-md rounded-3xl p-12 border border-purple-500/30">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Rune Drive
            </h1>
            <p className="text-xl md:text-2xl text-indigo-200 max-w-2xl mx-auto">
              The collaborative campaign engine for building persistent, player-driven TTRPG universes.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link href="/runedrive/beta" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
                Join the Beta
              </Link>
              <Link href="/runedrive/demo" className="border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-6 rounded-lg hover:bg-indigo-400/20 transition-all">
                Watch the Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Value Proposition Section */}
        <section className="py-20 px-8">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
              <Gamepad2 className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Persistent Worlds</h3>
              <p className="text-indigo-200">Player actions have lasting consequences. See the world evolve from campaign to campaign.</p>
            </div>
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
              <GitBranch className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Collaborative Storytelling</h3>
              <p className="text-indigo-200">Game Masters and players build the canon of the universe together in a shared, version-controlled environment.</p>
            </div>
            <div className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
              <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">System Agnostic</h3>
              <p className="text-indigo-200">Bring your favorite TTRPG system. Rune Drive handles the world, you handle the rules.</p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 px-8 text-center">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          {/* TODO: Add step-by-step explanation and visuals */}
        </section>

        {/* Community Section */}
        <section className="py-20 px-8 text-center bg-black/20">
          <h2 className="text-4xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl text-indigo-200 max-w-2xl mx-auto mb-8">
            Connect with other creators, get development updates, and help shape the future of Rune Drive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://discord.gg/RQWDbbXSPG"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              Join Discord
            </a>
            <Link
              href="/runedrive/beta"
              className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
            >
              Join Beta Waitlist
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-8 text-center border-t border-purple-500/20">
          <p className="text-indigo-300">A Sybertnetics Innovation</p>
          <Link href="/home" className="text-purple-400 hover:underline">
            Back to Sybertnetics Home
          </Link>
        </footer>
      </div>
    </>
  );
} 