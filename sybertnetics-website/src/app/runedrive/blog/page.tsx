// Blog page for Rune Drive
// Enhanced with comprehensive development updates and community content

import RuneDriveHeader from "../components/RuneDriveHeader";
import Link from "next/link";
import { Calendar, User, Tag, ArrowRight, Zap, BookOpen, Users } from "lucide-react";

// Enhanced blog posts with categories and descriptions
const blogPosts = [
  {
    slug: 'dev-update-1',
    title: 'Development Update #1: The Road to Beta',
    date: '2025-01-15',
    author: 'Rune Drive Team',
    category: 'Development',
    excerpt: 'A comprehensive look at our progress toward the beta launch, including key milestones, technical challenges, and what to expect in Q2 2025.',
    readTime: '5 min read',
    featured: true
  },
  {
    slug: 'building-persistent-worlds',
    title: 'Feature Deep Dive: Building Persistent Worlds',
    date: '2025-01-10',
    author: 'Sarah Chen',
    category: 'Feature',
    excerpt: 'How we\'re implementing persistent world mechanics that allow player actions to ripple across multiple campaigns and shape the evolving narrative.',
    readTime: '8 min read',
    featured: false
  },
  {
    slug: 'community-spotlight-january',
    title: 'Community Spotlight: January 2025',
    date: '2025-01-08',
    author: 'Community Team',
    category: 'Community',
    excerpt: 'Highlighting the amazing work being done by our community members, from world-building projects to innovative storytelling techniques.',
    readTime: '4 min read',
    featured: false
  },
  {
    slug: 'collaborative-storytelling-tools',
    title: 'The Future of Collaborative Storytelling Tools',
    date: '2025-01-05',
    author: 'Marcus Rodriguez',
    category: 'Design',
    excerpt: 'Exploring the design philosophy behind our collaborative tools and how they empower both GMs and players to create together.',
    readTime: '6 min read',
    featured: false
  },
  {
    slug: 'beta-signup-milestone',
    title: '500+ Beta Signups: What This Means',
    date: '2025-01-03',
    author: 'Rune Drive Team',
    category: 'Community',
    excerpt: 'Celebrating our milestone of 500+ beta signups and what this growing community means for the future of Rune Drive.',
    readTime: '3 min read',
    featured: false
  },
  {
    slug: 'stories-of-the-abyss-lore',
    title: 'Lore Deep Dive: The Origins of the Abyss',
    date: '2024-12-28',
    author: 'Lore Team',
    category: 'Lore',
    excerpt: 'The first in a series exploring the rich history and mythology of our flagship setting, "Stories of the Abyss."',
    readTime: '7 min read',
    featured: false
  }
];

const categories = [
  { name: 'All', count: blogPosts.length, active: true },
  { name: 'Development', count: blogPosts.filter(p => p.category === 'Development').length, active: false },
  { name: 'Feature', count: blogPosts.filter(p => p.category === 'Feature').length, active: false },
  { name: 'Community', count: blogPosts.filter(p => p.category === 'Community').length, active: false },
  { name: 'Design', count: blogPosts.filter(p => p.category === 'Design').length, active: false },
  { name: 'Lore', count: blogPosts.filter(p => p.category === 'Lore').length, active: false },
];

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

            {/* Featured Post */}
            {blogPosts.filter(post => post.featured).map(post => (
              <div key={post.slug} className="mb-16">
                <div className="bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-8 rounded-xl border border-purple-500/30">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </span>
                    <span className="text-indigo-300 text-sm">{post.category}</span>
                  </div>
                  <h2 className="text-3xl font-bold text-purple-300 mb-4">
                    <Link href={`/runedrive/blog/${post.slug}`} className="hover:text-purple-200 transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-indigo-200 text-lg leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-indigo-300">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        {post.readTime}
                      </div>
                    </div>
                    <Link
                      href={`/runedrive/blog/${post.slug}`}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {/* Categories */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Categories</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map(category => (
                  <button
                    key={category.name}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      category.active
                        ? 'bg-purple-600 text-white'
                        : 'bg-indigo-900/40 text-indigo-200 hover:bg-indigo-900/60 border border-purple-500/20'
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.filter(post => !post.featured).map(post => (
                <article key={post.slug} className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-purple-600/30 text-purple-300 px-2 py-1 rounded text-xs font-semibold">
                      {post.category}
                    </span>
                    <span className="text-indigo-300 text-xs">{post.readTime}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-purple-300 mb-3">
                    <Link href={`/runedrive/blog/${post.slug}`} className="hover:text-purple-200 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-indigo-200 text-sm leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-indigo-300">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {post.author}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                    <Link
                      href={`/runedrive/blog/${post.slug}`}
                      className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="mt-20 bg-black/20 p-8 rounded-xl border border-purple-500/20">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Stay Updated
                </h2>
                <p className="text-indigo-200 mb-6 max-w-2xl mx-auto">
                  Get the latest development updates, feature announcements, and community highlights 
                  delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-indigo-300 mt-3">
                  No spam, unsubscribe at any time.
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-purple-300">Quick Links</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Link
                  href="/runedrive/beta"
                  className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Zap className="w-6 h-6 text-purple-400" />
                    <h3 className="font-bold text-purple-300">Join Beta</h3>
                  </div>
                  <p className="text-indigo-200 text-sm">
                    Be among the first to experience Rune Drive and help shape its development.
                  </p>
                </Link>
                
                <a
                  href="https://discord.gg/RQWDbbXSPG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-purple-400" />
                    <h3 className="font-bold text-purple-300">Join Discord</h3>
                  </div>
                  <p className="text-indigo-200 text-sm">
                    Connect with the community and participate in development discussions.
                  </p>
                </a>
                
                <Link
                  href="/runedrive/universe"
                  className="bg-indigo-900/40 p-6 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <BookOpen className="w-6 h-6 text-purple-400" />
                    <h3 className="font-bold text-purple-300">Explore Lore</h3>
                  </div>
                  <p className="text-indigo-200 text-sm">
                    Dive deep into the "Stories of the Abyss" setting and its rich mythology.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
} 