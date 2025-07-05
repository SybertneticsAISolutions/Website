import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import { Post } from '@/types';

const contentDir = path.join(process.cwd(), 'src/content/news');

interface PageProps {
  params: { slug: string };
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
    if (error.code === 'ENOENT') return [];
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
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

export default async function NewsArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <article>
        <h1>{article.title}</h1>
        <p>Last updated: {new Date(article.lastModified).toLocaleDateString()}</p>
        {/* A simple way to render content with line breaks */}
        <div>
          {article.content.split('\\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
} 