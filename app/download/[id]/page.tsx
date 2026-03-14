import VideoFormats from "@/src/components/download-components/VideoFormats";
import type { LinkResponse, VideoInfoResponse } from "@/src/types/download";
import { regApi } from "@/src/utils/axiosBoilerplates";
import logger from "@/src/utils/logger";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Tube VDL - Download",
};

interface DownloadPageProps {
  params: Promise<{ id: string }> | { id: string };
}

const DownloadPage = async ({ params }: DownloadPageProps) => {
  try {
    const { id } = await Promise.resolve(params);
    if (!id || id.trim().length <= 0) {
      return notFound();
    }

    const { data } = await regApi.get<LinkResponse>(`/links/${id}`);
    const info = await regApi.get<VideoInfoResponse>("/info", { params: { urlId: id } });
    info.data.url = data.url;

    return <VideoFormats {...info.data} />;
  } catch (err) {
    logger.log("Page ERR", err);
    return notFound();
  }
};

export default DownloadPage;
