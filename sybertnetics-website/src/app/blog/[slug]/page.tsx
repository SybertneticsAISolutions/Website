import { notFound } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '@/types';
import Header from '../../components/Header';

const contentDir = path.join(process.cwd(), 'src/content/blog');

interface PageProps {
  params: Promise<{ slug: string }>;
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
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
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
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
              <p className="text-gray-600 mb-8">
                Published on {new Date(post.lastModified).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>
        </div>
      </main>
    </>
  );
} 