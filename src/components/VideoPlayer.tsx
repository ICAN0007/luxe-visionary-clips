import { X } from "lucide-react";
import type { Video } from "@/data/videos";

interface VideoPlayerProps {
  video: Video;
  onClose: () => void;
}

const VideoPlayer = ({ video, onClose }: VideoPlayerProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95" onClick={onClose}>
      <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-8 h-8" />
        </button>
        <video
          src={video.src}
          controls
          autoPlay
          className="w-full rounded-xl"
        />
        <h3 className="text-lg font-display font-bold text-foreground mt-4">{video.title}</h3>
      </div>
    </div>
  );
};

export default VideoPlayer;
