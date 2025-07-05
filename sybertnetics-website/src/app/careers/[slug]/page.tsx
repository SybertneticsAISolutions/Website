import fs from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import ApplicationForm from './components/ApplicationForm'; 

interface Job {
  slug: string;
  title: string;
  description: string;
  posterEmail: string;
  customQuestions: { question: string; required: boolean }[];
}

const jobsDirectory = path.join(process.cwd(), 'sybertnetics-website/src/content/careers');

// This function generates the static pages at build time
export async function generateStaticParams() {
  try {
    const files = await fs.readdir(jobsDirectory);
    return files
      .filter(file => file.endsWith('.json'))
      .map(file => ({
        slug: file.replace('.json', ''),
      }));
  } catch (error) {
    return [];
  }
}

// This function fetches the data for a single job
async function getJob(slug: string): Promise<Job | null> {
  const filePath = path.join(jobsDirectory, `${slug}.json`);
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
}

export default async function JobDetailsPage({ params }: { params: { slug: string } }) {
  const job = await getJob(params.slug);

  if (!job) {
    notFound();
  }

  return (
    <main className="job-details-page">
      <article>
        <h1>{job.title}</h1>
        {/* Using dangerouslySetInnerHTML assuming the description is safe HTML from a trusted source (admin's rich text editor) */}
        {/* TODO: Sanitize this HTML with a library like DOMPurify if the rich text editor can be compromised */}
        <div dangerouslySetInnerHTML={{ __html: job.description }} />
      </article>
      
      <section className="application-section">
        <h2>Apply for this Position</h2>
        <ApplicationForm job={job} />
      </section>
    </main>
  );
} 