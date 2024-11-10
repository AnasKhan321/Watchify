// components/VideoPlayer.tsx
"use client"; // Ensures the code runs only on the client side
import { useRef, useEffect } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; // Import Plyr styles
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current);

      // Check if HLS.js is supported and use it
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
      } else {
        videoRef.current.src = src; // Fallback for browsers that support HLS natively (like Safari)
      }

      return () => {
        player.destroy(); // Cleanup the player on unmount
      };
    }
  }, []);

  return <video ref={videoRef} controls />;
};

export default VideoPlayer;
