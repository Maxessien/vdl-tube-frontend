import { RefObject, useState } from "react";
import { MdVolumeOff, MdVolumeUp } from "react-icons/md";
import { VideoState } from "./VideoPlayer";

const VolumeControls = ({
  videoRef,
  videoState
}: {
  videoRef: RefObject<HTMLVideoElement>;
    videoState: VideoState;
}) => {
  const [isSeeking, setIsSeeking] = useState(false);

  const handleVolumeTouch = (location: number, rect: DOMRect) => {
    const ratio = (location - rect.left) / rect.width;
    videoRef.current.volume = ratio;
  };
  return (
    <div className="flex w-full sm:w-4/5 justify-end gap-1 sm:gap-1.5 items-center">
      <div
        className={`flex-1 h-1 sm:h-1.5 relative rounded-full`}
        onTouchMove={(e) =>
          handleVolumeTouch(
            e.changedTouches?.[0]?.clientX,
            e?.currentTarget?.getBoundingClientRect(),
          )
        }
        onPointerMove={(e) => {
          if (!isSeeking) return;
          handleVolumeTouch(
            e.clientX,
            e?.currentTarget?.getBoundingClientRect(),
          );
        }}
        onPointerDown={() => setIsSeeking(true)}
        onPointerUp={() => setIsSeeking(false)}
        onClick={(e) => {
          handleVolumeTouch(
            e.clientX,
            e?.currentTarget?.getBoundingClientRect(),
          );
          setIsSeeking(false);
        }}
        style={{
          display: "grid",
          gridTemplateColumns: `${videoRef.current?.volume * 100}% 
                ${100 - videoRef.current?.volume * 100}%`,
        }}
      >
        <span className="h-full w-full rounded-full bg-(--main-primary-light)"></span>
        <span className="h-full w-full rounded-full bg-(--text-primary-light)"></span>
        <span
          style={{
            left: `${videoRef.current?.volume * 100}%`,
          }}
          className="absolute cursor-pointer top-1/2 -translate-1/2 bg-(--main-primary) h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full"
        ></span>
      </div>

      <button
        className="inline-flex w-max justify-center items-center hover:bg-(--main-secondary-light) rounded-full p-0.5 sm:p-1 font-medium text-(--text-primary)"
        onClick={() => {
          if (videoRef?.current) videoRef.current.muted = !videoRef.current.muted;
        }}
      >
        {videoState?.muted ? <MdVolumeOff size={18} className="sm:w-5 sm:h-5" /> : <MdVolumeUp  size={18} className="sm:w-5 sm:h-5" />}
      </button>
    </div>
  );
};

export default VolumeControls;
