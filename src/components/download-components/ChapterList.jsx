"use client"

import logger from "@/src/utils/logger";
import { useMutation } from "@tanstack/react-query";
import { FaArrowDown } from "react-icons/fa";
import LoadRoller from "../reusable-components/LoadRoller";
import { downloadSection, formatProgressInfo } from "@/src/utils/download";
import { useState } from "react";
import { toast } from "react-toastify";

const ChaptersList = ({ title, start_time = null, end_time = null, id, url }) => {

  const [processingChapter, setProcessingChapter] = useState({isActive: false, progressInfo: {}})

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
    mutationFn: async (name, start, end, f_id, vid_url)=> {
      await downloadSection(name, start, end, f_id, vid_url )
    },
    onError: ()=>toast.error("Couldn't download chapter, try again later"),
    onSuccess: (prog_id)=>{
      setProcessingChapter((state)=>({...state, isActive: true}))
      const chapProcessingInt = setInterval(async()=>{
        const progress = await regApi.get(`/progress/${prog_id}`)
        if (progress.data.status === "finished"){
          setProcessingChapter((state)=>({...state, isActive: false}))
          clearInterval(chapProcessingInt)
        }else{
          setProcessingChapter((state)=>({...state, progressInfo: progress.data}))
        }
      }, 1000)
    }
  });

  return (
    <>
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
          onClick={()=>mutateAsync(title, start_time, end_time, id, url)}
          className="text-xl text-(--text-primary) disabled:opacity-65 bg-(--main-primary) rounded-full p-4 font-bold"
        >
          {isPending ? <LoadRoller size={20} /> : <FaArrowDown />}
        </button>
      </li>
      <p className="text-center mt-[6px] text-base text(--text-primary) font-medium">Processing video {formatProgressInfo(processingChapter.progressInfo)}%</p>
    </>
  );
};

export default ChaptersList;
