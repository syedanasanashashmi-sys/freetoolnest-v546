import React, { useState, useMemo } from 'react';
import { Copy, Check, RotateCcw, Download, Sparkles, AlertCircle, FileText } from 'lucide-react';
import { trackEvent } from '../../../utils/analytics';
import { fireCelebration } from '../../../utils/confetti';

interface ToolCommonProps {
  onTaskCompleted?: () => void;
}

// -------------------------------------------------------------
// 1. WORD COUNTER
// -------------------------------------------------------------
export const WordCounterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const charsWithSpaces = text.length;
    const charsWithoutSpaces = text.replace(/\s+/g, '').length;
    const sentences = trimmed ? (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (words > 0 ? 1 : 0) : 0;
    const paragraphs = trimmed ? text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length : 0;
    const readingTimeMin = Math.ceil(words / 225);
    const speakingTimeMin = Math.ceil(words / 130);

    // Keyword density
    const wordList = trimmed.toLowerCase().match(/\b[a-z0-9']+\b/g) || [];
    const frequency: Record<string, number> = {};
    for (const w of wordList) {
      if (w.length > 2) {
        frequency[w] = (frequency[w] || 0) + 1;
      }
    }
    const topKeywords = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    return {
      words,
      charsWithSpaces,
      charsWithoutSpaces,
      sentences,
      paragraphs,
      readingTimeMin,
      speakingTimeMin,
      topKeywords,
    };
  }, [text]);

  const handleCopyStats = () => {
    const summary = `Words: ${stats.words} | Characters: ${stats.charsWithSpaces} | Sentences: ${stats.sentences} | Paragraphs: ${stats.paragraphs} | Reading Time: ~${stats.readingTimeMin} min`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('copy_clicked', { tool: 'word-counter' });
    onTaskCompleted?.();
  };

  const handleSample = () => {
    setText(
      'ToolNest provides lightning-fast online tools designed for privacy and speed. Every calculation runs directly in your local browser, meaning your confidential data, essays, and images never touch a third-party server. Try pasting your own content here to inspect real-time word count, character density, and estimated reading time.'
    );
    onTaskCompleted?.();
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Words</span>
          <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">{stats.words}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Characters</span>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{stats.charsWithSpaces}</p>
          <span className="text-[10px] text-slate-400">({stats.charsWithoutSpaces} no spaces)</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sentences</span>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{stats.sentences}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Reading Time</span>
          <p className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            ~{stats.readingTimeMin} <span className="text-sm font-normal">min</span>
          </p>
        </div>
      </div>

      {/* Editor Textarea */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-2 flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Input Text
          </label>
          <div className="flex items-center gap-2">
            {!text && (
              <button
                onClick={handleSample}
                className="text-xs font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Insert Sample
              </button>
            )}
            {text && (
              <button
                onClick={() => setText('')}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-500 transition"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length > 20) onTaskCompleted?.();
          }}
          placeholder="Paste or type your text here to begin instant real-time analysis..."
          rows={9}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:focus:bg-slate-900"
        />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-3 dark:border-slate-800">
          <div className="flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span>Paragraphs: <strong>{stats.paragraphs}</strong></span>
            <span>Speaking Time: <strong>~{stats.speakingTimeMin} min</strong></span>
          </div>
          <button
            onClick={handleCopyStats}
            disabled={!text}
            className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white transition"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Stats Copied!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Top Keywords Pill Breakdown */}
      {stats.topKeywords.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-900/40">
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
            Top Keyword Density:
          </span>
          <div className="mt-2 flex flex-wrap gap-2">
            {stats.topKeywords.map(([kw, count]) => (
              <span
                key={kw}
                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <span className="font-semibold">{kw}</span>
                <span className="text-slate-400 font-mono">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 2. CHARACTER COUNTER
// -------------------------------------------------------------
export const CharacterCounterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;
    const letters = (text.match(/[a-zA-Z]/g) || []).length;
    const digits = (text.match(/[0-9]/g) || []).length;
    const spaces = (text.match(/\s/g) || []).length;
    const symbols = charsWithSpaces - letters - digits - spaces;
    const bytes = new TextEncoder().encode(text).length;

    return { charsWithSpaces, charsNoSpaces, letters, digits, spaces, symbols, bytes };
  }, [text]);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onTaskCompleted?.();
  };

  const twitterProgress = Math.min(100, Math.round((stats.charsWithSpaces / 280) * 100));
  const smsCount = Math.ceil(stats.charsWithSpaces / 160) || 1;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Characters</span>
          <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">{stats.charsWithSpaces}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Without Spaces</span>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{stats.charsNoSpaces}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Letters & Digits</span>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{stats.letters + stats.digits}</p>
          <span className="text-[10px] text-slate-400">({stats.letters} letters, {stats.digits} digits)</span>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">UTF-8 Size</span>
          <p className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {stats.bytes} <span className="text-sm font-normal">bytes</span>
          </p>
        </div>
      </div>

      {/* Editor */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length > 5) onTaskCompleted?.();
          }}
          placeholder="Type or paste characters to inspect length..."
          rows={6}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />

        {/* Popular Limits Indicators */}
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex justify-between text-xs font-medium">
              <span>Twitter / X (280 max)</span>
              <span className={stats.charsWithSpaces > 280 ? 'text-red-500 font-bold' : ''}>
                {stats.charsWithSpaces} / 280
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
              <div
                className={`h-full transition-all ${
                  stats.charsWithSpaces > 280 ? 'bg-red-500' : 'bg-blue-600'
                }`}
                style={{ width: `${twitterProgress}%` }}
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 dark:border-slate-800 dark:bg-slate-800/40">
            <div className="flex justify-between text-xs font-medium">
              <span>SMS Messages (160 char/segment)</span>
              <span>{smsCount} {smsCount === 1 ? 'segment' : 'segments'}</span>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              {160 - (stats.charsWithSpaces % 160 || 160)} chars remaining until next segment
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={copyText}
            disabled={!text}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. SENTENCE COUNTER
// -------------------------------------------------------------
export const SentenceCounterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');

  const sentences = useMemo(() => {
    if (!text.trim()) return [];
    // Match sentences ending in ., !, or ?
    const matches = text.match(/[^.!?]+[.!?]+(\s|$)/g) || [text.trim()];
    return matches.map((s) => s.trim()).filter(Boolean);
  }, [text]);

  const totalWords = useMemo(() => (text.trim() ? text.trim().split(/\s+/).length : 0), [text]);
  const avgWordsPerSentence = sentences.length > 0 ? (totalWords / sentences.length).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Sentences</span>
          <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">{sentences.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Avg Words/Sentence</span>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">{avgWordsPerSentence}</p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Readability</span>
          <p className="mt-1 text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {Number(avgWordsPerSentence) <= 15 ? 'Excellent (Fast read)' : Number(avgWordsPerSentence) <= 22 ? 'Standard (Good)' : 'Complex (Long sentences)'}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length > 20) onTaskCompleted?.();
          }}
          placeholder="Paste paragraphs to dissect sentence lengths and structure..."
          rows={7}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />
      </div>

      {sentences.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            Sentence Breakdown ({sentences.length})
          </h4>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {sentences.map((sentence, idx) => {
              const wordCount = sentence.split(/\s+/).length;
              return (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 rounded-lg border border-slate-100 bg-slate-50/70 p-2.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300"
                >
                  <span className="flex-1">{sentence}</span>
                  <span className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                    wordCount > 25 ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' : 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {wordCount} words
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 4. PARAGRAPH COUNTER
// -------------------------------------------------------------
export const ParagraphCounterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');

  const paragraphs = useMemo(() => {
    if (!text) return [];
    return text.split(/\n+/).map((p) => p.trim()).filter(Boolean);
  }, [text]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Paragraphs</span>
          <p className="mt-1 text-2xl font-extrabold text-blue-600 dark:text-blue-400">{paragraphs.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Words</span>
          <p className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
            {text.trim() ? text.trim().split(/\s+/).length : 0}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1 rounded-xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Avg Words/Paragraph</span>
          <p className="mt-1 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
            {paragraphs.length > 0
              ? Math.round(text.trim().split(/\s+/).length / paragraphs.length)
              : 0}
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length > 20) onTaskCompleted?.();
          }}
          placeholder="Paste content with line breaks to inspect paragraph distribution..."
          rows={8}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. READING TIME CALCULATOR
// -------------------------------------------------------------
export const ReadingTimeTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [wpm, setWpm] = useState(225);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const totalSeconds = words > 0 ? Math.round((words / wpm) * 60) : 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const speakingSeconds = words > 0 ? Math.round((words / 130) * 60) : 0;
  const speakingMin = Math.floor(speakingSeconds / 60);
  const speakingSec = speakingSeconds % 60;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Silent Reading Time</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{minutes}</span>
            <span className="text-sm text-slate-500">min</span>
            <span className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{seconds}</span>
            <span className="text-sm text-slate-500">sec</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Based on {wpm} words per minute</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Speaking / Presentation Time</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{speakingMin}</span>
            <span className="text-sm text-slate-500">min</span>
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{speakingSec}</span>
            <span className="text-sm text-slate-500">sec</span>
          </div>
          <p className="mt-2 text-xs text-slate-400">Standard presentation pace (130 WPM)</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-3 flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Reading Speed Slider: {wpm} WPM
          </label>
          <div className="flex gap-1.5">
            <button
              onClick={() => setWpm(180)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                wpm === 180 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Slow (180)
            </button>
            <button
              onClick={() => setWpm(225)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                wpm === 225 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Average (225)
            </button>
            <button
              onClick={() => setWpm(300)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                wpm === 300 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              Fast (300)
            </button>
          </div>
        </div>

        <input
          type="range"
          min={100}
          max={450}
          step={5}
          value={wpm}
          onChange={(e) => setWpm(Number(e.target.value))}
          className="w-full accent-blue-600 mb-4"
        />

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (e.target.value.length > 20) onTaskCompleted?.();
          }}
          placeholder="Paste your speech, article, or presentation draft..."
          rows={7}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 6. CASE CONVERTER
// -------------------------------------------------------------
export const CaseConverterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const applyCase = (type: string) => {
    if (!text) return;
    let result = text;
    switch (type) {
      case 'upper':
        result = text.toUpperCase();
        break;
      case 'lower':
        result = text.toLowerCase();
        break;
      case 'title':
        result = text.replace(
          /\b\w+/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
        );
        break;
      case 'sentence':
        result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());
        break;
      case 'camel':
        result = text
          .toLowerCase()
          .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase())
          .replace(/^[A-Z]/, (c) => c.toLowerCase());
        break;
      case 'pascal':
        result = text
          .toLowerCase()
          .replace(/(?:^|[^a-zA-Z0-9]+)(.)/g, (_, chr) => chr.toUpperCase());
        break;
      case 'snake':
        result = text
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '_')
          .replace(/[^a-zA-Z0-9_]/g, '');
        break;
      case 'kebab':
        result = text
          .trim()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-zA-Z0-9-]/g, '');
        break;
      case 'constant':
        result = text
          .trim()
          .toUpperCase()
          .replace(/\s+/g, '_')
          .replace(/[^A-Z0-9_]/g, '');
        break;
      case 'alternating':
        result = text
          .split('')
          .map((c, i) => (i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()))
          .join('');
        break;
    }
    setText(result);
    onTaskCompleted?.();
  };

  const copyResult = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    fireCelebration();
    onTaskCompleted?.();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert into any casing style..."
          rows={6}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />

        {/* Buttons Grid */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-5">
          <button
            onClick={() => applyCase('upper')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            UPPERCASE
          </button>
          <button
            onClick={() => applyCase('lower')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            lowercase
          </button>
          <button
            onClick={() => applyCase('title')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Title Case
          </button>
          <button
            onClick={() => applyCase('sentence')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            Sentence case
          </button>
          <button
            onClick={() => applyCase('camel')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            camelCase
          </button>
          <button
            onClick={() => applyCase('pascal')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            PascalCase
          </button>
          <button
            onClick={() => applyCase('kebab')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            kebab-case
          </button>
          <button
            onClick={() => applyCase('snake')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            snake_case
          </button>
          <button
            onClick={() => applyCase('constant')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            CONSTANT_CASE
          </button>
          <button
            onClick={() => applyCase('alternating')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-bold text-slate-700 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            aLtErNaTiNg
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            onClick={() => setText('')}
            className="text-xs text-slate-400 hover:text-red-500"
          >
            Clear
          </button>
          <button
            onClick={copyResult}
            disabled={!text}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Converted Text'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 7. REMOVE DUPLICATE LINES
// -------------------------------------------------------------
export const RemoveDuplicateLinesTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimLines, setTrimLines] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [copied, setCopied] = useState(false);
  const [removedCount, setRemovedCount] = useState<number | null>(null);

  const handleDeduplicate = () => {
    let lines = text.split('\n');
    const initialCount = lines.length;

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }
    if (removeEmpty) {
      lines = lines.filter((l) => l.length > 0);
    }

    const seen = new Set<string>();
    const unique: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        unique.push(line);
      }
    }

    const removed = initialCount - unique.length;
    setRemovedCount(removed);
    setText(unique.join('\n'));
    fireCelebration();
    onTaskCompleted?.();
  };

  const copyResult = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste list here (one item per line)..."
          rows={8}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />

        {/* Options */}
        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Case Sensitive</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(e) => setTrimLines(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Trim Whitespace</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-slate-300">
            <input
              type="checkbox"
              checked={removeEmpty}
              onChange={(e) => setRemoveEmpty(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Remove Empty Lines</span>
          </label>
        </div>

        {removedCount !== null && (
          <div className="mt-3 rounded-lg bg-emerald-50 p-2.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400">
            Successfully removed {removedCount} duplicate / empty lines!
          </div>
        )}

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <button
            onClick={() => {
              setText('');
              setRemovedCount(null);
            }}
            className="text-xs text-slate-400 hover:text-red-500"
          >
            Clear
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleDeduplicate}
              disabled={!text}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition"
            >
              Remove Duplicates
            </button>
            <button
              onClick={copyResult}
              disabled={!text}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 8. TEXT SORTER
// -------------------------------------------------------------
export const TextSorterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSort = (type: string) => {
    if (!text) return;
    const lines = text.split('\n');
    let sorted = [...lines];

    switch (type) {
      case 'az':
        sorted.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
        break;
      case 'za':
        sorted.sort((a, b) => b.localeCompare(a, undefined, { sensitivity: 'base' }));
        break;
      case 'natural':
        sorted.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        break;
      case 'length':
        sorted.sort((a, b) => a.length - b.length);
        break;
      case 'reverse':
        sorted.reverse();
        break;
      case 'shuffle':
        sorted = sorted.sort(() => Math.random() - 0.5);
        break;
    }

    setText(sorted.join('\n'));
    onTaskCompleted?.();
  };

  const copyResult = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste lines of text to sort..."
          rows={8}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-6">
          <button
            onClick={() => handleSort('az')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800"
          >
            Sort A → Z
          </button>
          <button
            onClick={() => handleSort('za')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800"
          >
            Sort Z → A
          </button>
          <button
            onClick={() => handleSort('natural')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800"
          >
            Natural 1 → 10
          </button>
          <button
            onClick={() => handleSort('length')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800"
          >
            By Length
          </button>
          <button
            onClick={() => handleSort('reverse')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800"
          >
            Reverse
          </button>
          <button
            onClick={() => handleSort('shuffle')}
            className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-xs font-semibold hover:border-blue-500 hover:text-blue-600 dark:border-slate-700 dark:bg-slate-800"
          >
            Shuffle
          </button>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-red-500">
            Clear
          </button>
          <button
            onClick={copyResult}
            disabled={!text}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Sorted'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 9. FIND AND REPLACE
// -------------------------------------------------------------
export const FindAndReplaceTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [text, setText] = useState('');
  const [findStr, setFindStr] = useState('');
  const [replaceStr, setReplaceStr] = useState('');
  const [matchCase, setMatchCase] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [matchCount, setMatchCount] = useState(0);
  const [copied, setCopied] = useState(false);

  // Live match counter
  useMemo(() => {
    if (!text || !findStr) {
      setMatchCount(0);
      return;
    }
    try {
      if (useRegex) {
        const regex = new RegExp(findStr, matchCase ? 'g' : 'gi');
        const matches = text.match(regex);
        setMatchCount(matches ? matches.length : 0);
      } else {
        const flags = matchCase ? 'g' : 'gi';
        const escaped = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const matches = text.match(new RegExp(escaped, flags));
        setMatchCount(matches ? matches.length : 0);
      }
    } catch (e) {
      setMatchCount(0);
    }
  }, [text, findStr, matchCase, useRegex]);

  const handleReplaceAll = () => {
    if (!text || !findStr) return;
    try {
      let result = text;
      if (useRegex) {
        const regex = new RegExp(findStr, matchCase ? 'g' : 'gi');
        result = text.replace(regex, replaceStr);
      } else {
        const escaped = findStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, matchCase ? 'g' : 'gi');
        result = text.replace(regex, replaceStr);
      }
      setText(result);
      fireCelebration();
      onTaskCompleted?.();
    } catch (e) {
      // invalid regex
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or write text to search and replace inside..."
          rows={7}
          className="w-full resize-y rounded-xl border border-slate-200 bg-slate-50/50 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/50 dark:text-white"
        />

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Find String / Pattern
            </label>
            <input
              type="text"
              value={findStr}
              onChange={(e) => setFindStr(e.target.value)}
              placeholder="e.g. apple or \d+"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Replace With
            </label>
            <input
              type="text"
              value={replaceStr}
              onChange={(e) => setReplaceStr(e.target.value)}
              placeholder="e.g. orange"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={matchCase}
                onChange={(e) => setMatchCase(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Match Case</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                checked={useRegex}
                onChange={(e) => setUseRegex(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Use RegEx</span>
            </label>
          </div>

          <span className="font-semibold text-slate-500">
            {findStr ? `${matchCount} match${matchCount === 1 ? '' : 'es'} found` : ''}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
          <button onClick={() => setText('')} className="text-xs text-slate-400 hover:text-red-500">
            Clear
          </button>
          <div className="flex gap-2">
            <button
              onClick={handleReplaceAll}
              disabled={!text || !findStr}
              className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-40 transition"
            >
              Replace All ({matchCount})
            </button>
            <button
              onClick={copyResult}
              disabled={!text}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Result'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 10. TEXT REPEATER
// -------------------------------------------------------------
export const TextRepeaterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [sourceText, setSourceText] = useState('ToolNest');
  const [repeatCount, setRepeatCount] = useState(10);
  const [separator, setSeparator] = useState('\n');
  const [includeIndex, setIncludeIndex] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    if (!sourceText || repeatCount <= 0) return;
    const count = Math.min(repeatCount, 10000);
    const items: string[] = [];
    for (let i = 1; i <= count; i++) {
      items.push(includeIndex ? `${i}. ${sourceText}` : sourceText);
    }
    setResult(items.join(separator));
    fireCelebration();
    onTaskCompleted?.();
  };

  const copyResult = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="sm:col-span-2">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Text to Repeat
            </label>
            <input
              type="text"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="e.g. Hello World"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Repeat Count (1 - 10,000)
            </label>
            <input
              type="number"
              min={1}
              max={10000}
              value={repeatCount}
              onChange={(e) => setRepeatCount(Math.max(1, Number(e.target.value)))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
          <div>
            <span className="font-semibold text-slate-600 dark:text-slate-300 mr-2">Separator:</span>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="rounded-lg border border-slate-200 px-2 py-1 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="\n">New Line (\n)</option>
              <option value=" ">Space</option>
              <option value=", ">Comma & Space (, )</option>
              <option value=" | ">Pipe ( | )</option>
              <option value="">No separator</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={includeIndex}
              onChange={(e) => setIncludeIndex(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Include Row Number (1. 2. 3...)</span>
          </label>
        </div>

        <div className="mt-4">
          <button
            onClick={handleGenerate}
            className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Generate Repeated Text
          </button>
        </div>

        {result && (
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Output Result</span>
              <button
                onClick={copyResult}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={result}
              rows={6}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
