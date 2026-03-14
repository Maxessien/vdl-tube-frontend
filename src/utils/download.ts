import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import type { DownloadProgress } from "../types/download";
import logger from "./logger";

export const downloadSection = async (
  title: string,
  start_time: number | string | null,
  end_time: number | string | null,
  id: string,
  url: string
) => {
  if (!Number.isFinite(Number(start_time)) || !Number.isFinite(Number(end_time))) {
    toast.error("Start and End is not a number");
    throw new Error("Start and End is not a number");
  }

  try {
    const prog_id = uuidv4();
    const downloadUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
      title
    )}&format_id=${id}&start=${start_time}&end=${end_time}&prog_id=${prog_id}`;
    const linkTag = document.createElement("a");
    linkTag.href = downloadUrl;
    linkTag.click();
    toast.warn("Processing Video, Please wait a few minutes");
    return prog_id;
  } catch (err) {
    logger.error("Download section ERR", err);
    throw err;
  }
};

export const formatProgressInfo = (progressObj?: Partial<DownloadProgress> | null) => {
  if (!progressObj) {
    return null;
  }

  const {
    fragment_index,
    fragment_count,
    total_bytes,
    total_bytes_estimate,
    downloaded_bytes,
  } = progressObj;

  if ((total_bytes || total_bytes_estimate) && downloaded_bytes) {
    return total_bytes_estimate
      ? (downloaded_bytes / total_bytes_estimate) * 100
      : (downloaded_bytes / Number(total_bytes)) * 100;
  }

  if (fragment_index && fragment_count) {
    return (fragment_index / fragment_count) * 100;
  }

  return null;
};
