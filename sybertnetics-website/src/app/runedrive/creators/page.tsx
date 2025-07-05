import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveCreators() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Creator Program
            </h1>
            <div className="prose prose-invert lg:prose-xl mx-auto text-indigo-200">
              <p>
                Information about the creator program will go here. We'll detail how
                Game Masters can build their own universes, invite players, and even
                monetize their creations on the Rune Drive platform.
              </p>
              <h2 className="text-purple-300">Why Build on Rune Drive?</h2>
              <ul>
                <li>Placeholder for benefit #1 (e.g., Tools for world-building).</li>
                <li>Placeholder for benefit #2 (e.g., Fair revenue sharing).</li>
                <li>Placeholder for benefit #3 (e.g., Access to a growing player base).</li>
              </ul>
              <h2 className="text-purple-300">How to Get Started</h2>
              <p>
                Details on how to apply or join the creator program will be listed here.
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}