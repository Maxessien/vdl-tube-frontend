/**
 * test.js
 * Node.js port of mate.ts — no browser APIs, no external dependencies.
 * Run with: node test.js
 * Requires Node >= 18 (native fetch + node:crypto webcrypto).
 */

import { webcrypto } from "node:crypto";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CDN_API_BASE = "https://media.savetube.vip/api";
const DECRYPTION_KEY_HEX = "C5D58EF67A7584E4A29F6C35BBC4EB12";

// ---------------------------------------------------------------------------
// CDN helpers
// ---------------------------------------------------------------------------

async function getRandomCdnHost() {
  const res = await fetch(`${CDN_API_BASE}/random-cdn`);
  const json = await res.json();
  return json.cdn;
}

// ---------------------------------------------------------------------------
// Crypto helpers
// ---------------------------------------------------------------------------

function hexToBytes(hex) {
  const pairs = hex.match(/[\dA-F]{2}/gi);
  if (!pairs) throw new Error("Invalid hex format");
  return new Uint8Array(pairs.map((byte) => parseInt(byte, 16)));
}

async function importDecryptionKey() {
  const keyBytes = hexToBytes(DECRYPTION_KEY_HEX);
  return webcrypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
}

function base64ToBuffer(base64) {
  const cleaned = base64.replace(/\s/g, "");
  return Buffer.from(cleaned, "base64");
}

async function decryptVideoPayload(encryptedBase64) {
  const buf = base64ToBuffer(encryptedBase64);

  if (buf.byteLength < 16) {
    throw new Error("Decryption failed: payload too short");
  }

  const iv = buf.slice(0, 16);
  const ciphertext = buf.slice(16);

  const key = await importDecryptionKey();

  const decrypted = await webcrypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    ciphertext
  );

  const text = new TextDecoder().decode(new Uint8Array(decrypted));
  return JSON.parse(text);
}

// ---------------------------------------------------------------------------
// Video info
// ---------------------------------------------------------------------------

async function fetchRawVideoInfo(videoUrl) {
  const cdn = await getRandomCdnHost();
  const res = await fetch(`https://${cdn}/v2/info`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: videoUrl }),
  });
  return res.json();
}

async function getVideoInfo(videoUrl) {
  const raw = await fetchRawVideoInfo(videoUrl);
  if (!raw.status) {
    throw new Error(raw.message || "Failed to fetch video info");
  }
  return decryptVideoPayload(raw.data);
}

// ---------------------------------------------------------------------------
// Download URL
// ---------------------------------------------------------------------------

async function resolveDownloadUrl(key, quality, contentType, directUrl, titleSlug) {
  if (directUrl != null && contentType !== "audio") {
    return {
      status: true,
      message: "",
      data: { downloadUrl: `${directUrl}&title=${titleSlug}-ytshorts.savetube.vip` },
    };
  }

  const cdn = await getRandomCdnHost();
  const res = await fetch(`https://${cdn}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      downloadType: quality === "128" ? "audio" : "video",
      quality,
      key,
    }),
  });

  if (!res.ok) {
    return {
      status: false,
      message: "Sorry, you can't download this video at this time. Please try again later.",
      data: null,
    };
  }

  return res.json();
}

async function getDownloadUrl(videoInfo, quality, contentType) {
  const matchedFormat = videoInfo.video_formats.find(
    (f) => parseInt(String(f.height)) === parseInt(quality)
  );
  const directUrl = matchedFormat?.url ?? null;

  return resolveDownloadUrl(
    videoInfo.key,
    quality,
    contentType,
    directUrl,
    videoInfo.titleSlug
  );
}

// ---------------------------------------------------------------------------
// Quick test — swap in a real YouTube URL to try it out
// ---------------------------------------------------------------------------

const TEST_URL = "https://www.youtube.com/shorts/QkP_zUqkf30";
const TEST_QUALITY = "720";
const TEST_CONTENT_TYPE = "video";

console.log(`Fetching info for: ${TEST_URL}`);

const videoInfo = await getVideoInfo(TEST_URL);
console.log("\n--- Video Info ---");
console.log("Info      :", videoInfo);
console.log("Title      :", videoInfo.title);
console.log("Duration   :", videoInfo.durationLabel);
console.log("Thumbnail  :", videoInfo.thumbnail);
console.log("Video fmts :", videoInfo.video_formats.map((f) => f.label).join(", "));
console.log("Audio fmts :", videoInfo.audio_formats.map((f) => f.label).join(", "));

const result = await getDownloadUrl(videoInfo, TEST_QUALITY, TEST_CONTENT_TYPE);
console.log("\n--- Download URL Result ---");
console.log(result);
