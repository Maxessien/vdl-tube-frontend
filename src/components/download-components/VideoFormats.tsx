"use client";


import { RootState } from "@/src/store";
import { resolveDownloadUrl, VideoFormat } from "@/src/utils/mate";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { notFound } from "next/navigation";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const FormatsListCard = ({
  format,
  vidKey,
  title,
  titleSlug,
}: {
  format: VideoFormat;
  vidKey: string;
  title: string;
  titleSlug: string;
}) => {
  const { quality, url } = format;
  const {mutateAsync, isPending} = useMutation({
    mutationFn: () =>
      resolveDownloadUrl(vidKey, `${quality}`, "video", url, titleSlug),
    onSuccess: async(downloadUrlRes) => {
      const { data } = downloadUrlRes;
      const res = await axios.get("/api/download", {responseType: "blob", params: {url: data.downloadUrl}})
      const blobUrl = URL.createObjectURL(res.data)
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${title}.mp4`;
      // console.log(data)
      link.click();
      toast.success("Download Started");
    },
    onError: () => toast.error("Download Failed"),
  });
  return (
    <li className="w-full flex justify-between items-center px-3 py-5 space-y-3 text-left rounded-md bg-(--main-secondary-light) shadow-md shadow-gray-700">
      <p className="text-xl text-(--text-primary) font-bold">
        Quality - {quality}P
      </p>
      <button onClick={()=>mutateAsync()} disabled={isPending} className="flex disabled:opacity-75 py-2 px-4 justify-center items-center text-base text-(--text-primary) not-visited:rounded-full bg-(--main-primary) font-semibold">
        Download
      </button>
    </li>
  );
};

const VideoFormats = ({ id }: { id: string }) => {
  const infos = useSelector((state: RootState)=>state.infoMappings)
  const info = infos?.[id]
  
  if (!info) return notFound()
  return (
    <section className="px-3 py-4 max-w-lg mx-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full"
        src={info?.thumbnail ?? info?.thumbnail_formats?.[0].url}
        alt={`${info?.title} thumbnail`}
      />
      <h1 className="text-2xl text-(--text-primary) my-3 w-full text-center font-semibold">
        {info?.title}
      </h1>

      {info?.video_formats.length > 0 && (
        <ul className="space-y-4">
          {info?.video_formats.map((format) => (
            <FormatsListCard
              format={format}
              key={format.url}
              vidKey={info?.key}
              title={info?.title}
              titleSlug={info?.titleSlug}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default VideoFormats;
