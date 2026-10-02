# ToolNest — Free Online Tools Platform

> "Free Online Tools That Actually Get Things Done"  
> *Fast, free, and privacy-friendly tools for work, study, and everyday tasks.*

ToolNest is a high-performance, SEO-optimized utility platform engineered with 100% browser-side processing, zero backend dependencies, and zero database requirements. Built for static deployment directly to Netlify.

---

## 🚀 Key Highlights & Capabilities

- **35 Genuine Functional Tools**: Spanning text processing, canvas-based image optimization, math/financial calculators, developer utilities, and high-entropy generators.
- **100% Device-Side Privacy**: Image compression, file conversions, and cryptographic generation run strictly inside browser memory. User data is never uploaded to remote servers.
- **SEO-First Architecture**: Unique meta titles, descriptions, canonical links, OpenGraph social cards, Twitter cards, and Schema.org structured data (`WebApplication`, `FAQPage`, `Article`, `BreadcrumbList`) across every tool, category, and guide.
- **PWA & Offline Ready**: Compliant Web App Manifest, Service Worker caching (`/service-worker.js`), custom responsive icons, and an in-app installation prompt with iOS Safari instructions.
- **Netlify-Ready Deployment**: Includes `netlify.toml` and `public/_redirects` routing (`/* /index.html 200`) so clean URLs and deep links work out of the box.
- **Monetization & Analytics Ready**: Non-intrusive, reusable advertisement placeholders (`leaderboard`, `rectangle`, `tool-bottom`), FTC-compliant affiliate callout modules, and a future-compatible telemetry event layer.
- **Zero Account Friction**: Dark/Light/System theme toggling, favorite tool bookmarks, and recent search history stored safely in `localStorage`.

---

## 🛠 Complete Tool Library (35 Tools)

### Text & Content Tools (10)
1. **Word Counter** (`/tools/word-counter`) — Live word, character, sentence, paragraph counts, and speaking/reading time.
2. **Character Counter** (`/tools/character-counter`) — Character counts with/without spaces, UTF-8 byte length, and Twitter/SMS progress bars.
3. **Sentence Counter** (`/tools/sentence-counter`) — Sentence boundary detection, average sentence lengths, and readability scoring.
4. **Paragraph Counter** (`/tools/paragraph-counter`) — Paragraph counts and average words per paragraph.
5. **Reading Time Calculator** (`/tools/reading-time-calculator`) — Silent reading and presentation duration with adjustable WPM slider.
6. **Case Converter** (`/tools/case-converter`) — Convert text to UPPERCASE, lowercase, Title Case, camelCase, PascalCase, kebab-case, snake_case, CONSTANT_CASE, and alternating case.
7. **Remove Duplicate Lines** (`/tools/remove-duplicate-lines`) — Deduplicate lists with case sensitivity, whitespace trimming, and empty line removal.
8. **Text Sorter** (`/tools/text-sorter`) — Sort lines alphabetically (A-Z, Z-A), natural numeric (1-10), by length, or shuffle.
9. **Find and Replace** (`/tools/find-and-replace`) — Match case, whole word, and JavaScript Regular Expression support with live match counts.
10. **Text Repeater** (`/tools/text-repeater`) — Repeat strings up to 10,000 times with custom delimiters and index prefixes.

### Image Tools & Converters (8)
11. **Image Compressor** (`/tools/image-compressor`) — Hardware-accelerated canvas compression with quality slider and side-by-side byte savings.
12. **Image Resizer** (`/tools/image-resizer`) — Resize dimensions with aspect ratio lock and social media/resolution presets.
13. **Image Cropper** (`/tools/image-cropper`) — Crop to 1:1 Square, 16:9 Widescreen, 4:3 Standard, or custom framing.
14. **JPG to WebP Converter** (`/converters/jpg-to-webp`) — Convert JPEG files into next-gen WebP format for 30–50% bandwidth savings.
15. **PNG to WebP Converter** (`/converters/png-to-webp`) — Convert transparent PNG files to lightweight WebP while preserving transparency.
16. **WebP to JPG Converter** (`/converters/webp-to-jpg`) — Convert modern WebP files back to universal JPEG with customizable background fill.
17. **Image to Base64** (`/converters/image-to-base64`) — Encode images into Data URIs, HTML `<img>` tags, or CSS background-image rules.
18. **Favicon Generator** (`/generators/favicon-generator`) — Generate complete multi-size favicon suites (16×16, 32×32, 48×48, Apple Touch 180×180, Android 192×192) with mock tab preview.

