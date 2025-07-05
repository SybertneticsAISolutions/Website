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
          {/* TODO: Add Discord, Reddit, blog links, and beta signup form */}
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