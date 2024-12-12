"use client";
import { useRef, useEffect } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  //@ts-expect-error
  const playerRef = useRef<videojs.Player | null>(null);

  useEffect(() => {
    if (videoRef.current) {

      const player = videojs(videoRef.current, {
        controls: true,
        responsive: true,
        fluid: true,
        autoplay: false, 
        preload: "auto",
        sources: [
          {
            src: src,
            type: "application/x-mpegURL", 
          },
        ],
      });

      playerRef.current = player;

      return () => {
        if (playerRef.current) {
          playerRef.current.dispose();
          playerRef.current = null;
        }
      };
    }
  }, [src]); 

  return (
    <div>
      <video
        ref={videoRef}
        className="video-js vjs-default-skin"
        playsInline
      />
    </div>
  );
};

export default VideoPlayer;
