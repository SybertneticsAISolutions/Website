import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '@/types';
import Header from '../components/Header';

const contentDir = path.join(process.cwd(), 'src/content/blog');

async function getBlogPosts(): Promise<Post[]> {
  try {
    const files = await fs.readdir(contentDir);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
          const post: Post = JSON.parse(content);
          return post;
        })
    );
    // Sort posts by lastModified date, newest first
    return posts.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.log('Blog content directory not found. Returning empty list.');
      return [];
    }
    throw error;
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights, tutorials, and thoughts on AI, machine learning, and the future of technology from the Sybertnetics team.
            </p>
          </div>
          
          {posts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-emerald-600 transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h2>
                    <p className="text-gray-600 text-sm mb-4">
                      {new Date(post.lastModified).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="text-gray-700 line-clamp-3" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 150) + '...' }} />
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-block mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Posts Yet</h3>
                <p className="text-gray-600">
                  We&apos;re working on some great content. Please check back soon!
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
