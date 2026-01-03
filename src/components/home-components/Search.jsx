"use client"

import { regApi } from "@/src/utils/axiosBoilerplates";
import logger from "@/src/utils/logger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadRoller from "../reusable-components/LoadRoller";

const Search = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [isFetching, setIsFetching] = useState(false)
  const router = useRouter();

  const search = async() => {
    try {
      setIsFetching(true)
      if (videoUrl.trim().length <= 0) return;
      const urlId = self.crypto.randomUUID()
      await regApi.post("/links", {id: urlId, url: videoUrl})
      router.push(`/download/${urlId}`)
      return urlId
    } catch (err) {
      logger.error("Error searching", err)
      toast.error("There was an error searching for video")
      throw err
    }finally{
      setIsFetching(false)
    }
  };

  return (
    <>
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
          onChange={({ target: { value } }) => setVideoUrl(value)}
          className="w-full placeholder:text-(--text-primary-light) rounded-[0px_9999px_9999px_0px] focus:outline-0 py-3 px-2 font-medium text-lg text-(--text-primary)"
          type="text"
        />
      </div>
    </>
  );
};

export default Search;
