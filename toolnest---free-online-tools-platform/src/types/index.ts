export type ToolCategory = 'tools' | 'calculators' | 'converters' | 'generators' | 'developer' | 'image' | 'text';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ExampleItem {
  title: string;
  input: string;
  output: string;
  description?: string;
}

export interface ToolDefinition {
  id: string;
  name: string;
  slug: string;
  urlPath: string; // e.g. /tools/word-counter or /calculators/age-calculator
  category: 'tools' | 'calculators' | 'converters' | 'generators';
  subCategory: 'text' | 'image' | 'calculator' | 'developer' | 'generator';
  shortDescription: string;
  fullDescription: string;
  keywords: string[];
  icon: string;
  popularity: number; // 1-100 for ranking
  isTrending?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  privacyNotice: string;
  howToUse: string[];
  tips: string[];
  examples?: ExampleItem[];
  formulaOrMethod?: string;
  faqs: FAQItem[];
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
}

export interface GuideDefinition {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: string;
  readTime: string;
  publishDate: string;
  lastUpdated: string;
  author: string;
  relatedToolSlugs: string[];
  relatedGuideSlugs: string[];
  tableOfContents: { id: string; title: string }[];
  contentSections: {
    id: string;
    heading: string;
    body: string[]; // Markdown/HTML paragraphs or structured text
    codeExample?: string;
    callout?: {
      type: 'tip' | 'warning' | 'info';
      text: string;
    };
  }[];
  faqs: FAQItem[];
}
