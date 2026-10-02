import React, { useState, useRef, useEffect } from 'react';
import {
  Upload, Download, RefreshCw, Copy, Check, Sliders, Image as ImageIcon,
  Lock, Unlock, Sparkles, CheckCircle2, AlertCircle
} from 'lucide-react';
import { trackEvent } from '../../../utils/analytics';
import { fireCelebration } from '../../../utils/confetti';

interface ToolCommonProps {
  onTaskCompleted?: () => void;
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// -------------------------------------------------------------
// 11. IMAGE COMPRESSOR
// -------------------------------------------------------------
export const ImageCompressorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null);
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState<number>(80);
  const [format, setFormat] = useState<'image/jpeg' | 'image/webp'>('image/jpeg');
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [isProcessing, setIsProcessing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;
    setOriginalSize(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        setDimensions({ width: img.width, height: img.height });
        compressImage(img, quality, format);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
    trackEvent('tool_opened', { tool: 'image-compressor' });
  };

  const compressImage = (img: HTMLImageElement, q: number, fmt: string) => {
    setIsProcessing(true);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (fmt === 'image/jpeg') {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(img, 0, 0);

    canvas.toBlob(
      (blob) => {
        setIsProcessing(false);
        if (blob) {
          setCompressedBlob(blob);
          if (compressedUrl) URL.revokeObjectURL(compressedUrl);
          const url = URL.createObjectURL(blob);
          setCompressedUrl(url);
          fireCelebration();
          onTaskCompleted?.();
        }
      },
      fmt,
      q / 100
    );
  };

  const handleQualityChange = (newQ: number) => {
    setQuality(newQ);
    if (imageSrc) {
      const img = new Image();
      img.onload = () => compressImage(img, newQ, format);
      img.src = imageSrc;
    }
  };

  const handleDownload = () => {
    if (!compressedUrl) return;
    const a = document.createElement('a');
    a.href = compressedUrl;
    const ext = format === 'image/webp' ? 'webp' : 'jpg';
    a.download = `compressed-image-${quality}pct.${ext}`;
    a.click();
    trackEvent('download_clicked', { tool: 'image-compressor' });
  };

  const percentSaved =
    originalSize > 0 && compressedBlob
      ? Math.max(0, Math.round(((originalSize - compressedBlob.size) / originalSize) * 100))
      : 0;

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files?.[0]) handleFileUpload(e.dataTransfer.files[0]);
          }}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400/60 bg-blue-50/40 p-10 text-center cursor-pointer transition hover:bg-blue-50/80 dark:border-blue-700/50 dark:bg-slate-900/60"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md">
            <Upload className="h-6 w-6" />
          </div>
          <h3 className="mt-4 text-base font-bold text-slate-900 dark:text-white">
            Choose an image or drag & drop here
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            JPG, PNG, WebP supported. Up to 50 MB. 100% processed in your browser.
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-center">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Compression Quality: {quality}%
                </label>
                <input
                  type="range"
                  min={10}
                  max={95}
                  value={quality}
                  onChange={(e) => handleQualityChange(Number(e.target.value))}
                  className="mt-2 w-full accent-blue-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Target Format
                </label>
                <select
                  value={format}
                  onChange={(e) => {
                    const newFmt = e.target.value as 'image/jpeg' | 'image/webp';
                    setFormat(newFmt);
                    if (imageSrc) {
                      const img = new Image();
                      img.onload = () => compressImage(img, quality, newFmt);
                      img.src = imageSrc;
                    }
                  }}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs font-medium dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="image/jpeg">JPEG (.jpg)</option>
                  <option value="image/webp">Next-Gen WebP (.webp)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 sm:pt-0">
                <button
                  onClick={() => {
                    setImageSrc(null);
                    setCompressedBlob(null);
                  }}
                  className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  <span>New Image</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!compressedBlob || isProcessing}
                  className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-40 transition"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Side by side comparison */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Original Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">Original Image</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">
                  {formatBytes(originalSize)} · {dimensions.width}×{dimensions.height}px
                </span>
              </div>
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <img src={imageSrc} alt="Original" className="max-h-full max-w-full object-contain" />
              </div>
            </div>

            {/* Compressed Card */}
            <div className="rounded-2xl border border-blue-200 bg-white p-4 dark:border-blue-900/50 dark:bg-slate-900">
              <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                <span className="text-blue-600 dark:text-blue-400">Compressed Output</span>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
                    -{percentSaved}% Smaller
                  </span>
                  <span className="font-mono text-slate-900 dark:text-white">
                    {compressedBlob ? formatBytes(compressedBlob.size) : '...'}
                  </span>
                </div>
              </div>
              <div className="flex h-64 items-center justify-center overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                {compressedUrl ? (
                  <img src={compressedUrl} alt="Compressed" className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-xs text-slate-400">Compressing...</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 12. IMAGE RESIZER
