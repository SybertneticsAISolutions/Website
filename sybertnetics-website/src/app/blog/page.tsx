import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '@/types'; // Assuming a Post type is defined in src/types/index.ts

const contentDir = path.join(process.cwd(), 'src/content/blog');

async function getPosts(): Promise<Post[]> {
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
    // If the directory doesn't exist, return an empty array
    if (error.code === 'ENOENT') {
      console.log('Blog content directory not found. Returning empty list.');
      return [];
    }
    throw error;
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Blog</h1>
      <p>Insights, innovations, and perspectives on the future of artificial intelligence from the Sybertnetics team.</p>
      
      {posts.length > 0 ? (
        <ul>
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <h2>{post.title}</h2>
                <p>Published on: {new Date(post.lastModified).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No blog posts have been published yet. Please check back soon!</p>
      )}
    </main>
  );
}
