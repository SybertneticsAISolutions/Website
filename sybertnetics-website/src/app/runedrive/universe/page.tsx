// Universe page for Rune Drive
// TODO: Add Stories of the Abyss lore overview and visuals

import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveUniverse() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Universe: Stories of the Abyss
            </h1>
            <div className="prose prose-invert lg:prose-xl mx-auto text-indigo-200">
              <p>
                Welcome to the official lore hub for "Stories of the Abyss," the flagship
                universe for Rune Drive. Here you will find information on the world, its
                history, key factions, and the cataclysmic events that shape every new story.
              </p>
              <h2 className="text-purple-300">The World</h2>
              <p>
                Placeholder for the world description.
              </p>
              <h2 className="text-purple-300">Key Factions</h2>
              <p>
                Placeholder for faction descriptions.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 