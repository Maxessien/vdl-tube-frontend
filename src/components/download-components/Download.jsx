"use client";

import logger from "@/src/utils/logger";
import { useMutation } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import ChaptersList from "./ChapterList";
import { useForm } from "react-hook-form";
import { downloadSection } from "@/src/utils/download";
import LoadRoller from "../reusable-components/LoadRoller";
import axios from "axios";
import fileDownload from "js-file-download";
import { useState } from "react";

const DownloadFormat = ({
  format_id,
  chapters,
  url,
  name,
  quality,
  size,
  duration,
  closeSection = () => null,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: { start: 0, end: (duration / 60).toFixed(2) } });
  const [rangeIsPending, setRangeIsPending] = useState(false);

  // eslint-disable-next-line react-hooks/incompatible-library
  const formValues = watch();

  const downloadFullVideo = async () => {
    try {
      const downloadUrl = `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(
        name
      )}&format_id=${format_id}`;
      const res = await axios.get(downloadUrl, { responseType: "blob" });
      fileDownload(res.data, `${name}.mp4`);
      toast.success("Download Started");
    } catch (err) {
      logger.error("Full Video Download Error", err);
      toast.error("Couldn't download video, Try again later");
      throw err;
    }
  };

  const downloadRange = async ({ start, end }) => {
    setRangeIsPending(true);
    await downloadSection(
      `${name}(${start}min-${end}min)`,
      Number(start) * 60,
      Number(end) * 60,
      format_id,
      url
    );
    setRangeIsPending(false);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: downloadFullVideo,
  });

  return (
    <>
      {logger.log("Format id", format_id)}
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
          disabled={isPending || rangeIsPending}
          onClick={mutateAsync}
          className="flex disabled:opacity-60 py-4 justify-center items-center text-xl text-(--text-primary) w-full rounded-full bg-(--main-primary) font-semibold"
        >
          {isPending ? <LoadRoller size={27} strokeWidth={12} /> : "Download Full Video"}
          {size && Number.isFinite(Number(size)) && (
            <span> ({Number(size) / (1024 * 1024)}MB)</span>
          )}
        </button>
        {duration && (
          <section className="mb-4">
            <h3 className="text-xl text-(--text-primary) mb-3 w-full text-center font-semibold">
              Download in ranges
            </h3>
            <form className="space-y-2" onSubmit={handleSubmit(downloadRange)}>
              <label className="flex justify-start items-center w-full">
                <span className="text-lg mr-2 text-(--text-primary) w-max font-medium">
                  Start:{" "}
                </span>
                <input
                  className="px-2 py-1 w-full text-(--text-primary) bg-(--main-secondary-light) rounded-md"
                  type="number"
                  {...register("start", {
                    validate: (value) => {
                      if (Number(value) > Number(formValues.end))
                        return "Start must be less than end";
                      return true;
                    },
                  })}
                />
              </label>
              <label className="flex justify-start items-center w-full">
                <span className="text-lg mr-2 text-(--text-primary) font-medium">
                  End:{" "}
                </span>
                <input
                  className="px-2 w-full py-1 text-(--text-primary) bg-(--main-secondary-light) rounded-md"
                  type="number"
                  {...register("end", {
                    validate: (value) => {
                      if (Number(value) < Number(formValues.start))
                        return "End must be more than start";
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
                disabled={rangeIsPending || isPending}
                type="submit"
                className="flex disabled:opacity-60 py-4 justify-center items-center text-xl text-(--text-primary) w-full rounded-full bg-(--main-primary) font-semibold"
              >
                {rangeIsPending ? <LoadRoller size={27} strokeWidth={12} /> : "Download Range"}
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
              {chapters.map((chapter) => {
                console.log(chapter);
                chapter.id = format_id;
                chapter.url = url;
                return (
                  <ChaptersList
                    key={`${chapter.title}-${chapter.start}`}
                    {...chapter}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="text-lg text-(--text-primary-light) w-full text-center font-medium">
              No Chapters Found
            </p>
          )}
        </section>
      </section>
    </>
  );
};

export default DownloadFormat;
