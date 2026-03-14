"use client";

import type { Chapter, Thumbnail, VideoFormat } from "@/src/types/download";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DownloadFormat from "./Download";

interface FormatsListCardProps {
  quality: number;
  size?: number | null;
  openFormatFn?: () => null | void;
}

interface OpenFormatState {
  id: string;
  isOpen: boolean;
}

interface VideoFormatsProps {
  formats?: VideoFormat[];
  url: string;
  title: string;
  thumbnails?: Thumbnail[];
  chapters?: Chapter[];
  duration?: number;
}

const FormatsListCard = ({ quality, size, openFormatFn = () => null }: FormatsListCardProps) => {
  return (
    <li
      onClick={openFormatFn}
      className="w-full px-3 py-4 space-y-3 text-left rounded-md bg-(--main-secondary-light) shadow-md shadow-gray-700"
    >
      <p className="text-xl text-(--text-primary) font-bold">Quality - {quality}P</p>
      <p className="text-xl text-(--text-primary) font-bold">
        Size -{" "}
        {Number.isFinite(Number(size)) ? `${(Number(size) / (1024 * 1024)).toFixed(2)} MB` : "Not available"}
      </p>
    </li>
  );
};

const VideoFormats = ({
  formats = [],
  url,
  title,
  thumbnails = [],
  chapters = [],
  duration,
}: VideoFormatsProps) => {
  const [openFormat, setOpenFormat] = useState<OpenFormatState>({ id: "", isOpen: false });

  const findFormat = (id: string) => {
    return formats.find((format) => format.format_id === id);
  };

  const calculateSize = (totalBitRate?: number | null, dur?: number) => {
    if (!Number.isFinite(Number(totalBitRate)) || !Number.isFinite(Number(dur))) {
      return null;
    }
    const sizeInBytes = ((Number(totalBitRate) * 1000) / 8) * Number(dur);
    return sizeInBytes;
  };

  const selectedFormat = openFormat.id.trim().length > 0 ? findFormat(openFormat.id) : undefined;

  return (
    <section className="px-3 py-4 max-w-lg mx-auto">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="w-full"
        src={
          thumbnails
            .filter((image) => Number.isFinite(Number(image.height)))
            .reduce<Thumbnail | null>((prev, curr) => {
              if (!prev) {
                return curr;
              }
              return Number(curr.height) > Number(prev.height) ? curr : prev;
            }, null)?.url || "default_url"
        }
        alt={`${title} thumbnail`}
      />
      <h1 className="text-2xl text-(--text-primary) my-3 w-full text-center font-semibold">{title}</h1>

      {(!openFormat.isOpen || openFormat.id.trim().length <= 0) && (
        <ul className="space-y-4">
          {formats.map(({ height, filesize, format_id, tbr }) => (
            <FormatsListCard
              key={format_id}
              openFormatFn={() => {
                setOpenFormat({ isOpen: true, id: format_id });
              }}
              quality={height}
              size={filesize ?? calculateSize(tbr, duration)}
            />
          ))}
        </ul>
      )}

      {openFormat.isOpen && selectedFormat && (
        <AnimatePresence>
          <motion.div
            initial={{ x: "150vw" }}
            transition={{ duration: 0.7, ease: "easeIn" }}
            exit={{ x: "150vw" }}
            animate={{ x: "0vw" }}
          >
            <DownloadFormat
              name={title}
              url={url}
              chapters={chapters}
              format_id={selectedFormat.format_id}
              quality={selectedFormat.height}
              size={selectedFormat.filesize}
              closeSection={() => setOpenFormat({ isOpen: false, id: "" })}
              duration={duration}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default VideoFormats;
