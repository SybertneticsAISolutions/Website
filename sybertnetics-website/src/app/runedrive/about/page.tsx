// About page for Rune Drive
// TODO: Add detailed platform explanation and visuals

import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveAbout() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        {/* Placeholder for starlight background if desired */}
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              About Rune Drive
            </h1>
            <div className="prose prose-invert lg:prose-xl mx-auto text-indigo-200">
              <p>
                We&apos;re building something revolutionary. Rune Drive will be the ultimate
                platform for tabletop RPG enthusiasts, combining the best of digital
                tools with the magic of collaborative storytelling.
              </p>
              <h2 className="text-purple-300">Our Mission</h2>
              <p>
                Placeholder for the mission statement.
              </p>
              <h2 className="text-purple-300">Our Vision</h2>
              <p>
                Placeholder for the vision statement.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 