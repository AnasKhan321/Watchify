"use client"; // Ensures the code runs only on the client side
import { useRef, useState, useEffect } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css"; // Import Plyr styles
import Hls from "hls.js";

interface VideoPlayerProps {
  src: string;
}

const VideoPlayer = ({ src }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (videoRef.current) {
      // Initialize Plyr
      const player = new Plyr(videoRef.current);

      // Check if HLS.js is supported
      let hls: Hls | null = null;
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);

        // Handle errors from HLS.js
        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            console.error("HLS.js Error:", event, data);
          }
        });

        // Show loading indicator when buffering
        hls.on(Hls.Events.FRAG_LOADING, () => {
          setLoading(true);
        });

        // Hide loading indicator when buffering is complete
        hls.on(Hls.Events.FRAG_LOADED, () => {
          setLoading(false);
        });
      } else {
        // Fallback for browsers that support HLS natively (like Safari)
        videoRef.current.src = src;
      }

      // Cleanup function on component unmount
      return () => {
        player.destroy(); // Cleanup Plyr
        if (hls) {
          hls.destroy(); // Cleanup HLS.js
        }
      };
    }
  }, [src]); // Make sure the player updates if the `src` changes

  return (
    <div>
 {/* Loading indicator */}
      <video ref={videoRef} controls />
    </div>
  );
};

export default VideoPlayer;

