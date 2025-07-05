// Universe page for RuneDrive
// Factual, platform-focused description. No fabricated lore.

import RuneDriveHeader from "../components/RuneDriveHeader";
import { ArrowRight } from 'lucide-react';

export default function RuneDriveUniverse() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              The RuneDrive Universe
            </h1>
            <div className="prose prose-invert lg:prose-xl mx-auto text-indigo-200 text-center">
              <p>
                <strong>RuneDrive</strong> is launching with multiple worlds and settings, and is designed for DMs to submit and expand the universe. There is no single official world—our platform empowers Game Masters to create, share, and grow their own unique settings, stories, and adventures.
              </p>
              <p>
                At launch, you&apos;ll find a diverse selection of worlds, including Sybertnetics&apos; own flagship series, <strong>Stories of the Abyss</strong>, taking place in <strong>The Fractured Starfield</strong>. But the real power of RuneDrive is in the community: DMs can submit their own worlds, expanding the platform for everyone.
              </p>
              <p className="text-sm text-indigo-400 mt-8">
                <strong>Admin Notice:</strong> This content can be updated by authenticated admins via the admin portal. If you are an admin, log in to edit this page.
              </p>
            </div>
            <div className="flex flex-col items-center mt-12">
              <a
                href="https://discord.gg/RQWDbbXSPG"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-lg transition-all mt-4"
              >
                Join the RuneDrive Discord
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 