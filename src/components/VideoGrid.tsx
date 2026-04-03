import type { Video } from "@/data/videos";
import VideoCard from "./VideoCard";

const VideoGrid = ({ videos }: { videos: Video[] }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {videos.map((video, i) => (
        <div key={video.id + i} className="animate-fade-in" style={{ animationDelay: `${i * 50}ms` }}>
          <VideoCard video={video} />
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
