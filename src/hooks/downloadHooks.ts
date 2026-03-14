import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { ProcessingInfo } from "../types/download";
import logger from "../utils/logger";


type DownloadVariables = {
  url: string;
  name: string;
  format_id: string;
  type?: string;
  start_time?: number | string | null;
  end_time?: number | string | null;
};

export const useDownloadProgress = (
  downloadOptions?: UseMutationOptions<
    any,
    Error,
    DownloadVariables
  >,
) => {
  const [processingInfo, setProcessingInfo] = useState<ProcessingInfo>({
    progressId: "",
    progressInfo: {},
    isActive: false,
  });

  const downloadFromBlob = (blob: Blob, name: string) => {
    const localUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = localUrl;
    link.download = `${name}.mp4`;
    link.click();
  };

  const startDownload = async (
    url: string,
    name: string,
    format_id: string,
    type: string = "full",
    start_time?: number | string | null,
    end_time?: number | string | null,
  ) => {
    try {
      const prog_id = uuidv4();
      const downloadUrl =
        type !== "full" && start_time && end_time
          ? `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
              name,
            )}&format_id=${format_id}&start=${start_time}&end=${end_time}&prog_id=${prog_id}`
          : `${
              process.env.NEXT_PUBLIC_BACKEND_URL
            }/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
              name,
            )}&format_id=${format_id}&prog_id=${prog_id}`;
      const res = await fetch(downloadUrl);
      const blob = await res.blob();
      downloadFromBlob(blob, name);
      return { status: "finished" };
    } catch (err) {
      logger.error("start download err", err);
      throw err;
    }
  };

  const mutationObject = useMutation<
    any,
    Error,
    DownloadVariables
  >({
    mutationFn: async({ url, name, format_id }) => {
      await startDownload(url, name, format_id);
    },
    ...downloadOptions,
  });

  return { ...mutationObject, processingInfo };
};
