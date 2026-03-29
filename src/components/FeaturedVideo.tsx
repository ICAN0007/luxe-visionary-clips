import { Play } from "lucide-react";
import type { Video } from "@/data/videos";

interface FeaturedVideoProps {
  video: Video;
  onPlay: (video: Video) => void;
}

const FeaturedVideo = ({ video, onPlay }: FeaturedVideoProps) => {
  return (
    <div className="mb-8 animate-fade-in">
      <div
        className="relative rounded-xl overflow-hidden cursor-pointer group"
        onClick={() => onPlay(video)}
      >
        <img
          src={video.thumb}
          alt={video.title}
          className="w-full aspect-video object-cover transition-all duration-500 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-foreground/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-2xl font-display font-bold text-blue-400">{video.title}</h2>
        <div className="flex gap-2 mt-2">
          {video.tags.map((tag) => (
            <span key={tag} className="text-primary text-sm">{tag}</span>
          ))}
        </div>
        <p className="text-muted-foreground text-sm mt-3 leading-relaxed max-w-2xl">
          Experience the pinnacle of fashion and lifestyle content. Curated with an eye for elegance,
          this collection showcases the finest in contemporary style, luxury travel, and glamour.
        </p>
      </div>
    </div>
  );
};

export default FeaturedVideo;
