import { RefObject } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import {
  MdForward10,
  MdFullscreen,
  MdFullscreenExit,
  MdReplay10,
} from "react-icons/md";
import { VideoState } from "./VideoPlayer";
import VolumeControls from "./VolumeControls";

const VideoControls = ({
  seek,
  videoState,
  videoRef,
}: {
  seek: (amount: number, direction: "forward" | "backward") => void;
  videoState: VideoState;
  videoRef: RefObject<HTMLVideoElement>;
}) => {

  return (
    <div className="flex w-full max-w-7xl mx-auto justify-center items-center">
      <div className="flex-1 flex justify-end">
      <VolumeControls videoRef={videoRef} videoState={videoState} />
      </div>
      <div className="flex flex-1 justify-center items-center gap-2">
        <button
          className="inline-flex justify-center items-center hover:bg-(--main-secondary-light) rounded-full p-1 font-medium text-(--text-primary)"
          onClick={() => seek(-10, "backward")}
        >
          <MdReplay10 size={28} />
        </button>
        <button
          className="inline-flex justify-center items-center p-4 text-lg rounded-full bg-(--main-primary) hover:bg-(--main-primary-light) font-medium text-(--text-primary)"
          onClick={() =>
            videoState.paused
              ? videoRef?.current?.play()
              : videoRef?.current?.pause()
          }
          disabled={videoState.loading}
        >
          {videoState.paused ? <FaPlay /> : <FaPause />}
        </button>
        <button
          className="inline-flex justify-center items-center hover:bg-(--main-secondary-light) rounded-full p-1 font-medium text-(--text-primary)"
          onClick={() => seek(10, "forward")}
        >
          <MdForward10 size={28} />
        </button>
      </div>
      <div className="flex-1 flex justify-start">
      <button
        className="inline-flex w-max justify-start items-center hover:bg-(--main-secondary-light) rounded-full p-1 font-medium text-(--text-primary)"
        onClick={() =>
          videoState.expanded
            ? document.exitFullscreen()
            : videoRef?.current?.parentElement?.requestFullscreen()
        }
      >
        {videoState.expanded ? <MdFullscreenExit size={28} /> : <MdFullscreen size={28} />}
      </button>
      </div>
    </div>
  );
};

export default VideoControls;
