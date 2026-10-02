import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';

interface AffiliateCalloutProps {
  category?: 'image' | 'developer' | 'general' | 'calculator';
}

export const AffiliateCallout: React.FC<AffiliateCalloutProps> = ({ category = 'general' }) => {
  let title = 'Reliable Cloud Infrastructure & Web Hosting';
  let desc = 'Deploy lightning-fast websites and static web apps with global CDN edge routing and automatic SSL.';
  let partner = 'Recommended Cloud Partner';
  let link = 'https://netlify.com';

  if (category === 'image') {
    title = 'Pro Vector & Stock Asset Library';
    desc = 'Discover royalty-free vector illustrations, high-DPI photos, and icons for web development.';
    partner = 'Design Asset Resource';
  } else if (category === 'developer') {
    title = 'Modern Developer Cloud Services';
    desc = 'Scalable serverless functions, automated CI/CD pipelines, and instant preview deployments.';
    partner = 'Developer Platform';
  }

  return (
    <aside className="my-8 rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-50/60 to-indigo-50/50 p-5 dark:border-blue-900/40 dark:from-blue-950/20 dark:to-indigo-950/20">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400">
              <Sparkles className="h-3 w-3" />
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              {partner} · Sponsored Recommendation
            </span>
          </div>
          <h4 className="mt-1.5 text-sm font-semibold text-slate-900 dark:text-white">
            {title}
          </h4>
          <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">
            {desc}
          </p>
        </div>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="shrink-0 flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
        >
          <span>Explore</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <p className="mt-2 text-[10px] text-slate-400 dark:text-slate-500">
        Disclosure: ToolNest may receive compensation when you visit partner links at no additional cost to you.
      </p>
    </aside>
  );
};
