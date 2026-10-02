import React from 'react';
import { Layers, ShieldCheck, Zap, Lock, Heart } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 transition-colors">
      {/* Privacy & Trust Banner */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-8 dark:border-slate-900 dark:bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  100% Privacy by Design
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Images, text, and files are processed strictly in your browser.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Blazing Fast Execution
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Instant calculations powered by client-side WebAssembly & Web APIs.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/40 dark:text-purple-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Free & Without Sign-Up
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  No subscriptions, no accounts, and no paywalls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand Col */}
          <div className="col-span-2">
            <button
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 text-left"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
                <Layers className="h-4 w-4" />
              </div>
              <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white">
                Tool<span className="text-blue-600 dark:text-blue-400">Nest</span>
              </span>
            </button>
            <p className="mt-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
              {siteConfig.supportingMessage} Built for productivity, speed, and privacy.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
              <span>Deployable directly to Netlify</span>
              <span>•</span>
              <span>PWA Ready</span>
            </div>
          </div>

          {/* Tools & Converters */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Tools & Converters
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/tools/word-counter')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Word Counter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/image-compressor')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Image Compressor
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/converters/jpg-to-webp')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  JPG to WebP
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools/json-formatter')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  JSON Formatter
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/tools')}
                  className="font-semibold text-blue-600 dark:text-blue-400"
                >
                  View All Tools →
                </button>
              </li>
            </ul>
          </div>

          {/* Calculators & Generators */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Calculators & Generators
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/calculators/age-calculator')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Age Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/calculators/percentage-calculator')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Percentage Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/generators/qr-code-generator')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  QR Code Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/generators/password-generator')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Password Generator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/generators')}
                  className="font-semibold text-blue-600 dark:text-blue-400"
                >
                  View All Generators →
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              Legal & Company
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('/about')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  About ToolNest
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/privacy')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/terms')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/disclaimer')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Disclaimer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/contact')}
                  className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-200 pt-6 sm:flex-row dark:border-slate-800">
          <p className="text-xs text-slate-400">
            © {siteConfig.copyrightYear} {siteConfig.siteName}. All rights reserved. Made for speed and privacy.
          </p>
          <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 sm:mt-0">
            <span>Client-side Processing</span>
            <span>•</span>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              XML Sitemap
            </a>
            <span>•</span>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-500"
            >
              Robots.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
