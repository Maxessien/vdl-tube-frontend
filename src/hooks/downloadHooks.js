import { toast } from "react-toastify";
import { regApi } from "../utils/axiosBoilerplates";

const { useState, useEffect } = require("react");

/**
 * Use download hook for monitoring the processing progress of a video
 * @param {String} progressId - Id for the download progress
 */
export const useDownloadProgress = () => {
  const [processingInfo, setProcessingInfo] = useState({
    progressId: "",
    progressInfo: {},
    isActive: false,
  });
  const fullVidProcessingInt = async (progId) => {
    const res = await regApi.get(`/progress/${progId}`);
    const progress = res?.data;
    if (progress?.status === "finished") {
      setProcessingInfo({ progressInfo: {}, isActive: false });
      toast.success("Download Started");
    } else {
      if (progress?.status) {
        setProcessingInfo({
          isActive: progress?.status === "downloading",
          progressInfo: progress,
        });
      }
      setTimeout(() => fullVidProcessingInt(progId), 600);
    }
  };
  useEffect(() => {
    if (
      processingInfo.isActive &&
      processingInfo.progressId?.length > 0 &&
      typeof processingInfo.progressId === "string"
    )
      fullVidProcessingInt(processingInfo.progressId);
  }, [processingInfo]);

  /**
   *
   * @param {String} id - Id of processing video
   * @returns {SetStateAction} React set state action
   */
  const startProcessing = (id) => {
    setProcessingInfo((state) => ({
      ...state,
      isActive: true,
      progressId: id,
    }));
  };

  return { startProcessing, processingInfo };
};
