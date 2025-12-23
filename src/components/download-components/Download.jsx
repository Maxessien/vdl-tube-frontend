"use client"

import logger from "@/src/utils/logger";
import { useMutation } from "@tanstack/react-query";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import ChaptersList from "./ChapterList";

const DownloadFormat = ({ format_id, chapters, url, name, quality, size, closeSection=()=>null }) => {
  const downloadFullVideo = async () => {
    try {
      const downloadUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/download?url=${encodeURIComponent(url)}&title=${encodeURIComponent(name)}&format_id=${format_id}`;
      const link = document.createElement("a");
      link.href = downloadUrl;
      document.body.appendChild(link);
      link.click();
      setTimeout(() => link.remove(), 1000);
      toast.success("Download Started");
    } catch (err) {
      logger.error("Full Video Download Error", err);
      toast.error("Couldn't download video, Try again later");
      throw err;
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: downloadFullVideo,
  });

  return (
    <>
    {logger.log("Format id", format_id)}
      <section className="space-y-4">
        <button onClick={closeSection} className="w-full text-left text-2xl text-(--text-primary) block font-semibold"><FaArrowLeft /></button>
        <h2 className="text-2xl text-(--text-primary) w-full text-center font-bold">
          {quality}P
        </h2>
        <button
          disabled={isPending}
          onClick={mutateAsync}
          className="flex disabled:opacity-60 py-4 justify-center items-center text-xl text-(--text-primary) w-full rounded-full bg-(--main-primary) font-semibold"
        >
          Download Full Video{size && Number.isFinite(Number(size)) && <span>{" "}({Number(size) / (1024 * 1024)}MB)</span>}
        </button>
        {/* {duration && <section>
            <h3>Download in ranges</h3>
            <p><span>Start: </span><input type="number" /></p>
        </section>} */}
        <section className="space-y-3">
          <h3 className="text-xl text-(--text-primary) w-full text-center font-semibold">
            Download By Chapters
          </h3>
          {chapters?.length > 0 ? (
            <ul className="space-y-2">
            {chapters.map((chapter) => {
              console.log(chapter)
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
            <p className="text-lg text-(--text-primary-light) w-full text-center font-medium">No Chapters Found</p>
          )}
        </section>
      </section>
    </>
  );
};

export default DownloadFormat;
