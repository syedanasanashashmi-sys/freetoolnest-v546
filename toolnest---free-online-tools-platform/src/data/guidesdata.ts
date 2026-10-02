import { GuideDefinition } from '../types';

export const guidesData: GuideDefinition[] = [
  {
    id: 'how-to-compress-an-image-without-losing-quality',
    slug: 'how-to-compress-an-image-without-losing-quality',
    title: 'How to Compress an Image Without Losing Visible Quality',
    shortDescription: 'Master the art of photo compression. Learn how modern lossy algorithms trim file sizes by 70% while keeping pictures razor-sharp.',
    category: 'Image Optimization',
    readTime: '5 min read',
    publishDate: '2026-02-15',
    lastUpdated: '2026-09-20',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['image-compressor', 'image-resizer', 'jpg-to-webp'],
    relatedGuideSlugs: ['how-to-reduce-image-file-size', 'jpg-vs-png-vs-webp-comparison'],
    tableOfContents: [
      { id: 'introduction', title: 'Why Image Compression Matters' },
      { id: 'lossy-vs-lossless', title: 'Lossy vs Lossless Compression' },
      { id: 'optimal-settings', title: 'The Sweet Spot: 75% to 85% Quality' },
      { id: 'step-by-step', title: 'Step-by-Step Compression Guide' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'introduction',
        heading: 'Why Image Compression Matters for Fast Websites',
        body: [
          'High-resolution photos from modern smartphones and digital cameras easily weigh between 4 MB and 15 MB. When placed directly on a website, these oversized images cripple page loading speeds, cause frustrating layout shifts, and hurt search engine rankings.',
          'Google Core Web Vitals directly measures Largest Contentful Paint (LCP). Large uncompressed images are the single most common cause of failing LCP scores.',
        ],
        callout: {
          type: 'info',
          text: 'Compressing images directly in your browser with ToolNest keeps your sensitive photos private—they are never uploaded to remote servers.',
        },
      },
      {
        id: 'lossy-vs-lossless',
        heading: 'Lossy vs Lossless Compression: Which Should You Use?',
        body: [
          'Lossless compression strips hidden metadata (EXIF camera details, date stamps, GPS coordinates) and consolidates pixel color tables without removing visual details. While safe, it typically only yields a 10% to 20% size reduction.',
          'Lossy compression gently discards subtle color variations that the human visual cortex cannot perceive. By leveraging psycho-visual modeling, lossy compression can reduce file size by 60% to 80% without noticeable degradation on screens.',
        ],
      },
      {
        id: 'optimal-settings',
        heading: 'The Sweet Spot: Why 75% to 85% Quality is Ideal',
        body: [
          'Most graphic software saves JPEG files at 95% to 100% quality by default. This creates immense file bloat with virtually zero perceptible benefit.',
          'Dropping the quality slider from 100% down to 80% reduces file size dramatically (often from 3 MB to 350 KB) while maintaining razor-sharp text, vivid colors, and smooth gradients.',
        ],
      },
      {
        id: 'step-by-step',
        heading: 'How to Compress Photos with ToolNest',
        body: [
          '1. Navigate to the ToolNest Image Compressor.',
          '2. Drag and drop your JPG, PNG, or WebP photo into the dropzone.',
          '3. Adjust the quality slider to approximately 80%.',
          '4. Check the live comparison: view the exact percentage saved.',
          '5. Click "Download Compressed Image" to save your optimized file.',
        ],
        codeExample: '<!-- Fast loading image with modern attributes -->\n<img src="optimized-hero.webp" alt="Landscape banner" width="1200" height="630" loading="lazy" decoding="async" />',
      },
    ],
    faqs: [
      {
        question: 'Will image compression affect printing?',
        answer: 'For screen viewing on mobile phones and desktops, 80% quality is virtually identical to 100%. For commercial high-DPI magazine printing, keep compression above 90% or preserve the original RAW master.',
      },
      {
        question: 'Can I compress multiple images at once?',
        answer: 'ToolNest processes each image in your browser instantly. You can easily drag and compress files sequentially without waiting for network uploads.',
      },
    ],
  },
  {
    id: 'how-to-convert-jpg-to-webp',
    slug: 'how-to-convert-jpg-to-webp',
    title: 'How to Convert JPG to WebP: The Complete Next-Gen Guide',
    shortDescription: 'Discover why converting standard JPEG images into modern Google WebP format cuts website load times in half.',
    category: 'File Formats',
    readTime: '4 min read',
    publishDate: '2026-03-01',
    lastUpdated: '2026-09-18',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['jpg-to-webp', 'png-to-webp', 'image-compressor'],
    relatedGuideSlugs: ['what-is-webp-format-guide', 'jpg-vs-png-vs-webp-comparison'],
    tableOfContents: [
      { id: 'what-is-webp', title: 'What is WebP?' },
      { id: 'why-convert', title: 'Key Benefits of WebP' },
      { id: 'conversion-steps', title: 'How to Convert in 3 Clicks' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'what-is-webp',
        heading: 'What is the WebP Format?',
        body: [
          'WebP is a modern image format developed by Google specifically engineered to provide superior lossless and lossy compression for web assets.',
          'WebP images are typically 26% smaller than PNGs and 25% to 34% smaller than comparable JPEG images at equivalent visual quality.',
        ],
      },
      {
        id: 'why-convert',
        heading: 'Why Every Website Owner Should Convert to WebP',
        body: [
          '1. Faster Page Loads: Smaller byte sizes translate to instant loading, especially on mobile 4G/5G connections.',
          '2. Higher Google Rankings: Google search algorithm prioritizes websites that deliver fast Core Web Vitals performance.',
          '3. Bandwidth Savings: Cut server CDN egress bandwidth costs by over 30%.',
        ],
      },
      {
        id: 'conversion-steps',
        heading: 'Converting JPG to WebP with ToolNest',
        body: [
          'Using the ToolNest JPG to WebP Converter requires zero software installation or terminal commands.',
          'Simply upload your JPG file, choose your compression level, and download the new .webp file. Processing happens locally within your browser.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do all browsers support WebP?',
        answer: 'Yes! As of 2026, over 97% of worldwide web browsers (including Google Chrome, Apple Safari, Mozilla Firefox, and Microsoft Edge) provide native support for WebP.',
      },
    ],
  },
  {
    id: 'how-to-calculate-percentage',
    slug: 'how-to-calculate-percentage',
    title: 'How to Calculate Percentages: Formulas and Step-by-Step Guide',
    shortDescription: 'Master percentage calculations for discounts, price increases, school grades, and tip splits with intuitive formulas.',
    category: 'Mathematics & Finance',
    readTime: '6 min read',
    publishDate: '2026-01-20',
    lastUpdated: '2026-08-12',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['percentage-calculator', 'discount-calculator', 'tip-calculator'],
    relatedGuideSlugs: [],
    tableOfContents: [
      { id: 'basics', title: 'Understanding the Word "Percentage"' },
      { id: 'formula-1', title: 'Formula 1: What is X% of Y?' },
      { id: 'formula-2', title: 'Formula 2: Percentage Increase & Decrease' },
      { id: 'formula-3', title: 'Formula 3: Finding the Percentage Value' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'basics',
        heading: 'Understanding What a Percentage Really Is',
        body: [
          'The word percent comes from the Latin phrase "per centum", which translates literally to "by the hundred". A percentage is simply a fraction or ratio whose denominator is always 100.',
          'For example, 25% is equivalent to 25/100, which simplifies to the decimal 0.25.',
        ],
      },
      {
        id: 'formula-1',
        heading: 'How to Find X% of a Number (Y)',
        body: [
          'To calculate a percentage of any number, convert the percentage into a decimal by dividing by 100, then multiply by the total number.',
          'Example: What is 15% of $80? Divide 15 by 100 to get 0.15. Then multiply 0.15 * 80 = $12.',
        ],
        codeExample: 'Percentage Amount = (Percentage / 100) * Total Value\nResult = (15 / 100) * 80 = 12',
      },
      {
        id: 'formula-2',
        heading: 'How to Calculate Percentage Increase or Decrease',
        body: [
          'To calculate percentage change between an old value and a new value:',
          '1. Subtract the original value from the new value (New - Old).',
          '2. Divide that difference by the original value.',
          '3. Multiply by 100 to express as a percentage.',
        ],
        codeExample: 'Percentage Change = ((New Value - Old Value) / Old Value) * 100',
      },
    ],
    faqs: [
      {
        question: 'How do I add sales tax to a purchase price?',
        answer: 'To add 8% sales tax to a $50 purchase, multiply $50 by 1.08 to get $54.00, or calculate 8% ($4.00) and add it to $50.',
      },
    ],
  },
  {
    id: 'how-to-calculate-age-accurately',
    slug: 'how-to-calculate-age-accurately',
    title: 'How to Calculate Exact Chronological Age Accurately',
    shortDescription: 'Learn how to accurately compute age in years, months, and days while properly handling leap years and varying month lengths.',
    category: 'Calculators',
    readTime: '4 min read',
    publishDate: '2026-02-10',
    lastUpdated: '2026-07-28',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['age-calculator', 'date-difference-calculator'],
    relatedGuideSlugs: [],
    tableOfContents: [
      { id: 'calendar-complexity', title: 'Why Date Math is Hard' },
      { id: 'the-algorithm', title: 'The Chronological Age Algorithm' },
      { id: 'leap-years', title: 'Handling February 29th' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'calendar-complexity',
        heading: 'Why Accurate Age Calculation is Surprisingly Complex',
        body: [
          'While calculating an age in whole years seems trivial, computing exact elapsed months and days requires accounting for irregularities in the Gregorian calendar:',
          '- Months alternate between 28, 29, 30, and 31 days.',
          '- Leap years add an extra calendar day every four years (with century exceptions).',
        ],
      },
      {
        id: 'the-algorithm',
        heading: 'The Standard Chronological Borrowing Method',
        body: [
          '1. If current day < birth day, borrow days from the preceding month.',
          '2. If current month < birth month, borrow 12 months from the current year.',
          '3. Subtract the adjusted years, months, and days.',
        ],
      },
    ],
    faqs: [
      {
        question: 'When is a leap baby\'s official birthday in non-leap years?',
        answer: 'Legally and conventionally, individuals born on February 29 celebrate on March 1st in common non-leap calendar years.',
      },
    ],
  },
  {
    id: 'how-to-reduce-image-file-size',
    slug: 'how-to-reduce-image-file-size',
    title: '10 Proven Techniques to Reduce Image File Size for Web and Email',
    shortDescription: 'Actionable tips to shrink megabyte-heavy camera photos down to kilobytes without ugly visual artifacts.',
    category: 'Optimization',
    readTime: '6 min read',
    publishDate: '2026-03-12',
    lastUpdated: '2026-09-15',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['image-compressor', 'image-resizer', 'jpg-to-webp'],
    relatedGuideSlugs: ['how-to-compress-an-image-without-losing-quality', 'jpg-vs-png-vs-webp-comparison'],
    tableOfContents: [
      { id: 'dimensions-matter', title: '1. Resize to Target Dimensions First' },
      { id: 'format-selection', title: '2. Choose the Right Format' },
      { id: 'strip-metadata', title: '3. Strip Hidden EXIF Metadata' },
      { id: 'adjust-quality', title: '4. Moderate Compression Settings' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'dimensions-matter',
        heading: '1. Always Resize to Display Dimensions Before Compressing',
        body: [
          'The single biggest mistake website creators make is uploading a 4000x3000px camera photo into a container that displays at 800x600px.',
          'Resizing pixel dimensions first cuts the total pixel count from 12 megapixels to 0.48 megapixels—a 96% reduction in raw pixel data before compression even begins!',
        ],
      },
      {
        id: 'strip-metadata',
        heading: '2. Strip Heavy EXIF Metadata',
        body: [
          'Smartphones store camera lens settings, thumbnail previews, color profiles, and geolocation coordinates inside the image header. Stripping this metadata can instantly save 20 KB to 100 KB per photo.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the ideal image weight for website pages?',
        answer: 'Aim to keep individual hero banners under 150 KB and standard content images under 70 KB for snappy mobile performance.',
      },
    ],
  },
  {
    id: 'what-is-webp-format-guide',
    slug: 'what-is-webp-format-guide',
    title: 'What is WebP? Everything You Need to Know About Next-Gen Web Images',
    shortDescription: 'An in-depth breakdown of Google WebP image format, lossy vs lossless features, and animation capabilities.',
    category: 'Technology',
    readTime: '5 min read',
    publishDate: '2026-02-05',
    lastUpdated: '2026-08-30',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['jpg-to-webp', 'png-to-webp', 'webp-to-jpg'],
    relatedGuideSlugs: ['jpg-vs-png-vs-webp-comparison'],
    tableOfContents: [
      { id: 'background', title: 'Origin and History of WebP' },
      { id: 'how-it-works', title: 'How WebP Compression Works' },
      { id: 'features', title: 'Unique WebP Capabilities' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'background',
        heading: 'Origin and Architectural Purpose of WebP',
        body: [
          'Introduced by Google, WebP was created to tackle the limitations of 1990s formats like JPEG, PNG, and GIF. It uses predictive coding algorithms adapted from the VP8 video codec.',
        ],
      },
      {
        id: 'features',
        heading: 'Key Capabilities: All-in-One Image Format',
        body: [
          '- Lossy Compression: Outperforms JPEG by 25-34% at identical visual quality.',
          '- Lossless Compression: Outperforms PNG by 26% while preserving alpha transparency.',
          '- Alpha Transparency: Allows transparent backgrounds on both lossy and lossless images.',
          '- Animation: Supports animated sequences with far smaller file sizes than legacy GIFs.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Can I view WebP files on Windows and Mac?',
        answer: 'Yes! Both macOS Finder (Preview) and modern Windows 10/11 natively display WebP thumbnails and files.',
      },
    ],
  },
  {
    id: 'jpg-vs-png-vs-webp-comparison',
    slug: 'jpg-vs-png-vs-webp-comparison',
    title: 'JPG vs PNG vs WebP: Which Image Format Should You Choose?',
    shortDescription: 'Direct side-by-side comparison of JPG, PNG, and WebP. Know exactly when to use each format for web design, photos, and graphics.',
    category: 'File Formats',
    readTime: '6 min read',
    publishDate: '2026-01-15',
    lastUpdated: '2026-09-01',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['jpg-to-webp', 'png-to-webp', 'image-compressor'],
    relatedGuideSlugs: ['what-is-webp-format-guide'],
    tableOfContents: [
      { id: 'overview', title: 'Quick Summary Comparison' },
      { id: 'when-to-use-jpg', title: 'When to Use JPG' },
      { id: 'when-to-use-png', title: 'When to Use PNG' },
      { id: 'when-to-use-webp', title: 'When to Use WebP' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'overview',
        heading: 'Quick Format Breakdown',
        body: [
          'Choosing the wrong format can cause massive file bloat or blurry logos. Here is the golden rule:',
          '- Use WebP for virtually all web assets: photos, banners, and transparent illustrations.',
          '- Use PNG when you need uncompressed archival masters or transparent assets for software lacking WebP.',
          '- Use JPG for legacy device compatibility, offline printing, or email newsletters.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Does WebP replace SVG for icons?',
        answer: 'No. Vector formats like SVG remain superior for simple UI icons and typography because SVGs scale infinitely to any resolution with negligible file size.',
      },
    ],
  },
  {
    id: 'how-to-format-and-validate-json',
    slug: 'how-to-format-and-validate-json',
    title: 'How to Format and Validate JSON Payloads Like a Senior Developer',
    shortDescription: 'Master JSON syntax rules, fix common parsing bugs (trailing commas, quotes), and beautify data structures.',
    category: 'Developer Tutorials',
    readTime: '5 min read',
    publishDate: '2026-02-18',
    lastUpdated: '2026-08-22',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['json-formatter', 'json-minifier', 'base64-encoder-decoder'],
    relatedGuideSlugs: ['how-to-encode-and-decode-base64'],
    tableOfContents: [
      { id: 'syntax-rules', title: 'Core JSON Syntax Rules' },
      { id: 'common-errors', title: 'Top 5 Common JSON Parsing Errors' },
      { id: 'best-practices', title: 'Formatting Best Practices' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'syntax-rules',
        heading: 'Strict Rules of JavaScript Object Notation (JSON)',
        body: [
          'JSON is strict. Unlike standard JavaScript objects:',
          '1. All keys MUST be enclosed in double quotes ("key", never \'key\' or unquoted).',
          '2. String values MUST use double quotes.',
          '3. Trailing commas after the last array item or key-value pair are illegal.',
          '4. Comments (// or /* */) are not allowed in RFC 8259 compliant JSON.',
        ],
        codeExample: '{\n  "name": "ToolNest",\n  "active": true,\n  "features": ["tools", "calculators", "generators"],\n  "rating": 4.9\n}',
      },
    ],
    faqs: [
      {
        question: 'Why does my JSON say "Unexpected token in JSON at position X"?',
        answer: 'This almost always indicates a trailing comma at the end of a list, unescaped quotes inside a string, or single quotes used instead of double quotes.',
      },
    ],
  },
  {
    id: 'how-to-encode-and-decode-base64',
    slug: 'how-to-encode-and-decode-base64',
    title: 'How to Encode and Decode Base64 Strings and Data URIs',
    shortDescription: 'Understand how Base64 converts binary bytes into ASCII text for HTTP headers, JWT tokens, and inline images.',
    category: 'Developer Tutorials',
    readTime: '5 min read',
    publishDate: '2026-03-05',
    lastUpdated: '2026-09-10',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['base64-encoder-decoder', 'image-to-base64', 'url-encoder-decoder'],
    relatedGuideSlugs: ['how-to-format-and-validate-json'],
    tableOfContents: [
      { id: 'how-it-works', title: 'How Base64 Works (6-bit Radix)' },
      { id: 'use-cases', title: 'Common Real-World Use Cases' },
      { id: 'utf8-pitfalls', title: 'JavaScript UTF-8 Pitfalls with btoa/atob' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'how-it-works',
        heading: 'How Base64 Encoding Converts Binary into Safe ASCII',
        body: [
          'Base64 takes three 8-bit binary bytes (24 bits total) and splits them into four 6-bit groups. Each 6-bit group maps to one of 64 printable characters (A-Z, a-z, 0-9, +, /).',
          'Because 3 bytes become 4 characters, Base64 strings have a predictable ~33% overhead in storage size.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is URL-safe Base64?',
        answer: 'Standard Base64 contains + and / which have special meaning in URLs and query strings. URL-safe Base64 replaces + with - and / with _ to prevent URL corruption.',
      },
    ],
  },
  {
    id: 'how-to-create-a-custom-qr-code',
    slug: 'how-to-create-a-custom-qr-code',
    title: 'How to Create Custom QR Codes for Wi-Fi, Websites, and Print',
    shortDescription: 'Step-by-step guide to generating permanent, scannable QR codes with custom styling, high contrast, and error correction.',
    category: 'Generators',
    readTime: '4 min read',
    publishDate: '2026-03-08',
    lastUpdated: '2026-09-14',
    author: 'ToolNest Editorial',
    relatedToolSlugs: ['qr-code-generator', 'favicon-generator'],
    relatedGuideSlugs: [],
    tableOfContents: [
      { id: 'qr-structure', title: 'Anatomy of a QR Code' },
      { id: 'wifi-payload', title: 'Creating Instant Wi-Fi Login Codes' },
      { id: 'contrast-rules', title: 'Contrast Rules for Reliable Scanning' },
      { id: 'faqs', title: 'Frequently Asked Questions' },
    ],
    contentSections: [
      {
        id: 'qr-structure',
        heading: 'The Anatomy of a High-Scannability QR Code',
        body: [
          'Quick Response (QR) codes are 2D matrix symbologies invented in 1994. They feature three distinct corner positioning squares ("finder patterns") allowing mobile cameras to orient and scan the code from any angle.',
        ],
      },
      {
        id: 'contrast-rules',
        heading: 'Critical Rule: Contrast and Error Correction',
        body: [
          'Always use a dark foreground color against a light background. Light codes printed on dark backgrounds fail on older smartphone lenses.',
          'For business cards and menus that experience wear and tear, select Error Correction Level Q or H (permits up to 25-30% data recovery).',
        ],
      },
    ],
    faqs: [
      {
        question: 'Do ToolNest QR codes ever expire?',
        answer: 'Never! ToolNest embeds your raw data directly into the matrix pattern without third-party redirect links, ensuring permanent functionality.',
      },
    ],
  },
];

export function getGuideBySlug(slug: string): GuideDefinition | undefined {
  return guidesData.find((g) => g.slug === slug);
}
