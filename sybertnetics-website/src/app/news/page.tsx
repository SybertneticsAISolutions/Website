import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';
import { Post } from '@/types';

const contentDir = path.join(process.cwd(), 'src/content/news');

async function getNewsArticles(): Promise<Post[]> {
  try {
    const files = await fs.readdir(contentDir);
    const articles = await Promise.all(
      files
        .filter((file) => file.endsWith('.json'))
        .map(async (file) => {
          const content = await fs.readFile(path.join(contentDir, file), 'utf-8');
          const article: Post = JSON.parse(content);
          return article;
        })
    );
    // Sort articles by lastModified date, newest first
    return articles.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('News content directory not found. Returning empty list.');
      return [];
    }
    throw error;
  }
}

export default async function NewsPage() {
  const articles = await getNewsArticles();

  return (
    <main>
      <h1>News</h1>
      <p>Stay updated with the latest announcements, milestones, and developments from Sybertnetics AI Solutions.</p>
      
      {articles.length > 0 ? (
        <ul>
          {articles.map((article) => (
            <li key={article.slug}>
              <Link href={`/news/${article.slug}`}>
                <h2>{article.title}</h2>
                <p>Published on: {new Date(article.lastModified).toLocaleDateString()}</p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No news articles have been published yet. Please check back soon!</p>
      )}
    </main>
  );
} 