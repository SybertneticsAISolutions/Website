import { promises as fs } from 'fs';
import path from 'path';

export interface PageContent {
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
  };
  sections: {
    [key: string]: {
      title?: string;
      content?: string;
      [key: string]: unknown;
    };
  };
}

export async function getPageContent(pagePath: string): Promise<PageContent> {
  try {
    const filePath = path.join(process.cwd(), 'src', 'content', 'pages', `${pagePath}.md`);
    const content = await fs.readFile(filePath, 'utf-8');
    return parseMarkdownContent(content);
  } catch (error) {
    console.error(`Error loading content for ${pagePath}:`, error);
    return { sections: {} };
  }
}

export function parseMarkdownContent(markdown: string): PageContent {
  const lines = markdown.split('\n');
  const result: PageContent = { sections: {} };
  let currentSection = '';
  let currentContent: string[] = [];

  for (const line of lines) {
    if (line.startsWith('# ')) {
      // Main title - could be hero title
      if (!result.hero) result.hero = {};
      result.hero.title = line.substring(2).trim();
    } else if (line.startsWith('## ')) {
      // Section title
      if (currentSection && currentContent.length > 0) {
        result.sections[currentSection] = {
          content: currentContent.join('\n').trim()
        };
      }
      currentSection = line.substring(3).trim().toLowerCase().replace(/\s+/g, '-');
      currentContent = [];
    } else if (line.startsWith('### ')) {
      // Subsection title
      const subsectionTitle = line.substring(4).trim();
      if (currentSection) {
        if (!result.sections[currentSection]) {
          result.sections[currentSection] = {};
        }
        result.sections[currentSection][subsectionTitle.toLowerCase().replace(/\s+/g, '-')] = '';
      }
    } else if (line.trim() && currentSection) {
      currentContent.push(line);
    }
  }

  // Add the last section
  if (currentSection && currentContent.length > 0) {
    result.sections[currentSection] = {
      content: currentContent.join('\n').trim()
    };
  }

  return result;
}

export function extractSectionContent(content: PageContent, sectionName: string): string {
  return content.sections[sectionName]?.content || '';
}

export function extractHeroData(content: PageContent) {
  return content.hero || {};
} 