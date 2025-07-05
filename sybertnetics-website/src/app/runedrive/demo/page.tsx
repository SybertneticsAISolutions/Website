// Demo page for RuneDrive
// Clear messaging that demos are not yet scheduled

import RuneDriveHeader from "../components/RuneDriveHeader";
import Link from "next/link";
import { Play, ArrowRight } from 'lucide-react';

export default function RuneDriveDemo() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                RuneDrive Demo
              </h1>
              <p className="text-xl text-indigo-200 max-w-2xl mx-auto">
                See RuneDrive in action and experience the future of collaborative TTRPG campaigns.
              </p>
            </div>

            <div className="text-center py-12">
              <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20">
                <div className="flex items-center justify-center mb-6">
                  <Play className="w-12 h-12 text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-purple-300">Demo Coming Soon</h2>
                <p className="text-lg text-indigo-200 mb-6">
                  We&apos;re working hard to bring you a comprehensive demo of RuneDrive. 
                  Our team is focused on building the core platform and getting it ready for beta testing.
                </p>
                <p className="text-indigo-200 mb-8">
                  When demos are available, they will be announced on our Discord and through our beta waitlist.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/runedrive/beta"
                    className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
                  >
                    Join Beta Waitlist
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                  <a
                    href="https://discord.gg/RQWDbbXSPG"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center border-2 border-indigo-400 text-indigo-200 font-bold py-3 px-6 rounded-lg hover:bg-indigo-400/20 transition-all"
                  >
                    Join Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 