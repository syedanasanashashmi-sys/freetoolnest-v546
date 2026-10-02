import React from 'react';
import {
  WordCounterTool, CharacterCounterTool, SentenceCounterTool, ParagraphCounterTool,
  ReadingTimeTool, CaseConverterTool, RemoveDuplicateLinesTool, TextSorterTool,
  FindAndReplaceTool, TextRepeaterTool
} from './text/TextTools';
import {
  ImageCompressorTool, ImageResizerTool, ImageCropperTool, JpgToWebpTool,
  PngToWebpTool, WebpToJpgTool, ImageToBase64Tool, FaviconGeneratorTool
} from './image/ImageTools';
import {
  AgeCalculatorTool, PercentageCalculatorTool, DiscountCalculatorTool,
  TipCalculatorTool, BmiCalculatorTool, DateDifferenceTool, TimeDurationTool
} from './calculators/CalculatorTools';
import {
  JsonFormatterTool, JsonMinifierTool, Base64Tool, UrlTool, UuidGeneratorTool
} from './developer/DeveloperTools';
import {
  QrCodeGeneratorTool, PasswordGeneratorTool, LoremIpsumTool,
  RandomNumberTool, ColorPaletteTool
} from './generators/GeneratorTools';

interface ToolRendererProps {
  slug: string;
  onTaskCompleted?: () => void;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ slug, onTaskCompleted }) => {
  switch (slug) {
    // Text Tools (1-10)
    case 'word-counter':
      return <WordCounterTool onTaskCompleted={onTaskCompleted} />;
    case 'character-counter':
      return <CharacterCounterTool onTaskCompleted={onTaskCompleted} />;
    case 'sentence-counter':
      return <SentenceCounterTool onTaskCompleted={onTaskCompleted} />;
    case 'paragraph-counter':
      return <ParagraphCounterTool onTaskCompleted={onTaskCompleted} />;
    case 'reading-time-calculator':
      return <ReadingTimeTool onTaskCompleted={onTaskCompleted} />;
    case 'case-converter':
      return <CaseConverterTool onTaskCompleted={onTaskCompleted} />;
    case 'remove-duplicate-lines':
      return <RemoveDuplicateLinesTool onTaskCompleted={onTaskCompleted} />;
    case 'text-sorter':
      return <TextSorterTool onTaskCompleted={onTaskCompleted} />;
    case 'find-and-replace':
      return <FindAndReplaceTool onTaskCompleted={onTaskCompleted} />;
    case 'text-repeater':
      return <TextRepeaterTool onTaskCompleted={onTaskCompleted} />;

    // Image Tools (11-18)
    case 'image-compressor':
      return <ImageCompressorTool onTaskCompleted={onTaskCompleted} />;
    case 'image-resizer':
      return <ImageResizerTool onTaskCompleted={onTaskCompleted} />;
    case 'image-cropper':
      return <ImageCropperTool onTaskCompleted={onTaskCompleted} />;
    case 'jpg-to-webp':
      return <JpgToWebpTool onTaskCompleted={onTaskCompleted} />;
    case 'png-to-webp':
      return <PngToWebpTool onTaskCompleted={onTaskCompleted} />;
    case 'webp-to-jpg':
      return <WebpToJpgTool onTaskCompleted={onTaskCompleted} />;
    case 'image-to-base64':
      return <ImageToBase64Tool onTaskCompleted={onTaskCompleted} />;
    case 'favicon-generator':
      return <FaviconGeneratorTool onTaskCompleted={onTaskCompleted} />;

    // Calculators (19-25)
    case 'age-calculator':
      return <AgeCalculatorTool onTaskCompleted={onTaskCompleted} />;
    case 'percentage-calculator':
      return <PercentageCalculatorTool onTaskCompleted={onTaskCompleted} />;
    case 'discount-calculator':
      return <DiscountCalculatorTool onTaskCompleted={onTaskCompleted} />;
    case 'tip-calculator':
      return <TipCalculatorTool onTaskCompleted={onTaskCompleted} />;
    case 'bmi-calculator':
      return <BmiCalculatorTool onTaskCompleted={onTaskCompleted} />;
    case 'date-difference-calculator':
      return <DateDifferenceTool onTaskCompleted={onTaskCompleted} />;
    case 'time-duration-calculator':
      return <TimeDurationTool onTaskCompleted={onTaskCompleted} />;

    // Developer Tools (26-30)
    case 'json-formatter':
      return <JsonFormatterTool onTaskCompleted={onTaskCompleted} />;
    case 'json-minifier':
      return <JsonMinifierTool onTaskCompleted={onTaskCompleted} />;
    case 'base64-encoder-decoder':
      return <Base64Tool onTaskCompleted={onTaskCompleted} />;
    case 'url-encoder-decoder':
      return <UrlTool onTaskCompleted={onTaskCompleted} />;
    case 'uuid-generator':
      return <UuidGeneratorTool onTaskCompleted={onTaskCompleted} />;

    // Generators (31-35)
    case 'qr-code-generator':
      return <QrCodeGeneratorTool onTaskCompleted={onTaskCompleted} />;
    case 'password-generator':
      return <PasswordGeneratorTool onTaskCompleted={onTaskCompleted} />;
    case 'lorem-ipsum-generator':
      return <LoremIpsumTool onTaskCompleted={onTaskCompleted} />;
    case 'random-number-generator':
      return <RandomNumberTool onTaskCompleted={onTaskCompleted} />;
    case 'color-palette-generator':
      return <ColorPaletteTool onTaskCompleted={onTaskCompleted} />;

    default:
      return (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold text-slate-500">Tool component loading...</p>
        </div>
      );
  }
};
