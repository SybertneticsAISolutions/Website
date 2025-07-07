import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { Post } from '@/types';
import Header from '../../components/Header';

const contentDir = path.join(process.cwd(), 'src/content/news');

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static pages for each article at build time
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

// Fetch the data for a specific article
async function getArticle(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(contentDir, `${slug}.json`);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null;
    throw error;
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <article className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
              <p className="text-gray-600 mb-8">
                Published on {new Date(article.lastModified).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
              <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
            </div>
          </article>
        </div>
      </main>
    </>
  );
} 