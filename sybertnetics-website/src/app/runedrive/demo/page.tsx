// Demo page for Rune Drive
// TODO: Add demo video or interactive demo when available

import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveDemo() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Watch the Demo
            </h1>
            <p className="text-xl text-indigo-200 mb-12">
              See Rune Drive in action and discover how it revolutionizes collaborative storytelling.
            </p>

            <div className="aspect-video bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 max-w-3xl mx-auto flex items-center justify-center">
              <p className="text-indigo-200">
                A demo video or interactive presentation will be embedded here soon.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 