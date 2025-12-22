"use client"

import { regApi } from "@/src/utils/axiosBoilerplates";
import { useMutation } from "@tanstack/react-query";
import logger from "@/src/utils/logger";
import { FaArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";

const ChaptersList = ({ title, start = null, end = null, id, url }) => {
  const downloadSection = async () => {
    if (!Number.isFinite(Number(start)) && !Number.isFinite(Number(end))) {
      toast.error("Start and End is not a number");
      return new Error("Start and End is not a number");
    }
    try {
      await regApi.get(
        `/download?url=${url}&title=${title}&format_id=${id}&start=${start}&end=${end}`
      );
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
      key={`${title}-${start}-${end}`}
    >
      <div className="space-y-2 text-left">
        <p className="text-lg text-(--text-primary) font-medium">{title}</p>
        <p className="text-sm text-(--text-primary-light) font-medium">{`${formatSeconds(
          Number(start)
        )}-${formatSeconds(Number(end))}`}</p>
      </div>
      <button
        disabled={isPending}
        onClick={mutateAsync}
        className="text-xl text-(--text-primary) disabled:opacity-65 bg-(--main-primary) rounded-full p-4 font-bold"
      >
        <FaArrowDown />
      </button>
    </li>
  );
};

export default ChaptersList;
