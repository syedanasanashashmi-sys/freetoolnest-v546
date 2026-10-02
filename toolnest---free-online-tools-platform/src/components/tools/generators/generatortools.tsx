import React, { useState, useEffect, useRef, useMemo } from 'react';
import QRCode from 'qrcode';
import {
  QrCode, ShieldCheck, FileText, Dices, Palette, Copy, Check, Download,
  RefreshCw, Lock, Unlock, Wifi, Globe, Mail, Phone, Sparkles
} from 'lucide-react';
import { fireCelebration } from '../../../utils/confetti';
import { trackEvent } from '../../../utils/analytics';

interface ToolCommonProps {
  onTaskCompleted?: () => void;
}

// -------------------------------------------------------------
// 31. QR CODE GENERATOR
// -------------------------------------------------------------
export const QrCodeGeneratorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [type, setType] = useState<'url' | 'wifi' | 'text' | 'email' | 'phone'>('url');
  const [urlVal, setUrlVal] = useState('https://toolnest.app');
  const [textVal, setTextVal] = useState('Welcome to ToolNest!');
  const [wifiSsid, setWifiSsid] = useState('HomeNetwork');
  const [wifiPass, setWifiPass] = useState('SecurePass2026');
  const [wifiAuth, setWifiAuth] = useState('WPA');
  const [emailVal, setEmailVal] = useState('hello@example.com');
  const [phoneVal, setPhoneVal] = useState('+1234567890');

  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [correctionLevel, setCorrectionLevel] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [copied, setCopied] = useState(false);

  // Compute payload
  const payload = (() => {
    switch (type) {
      case 'url':
        return urlVal.startsWith('http') ? urlVal : `https://${urlVal}`;
      case 'wifi':
        return `WIFI:S:${wifiSsid};T:${wifiAuth};P:${wifiPass};;`;
      case 'email':
        return `mailto:${emailVal}`;
      case 'phone':
        return `tel:${phoneVal}`;
      default:
        return textVal;
    }
  })();

  useEffect(() => {
    if (!payload) return;
    QRCode.toDataURL(
      payload,
      {
        width: 400,
        margin: 2,
        color: {
          dark: fgColor,
          light: bgColor,
        },
        errorCorrectionLevel: correctionLevel,
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
          onTaskCompleted?.();
        }
      }
    );
  }, [payload, fgColor, bgColor, correctionLevel]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `qrcode-${type}.png`;
    a.click();
    fireCelebration();
    trackEvent('download_clicked', { tool: 'qr-code-generator' });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Type Tabs */}
          <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3 dark:border-slate-800">
            <button
              onClick={() => setType('url')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                type === 'url' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Globe className="h-3.5 w-3.5" />
              <span>Website</span>
            </button>
            <button
              onClick={() => setType('wifi')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                type === 'wifi' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Wifi className="h-3.5 w-3.5" />
              <span>Wi-Fi</span>
            </button>
            <button
              onClick={() => setType('text')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                type === 'text' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Text</span>
            </button>
            <button
              onClick={() => setType('email')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                type === 'email' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email</span>
            </button>
            <button
              onClick={() => setType('phone')}
              className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold ${
                type === 'phone' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
              }`}
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Phone</span>
            </button>
          </div>

          {/* Conditional inputs */}
          {type === 'url' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Website URL</label>
              <input
                type="url"
                value={urlVal}
                onChange={(e) => setUrlVal(e.target.value)}
                placeholder="https://example.com"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          )}

          {type === 'wifi' && (
            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Network Name (SSID)</label>
                <input
                  type="text"
                  value={wifiSsid}
                  onChange={(e) => setWifiSsid(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="text"
                  value={wifiPass}
                  onChange={(e) => setWifiPass(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
          )}

          {type === 'text' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Plain Text</label>
              <textarea
                value={textVal}
                onChange={(e) => setTextVal(e.target.value)}
                rows={3}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          )}

          {type === 'email' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Email Address</label>
              <input
                type="email"
                value={emailVal}
                onChange={(e) => setEmailVal(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          )}

          {type === 'phone' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Phone Number</label>
              <input
                type="tel"
                value={phoneVal}
                onChange={(e) => setPhoneVal(e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </div>
          )}

          {/* Color & Error correction */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Foreground Color</label>
              <div className="mt-1 flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border p-0.5"
                />
                <span className="text-xs font-mono">{fgColor}</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Error Correction</label>
              <select
                value={correctionLevel}
                onChange={(e) => setCorrectionLevel(e.target.value as any)}
                className="mt-1 w-full rounded-xl border border-slate-200 px-2 py-1.5 text-xs dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="L">L (7% recovery)</option>
                <option value="M">M (15% recovery)</option>
                <option value="Q">Q (25% recovery)</option>
                <option value="H">H (30% recovery)</option>
              </select>
            </div>
          </div>
        </div>

        {/* QR Preview Card */}
        <div className="flex flex-col items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col items-center">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">
              Real-Time Scannable Preview
            </span>
            <div className="flex h-56 w-56 items-center justify-center rounded-2xl border border-slate-100 p-2 shadow-sm dark:border-slate-800">
              {qrDataUrl && <img src={qrDataUrl} alt="QR Code" className="h-full w-full object-contain" />}
            </div>
            <p className="mt-3 text-[11px] text-slate-400 text-center max-w-xs">
              Direct permanent QR code. No middleman redirect link.
            </p>
          </div>

          <div className="mt-6 flex w-full gap-2">
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download PNG</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 32. PASSWORD GENERATOR
// -------------------------------------------------------------
export const PasswordGeneratorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [length, setLength] = useState(18);
  const [incUpper, setIncUpper] = useState(true);
  const [incLower, setIncLower] = useState(true);
  const [incNumbers, setIncNumbers] = useState(true);
  const [incSymbols, setIncSymbols] = useState(true);
  const [noAmbiguous, setNoAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let chars = '';
    if (incUpper) chars += noAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (incLower) chars += noAmbiguous ? 'abcdefghijkmnopqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
    if (incNumbers) chars += noAmbiguous ? '23456789' : '0123456789';
    if (incSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz';

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
    setPassword(result);
    onTaskCompleted?.();
  };

  useEffect(() => {
    generatePassword();
  }, [length, incUpper, incLower, incNumbers, incSymbols, noAmbiguous]);

  const entropy = Math.round(length * Math.log2(
    (incUpper ? 26 : 0) + (incLower ? 26 : 0) + (incNumbers ? 10 : 0) + (incSymbols ? 30 : 0) || 1
  ));

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    fireCelebration();
    trackEvent('copy_clicked', { tool: 'password-generator' });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {/* Output Banner */}
        <div className="relative flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800">
          <span className="flex-1 font-mono text-lg font-bold text-slate-900 break-all select-all dark:text-white">
            {password}
          </span>
          <div className="flex items-center gap-2 pl-2">
            <button
              onClick={generatePassword}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700"
              title="Regenerate"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={copyPassword}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength Meter */}
        <div className="mt-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500">Security Entropy:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{entropy} bits</span>
          </div>
          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
            {entropy > 80 ? 'Very Strong (Centuries to crack)' : entropy > 50 ? 'Strong' : 'Moderate'}
          </span>
        </div>

        {/* Controls */}
        <div className="mt-6 space-y-4 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Password Length</span>
              <span>{length} characters</span>
            </div>
            <input
              type="range"
              min={6}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="mt-2 w-full accent-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 text-xs">
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={incUpper}
                onChange={(e) => setIncUpper(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={incLower}
                onChange={(e) => setIncLower(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={incNumbers}
                onChange={(e) => setIncNumbers(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={incSymbols}
                onChange={(e) => setIncSymbols(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Symbols (!@#$)</span>
            </label>
            <label className="col-span-2 sm:col-span-1 flex items-center gap-2 cursor-pointer font-medium">
              <input
                type="checkbox"
                checked={noAmbiguous}
                onChange={(e) => setNoAmbiguous(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Avoid ambiguous (1, l, O, 0)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 33. LOREM IPSUM GENERATOR
// -------------------------------------------------------------
export const LoremIpsumTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [count, setCount] = useState(3);
  const [unit, setUnit] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [startWithClassic, setStartWithClassic] = useState(true);
  const [asHtml, setAsHtml] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const LOREM_WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse',
    'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat',
    'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt',
    'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateLorem = () => {
    let result = '';
    const classicPrefix = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';

    if (unit === 'words') {
      const words: string[] = [];
      for (let i = 0; i < count; i++) {
        words.push(LOREM_WORDS[i % LOREM_WORDS.length]);
      }
      result = words.join(' ');
      result = result.charAt(0).toUpperCase() + result.slice(1) + '.';
    } else if (unit === 'sentences') {
      const sentences: string[] = [];
      for (let s = 0; s < count; s++) {
        const len = 8 + (s % 8);
        const words: string[] = [];
        for (let w = 0; w < len; w++) {
          words.push(LOREM_WORDS[(s * 5 + w) % LOREM_WORDS.length]);
        }
        let sent = words.join(' ');
        sent = sent.charAt(0).toUpperCase() + sent.slice(1) + '.';
        sentences.push(sent);
      }
      result = sentences.join(' ');
      if (startWithClassic && !result.startsWith('Lorem ipsum')) {
        result = classicPrefix + result;
      }
    } else {
      const pars: string[] = [];
      for (let p = 0; p < count; p++) {
        const sentences: string[] = [];
        for (let s = 0; s < 4; s++) {
          const len = 9 + ((p + s) % 6);
          const words: string[] = [];
          for (let w = 0; w < len; w++) {
            words.push(LOREM_WORDS[(p * 7 + s * 4 + w) % LOREM_WORDS.length]);
          }
          let sent = words.join(' ');
          sent = sent.charAt(0).toUpperCase() + sent.slice(1) + '.';
          sentences.push(sent);
        }
        let pText = sentences.join(' ');
        if (p === 0 && startWithClassic && !pText.startsWith('Lorem ipsum')) {
          pText = classicPrefix + pText;
        }
        pars.push(asHtml ? `<p>${pText}</p>` : pText);
      }
      result = pars.join(asHtml ? '\n\n' : '\n\n');
    }

    setOutput(result);
    onTaskCompleted?.();
  };

  useEffect(() => {
    generateLorem();
  }, [count, unit, startWithClassic, asHtml]);

  const copyResult = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    fireCelebration();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Quantity</label>
            <input
              type="number"
              min={1}
              max={100}
              value={count}
              onChange={(e) => setCount(Math.max(1, Number(e.target.value)))}
              className="mt-1 w-24 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Type</label>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as any)}
              className="mt-1 rounded-xl border border-slate-200 px-3 py-1.5 text-sm dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 text-xs font-semibold">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithClassic}
                onChange={(e) => setStartWithClassic(e.target.checked)}
                className="rounded accent-blue-600"
              />
              <span>Start with "Lorem ipsum..."</span>
            </label>
            {unit === 'paragraphs' && (
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={asHtml}
                  onChange={(e) => setAsHtml(e.target.checked)}
                  className="rounded accent-blue-600"
                />
                <span>Include &lt;p&gt; tags</span>
              </label>
            )}
          </div>
        </div>

        <div className="mt-5 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase text-slate-500">Output Placeholder Text</span>
            <button
              onClick={copyResult}
              className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={8}
            className="w-full text-xs rounded-xl border border-slate-200 bg-slate-50 p-3 leading-relaxed text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          />
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 34. RANDOM NUMBER GENERATOR
// -------------------------------------------------------------
export const RandomNumberTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [quantity, setQuantity] = useState(5);
  const [uniqueOnly, setUniqueOnly] = useState(true);
  const [sortResult, setSortResult] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [copied, setCopied] = useState(false);

  const generateNumbers = () => {
    if (min >= max) return;
    const count = Math.min(Math.max(1, quantity), 500);
    const rangeSize = max - min + 1;
    const finalQty = uniqueOnly ? Math.min(count, rangeSize) : count;

    const list: number[] = [];
    const used = new Set<number>();

    while (list.length < finalQty) {
      const randArr = new Uint32Array(1);
      crypto.getRandomValues(randArr);
      const val = min + (randArr[0] % rangeSize);
      if (uniqueOnly) {
        if (!used.has(val)) {
          used.add(val);
          list.push(val);
        }
      } else {
        list.push(val);
      }
    }

    if (sortResult) {
      list.sort((a, b) => a - b);
    }

    setNumbers(list);
    fireCelebration();
    onTaskCompleted?.();
  };

  useEffect(() => {
    generateNumbers();
  }, []);

  const stats = useMemo(() => {
    if (numbers.length === 0) return null;
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = (sum / numbers.length).toFixed(1);
    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    return { sum, avg, minVal, maxVal };
  }, [numbers]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Minimum</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Maximum</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">How Many Numbers?</label>
            <input
              type="number"
              min={1}
              max={500}
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="font-semibold text-slate-500 self-center">Presets:</span>
          <button
            onClick={() => {
              setMin(1);
              setMax(6);
              setQuantity(1);
              setUniqueOnly(false);
            }}
            className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Dice Roll (1-6)
          </button>
          <button
            onClick={() => {
              setMin(1);
              setMax(2);
              setQuantity(1);
              setUniqueOnly(false);
            }}
            className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Coin Flip (1-2)
          </button>
          <button
            onClick={() => {
              setMin(1);
              setMax(49);
              setQuantity(6);
              setUniqueOnly(true);
            }}
            className="rounded-lg bg-slate-100 px-2.5 py-1 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
          >
            Lottery 6/49
          </button>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={uniqueOnly}
              onChange={(e) => setUniqueOnly(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Unique Numbers Only (No Duplicates)</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={sortResult}
              onChange={(e) => setSortResult(e.target.checked)}
              className="rounded accent-blue-600"
            />
            <span>Sort Ascending</span>
          </label>
        </div>

        <div className="mt-5">
          <button
            onClick={generateNumbers}
            className="w-full rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-700 transition"
          >
            Generate Random Numbers
          </button>
        </div>

        {/* Results grid */}
        {numbers.length > 0 && (
          <div className="mt-6 border-t border-slate-100 pt-5 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase text-slate-500">
                Generated Output ({numbers.length})
              </span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(numbers.join(', '));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copied ? 'Copied' : 'Copy Numbers'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {numbers.map((n, i) => (
                <div
                  key={i}
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-base font-extrabold text-blue-700 shadow-2xs dark:bg-blue-950 dark:text-blue-300"
                >
                  {n}
                </div>
              ))}
            </div>

            {stats && (
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                <span>Sum: <strong>{stats.sum}</strong></span>
                <span>Average: <strong>{stats.avg}</strong></span>
                <span>Min: <strong>{stats.minVal}</strong></span>
                <span>Max: <strong>{stats.maxVal}</strong></span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 35. COLOR PALETTE GENERATOR
// -------------------------------------------------------------
export const ColorPaletteTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  interface ColorItem {
    hex: string;
    locked: boolean;
  }

  const [colors, setColors] = useState<ColorItem[]>([
    { hex: '#2563EB', locked: false },
    { hex: '#38BDF8', locked: false },
    { hex: '#0F172A', locked: false },
    { hex: '#F8FAFC', locked: false },
    { hex: '#10B981', locked: false },
  ]);

  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const generateRandomHex = () => {
    return (
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase()
    );
  };

  const randomizePalette = () => {
    setColors((prev) =>
      prev.map((c) => (c.locked ? c : { ...c, hex: generateRandomHex() }))
    );
    fireCelebration();
    onTaskCompleted?.();
  };

  const toggleLock = (idx: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, locked: !c.locked } : c))
    );
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const copyCssVars = () => {
    const css = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    setCopiedHex('css');
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={randomizePalette}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Generate New Palette (Spacebar)</span>
        </button>

        <button
          onClick={copyCssVars}
          className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300"
        >
          {copiedHex === 'css' ? 'Copied CSS!' : 'Export CSS Variables'}
        </button>
      </div>

      {/* Palette Strip */}
      <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-200 shadow-sm sm:grid-cols-5 dark:border-slate-800">
        {colors.map((c, idx) => (
          <div
            key={idx}
            className="group relative flex h-48 sm:h-72 flex-col justify-between p-4 transition-all"
            style={{ backgroundColor: c.hex }}
          >
            {/* Top Lock Button */}
            <div className="flex justify-end">
              <button
                onClick={() => toggleLock(idx)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/20 text-white backdrop-blur-xs hover:bg-black/40 transition"
                title={c.locked ? 'Unlock Color' : 'Lock Color'}
              >
                {c.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              </button>
            </div>

            {/* Bottom Hex Bar */}
            <div className="rounded-xl bg-black/40 p-2.5 text-center backdrop-blur-md">
              <span className="block font-mono text-sm font-bold text-white tracking-wider">
                {c.hex}
              </span>
              <button
                onClick={() => copyHex(c.hex)}
                className="mt-1 flex items-center justify-center gap-1 w-full text-[11px] font-semibold text-white/90 hover:text-white"
              >
                {copiedHex === c.hex ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedHex === c.hex ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
