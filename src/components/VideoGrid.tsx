import type { Video } from "@/data/videos";
import VideoCard from "./VideoCard";

interface VideoGridProps {
  videos: Video[];
  onPlay: (video: Video) => void;
}

const VideoGrid = ({ videos, onPlay }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video, i) => (
        <div key={video.id + i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
          <VideoCard video={video} onPlay={onPlay} />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
