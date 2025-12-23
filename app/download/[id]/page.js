import VideoFormats from "@/src/components/download-components/VideoFormats";

import { regApi } from "@/src/utils/axiosBoilerplates";
import logger from "@/src/utils/logger";
import { notFound } from "next/navigation";

const DownloadPage = async ({ params }) => {
  try {
    const { id } = await params;
    if (!id || id.trim().length <= 0){
      logger.log("JUst", id)
      return notFound()
    };
    const {data} = await regApi.get(`/links/${id}`);
    logger.log("Url data", data)
    const info = await regApi.get("/info", { params: { urlId: id } });
    logger.log("Info data", info)
    info.data.url = data.url;
    // eslint-disable-next-line react-hooks/error-boundaries
    return <VideoFormats {...info.data} />;
  } catch (err) {
    logger.log("Page ERR", err);
    return notFound();
  }
};

export default DownloadPage;
