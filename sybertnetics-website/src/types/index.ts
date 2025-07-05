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