import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '@/types';

const contentDir = path.join(process.cwd(), 'src/content/blog');

interface PageProps {
  params: { slug: string };
}

// Generate static pages for each post at build time
export async function generateStaticParams() {
  try {
    const files = await fs.readdir(contentDir);
    return files
      .filter((file) => file.endsWith('.json'))
      .map((file) => ({
        slug: file.replace('.json', ''),
      }));
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

// Fetch the data for a specific post
async function getPost(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDir, `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        <h1>{post.title}</h1>
        <p>Last updated: {new Date(post.lastModified).toLocaleDateString()}</p>
        {/* A simple way to render content with line breaks */}
        <div>
          {post.content.split('\\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
} 