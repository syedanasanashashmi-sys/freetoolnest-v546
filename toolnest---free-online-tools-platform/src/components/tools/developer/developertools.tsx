import React, { useState } from 'react';
import { Code, Minimize, Cpu, Link as LinkIcon, Key, Copy, Check, Download, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { fireCelebration } from '../../../utils/confetti';
import { trackEvent } from '../../../utils/analytics';

interface ToolCommonProps {
  onTaskCompleted?: () => void;
}

// -------------------------------------------------------------
// 26. JSON FORMATTER
// -------------------------------------------------------------
export const JsonFormatterTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [inputJson, setInputJson] = useState('{"title":"ToolNest","features":["free","fast","privacy"],"rating":5}');
  const [formatted, setFormatted] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [indent, setIndent] = useState<number>(2);
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      setErrorMsg(null);
      const parsed = JSON.parse(inputJson);
      const res = JSON.stringify(parsed, null, indent);
      setFormatted(res);
      fireCelebration();
      onTaskCompleted?.();
    } catch (e: any) {
      setErrorMsg(e.message || 'Invalid JSON syntax');
    }
  };

  const handleSample = () => {
    setInputJson('{"name":"Productivity Suite","active":true,"version":"2.0.0","tools":["compressor","converter","calculator"],"settings":{"theme":"dark","offline":true}}');
    setErrorMsg(null);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formatted || inputJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    trackEvent('copy_clicked', { tool: 'json-formatter' });
  };

  const handleDownload = () => {
    const blob = new Blob([formatted || inputJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'formatted-data.json';
    a.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Indentation:</span>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs dark:border-slate-700 dark:bg-slate-800"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value={8}>8 Spaces</option>
          </select>
          <button onClick={handleSample} className="text-xs font-semibold text-blue-600 hover:underline">
            Load Sample
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFormat}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Beautify & Validate
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Input */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Raw JSON Input</span>
            <button onClick={() => setInputJson('')} className="text-xs text-slate-400 hover:text-red-500">
              Clear
            </button>
          </div>
          <textarea
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)}
            placeholder="Paste unformatted or compacted JSON payload..."
            rows={12}
            className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Formatted JSON</span>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                disabled={!formatted}
                className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline disabled:opacity-40"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
              <button
                onClick={handleDownload}
                disabled={!formatted}
                className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:underline disabled:opacity-40 dark:text-slate-300"
              >
                <Download className="h-3 w-3" />
                <span>Save</span>
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={formatted || (errorMsg ? '' : '// Click "Beautify & Validate" to format')}
            rows={12}
            className={`w-full font-mono text-xs rounded-xl border p-3 ${
              errorMsg
                ? 'border-red-300 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300'
                : 'border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white'
            }`}
          />
          {errorMsg && (
            <div className="mt-2 flex items-center gap-1.5 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 27. JSON MINIFIER
// -------------------------------------------------------------
export const JsonMinifierTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [input, setInput] = useState('{\n  "status": 200,\n  "message": "Success",\n  "data": [\n    1,\n    2,\n    3\n  ]\n}');
  const [minified, setMinified] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [savedBytes, setSavedBytes] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const handleMinify = () => {
    try {
      setError(null);
      const parsed = JSON.parse(input);
      const res = JSON.stringify(parsed);
      setMinified(res);
      setSavedBytes(input.length - res.length);
      fireCelebration();
      onTaskCompleted?.();
    } catch (e: any) {
      setError(e.message || 'Invalid JSON syntax');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste JSON to remove all whitespace and newlines..."
          rows={7}
          className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <div className="mt-4 flex items-center justify-between">
          <button onClick={() => setInput('')} className="text-xs text-slate-400 hover:text-red-500">
            Clear
          </button>
          <button
            onClick={handleMinify}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Minify JSON
          </button>
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-500 flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5" />
            <span>{error}</span>
          </p>
        )}

        {minified && (
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">
                Minified Output ({savedBytes} bytes saved)
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={minified}
              rows={3}
              className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 28. BASE64 ENCODER / DECODER
// -------------------------------------------------------------
export const Base64Tool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('Hello, ToolNest! 🚀');
  const [output, setOutput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);
  const [copied, setCopied] = useState(false);

  const utf8ToBase64 = (str: string) => {
    const bytes = new TextEncoder().encode(str);
    const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
    let b64 = btoa(binString);
    if (urlSafe) {
      b64 = b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return b64;
  };

  const base64ToUtf8 = (str: string) => {
    let clean = str.trim();
    if (urlSafe) {
      clean = clean.replace(/-/g, '+').replace(/_/g, '/');
      while (clean.length % 4) clean += '=';
    }
    const binString = atob(clean);
    const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        setOutput(utf8ToBase64(input));
      } else {
        setOutput(base64ToUtf8(input));
      }
      fireCelebration();
      onTaskCompleted?.();
    } catch (e) {
      setOutput('Error: Invalid Base64 input string');
    }
  };

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => {
            setMode('encode');
            setOutput('');
          }}
          className={`rounded-xl px-4 py-2 text-xs font-bold ${
            mode === 'encode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          Encode Text → Base64
        </button>
        <button
          onClick={() => {
            setMode('decode');
            setOutput('');
          }}
          className={`rounded-xl px-4 py-2 text-xs font-bold ${
            mode === 'decode' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          Decode Base64 → Text
        </button>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1 block">
            {mode === 'encode' ? 'Plain Text Input' : 'Base64 Encoded Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={5}
            className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={urlSafe}
              onChange={(e) => setUrlSafe(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>URL-Safe Base64 (replace + and / with - and _)</span>
          </label>
          <button
            onClick={handleConvert}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
        </div>

        {output && (
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase text-slate-500">Output Result</span>
              <button
                onClick={copyResult}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              rows={5}
              className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 29. URL ENCODER / DECODER
// -------------------------------------------------------------
export const UrlTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [input, setInput] = useState('https://toolnest.app/search?query=fast tools&category=dev&sort=rating#top');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
      fireCelebration();
      onTaskCompleted?.();
    } catch (e) {}
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      fireCelebration();
      onTaskCompleted?.();
    } catch (e) {}
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <label className="text-xs font-bold uppercase text-slate-500 mb-1 block">Input URL or String</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
          className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
        />

        <div className="mt-4 flex gap-2">
          <button
            onClick={handleEncode}
            className="rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700"
          >
            Encode URL Component
          </button>
          <button
            onClick={handleDecode}
            className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
          >
            Decode URL
          </button>
        </div>

        {output && (
          <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase text-slate-500">Output Result</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(output);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={output}
              rows={4}
              className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 30. UUID GENERATOR
// -------------------------------------------------------------
export const UuidGeneratorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [count, setCount] = useState<number>(5);
  const [uppercase, setUppercase] = useState(false);
  const [noHyphens, setNoHyphens] = useState(false);
  const [braces, setBraces] = useState(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateUuids = () => {
    const list: string[] = [];
    const qty = Math.min(Math.max(1, count), 100);
    for (let i = 0; i < qty; i++) {
      let id: string = crypto.randomUUID();
      if (noHyphens) id = id.replace(/-/g, '');
      if (uppercase) id = id.toUpperCase();
      if (braces) id = `{${id}}`;
      list.push(id);
    }
    setUuids(list);
    fireCelebration();
    onTaskCompleted?.();
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity (1 - 100)</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              className="mt-1 w-24 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4">
            <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>UPPERCASE</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={noHyphens}
                onChange={(e) => setNoHyphens(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Remove Hyphens</span>
            </label>
            <label className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Wrap in Braces {}</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={generateUuids}
            className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Generate UUID v4
          </button>
        </div>

        {uuids.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-500">Generated UUIDs ({uuids.length})</span>
              <button
                onClick={copyAll}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'All Copied' : 'Copy All'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={uuids.join('\n')}
              rows={Math.min(10, uuids.length + 1)}
              className="w-full font-mono text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        )}
      </div>
    </div>
  );
};
