// Blog page for Rune Drive
// No fabricated or placeholder blog posts

import RuneDriveHeader from "../components/RuneDriveHeader";

export default function RuneDriveBlog() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Rune Drive Dev Blog
              </h1>
              <p className="text-xl text-indigo-200 max-w-3xl mx-auto leading-relaxed">
                Stay up to date with development progress, feature deep-dives, community highlights, 
                and insights into the future of collaborative storytelling.
              </p>
            </div>
            <div className="text-center py-24">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">No blog posts yet</h2>
              <p className="text-indigo-200">Check back soon for real development updates and community stories.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 