"use client"

import logger from "@/src/utils/logger";
import { useMutation } from "@tanstack/react-query";
import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadRoller from "../reusable-components/LoadRoller";

const ChaptersList = ({ title, start_time = null, end_time = null, id, url }) => {
  const downloadSection = async () => {
    if (!Number.isFinite(Number(start_time)) || !Number.isFinite(Number(end_time))) {
      toast.error("Start and End is not a number");
      return new Error("Start and End is not a number");
    }
    try {
      const downloadUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&format_id=${id}&start=${start_time}&end=${end_time}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => link.remove(), 1000);
      toast.success("Download Started");
    } catch (err) {
      logger.log("Download section ERR", err);
      toast.error("Couldn't download chapter, try again later");
    }
  };

  const formatSeconds = (timeInSec) => {
    let hour = null;
    if (timeInSec > 60 * 60) hour = Math.floor(timeInSec / (60 * 60));
    const minute = Math.floor(timeInSec / 60) % 60;
    const seconds = timeInSec % 60;

    return hour
      ? `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      : `${minute.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`;
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: downloadSection,
  });

  return (
    <li
      className="flex justify-between items-center bg-(--main-secondary-light) rounded-md px-2 py-3"
      key={`${title}-${start_time}-${end_time}`}
    >
      <div className="space-y-2 text-left">
        <p className="text-lg text-(--text-primary) font-medium">{title}</p>
        <p className="text-sm text-(--text-primary-light) font-medium">{`${formatSeconds(
          Number(start_time)
        )}-${formatSeconds(Number(end_time))}`}</p>
      </div>
      <button
        disabled={isPending}
        onClick={mutateAsync}
        className="text-xl text-(--text-primary) disabled:opacity-65 bg-(--main-primary) rounded-full p-4 font-bold"
      >
        {isPending ? <LoadRoller size={20} /> : <FaArrowDown />}
      </button>
    </li>
  );
};

export default ChaptersList;
