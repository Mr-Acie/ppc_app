// Generates PWA icons as PNG using pure Node.js (no canvas dependency)
// Creates a navy circle with a shield emoji-style icon

import { createWriteStream } from "fs";

function writePNG(filename, size) {
  // We'll write a minimal valid PNG with navy background + white shield shape
  // Using raw PNG chunks

  const width = size;
  const height = size;

  // Build pixel data (RGBA)
  const pixels = new Uint8Array(width * height * 4);

  const navyR = 26, navyG = 58, navyB = 92;
  const goldR = 232, goldG = 184, goldB = 75;
  const whiteR = 255, whiteG = 255, whiteB = 255;

  const cx = width / 2;
  const cy = height / 2;
  const radius = size * 0.48;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > radius) {
        // Transparent outside circle
        pixels[idx] = 0; pixels[idx+1] = 0; pixels[idx+2] = 0; pixels[idx+3] = 0;
      } else {
        // Navy background
        pixels[idx] = navyR; pixels[idx+1] = navyG; pixels[idx+2] = navyB; pixels[idx+3] = 255;

        // Gold ring near edge
        if (dist > radius * 0.88) {
          pixels[idx] = goldR; pixels[idx+1] = goldG; pixels[idx+2] = goldB; pixels[idx+3] = 255;
        }

        // White shield shape in center
        const nx = dx / radius; // normalized -1 to 1
        const ny = dy / radius;

        // Shield outline: wider at top, pointed at bottom
        const shieldTop = -0.45;
        const shieldBottom = 0.52;
        const shieldWidth = 0.38;

        if (ny >= shieldTop && ny <= shieldBottom) {
          // Width narrows toward bottom
          const t = (ny - shieldTop) / (shieldBottom - shieldTop);
          const halfW = shieldWidth * (1 - t * t * 0.7);
          if (Math.abs(nx) < halfW) {
            pixels[idx] = whiteR; pixels[idx+1] = whiteG; pixels[idx+2] = whiteB; pixels[idx+3] = 255;
          }
        }

        // Gold cross / plus inside shield
        const crossW = 0.07;
        const crossH = 0.28;
        const inShield = ny >= shieldTop + 0.05 && ny <= shieldBottom - 0.1 && Math.abs(nx) < shieldWidth * 0.85;
        if (inShield) {
          if (Math.abs(nx) < crossW && ny > shieldTop + 0.08 && ny < shieldTop + 0.08 + crossH * 2) {
            pixels[idx] = goldR; pixels[idx+1] = goldG; pixels[idx+2] = goldB; pixels[idx+3] = 255;
          }
          if (Math.abs(ny - (shieldTop + 0.08 + crossH * 0.55)) < crossW && Math.abs(nx) < crossH * 0.72) {
            pixels[idx] = goldR; pixels[idx+1] = goldG; pixels[idx+2] = goldB; pixels[idx+3] = 255;
          }
        }
      }
    }
  }

  // Encode as PNG
  const png = encodePNG(pixels, width, height);
  const ws = createWriteStream(filename);
  ws.write(Buffer.from(png));
  ws.end();
  console.log(`Written: ${filename} (${size}x${size})`);
}

function encodePNG(pixels, width, height) {
  const SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

  function chunk(type, data) {
    const typeBytes = [...type].map(c => c.charCodeAt(0));
    const len = data.length;
    const buf = new Uint8Array(12 + len);
    buf[0] = (len >> 24) & 0xff; buf[1] = (len >> 16) & 0xff;
    buf[2] = (len >> 8) & 0xff;  buf[3] = len & 0xff;
    buf.set(typeBytes, 4);
    buf.set(data, 8);
    const crc = crc32([...typeBytes, ...data]);
    buf[8 + len]     = (crc >> 24) & 0xff;
    buf[8 + len + 1] = (crc >> 16) & 0xff;
    buf[8 + len + 2] = (crc >> 8)  & 0xff;
    buf[8 + len + 3] = crc & 0xff;
    return buf;
  }

  // IHDR
  const ihdr = new Uint8Array(13);
  ihdr[0] = (width >> 24) & 0xff;  ihdr[1] = (width >> 16) & 0xff;
  ihdr[2] = (width >> 8) & 0xff;   ihdr[3] = width & 0xff;
  ihdr[4] = (height >> 24) & 0xff; ihdr[5] = (height >> 16) & 0xff;
  ihdr[6] = (height >> 8) & 0xff;  ihdr[7] = height & 0xff;
  ihdr[8] = 8;  // bit depth
  ihdr[9] = 6;  // color type: RGBA
  ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;

  // Raw image data (filter byte 0 per scanline)
  const raw = new Uint8Array(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0; // filter type None
    for (let x = 0; x < width; x++) {
      const src = (y * width + x) * 4;
      const dst = y * (1 + width * 4) + 1 + x * 4;
      raw[dst]   = pixels[src];
      raw[dst+1] = pixels[src+1];
      raw[dst+2] = pixels[src+2];
      raw[dst+3] = pixels[src+3];
    }
  }

  const compressed = deflate(raw);
  const idat = chunk("IDAT", compressed);
  const iend = chunk("IEND", new Uint8Array(0));
  const ihdrChunk = chunk("IHDR", ihdr);

  const total = 8 + ihdrChunk.length + idat.length + iend.length;
  const out = new Uint8Array(total);
  let pos = 0;
  out.set(SIGNATURE, pos); pos += 8;
  out.set(ihdrChunk, pos); pos += ihdrChunk.length;
  out.set(idat, pos);      pos += idat.length;
  out.set(iend, pos);
  return out;
}

// Simple deflate (uncompressed blocks — valid PNG, larger file but no dependency)
function deflate(data) {
  const BLOCK_SIZE = 65535;
  const blocks = Math.ceil(data.length / BLOCK_SIZE) || 1;
  const out = new Uint8Array(2 + blocks * 5 + data.length + 4);
  let pos = 0;
  out[pos++] = 0x78; out[pos++] = 0x01; // zlib header

  for (let i = 0; i < blocks; i++) {
    const start = i * BLOCK_SIZE;
    const end = Math.min(start + BLOCK_SIZE, data.length);
    const len = end - start;
    const last = i === blocks - 1 ? 1 : 0;
    out[pos++] = last;
    out[pos++] = len & 0xff; out[pos++] = (len >> 8) & 0xff;
    out[pos++] = (~len) & 0xff; out[pos++] = ((~len) >> 8) & 0xff;
    out.set(data.subarray(start, end), pos);
    pos += len;
  }

  // Adler-32 checksum
  let s1 = 1, s2 = 0;
  for (let i = 0; i < data.length; i++) {
    s1 = (s1 + data[i]) % 65521;
    s2 = (s2 + s1) % 65521;
  }
  const adler = (s2 << 16) | s1;
  out[pos++] = (adler >> 24) & 0xff; out[pos++] = (adler >> 16) & 0xff;
  out[pos++] = (adler >> 8)  & 0xff; out[pos++] = adler & 0xff;
  return out.subarray(0, pos);
}

// CRC32
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const b of bytes) {
    crc ^= b;
    for (let k = 0; k < 8; k++) {
      crc = (crc & 1) ? (0xedb88320 ^ (crc >>> 1)) : (crc >>> 1);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

writePNG("public/icons/icon-192.png", 192);
writePNG("public/icons/icon-512.png", 512);
