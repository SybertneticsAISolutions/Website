// Community page for Rune Drive
// TODO: Add Discord, Reddit, forums, and blog links

import RuneDriveHeader from "../components/RuneDriveHeader";
import { Users, MessageSquare, Rss } from 'lucide-react'; // Assuming you have lucide-react
import Link from "next/link";

const communityLinks = [
  { name: 'Discord', description: 'Join the live conversation with developers and other players.', href: '#', icon: MessageSquare },
  { name: 'Reddit', description: 'Share your stories, ask questions, and discuss the game.', href: '#', icon: Users },
  { name: 'Dev Blog', description: 'Get the latest news and deep dives from the development team.', href: '/runedrive/blog', icon: Rss },
];

export default function RuneDriveCommunity() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Join the Community
            </h1>
            <p className="text-xl text-indigo-200 mb-12">
              Connect with us and help shape the future of collaborative storytelling.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {communityLinks.map((link) => (
                <Link key={link.name} href={link.href}>
                  <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 h-full flex flex-col items-center justify-center hover:bg-indigo-900/60 transition-colors">
                    <link.icon className="w-12 h-12 text-purple-400 mb-4" />
                    <h2 className="text-2xl font-bold text-purple-300 mb-2">{link.name}</h2>
                    <p className="text-indigo-200">{link.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 