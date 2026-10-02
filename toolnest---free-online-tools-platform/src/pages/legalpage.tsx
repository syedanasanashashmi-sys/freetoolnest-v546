import React from 'react';
import { Shield, Mail, FileText, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SEOHead } from '../components/common/SEOHead';
import { siteConfig } from '../config/siteConfig';

interface LegalPageProps {
  pageType: 'about' | 'contact' | 'privacy' | 'terms' | 'disclaimer';
  onNavigate: (path: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ pageType, onNavigate }) => {
  let title = 'About ToolNest';
  let description = 'Learn more about the ToolNest free productivity platform mission.';
  let content = null;

  if (pageType === 'about') {
    title = 'About ToolNest';
    description = 'Discover the mission, technology, and privacy standards of ToolNest.';
    content = (
      <div className="space-y-6 leading-relaxed text-sm text-slate-700 dark:text-slate-300">
        <p>
          <strong>ToolNest</strong> was founded with a straightforward philosophy: everyday online utilities should be fast, completely free, and respectful of personal privacy.
        </p>
        <p>
          Too many utility websites have become unusable traps littered with confusing decoy download buttons, sluggish server round-trips, and paywalls. ToolNest changes this by bringing hardware-accelerated, browser-side processing to the modern web.
        </p>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-2">Our Three Core Pillars</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Client-Side Execution:</strong> When you compress an image or format JSON, processing runs inside your device CPU/GPU through modern Web APIs. Your confidential files are never uploaded to remote servers.</li>
          <li><strong>Speed & Simplicity:</strong> No intrusive loading screens, forced account creation, or captchas.</li>
          <li><strong>Future Scalability:</strong> Continually maintained and enriched with new calculators, converters, and developer utilities.</li>
        </ul>
      </div>
    );
  } else if (pageType === 'contact') {
    title = 'Contact Us';
    description = 'Get in touch with the ToolNest team for tool requests, bugs, or feedback.';
    content = (
      <div className="space-y-6 leading-relaxed text-sm text-slate-700 dark:text-slate-300">
        <p>
          Have a suggestion for a new tool, found a bug, or want to explore partnership opportunities? We'd love to hear from you!
        </p>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <div>
              <span className="text-xs font-bold uppercase text-slate-400">Direct Email Inquiries</span>
              <p className="font-semibold text-slate-900 dark:text-white">
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:underline text-blue-600 dark:text-blue-400">
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-500">
            We review and respond to user feedback regularly. Feature requests are prioritized based on general community utility.
          </p>
        </div>
      </div>
    );
  } else if (pageType === 'privacy') {
    title = 'Privacy Policy';
    description = 'Read our rigorous device-side privacy policy and zero server storage policy.';
    content = (
      <div className="space-y-6 leading-relaxed text-sm text-slate-700 dark:text-slate-300">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-semibold text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
          Summary: Your images, documents, passwords, and data payloads are processed 100% on your local device. We do not store, view, or transmit your files.
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Information We Do Not Collect</h3>
        <p>
          ToolNest does not collect, record, or store the contents of any files or text you process using our tools. Image compression, conversions, text calculations, and password generation happen entirely inside your browser's memory sandbox.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Local Storage Usage</h3>
        <p>
          We use browser standard localStorage exclusively for storing your user preferences: your chosen theme (light/dark/system), your pinned favorite tools, and recent search history. This data never leaves your browser.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Third-Party Services & Cookies</h3>
        <p>
          We do not require user accounts or tracking cookies. If advertising or analytics networks are integrated in the future, standard anonymized telemetry will be clearly governed under applicable privacy laws (GDPR / CCPA).
        </p>
      </div>
    );
  } else if (pageType === 'terms') {
    title = 'Terms of Service';
    description = 'Terms and conditions for utilizing ToolNest online utilities and content.';
    content = (
      <div className="space-y-6 leading-relaxed text-sm text-slate-700 dark:text-slate-300">
        <p>
          By accessing or using ToolNest ({siteConfig.siteUrl}), you agree to abide by these terms of service.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Permitted Use</h3>
        <p>
          ToolNest is provided free of charge for personal, educational, and commercial productivity. You are welcome to use our tools to compress images, validate data, and calculate measurements for your daily projects.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">2. No Malicious Abuse</h3>
        <p>
          You agree not to use our generators or tools to conduct denial-of-service attacks, generate malicious payloads, or attempt to harm network infrastructure.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">3. As-Is Provision</h3>
        <p>
          All tools, calculators, and informational guides are provided on an "as is" and "as available" basis without warranties of any kind.
        </p>
      </div>
    );
  } else if (pageType === 'disclaimer') {
    title = 'Disclaimer';
    description = 'Important legal, financial, and medical disclaimers regarding calculation results.';
    content = (
      <div className="space-y-6 leading-relaxed text-sm text-slate-700 dark:text-slate-300">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
          <span>Notice: Calculations, formulas, and estimates are provided for general educational and informational purposes only.</span>
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">Financial & Tax Disclaimers</h3>
        <p>
          Calculators related to discounts, sales tax, currency, percentages, and gratuity provide mathematical approximations. They do not constitute certified financial, legal, or tax advice. Always confirm with official accounting or store receipts.
        </p>

        <h3 className="text-base font-bold text-slate-900 dark:text-white">Health & Medical Disclaimers</h3>
        <p>
          The Body Mass Index (BMI) calculator and health-related tools are screening tools based on standard World Health Organization population statistical formulas. They do not diagnose health conditions or account for athletic muscle mass vs adipose tissue. Always consult certified medical physicians for clinical health assessments.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      <SEOHead
        title={title}
        description={description}
        canonicalPath={`/${pageType}`}
      />

      <Breadcrumbs items={[{ label: title }]} onNavigate={onNavigate} />

      <div className="border-b border-slate-200/80 pb-6 dark:border-slate-800">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Last updated: September 2026 · {siteConfig.siteName}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {content}
      </div>
    </div>
  );
};
