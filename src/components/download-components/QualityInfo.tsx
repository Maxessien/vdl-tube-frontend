import LoadRoller from "@/src/components/reusable-components/LoadRoller";
import { downloadVideo, getYouTubeID } from "@/src/utils/downloader";
import logger from "@/src/utils/logger";
import { VideoInfo } from "@/src/utils/mate";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Chapters, { Chapter } from './Chapters';
import RangeDownload from "./RangeDownload";

interface QualityInfo {
  info: VideoInfo;
  quality: number;
  closeInfoFn: () => void;
}

const QualityInfo = ({ info, closeInfoFn, quality }: QualityInfo) => {
  const { key, duration, title, titleSlug, url } = info;
  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({
      start,
      end,
      title,
    }: {
      start?: number;
      title: string;
      end?: number;
    }) =>
      downloadVideo(
        key,
        quality,
        titleSlug,
        title,
        start ?? undefined,
        end ?? undefined,
      ),
    onSuccess: () => toast.success("Video download started"),
    onError: () => toast.error("Video download failed"),
  });

  const [chaps, setChaps] = useState<Chapter[]>([]);

  const getChapters = async () => {
    const vidId = info?.id ?? getYouTubeID(url)
    const chapters = await axios.get<Chapter[]>("/api/chapter", {params: {id: vidId}})
    return chapters.data
  };

  useEffect(() => {
    (async () => {
      try {
        const chapters = await getChapters();
        setChaps(chapters);
      } catch (err) {
        logger.log("Chapter fetch error", err);
        toast.error("Failed to get chapters");
      }
    })();
  }, []);

  return (
    <>
      <section>
        <button
          onClick={closeInfoFn}
          className="text-base font-medium gap-2 mb-4 text-(--text-primary) flex justify-start items-center"
        >
          <FaArrowLeft /> Go back
        </button>
        <button
          onClick={() => mutateAsync({ title })}
          disabled={isPending}
          className="flex disabled:opacity-75 py-3 px-4 w-full justify-center items-center text-xl text-(--text-primary) not-visited:rounded-full bg-(--main-primary) font-semibold"
        >
          {isPending ? (
            <>
              <span className="sr-only">Downloading full video</span>
              <LoadRoller size={24} duration={0.7} />
            </>
          ) : (
            "Download Full Video"
          )}
        </button>
      </section>

      <RangeDownload
        isPending={isPending}
        duration={duration}
        submitFn={(start, end) => mutateAsync({ start, end, title })}
      />

      <Chapters
        isPending={isPending}
        chapters={chaps}
        downloadFn={(start, title, end) => mutateAsync({ start, end, title })}
      />
    </>
  );
};

export default QualityInfo;
