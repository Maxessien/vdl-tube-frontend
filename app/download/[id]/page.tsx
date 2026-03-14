import VideoFormats from "@/src/components/download-components/VideoFormats";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tube VDL - Download",
};

interface DownloadPageProps {
  params: Promise<{ id: string }> | { id: string };
}

const DownloadPage = async ({ params }: DownloadPageProps) => {
  const par = await params

  return <VideoFormats id={par.id} />
};

export default DownloadPage;
