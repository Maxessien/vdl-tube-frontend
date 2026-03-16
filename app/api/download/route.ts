import logger from "@/src/utils/logger";
import ffmpegPath from "ffmpeg-static";
import ffmpeg from "fluent-ffmpeg";
import { existsSync } from "fs";
import path from "path";
import { PassThrough, Readable } from "stream";

export const runtime = "nodejs"

function resolveFfmpegBinaryPath(): string | null {
  const candidates = [
    ffmpegPath,
    path.join(
      process.cwd(),
      "node_modules",
      "ffmpeg-static",
      process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
    ),
  ];

  for (const candidate of candidates) {
    if (typeof candidate !== "string" || candidate.length === 0) {
      continue;
    }

    const normalizedPath = path.normalize(candidate);
    if (existsSync(normalizedPath)) {
      return normalizedPath;
    }
  }

  return null;
}

const resolvedFfmpegPath = resolveFfmpegBinaryPath();
logger.log("resolved", resolvedFfmpegPath)
if (resolvedFfmpegPath) {
  ffmpeg.setFfmpegPath(resolvedFfmpegPath);
}

function parseTimeParam(value: string | null): number | null {
  if (value == null) {
    return null;
  }

  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 0) {
    return null;
  }

  return parsed;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get("url");
  const start = searchParams.get("start");
  const end = searchParams.get("end");
  const startTime = parseTimeParam(start);
  const endTime = parseTimeParam(end);

  logger.info("time", {startTime, endTime, end, start, videoUrl})

  if (!videoUrl) return new Response("Missing URL", { status: 400 });
  if (!resolvedFfmpegPath) {
    return new Response("FFmpeg binary could not be resolved on server", { status: 500 });
  }
  if (request.signal.aborted) {
    return new Response("Request aborted", { status: 499 });
  }

  const bridge = new PassThrough();
  let hasStreamedData = false;

  bridge.once("data", () => {
    hasStreamedData = true;
  });

  const command = ffmpeg(videoUrl)
    .videoCodec("copy")
    .audioCodec("copy")
    .format("mp4")
    .outputOptions("-movflags frag_keyframe+empty_moov")
    .on("error", (err) => {
      const normalizedError = err instanceof Error ? err : new Error(String(err));

      if (!hasStreamedData) {
        bridge.destroy(new Error(`Unable to process video stream: ${normalizedError.message}`));
        return;
      }

      bridge.destroy(normalizedError);
    });

  const onAbort = () => {
    const abortError = new Error("Download aborted by client");
    bridge.destroy(abortError);
    command.kill("SIGKILL");
  };

  request.signal.addEventListener("abort", onAbort, { once: true });
  const removeAbortListener = () => {
    request.signal.removeEventListener("abort", onAbort);
  };
  bridge.once("close", removeAbortListener);
  bridge.once("error", removeAbortListener);

  if (startTime !== null) {
    command.setStartTime(startTime);

    if (endTime !== null && endTime > startTime) {
      command.duration(endTime - startTime);
    }
  }

  command.pipe(bridge);

  const webStream = Readable.toWeb(bridge);
  return new Response(webStream as BodyInit, {
    headers: {
      "Content-Type": "video/mp4",
      "Content-Disposition": `attachment; filename="video.mp4"`,
    },
  });
}
