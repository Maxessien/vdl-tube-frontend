"use client"

import { regApi } from "@/src/utils/axiosBoilerplates";
import logger from "@/src/utils/logger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Search = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter();

  const search = async() => {
    if (videoUrl.trim().length <= 0) return;
    const urlId = self.crypto.randomUUID()
    logger.log("Backend url", process.env.NEXT_PUBLIC_BACKEND_URL)
    await regApi.post("/links", {id: urlId, url: videoUrl})
    router.push(`/download/${urlId}`)
  };

  return (
    <>
      <div className="w-full relative">
        <input
          value={videoUrl}
          placeholder="Enter video url"
          onChange={({ target: { value } }) => setVideoUrl(value)}
          className="w-full placeholder:text-(--text-primary-light) rounded-full placeholder:pl-15 bg-(--main-secondary-light) font-medium text-lg text-(--text-primary) px-2 pl-15 py-5"
          type="text"
        />
        <button
          onClick={search}
          className="text-xl text-(--text-primary) p-3 rounded-full absolute top-3 left-2 bg-(--main-primary) hover:bg-(--main-primary-light) font-semibold"
        >
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default Search;
