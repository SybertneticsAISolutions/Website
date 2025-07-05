export interface Job {
  slug: string;
  title: string;
  description: string;
  posterEmail: string;
  customQuestions: {
    question: string;
    required: boolean;
  }[];
}

export interface Post {
  slug: string;
  title: string;
  content: string;
  lastModified: string;
} 