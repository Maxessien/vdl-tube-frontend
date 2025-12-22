"use client"

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { regApi } from "@/src/utils/axiosBoilerplates";
import { useRouter } from "next/navigation";

const Search = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const router = useRouter();

  const search = async() => {
    if (videoUrl.trim().length <= 0) return;
    const urlId = self.crypto.randomUUID()
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
          className="w-full placeholder:text-(--text-primary-light) bg-(--main-secondary-light) font-medium text-lg text-(--text-primary) px-2 pl-4 py-5"
          type="text"
        />
        <button
          onClick={search}
          className="text-xl text-(--text-primary) p-3 rounded-full absolute top-2 left-3 bg-(--main-primary) hover:bg-(--main-primary-light) font-semibold"
        >
          <FaSearch />
        </button>
      </div>
    </>
  );
};

export default Search;
