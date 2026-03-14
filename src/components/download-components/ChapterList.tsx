"use client";

import { useDownloadProgress } from "@/src/hooks/downloadHooks";
import type { Chapter } from "@/src/types/download";
import { formatProgressInfo } from "@/src/utils/download";
import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadRoller from "../reusable-components/LoadRoller";

interface ChapterListProps extends Chapter {
  id: string;
  url: string;
}

const formatSeconds = (timeInSec: number) => {
  if (!Number.isFinite(timeInSec)) {
    return "00:00";
  }

  let hour: number | null = null;
  if (timeInSec > 60 * 60) {
    hour = Math.floor(timeInSec / (60 * 60));
  }
  const minute = Math.floor(timeInSec / 60) % 60;
  const seconds = Math.floor(timeInSec % 60);

  return hour
    ? `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`
    : `${minute.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const ChaptersList = ({
  title,
  start_time = null,
  end_time = null,
  id,
  url,
}: ChapterListProps) => {
  const { startDownload, processingInfo, isPending } = useDownloadProgress();

  return (
    <>
      <li
        className="flex justify-between items-center bg-(--main-secondary-light) rounded-md px-2 py-3"
        key={`${title}-${start_time}-${end_time}`}
      >
        <div className="space-y-2 text-left">
          <p className="text-lg text-(--text-primary) font-medium">{title}</p>
          <p className="text-sm text-(--text-primary-light) font-medium">{`${formatSeconds(
            Number(start_time),
          )}-${formatSeconds(Number(end_time))}`}</p>
        </div>
        <button
          disabled={isPending}
          onClick={() =>
            startDownload(
              url,
              title,
              id,
              "section",
              Number(start_time) * 60,
              Number(end_time) * 60,
            )
          }
          className="text-xl text-(--text-primary) disabled:opacity-65 bg-(--main-primary) rounded-full p-4 font-bold"
        >
          {isPending ? <LoadRoller size={20} /> : <FaArrowDown />}
        </button>
      </li>
      {processingInfo.isActive && (
        <p className="text-left w-full mt-1.5 text-base text-(--text-primary) font-medium">
          Processing video{" "}
          {formatProgressInfo(processingInfo.progressInfo)?.toFixed(2) ?? "N/A"}
          %
        </p>
      )}
    </>
  );
};

export default ChaptersList;