### Calculators (7)
19. **Age Calculator** (`/calculators/age-calculator`) — Exact chronological age in years, months, days, total hours, and birthday countdown.
20. **Percentage Calculator** (`/calculators/percentage-calculator`) — Solve X% of Y, X is what % of Y, and percentage increase/decrease with formulas.
21. **Discount Calculator** (`/calculators/discount-calculator`) — Sale price, secondary coupons, sales tax calculations, and net savings.
22. **Tip Calculator** (`/calculators/tip-calculator`) — Bill splitting, custom tip rates (10–25%), and whole-dollar rounding.
23. **BMI Calculator** (`/calculators/bmi-calculator`) — Body Mass Index using Metric or Imperial measurements with WHO category gauge.
24. **Date Difference Calculator** (`/calculators/date-difference-calculator`) — Calculate calendar days, working business days, and weekend counts.
25. **Time Duration Calculator** (`/calculators/time-duration-calculator`) — Elapsed hours, minutes, and decimal hours with overnight shift crossover.

### Developer Tools (5)
26. **JSON Formatter & Validator** (`/tools/json-formatter`) — Format and beautify JSON with 2/4 spaces and syntax error line highlighting.
27. **JSON Minifier** (`/tools/json-minifier`) — Strip whitespace and line breaks while measuring byte savings.
28. **Base64 Encoder & Decoder** (`/converters/base64-encoder-decoder`) — Bi-directional text conversion with UTF-8 Unicode and URL-safe modes.
29. **URL Encoder & Decoder** (`/converters/url-encoder-decoder`) — Percent-encode special characters or decode complex query strings.
30. **UUID / GUID Generator** (`/generators/uuid-generator`) — Cryptographically secure v4 UUIDs generated singly or in bulk (1–100).

### Generators (5)
31. **QR Code Generator** (`/generators/qr-code-generator`) — Permanent direct QR codes for URLs, Wi-Fi networks, text, emails, and phone numbers with custom colors.
32. **Password Generator** (`/generators/password-generator`) — High-entropy passwords (6–64 chars) with Shannon entropy calculations.
33. **Lorem Ipsum Generator** (`/generators/lorem-ipsum-generator`) — Classical Latin placeholder text by paragraphs, sentences, or words.
34. **Random Number Generator** (`/generators/random-number-generator`) — Cryptographic random integers, dice rolls, coin flips, and lottery drawings.
35. **Color Palette Generator** (`/generators/color-palette-generator`) — 5-color harmonious palettes with individual color locking and CSS export.

---

## 📚 Technical Guides & Tutorials (10)

Located under `/guides`:
- *How to Compress an Image Without Losing Visible Quality*
- *How to Convert JPG to WebP: The Complete Next-Gen Guide*
- *How to Calculate Percentages: Formulas and Step-by-Step Guide*
- *How to Calculate Exact Chronological Age Accurately*
- *10 Proven Techniques to Reduce Image File Size for Web and Email*
- *What is WebP? Everything You Need to Know About Next-Gen Web Images*
- *JPG vs PNG vs WebP: Which Image Format Should You Choose?*
- *How to Format and Validate JSON Payloads Like a Senior Developer*
- *How to Encode and Decode Base64 Strings and Data URIs*
- *How to Create Custom QR Codes for Wi-Fi, Websites, and Print*

---

## 🌐 Netlify Deployment Instructions

### Automatic Git Deploy
1. Push repository to GitHub or GitLab.
2. In the Netlify Dashboard, click **Add new site** > **Import an existing project**.
3. Select your repository.
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy site**.

`netlify.toml` and `public/_redirects` ensure that direct deep links (e.g., `https://your-domain.com/tools/word-counter`) resolve seamlessly to `/index.html` with HTTP 200.

---

## ⚙️ Configuration & Customization

The platform can be rebranded and reconfigured globally by editing `src/config/siteConfig.ts`:
```typescript
export const siteConfig = {
  siteName: 'ToolNest',
  tagline: 'Free Online Tools That Actually Get Things Done',
  siteUrl: 'https://toolnest.app',
  contactEmail: 'hello@toolnest.app',
  adSettings: {
    enabled: true,       // Toggle advertisement placeholders
    showOnHome: true,
    showOnTools: true,
    showOnGuides: true,
  },
  analyticsSettings: {
    enabled: false,      // Toggle analytics integration
    measurementId: '',   // e.g. G-XXXXXXXXXX
  }
};
```
