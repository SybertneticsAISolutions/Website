// Blog page for Rune Drive
// TODO: Add development updates, tutorials, and blog post list

import RuneDriveHeader from "../components/RuneDriveHeader";
import Link from "next/link";

// TODO: This will eventually fetch real blog posts from a content source
const placeholderPosts = [
  { slug: 'dev-update-1', title: 'Development Update #1: The Road to Beta', date: '2025-08-15' },
  { slug: 'building-persistent-worlds', title: 'Feature Deep Dive: Building Persistent Worlds', date: '2025-08-01' },
];

export default function RuneDriveBlog() {
  return (
    <>
      <RuneDriveHeader />
      <div className="bg-gray-900 text-white min-h-screen">
        <main className="pt-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Rune Drive Dev Blog
            </h1>
            <div className="space-y-8">
              {placeholderPosts.map(post => (
                <div key={post.slug} className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20">
                  <h2 className="text-2xl font-bold text-purple-300 mb-2">
                    <Link href={`/runedrive/blog/${post.slug}`} className="hover:underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-indigo-300">
                    {new Date(post.date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 