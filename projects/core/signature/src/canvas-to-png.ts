/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {deflate} from 'pako';

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];
const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[n] = c;
  }
  return table;
})();

function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Uint8Array): Uint8Array {
  const typeBytes = new Uint8Array(type.length);
  for (let i = 0; i < type.length; i++) {
    typeBytes[i] = type.charCodeAt(i);
  }
  const body = new Uint8Array(typeBytes.length + data.length);
  body.set(typeBytes, 0);
  body.set(data, typeBytes.length);

  const out = new Uint8Array(4 + body.length + 4);
  const view = new DataView(out.buffer);
  view.setUint32(0, data.length);
  out.set(body, 4);
  view.setUint32(4 + body.length, crc32(body));
  return out;
}

/**
 * Encodes an image made only of black pixels over a transparent background
 * (e.g. a signature drawn on a canvas) as a palette-indexed PNG.
 *
 * Since every pixel is either transparent or some shade of black
 * (anti-aliased strokes only vary the alpha channel), the palette never
 * needs more than 256 entries, so a color type 3 (indexed) PNG can be built
 * regardless of the image content. This is dramatically smaller than the
 * plain RGBA PNG produced by `canvas.toDataURL('image/png')`, which the
 * browser always encodes at 32 bits per pixel with no palette reduction.
 */
export function canvasToIndexedPngDataUrl(canvas: HTMLCanvasElement): string {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d')!;
  const {data} = ctx.getImageData(0, 0, width, height);

  const palette: number[] = []; // alpha value of each palette entry, index 0 is always alpha 0
  const alphaToIndex = new Map<number, number>();
  alphaToIndex.set(0, 0);
  palette.push(0);

  const indices = new Uint8Array(width * height);
  for (let p = 0; p < indices.length; p++) {
    const alpha = data[p * 4 + 3];
    let index = alphaToIndex.get(alpha);
    if (index == null) {
      if (palette.length >= 256) {
        // extremely unlikely for a black-on-transparent signature; fall back
        // to the closest already-registered alpha level rather than failing.
        index = 0;
        let closestDiff = Infinity;
        for (const [a, i] of alphaToIndex) {
          const diff = Math.abs(a - alpha);
          if (diff < closestDiff) {
            closestDiff = diff;
            index = i;
          }
        }
      } else {
        index = palette.length;
        palette.push(alpha);
        alphaToIndex.set(alpha, index);
      }
    }
    indices[p] = index;
  }

  const plte = new Uint8Array(palette.length * 3); // all entries are black, only alpha (tRNS) varies
  const trns = new Uint8Array(palette.length);
  for (let i = 0; i < palette.length; i++) {
    trns[i] = palette[i];
  }

  const bitDepth = palette.length <= 2 ? 1 : palette.length <= 16 ? 4 : 8;
  const rowBytes = Math.ceil((width * bitDepth) / 8);
  const raw = new Uint8Array((rowBytes + 1) * height);
  let offset = 0;
  for (let y = 0; y < height; y++) {
    raw[offset++] = 0; // no filter
    if (bitDepth === 8) {
      for (let x = 0; x < width; x++) {
        raw[offset++] = indices[y * width + x];
      }
    } else {
      const pixelsPerByte = 8 / bitDepth;
      for (let x = 0; x < width; x += pixelsPerByte) {
        let byte = 0;
        for (let b = 0; b < pixelsPerByte; b++) {
          const px = x + b;
          const value = px < width ? indices[y * width + px] : 0;
          byte |= value << (8 - bitDepth * (b + 1));
        }
        raw[offset++] = byte;
      }
    }
  }

  const idatData = deflate(raw);

  const ihdr = new Uint8Array(13);
  const ihdrView = new DataView(ihdr.buffer);
  ihdrView.setUint32(0, width);
  ihdrView.setUint32(4, height);
  ihdr[8] = bitDepth;
  ihdr[9] = 3; // color type: indexed
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const chunks = [
    new Uint8Array(PNG_SIGNATURE),
    chunk('IHDR', ihdr),
    chunk('PLTE', plte),
    chunk('tRNS', trns),
    chunk('IDAT', idatData),
    chunk('IEND', new Uint8Array(0)),
  ];

  const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
  const png = new Uint8Array(totalLength);
  let pos = 0;
  for (const c of chunks) {
    png.set(c, pos);
    pos += c.length;
  }

  let binary = '';
  for (let i = 0; i < png.length; i++) {
    binary += String.fromCharCode(png[i]);
  }
  return `data:image/png;base64,${btoa(binary)}`;
}
