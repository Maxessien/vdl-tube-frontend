"use client";

import { useDownloadProgress } from "@/src/hooks/downloadHooks";
import type { Chapter } from "@/src/types/download";
import { formatProgressInfo } from "@/src/utils/download";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadRoller from "../reusable-components/LoadRoller";
import ChaptersList from "./ChapterList";

interface DownloadFormatProps {
  format_id: string;
  chapters: Chapter[];
  url: string;
  name: string;
  quality: number;
  size?: number | null;
  duration?: number;
  closeSection?: () => null | void;
}

interface RangeFormValues {
  start: string;
  end: string;
}

const DownloadFormat = ({
  format_id,
  chapters,
  url,
  name,
  quality,
  size,
  duration,
  closeSection = () => null,
}: DownloadFormatProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RangeFormValues>({
    defaultValues: {
      start: "0",
      end: Number(duration) > 0 ? (Number(duration) / 60).toFixed(2) : "0",
    },
  });

  const formValues = watch();

  const {
    mutateAsync,
    isPending,
    processingInfo: processingFull,
  } = useDownloadProgress({
    onSuccess: ()=>toast.success("Download Started"),
    onError: ()=>toast.error("Couldn't download full video, try again later")
  });

  
  const {
    mutateAsync: rangeDownload,
    isPending: rangeIsPending,
    processingInfo: processingRange,
  } = useDownloadProgress({
    onSuccess: ()=>toast.success("Download Started"),
    onError: ()=>toast.error("Couldn't download video range, try again later")
  });

  return (
    <section className="space-y-4">
      <button
        onClick={closeSection}
        className="w-full text-left text-2xl text-(--text-primary) block font-semibold"
      >
        <FaArrowLeft />
      </button>
      <h2 className="text-2xl text-(--text-primary) w-full text-center font-bold">
        {quality}P
      </h2>
      <button
        disabled={isPending || rangeIsPending || processingFull?.isActive}
        onClick={() => mutateAsync({url, name, format_id})}
        className="flex disabled:opacity-75 py-4 justify-center items-center text-xl text-(--text-primary) w-full rounded-full bg-(--main-primary) font-semibold"
      >
        {isPending ? (
          <LoadRoller size={27} strokeWidth={12} />
        ) : processingFull?.isActive ? (
          `Processing Video ${formatProgressInfo(processingFull?.progressInfo)?.toFixed(2) ?? "N/A"}%`
        ) : (
          "Download Full Video"
        )}
        {size && Number.isFinite(Number(size)) && (
          <span> ({(Number(size) / (1024 * 1024)).toFixed(2)}MB)</span>
        )}
      </button>

      {duration && (
        <section className="mb-4">
          <h3 className="text-xl text-(--text-primary) mb-3 w-full text-center font-semibold">
            Download in ranges
          </h3>
          <form
            className="space-y-2"
            onSubmit={handleSubmit(({ end, start }) =>
              rangeDownload({
                url,
                name,
                format_id,
                type: "chapter",
                start_time: Number(start) * 60,
                end_time: Number(end) * 60,
              }),
            )}
          >
            <label className="flex justify-start items-center w-full">
              <span className="text-lg mr-2 text-(--text-primary) w-max font-medium">
                Start (in Mins):{" "}
              </span>
              <input
                className="px-2 py-1 w-full text-(--text-primary) bg-(--main-secondary-light) rounded-md"
                type="number"
                {...register("start", {
                  validate: (value) => {
                    if (Number(value) > Number(formValues.end)) {
                      return "Start must be less than end";
                    }
                    return true;
                  },
                })}
              />
            </label>
            <label className="flex justify-start items-center w-full">
              <span className="text-lg mr-2 text-(--text-primary) font-medium">
                End(in Mins):{" "}
              </span>
              <input
                className="px-2 w-full py-1 text-(--text-primary) bg-(--main-secondary-light) rounded-md"
                type="number"
                {...register("end", {
                  validate: (value) => {
                    if (Number(value) < Number(formValues.start)) {
                      return "End must be more than start";
                    }
                    return true;
                  },
                })}
              />
            </label>
            {errors.start && (
              <p className="w-full text-base text-red-500 font-medium">
                {errors.start.message}
              </p>
            )}
            <button
              disabled={
                rangeIsPending || isPending || processingRange?.isActive
              }
              type="submit"
              className="flex disabled:opacity-60 py-4 justify-center items-center text-xl text-(--text-primary) w-full rounded-full bg-(--main-primary) font-semibold"
            >
              {rangeIsPending ? (
                <LoadRoller size={27} strokeWidth={12} />
              ) : processingRange?.isActive ? (
                `Processing Video ${formatProgressInfo(processingRange?.progressInfo)?.toFixed(2) ?? "N/A"}%`
              ) : (
                "Download Range"
              )}
            </button>
          </form>
        </section>
      )}

      <section className="space-y-3">
        <h3 className="text-xl text-(--text-primary) w-full text-center font-semibold">
          Download By Chapters
        </h3>
        {chapters?.length > 0 ? (
          <ul className="space-y-2">
            {chapters.map((chapter) => (
              <ChaptersList
                key={`${chapter.title}-${chapter.start_time}`}
                {...chapter}
                id={format_id}
                url={url}
              />
            ))}
          </ul>
        ) : (
          <p className="text-lg text-(--text-primary-light) w-full text-center font-medium">
            No Chapters Found
          </p>
        )}
      </section>
    </section>
  );
};

export default DownloadFormat;
