import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import type { Video } from "@/data/videos";

const FeaturedVideo = ({ video }: { video: Video }) => {
  return (
    <div className="mb-8 animate-fade-in">
      <Link
        to={`/video/${video.id}`}
        className="relative rounded-xl overflow-hidden cursor-pointer group block"
      >
        <img
          src={video.thumb || "/placeholder.svg"}
          alt={video.title}
          className="w-full aspect-video object-cover transition-all duration-500 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-foreground/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
          <Play className="w-8 h-8 text-background ml-1" fill="currentColor" />
        </button>
      </Link>

      <div className="mt-4">
        <h2 className="text-2xl font-display font-bold text-primary">{video.title}</h2>
        <div className="flex gap-2 mt-2">
          {video.tags.map((tag) => (
            <span key={tag} className="text-primary text-sm">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedVideo;