// -------------------------------------------------------------
export const ImageResizerTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [origWidth, setOrigWidth] = useState(0);
  const [origHeight, setOrigHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const [targetHeight, setTargetHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(1);
  const [resizedUrl, setResizedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        setOrigWidth(img.width);
        setOrigHeight(img.height);
        setTargetWidth(img.width);
        setTargetHeight(img.height);
        setAspectRatio(img.width / img.height);
        renderResize(img, img.width, img.height);
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  const renderResize = (img: HTMLImageElement, w: number, h: number) => {
    if (w <= 0 || h <= 0) return;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, w, h);
    canvas.toBlob((blob) => {
      if (blob) {
        if (resizedUrl) URL.revokeObjectURL(resizedUrl);
        setResizedUrl(URL.createObjectURL(blob));
        onTaskCompleted?.();
      }
    }, 'image/png');
  };

  const handleWidthChange = (val: number) => {
    setTargetWidth(val);
    const newH = lockAspect ? Math.round(val / aspectRatio) : targetHeight;
    if (lockAspect) setTargetHeight(newH);
    if (imageSrc) {
      const img = new Image();
      img.onload = () => renderResize(img, val, newH);
      img.src = imageSrc;
    }
  };

  const handleHeightChange = (val: number) => {
    setTargetHeight(val);
    const newW = lockAspect ? Math.round(val * aspectRatio) : targetWidth;
    if (lockAspect) setTargetWidth(newW);
    if (imageSrc) {
      const img = new Image();
      img.onload = () => renderResize(img, newW, val);
      img.src = imageSrc;
    }
  };

  const applyPreset = (w: number, h: number) => {
    setTargetWidth(w);
    setTargetHeight(h);
    if (imageSrc) {
      const img = new Image();
      img.onload = () => renderResize(img, w, h);
      img.src = imageSrc;
    }
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-10 text-center cursor-pointer hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
        >
          <Upload className="h-8 w-8 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Choose an image to resize</h4>
          <p className="text-xs text-slate-400 mt-1">Scale by pixels, percentage, or standard presets</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 items-end">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Target Width (px)
                </label>
                <input
                  type="number"
                  value={targetWidth}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Target Height (px)
                </label>
                <input
                  type="number"
                  value={targetHeight}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLockAspect(!lockAspect)}
                  className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold ${
                    lockAspect
                      ? 'border-blue-500 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      : 'border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300'
                  }`}
                >
                  {lockAspect ? <Lock className="h-3.5 w-3.5" /> : <Unlock className="h-3.5 w-3.5" />}
                  <span>{lockAspect ? 'Ratio Locked' : 'Freeform'}</span>
                </button>
                <button
                  onClick={() => setImageSrc(null)}
                  className="rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-400 hover:text-slate-700 dark:border-slate-700"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-500 mr-2 self-center">Presets:</span>
              <button
                onClick={() => applyPreset(1920, 1080)}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300"
              >
                1080p FHD (1920×1080)
              </button>
              <button
                onClick={() => applyPreset(1280, 720)}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300"
              >
                720p HD (1280×720)
              </button>
              <button
                onClick={() => applyPreset(500, 500)}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300"
              >
                Square Avatar (500×500)
              </button>
              <button
                onClick={() => applyPreset(Math.round(origWidth * 0.5), Math.round(origHeight * 0.5))}
                className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs text-slate-700 hover:bg-blue-50 hover:text-blue-600 dark:bg-slate-800 dark:text-slate-300"
              >
                50% Scale
              </button>
            </div>
          </div>

          {/* Preview & Download */}
          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
              {resizedUrl && <img src={resizedUrl} alt="Resized" className="max-h-72 object-contain" />}
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <span className="text-xs text-slate-500">
                Original: {origWidth}×{origHeight}px → Resized: {targetWidth}×{targetHeight}px
              </span>
              <a
                href={resizedUrl || '#'}
                download={`resized-${targetWidth}x${targetHeight}.png`}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Resized Image</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 13. IMAGE CROPPER
// -------------------------------------------------------------
export const ImageCropperTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cropRatio, setCropRatio] = useState<'1:1' | '16:9' | '4:3' | 'free'>('1:1');
  const [croppedUrl, setCroppedUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      performCrop(src, cropRatio);
    };
    reader.readAsDataURL(file);
  };

  const performCrop = (src: string, ratio: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let cropW = img.width;
      let cropH = img.height;
      let startX = 0;
      let startY = 0;

      if (ratio === '1:1') {
        const side = Math.min(img.width, img.height);
        cropW = side;
        cropH = side;
        startX = (img.width - side) / 2;
        startY = (img.height - side) / 2;
      } else if (ratio === '16:9') {
        cropW = img.width;
        cropH = Math.round((img.width * 9) / 16);
        if (cropH > img.height) {
          cropH = img.height;
          cropW = Math.round((img.height * 16) / 9);
        }
        startX = (img.width - cropW) / 2;
        startY = (img.height - cropH) / 2;
      } else if (ratio === '4:3') {
        cropW = img.width;
        cropH = Math.round((img.width * 3) / 4);
        if (cropH > img.height) {
          cropH = img.height;
          cropW = Math.round((img.height * 4) / 3);
        }
        startX = (img.width - cropW) / 2;
        startY = (img.height - cropH) / 2;
      }

      canvas.width = cropW;
      canvas.height = cropH;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.drawImage(img, startX, startY, cropW, cropH, 0, 0, cropW, cropH);

      canvas.toBlob((blob) => {
        if (blob) {
          if (croppedUrl) URL.revokeObjectURL(croppedUrl);
          setCroppedUrl(URL.createObjectURL(blob));
          onTaskCompleted?.();
        }
      }, 'image/png');
    };
    img.src = src;
  };

  const handleRatioChange = (r: '1:1' | '16:9' | '4:3' | 'free') => {
    setCropRatio(r);
    if (imageSrc) performCrop(imageSrc, r);
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-10 text-center cursor-pointer hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
        >
          <Upload className="h-8 w-8 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upload image to crop</h4>
          <p className="text-xs text-slate-400 mt-1">Crop to Square 1:1, Widescreen 16:9, or Classic 4:3</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Aspect Ratio:</span>
              <button
                onClick={() => handleRatioChange('1:1')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  cropRatio === '1:1' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                1:1 Square (Avatar)
              </button>
              <button
                onClick={() => handleRatioChange('16:9')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  cropRatio === '16:9' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                16:9 Widescreen
              </button>
              <button
                onClick={() => handleRatioChange('4:3')}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${
                  cropRatio === '4:3' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                4:3 Standard
              </button>
            </div>

            <button
              onClick={() => setImageSrc(null)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              Choose Another
            </button>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex max-h-80 items-center justify-center overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800">
              {croppedUrl && <img src={croppedUrl} alt="Cropped" className="max-h-72 object-contain" />}
            </div>
            <div className="mt-4 flex w-full justify-end">
              <a
                href={croppedUrl || '#'}
                download="cropped-image.png"
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700 transition"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Cropped Photo</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 14. JPG TO WEBP CONVERTER
// -------------------------------------------------------------
export const JpgToWebpTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [originalBytes, setOriginalBytes] = useState(0);
  const [webpBytes, setWebpBytes] = useState(0);
  const [quality, setQuality] = useState(85);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleConvert = (file: File) => {
    if (!file) return;
    setOriginalBytes(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setWebpBytes(blob.size);
              setWebpUrl(URL.createObjectURL(blob));
              fireCelebration();
              onTaskCompleted?.();
            }
          },
          'image/webp',
          quality / 100
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div
        onClick={() => fileRef.current?.click()}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/50 p-8 text-center cursor-pointer hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-900"
      >
        <Upload className="h-8 w-8 text-blue-600 mb-2" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upload JPG/JPEG to Convert to WebP</h4>
        <p className="text-xs text-slate-500 mt-1">Converts locally in your browser. 25-40% smaller file size.</p>
        <input
          ref={fileRef}
          type="file"
          accept=".jpg,.jpeg,image/jpeg"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleConvert(e.target.files[0])}
        />
      </div>

      {webpUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-slate-500">Original JPG: {formatBytes(originalBytes)}</span>
              <span className="mx-2 text-slate-300">→</span>
              <span className="text-xs font-bold text-emerald-600">New WebP: {formatBytes(webpBytes)}</span>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
              Saved {Math.round(((originalBytes - webpBytes) / originalBytes) * 100)}%
            </span>
          </div>

          <div className="mt-4 flex max-h-64 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
            <img src={webpUrl} alt="WebP Result" className="max-h-56 object-contain" />
          </div>

          <div className="mt-4 flex justify-end">
            <a
              href={webpUrl}
              download="converted-image.webp"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download .WebP Image</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 15. PNG TO WEBP CONVERTER
// -------------------------------------------------------------
export const PngToWebpTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [webpUrl, setWebpUrl] = useState<string | null>(null);
  const [originalBytes, setOriginalBytes] = useState(0);
  const [webpBytes, setWebpBytes] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleConvert = (file: File) => {
    if (!file) return;
    setOriginalBytes(file.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        // Preserves transparency
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setWebpBytes(blob.size);
              setWebpUrl(URL.createObjectURL(blob));
              fireCelebration();
              onTaskCompleted?.();
            }
          },
          'image/webp',
          0.9
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div
        onClick={() => fileRef.current?.click()}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/50 p-8 text-center cursor-pointer hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-900"
      >
        <Upload className="h-8 w-8 text-blue-600 mb-2" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upload PNG (Transparency Preserved)</h4>
        <p className="text-xs text-slate-500 mt-1">Converts transparent PNGs into modern WebP with full alpha channel.</p>
        <input
          ref={fileRef}
          type="file"
          accept=".png,image/png"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleConvert(e.target.files[0])}
        />
      </div>

      {webpUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
            <span className="text-xs font-semibold text-slate-600">
              Original PNG: {formatBytes(originalBytes)} → WebP: {formatBytes(webpBytes)}
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-700">
              Saved {Math.round(((originalBytes - webpBytes) / originalBytes) * 100)}%
            </span>
          </div>

          <div className="mt-4 flex max-h-64 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
            <img src={webpUrl} alt="WebP Result" className="max-h-56 object-contain" />
          </div>

          <div className="mt-4 flex justify-end">
            <a
              href={webpUrl}
              download="transparent-converted.webp"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download WebP</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 16. WEBP TO JPG CONVERTER
// -------------------------------------------------------------
export const WebpToJpgTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [jpgUrl, setJpgUrl] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const fileRef = useRef<HTMLInputElement>(null);

  const handleConvert = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              setJpgUrl(URL.createObjectURL(blob));
              onTaskCompleted?.();
            }
          },
          'image/jpeg',
          0.92
        );
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      <div
        onClick={() => fileRef.current?.click()}
        className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center cursor-pointer hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
      >
        <Upload className="h-8 w-8 text-blue-600 mb-2" />
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upload WebP to Convert to JPG</h4>
        <p className="text-xs text-slate-400 mt-1">Converts next-gen WebP back to universally supported JPEG.</p>
        <input
          ref={fileRef}
          type="file"
          accept=".webp,image/webp"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleConvert(e.target.files[0])}
        />
      </div>

      {jpgUrl && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex max-h-64 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800">
            <img src={jpgUrl} alt="JPG" className="max-h-56 object-contain" />
          </div>
          <div className="mt-4 flex justify-end">
            <a
              href={jpgUrl}
              download="converted.jpg"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download JPG</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 17. IMAGE TO BASE64
// -------------------------------------------------------------
export const ImageToBase64Tool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [dataUrl, setDataUrl] = useState('');
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const res = e.target?.result as string;
      setDataUrl(res);
      fireCelebration();
      onTaskCompleted?.();
    };
    reader.readAsDataURL(file);
  };

  const copySnippet = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-6">
      {!dataUrl ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-10 text-center cursor-pointer hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900"
        >
          <Upload className="h-8 w-8 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Choose any image to encode into Base64</h4>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG, SVG, WebP, GIF supported</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-500">Base64 Data URI Generated</span>
            <button onClick={() => setDataUrl('')} className="text-xs text-slate-400 hover:text-slate-600">
              Clear / New
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Raw Data URI</span>
              <button
                onClick={() => copySnippet(dataUrl, 'raw')}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {copiedType === 'raw' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedType === 'raw' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <textarea
              readOnly
              value={dataUrl}
              rows={4}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>HTML &lt;img&gt; Tag</span>
              <button
                onClick={() => copySnippet(`<img src="${dataUrl}" alt="Embedded Image" />`, 'html')}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {copiedType === 'html' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedType === 'html' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <input
              readOnly
              value={`<img src="${dataUrl}" alt="Embedded Image" />`}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>CSS Background-Image</span>
              <button
                onClick={() => copySnippet(`background-image: url("${dataUrl}");`, 'css')}
                className="flex items-center gap-1 text-blue-600 hover:underline"
              >
                {copiedType === 'css' ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                <span>{copiedType === 'css' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <input
              readOnly
              value={`background-image: url("${dataUrl}");`}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-mono dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 18. FAVICON GENERATOR
// -------------------------------------------------------------
export const FaviconGeneratorTool: React.FC<ToolCommonProps> = ({ onTaskCompleted }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [icons, setIcons] = useState<{ size: number; url: string; label: string }[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const sizes = [
    { size: 16, label: '16×16 Browser Tab' },
    { size: 32, label: '32×32 Retina Tab' },
    { size: 48, label: '48×48 Desktop Shortcut' },
    { size: 180, label: '180×180 Apple Touch Icon' },
    { size: 192, label: '192×192 Android PWA' },
  ];

  const handleUpload = (file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const src = e.target?.result as string;
      setImageSrc(src);
      const img = new Image();
      img.onload = () => {
        const generated: { size: number; url: string; label: string }[] = [];
        sizes.forEach(({ size, label }) => {
          const canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, size, size);
          generated.push({ size, label, url: canvas.toDataURL('image/png') });
        });
        setIcons(generated);
        fireCelebration();
        onTaskCompleted?.();
      };
      img.src = src;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {!imageSrc ? (
        <div
          onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-400 bg-blue-50/50 p-10 text-center cursor-pointer hover:bg-blue-50 dark:border-blue-800 dark:bg-slate-900"
        >
          <Upload className="h-8 w-8 text-blue-600 mb-2" />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">Upload square logo to generate favicons</h4>
          <p className="text-xs text-slate-500 mt-1">Generates complete 16px, 32px, 48px, Apple Touch & Android icons.</p>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
          />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Simulated Browser Tab Preview */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="text-xs font-bold uppercase text-slate-500">Live Browser Tab Simulation</span>
            <div className="mt-3 flex items-center gap-2 rounded-t-xl border border-slate-200 bg-slate-100 px-4 py-2.5 max-w-sm dark:border-slate-700 dark:bg-slate-800">
              {icons[0] && <img src={icons[0].url} alt="Favicon" className="h-4 w-4" />}
              <span className="text-xs font-medium text-slate-700 dark:text-slate-200 truncate">
                My Awesome Web Application
              </span>
            </div>
          </div>

          {/* Generated Icons Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {icons.map((item) => (
              <div
                key={item.size}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 p-2">
                  <img src={item.url} alt={item.label} className="max-h-full max-w-full" />
                </div>
                <span className="mt-3 text-xs font-bold text-slate-800 dark:text-slate-200">{item.size}×{item.size}</span>
                <span className="text-[10px] text-slate-400">{item.label}</span>
                <a
                  href={item.url}
                  download={`favicon-${item.size}x${item.size}.png`}
                  className="mt-3 flex w-full items-center justify-center gap-1 rounded-lg bg-blue-50 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-100 dark:bg-slate-800 dark:text-blue-400"
                >
                  <Download className="h-3 w-3" />
                  <span>Save</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
