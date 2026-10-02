import fs from 'fs';
import zlib from 'zlib';

function crc32(buf) {
  let table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

function createPng(width, height, r, g, b) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  
  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // bit depth
  ihdrData[9] = 2; // RGB
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  // Scanlines with nice gradient & border
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(height * rowSize);
  
  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: None
    const t = y / height;
    for (let x = 0; x < width; x++) {
      const px = rowOffset + 1 + x * 3;
      const tx = x / width;
      // Soft modern gradient from #2563eb (37, 99, 235) to #4f46e5 (79, 70, 229)
      let pr = Math.round(37 + (79 - 37) * ((t + tx) / 2));
      let pg = Math.round(99 + (70 - 99) * ((t + tx) / 2));
      let pb = Math.round(235 + (229 - 235) * ((t + tx) / 2));

      // Draw stylized white inner motif / hexagon boundary
      const cx = width / 2;
      const cy = height / 2;
      const dx = Math.abs(x - cx);
      const dy = Math.abs(y - cy);
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = width * 0.35;
      
      if (Math.abs(dist - radius) < width * 0.03 || dist < width * 0.08) {
        pr = 255;
        pg = 255;
        pb = 255;
      }

      rawData[px] = pr;
      rawData[px + 1] = pg;
      rawData[px + 2] = pb;
    }
  }

  const compressed = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', compressed);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

if (!fs.existsSync('public')) {
  fs.mkdirSync('public', { recursive: true });
}

fs.writeFileSync('public/pwa-192x192.png', createPng(192, 192, 37, 99, 235));
fs.writeFileSync('public/pwa-512x512.png', createPng(512, 512, 37, 99, 235));
fs.writeFileSync('public/pwa-maskable-512x512.png', createPng(512, 512, 37, 99, 235));
fs.writeFileSync('public/apple-touch-icon.png', createPng(180, 180, 37, 99, 235));
console.log('Generated PNG icons successfully!');
