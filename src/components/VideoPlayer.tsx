import { X, Play } from "lucide-react";
import type { Video } from "@/data/videos";

interface VideoPlayerProps {
  video: Video;
  allVideos: Video[];
  onPlay: (video: Video) => void;
  onClose: () => void;
}

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoPlayer = ({ video, allVideos, onPlay, onClose }: VideoPlayerProps) => {
  const similar = allVideos.filter((v) => v.id !== video.id).slice(0, 8);

  return (
    <div className="fixed inset-0 z-50 bg-background/95 overflow-y-auto" onClick={onClose}>
      <div className="max-w-5xl mx-auto px-4 py-8" onClick={(e) => e.stopPropagation()}>
        {/* Close */}
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-8 h-8" />
          </button>
        </div>

        {/* Player */}
        <video src={video.src} controls autoPlay className="w-full rounded-xl" />
        <h3 className="text-xl font-display font-bold text-foreground mt-4">{video.title}</h3>
        <div className="flex gap-2 mt-2">
          {video.tags.map((tag) => (
            <span key={tag} className="text-primary text-sm">{tag}</span>
          ))}
        </div>

        {/* Similar Videos */}
        <div className="mt-10">
          <h4 className="text-lg font-display font-bold text-foreground mb-4">Similar Videos</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {similar.map((v) => (
              <div
                key={v.id}
                className="video-card group cursor-pointer"
                onClick={() => { onPlay(v); window.scrollTo({ top: 0, behavior: "smooth" }); }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={v.thumb} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-300 flex items-center justify-center">
                    <Play className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="currentColor" />
                  </div>
                  <span className="absolute bottom-2 right-2 bg-background/80 text-foreground text-xs px-2 py-0.5 rounded">
                    {formatDuration(v.duration)}
                  </span>
                </div>
                <div className="p-2">
                  <p className="text-sm text-foreground truncate">{v.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
