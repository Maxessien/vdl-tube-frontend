"use client"

import logger from "@/src/utils/logger";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import DownloadFormat from "./Download";

const FormatsListCard = ({ quality, size, openFormatFn = () => null }) => {
  return (
    <li
      onClick={openFormatFn}
      className="w-full px-3 py-4 space-y-3 text-left rounded-md bg-(--main-secondary-light) shadow-md shadow-gray-700"
    >
      <p className="text-xl text-(--text-primary) font-bold">
        Quality - {quality}P
      </p>
      <p className="text-xl text-(--text-primary) font-bold">
        Size - {Number.isFinite(size) ? `${Math.round(size / (1024 * 1024))} MB` : "Not available"}
      </p>
    </li>
  );
};

const VideoFormats = ({ formats = [], url, title, thumbnails, chapters, duration }) => {
  const [openFormat, setOpenFormat] = useState({ id: "", isOpen: false });

  const findFormat = (id) => {
    return formats.find((format) => format.format_id === id);
  };

  const calculateSize = (totalBitRate, dur)=>{
    const sizeInBytes = ((totalBitRate * 1000) / 8) * dur
    return sizeInBytes
  }
  return (
    <section className="px-3 py-4 max-w-lg mx-auto">
      {logger.log("InVDF", thumbnails.filter((image)=>image.height).reduce((prev, curr)=>curr.height > prev.height ? curr : prev))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="w-full" src={thumbnails.filter((image)=>image.height).reduce((prev, curr)=>curr.height > prev.height ? curr : prev).url} alt={`${title} thumbnail`} />
        <h1 className="text-2xl text-(--text-primary) w-full text-center font-semibold">{title}</h1>
      {(!openFormat.isOpen || openFormat.id.trim().length <= 0) && (
        <ul className="space-y-4">
          {formats.map(({ height, filesize, format_id, tbr }) => (
            <FormatsListCard
              key={format_id}
              openFormatFn={() => {
                setOpenFormat({ isOpen: true, id: format_id });
              }}
              quality={height}
              size={filesize || calculateSize(tbr, duration)}
            />
          ))}
        </ul>
      )}
      {openFormat.isOpen && openFormat.id.trim().length > 0 && (
        <AnimatePresence>
          <motion.div initial={{x: "150vw"}} transition={{duration: 0.7, ease: "easeIn"}} exit={{x: "150vw"}} animate={{x: "0vw"}}>
            <DownloadFormat
              name={title}
              url={url}
              chapters={chapters}
              format_id={findFormat(openFormat.id).format_id}
              quality={findFormat(openFormat.id).height}
              size={findFormat(openFormat.id).filesize}
              closeSection={()=>setOpenFormat({isOpen: false, id: ""})}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default VideoFormats;
