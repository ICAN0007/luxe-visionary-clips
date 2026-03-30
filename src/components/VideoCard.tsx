import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Video } from "@/data/videos";

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoCard = ({ video }: { video: Video }) => {
  return (
    <Link to={`/video/${video.id}`} className="video-card group block">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={video.thumb || "/placeholder.svg"}
          alt={video.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
          <Play className="w-10 h-10 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
        </div>
        <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-0.5 rounded">
          {formatDuration(video.duration)}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-foreground truncate">{video.title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{video.model}</p>
        <div className="flex gap-1 mt-1">
          {video.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs text-primary">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
