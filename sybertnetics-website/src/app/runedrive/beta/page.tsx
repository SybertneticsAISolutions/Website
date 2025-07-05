// Beta signup page for Rune Drive
// TODO: Add beta signup form and early access information

import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveBeta() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Join the Beta
            </h1>
            <p className="text-xl text-indigo-200 mb-12">
              Be among the first to explore persistent, collaborative TTRPG universes.
            </p>

            <div className="bg-indigo-900/40 p-8 rounded-xl border border-purple-500/20 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Beta Signup Form</h2>
              <p className="text-indigo-200">
                The beta signup form will be implemented here. It will likely include
                fields for email, TTRPG experience, and what excites you most about
                Rune Drive.
              </p>
              {/* TODO: Implement the actual signup form */}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 