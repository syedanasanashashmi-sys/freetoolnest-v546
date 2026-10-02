export interface SiteConfig {
  siteName: string;
  tagline: string;
  supportingMessage: string;
  siteUrl: string;
  contactEmail: string;
  socialLinks: {
    github?: string;
    twitter?: string;
    discord?: string;
  };
  copyrightYear: number;
  adSettings: {
    enabled: boolean;
    showOnHome: boolean;
    showOnTools: boolean;
    showOnGuides: boolean;
    adClient?: string;
  };
  analyticsSettings: {
    enabled: boolean;
    measurementId?: string; // e.g. G-XXXXXXXXXX
  };
  categories: {
    id: 'tools' | 'calculators' | 'converters' | 'generators' | 'guides';
    name: string;
    slug: string;
    description: string;
    icon: string;
  }[];
}

export const siteConfig: SiteConfig = {
  siteName: 'ToolNest',
  tagline: 'Free Online Tools That Actually Get Things Done',
  supportingMessage: 'Fast, free, and privacy-friendly tools for work, study, and everyday tasks. 100% device-side processing.',
  siteUrl: 'https://toolnest.app',
  contactEmail: 'hello@toolnest.app',
  socialLinks: {
    github: 'https://github.com/toolnest',
    twitter: 'https://twitter.com/toolnestapp',
  },
  copyrightYear: 2026,
  adSettings: {
    enabled: true, // Clean placeholders ready for Google AdSense / Mediavine
    showOnHome: true,
    showOnTools: true,
    showOnGuides: true,
    adClient: '', // Optional AdSense publisher ID
  },
  analyticsSettings: {
    enabled: false, // Set to true and provide measurementId when ready
    measurementId: '',
  },
  categories: [
    {
      id: 'tools',
      name: 'Text & Content Tools',
      slug: '/tools',
      description: 'Analyze, transform, clean, and manipulate text strings and documents effortlessly.',
      icon: 'FileText',
    },
    {
      id: 'calculators',
      name: 'Calculators',
      slug: '/calculators',
      description: 'Fast, accurate calculators for age, percentage, discounts, tips, BMI, and dates.',
      icon: 'Calculator',
    },
    {
      id: 'converters',
      name: 'Converters & Formatters',
      slug: '/converters',
      description: 'Convert images to WebP/JPG, Base64 strings, URL strings, and data units securely.',
      icon: 'ArrowLeftRight',
    },
    {
      id: 'generators',
      name: 'Generators',
      slug: '/generators',
      description: 'Generate high-entropy passwords, QR codes, UUIDs, lorem ipsum text, and color palettes.',
      icon: 'Sparkles',
    },
    {
      id: 'guides',
      name: 'Guides & Tutorials',
      slug: '/guides',
      description: 'Step-by-step technical guides, best practices, and deep dives on digital utilities.',
      icon: 'BookOpen',
    },
  ],
};
