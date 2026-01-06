import { toast } from "react-toastify";
import {v4 as uuidv4} from "uuid"
import logger from "./logger";

/**
 *
 * @param {String} title - Title of the download
 * @param {Number} start_time - Start range of the download
 * @param {Number} end_time - End range of the download
 * @param {String} id - Format id of the video
 * @param {String} url - Youtube video URL
 */
export const downloadSection = async (
  title,
  start_time = null,
  end_time = null,
  id,
  url
) => {
  if (
    !Number.isFinite(Number(start_time)) ||
    !Number.isFinite(Number(end_time))
  ) {
    toast.error("Start and End is not a number");
    return new Error("Start and End is not a number");
  }
  try {
    const prog_id = uuidv4()
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
    throw err
  }
};

const Types = {
  fragment_index: 0,
  fragment_count: 0,
  total_bytes: 0,
  total_bytes_estimate: 0,
  downloaded_bytes: 0,
}

/**
 * @param {Types} progressObj - Progress hook object for tracking progress
 * @returns {Number} Returns progress percentage
 */
export const formatProgressInfo = ({
  fragment_index,
  fragment_count,
  total_bytes,
  total_bytes_estimate,
  downloaded_bytes,
}) => {
  if (fragment_index && fragment_count)
    return (fragment_index / fragment_count) * 100;

  if ((total_bytes || total_bytes_estimate) && downloaded_bytes)
    return total_bytes_estimate
      ? (downloaded_bytes / total_bytes_estimate) * 100
      : (downloaded_bytes / total_bytes) * 100;

  return null
};


export  const downloadFullVideo = async (name, format_id, url) => {
    try {
      const prog_id = uuidv4()
      const downloadUrl = `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        name
      )}&format_id=${format_id}&prog_id=${prog_id}`;
      const linkTag = document.createElement("a")
      linkTag.href = downloadUrl
      linkTag.click()
      toast.warn("Processing Video, Please wait a few minutes");
      return prog_id
    } catch (err) {
      logger.error("Full Video Download Error", err);
      throw err;
    }
  };