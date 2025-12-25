import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import crypto from "crypto"
import logger from "./logger";
import axios from "axios";


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
    const downloadUrl = `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
      title
    )}&format_id=${id}&start=${start_time}&end=${end_time}`;
    const res = await axios.get(downloadUrl, {responseType: "blob"})
    fileDownload(res.data, `${title || crypto.randomUUID()}.mp4`)
    toast.success("Download Started");
  } catch (err) {
    logger.log("Download section ERR", err);
    toast.error("Couldn't download chapter, try again later");
  }
};
