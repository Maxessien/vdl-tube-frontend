/**
 * mate.ts
 * Utilities for fetching video info and download URLs via the savetube CDN API.
 */

import axios from "axios";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CDN_API_BASE = "https://media.savetube.vip/api";

/**
 * AES-CBC decryption key (hex-encoded).
 * Reconstructed from the obfuscated constant in the original bundle.
 */
const DECRYPTION_KEY_HEX = "C5D58EF67A7584E4A29F6C35BBC4EB12";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AudioFormat {
  /** Numeric bitrate, e.g. 128 */
  quality: number;
  label: string;
  url: string | null;
}

export interface VideoFormat {
  height: number;
  width: number;
  /** Numeric quality value, e.g. 360, 720, 1080 */
  quality: number;
  label: string;
  url: string | null;
  default_selected: 0 | 1;
}

export interface ThumbnailFormat {
  label: string;
  quality: string;
  value: string;
  url: string;
}

export interface VideoInfo {
  id: string;
  key: string;
  url: string;
  title: string;
  titleSlug: string;
  thumbnail: string;
  duration: number;
  durationLabel: string;
  audio_formats: AudioFormat[];
  video_formats: VideoFormat[];
  thumbnail_formats: ThumbnailFormat[];
  /** Height of the default selected video format */
  default_selected: number;
  fromCache: boolean;
}

export type ContentType = "video" | "audio" | "all";

export interface DownloadUrlResult {
  status: boolean;
  message: string;
  data: { downloadUrl: string } | null;
}

// ---------------------------------------------------------------------------
// CDN helpers
// ---------------------------------------------------------------------------

/**
 * Fetches a random CDN host from the savetube API.
 */
export async function getRandomCdnHost(): Promise<string> {
  const response = await fetch(`${CDN_API_BASE}/random-cdn`);
  const json = await response.json();
  return json.cdn as string;
}

// ---------------------------------------------------------------------------
// Crypto helpers
// ---------------------------------------------------------------------------

/**
 * Converts a hex string (e.g. "C5D58EF6...") into a Uint8Array of bytes.
 */
function hexToBytes(hex: string): Uint8Array<ArrayBuffer> {
  const pairs = hex.match(/[\dA-F]{2}/gi);
  if (!pairs) {
    throw new Error("Invalid hex format");
  }
  return new Uint8Array(pairs.map((byte) => parseInt(byte, 16))) as Uint8Array<ArrayBuffer>;
}

/**
 * Imports the fixed AES-CBC decryption key into the Web Crypto API.
 */
async function importDecryptionKey(): Promise<CryptoKey> {
  const keyBytes = hexToBytes(DECRYPTION_KEY_HEX);
  return window.crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );
}

/**
 * Decodes a base64 string into an ArrayBuffer.
 */
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const cleaned = base64.replace(/\s/g, "");
  const binary = window.atob(cleaned);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Decrypts an AES-CBC encrypted, base64-encoded payload.
 * The first 16 bytes of the decoded buffer are used as the IV,
 * the remainder is the ciphertext.
 *
 * @param encryptedBase64 - The base64-encoded encrypted string returned by the API.
 * @returns The decrypted JSON-parsed object.
 */
export async function decryptVideoPayload<T = VideoInfo>(
  encryptedBase64: string
): Promise<T> {
  const buffer = base64ToArrayBuffer(encryptedBase64);

  if (buffer.byteLength < 16) {
    throw new Error("Decryption failed: payload too short");
  }

  const iv = new Uint8Array(buffer, 0, 16);
  const ciphertext = new Uint8Array(buffer, 16);

  const key = await importDecryptionKey();

  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv },
    key,
    ciphertext
  );

  const text = new TextDecoder().decode(new Uint8Array(decrypted));
  return JSON.parse(text) as T;
}

// ---------------------------------------------------------------------------
// Video info
// ---------------------------------------------------------------------------

/**
 * Fetches raw (encrypted) video info from the CDN for a given URL.
 *
 * @param videoUrl - The YouTube (or supported) video URL.
 * @returns The raw API response; `data` is an encrypted base64 string when `status` is true.
 */
export async function fetchRawVideoInfo(
  videoUrl: string
): Promise<{ status: boolean; data: string; message: string }> {
  const cdn = await getRandomCdnHost();
  const response = await axios.post<{
    status: boolean;
    data: string;
    message: string;
  }>(`https://${cdn}/v2/info`, { url: videoUrl });
  return response.data;
}

/**
 * Fetches and decrypts video info for a given URL.
 *
 * @param videoUrl - The YouTube (or supported) video URL.
 * @returns Decrypted `VideoInfo` object.
 * @throws If the API returns a non-success status or decryption fails.
 */
export async function getVideoInfo(videoUrl: string): Promise<VideoInfo> {
  const raw = await fetchRawVideoInfo(videoUrl);

  if (!raw.status) {
    throw new Error(raw.message || "Failed to fetch video info");
  }

  return decryptVideoPayload<VideoInfo>(raw.data);
}

// ---------------------------------------------------------------------------
// Download URL
// ---------------------------------------------------------------------------

/**
 * Builds a direct download URL by calling the CDN `/download` endpoint.
 *
 * @param key          - The video key from `VideoInfo`.
 * @param quality      - Quality identifier (e.g. "720", "1080", "128" for audio).
 * @param contentType  - "video", "audio", or "all".
 * @param directUrl    - If already available (e.g. from `VideoFormat.url`), skip the CDN call.
 * @param titleSlug    - The video slug used to build the savetube download URL.
 */
export async function resolveDownloadUrl(
  key: string,
  quality: string,
  contentType: ContentType,
  directUrl: string | null,
  titleSlug: string
): Promise<DownloadUrlResult> {
  // If a direct URL is available and this is not an audio-only request, use it immediately.
  if (directUrl != null && contentType !== "audio") {
    return {
      data: {
        downloadUrl: `${directUrl}&title=${titleSlug}-ytshorts.savetube.vip`,
      },
      status: true,
      message: "",
    };
  }

  const cdn = await getRandomCdnHost();

  const response = await fetch(`https://${cdn}/download`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      downloadType: quality === "128" ? "audio" : "video",
      quality,
      key,
    }),
  });

  if (!response) {
    return {
      status: false,
      message:
        "Sorry, you can't download this video at this time. Please try again later.",
      data: null,
    };
  }

  return response.json() as Promise<DownloadUrlResult>;
}

/**
 * Convenience helper: given a `VideoInfo` object, a selected quality value,
 * and a content type, finds the matching direct URL (if any) and resolves
 * the final download URL.
 *
 * @param videoInfo   - The decrypted video info object.
 * @param quality     - Quality value matching `VideoFormat.height` or `AudioFormat.quality`.
 * @param contentType - "video", "audio", or "all".
 */
export async function getDownloadUrl(
  videoInfo: VideoInfo,
  quality: string,
  contentType: ContentType
): Promise<DownloadUrlResult> {
  // Try to find a pre-signed URL in the video formats list.
  const matchedFormat = videoInfo.video_formats.find(
    (f) => f.quality === parseInt(quality)
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
