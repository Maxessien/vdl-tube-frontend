"use client";

import {v4 as uuidV4} from "uuid"
import logger from "@/src/utils/logger";
import { useRouter } from "nextjs-toploader/app";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadRoller from "../reusable-components/LoadRoller";
import { getVideoInfo } from "@/src/utils/mate";
import { useDispatch } from "react-redux";
import { addInfo } from "@/src/store-slices/infoMappingsSlice";

const Search = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch()

  const search = async (): Promise<void> => {
    try {
      setIsFetching(true);
      if (videoUrl.trim().length <= 0) {
        return undefined;
      }

      const urlId = uuidV4();
      const info = await getVideoInfo(videoUrl)
      console.log(info)
      dispatch(addInfo({key: urlId, info: info}))
      router.push(`/download/${urlId}`);
    } catch (err) {
      logger.error("Error searching", err);
      toast.error("There was an error searching for video");
      throw err;
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(value);
  };

  return (
    <div className="w-full flex justify-start items-center pl-2 bg-(--main-secondary-light) rounded-full">
      <button
        onClick={search}
        className={`text-xl text-(--text-primary) ${isFetching ? "py-1.5 px-3" : "p-3"} rounded-full bg-(--main-primary) hover:bg-(--main-primary-light) font-semibold`}
      >
        {isFetching ? <LoadRoller size={18} strokeWidth={14} /> : <FaSearch />}
      </button>
      <input
        value={videoUrl}
        placeholder="Enter video url"
        onChange={handleInputChange}
        className="w-full placeholder:text-(--text-primary-light) rounded-[0px_9999px_9999px_0px] focus:outline-0 py-3 px-2 font-medium text-lg text-(--text-primary)"
        type="text"
      />
    </div>
  );
};

export default Search;
