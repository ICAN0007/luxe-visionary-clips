import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { categories, modelCodes, videos } from "@/data/videos";

interface SidebarProps {
  activeModel?: string | null;
  onModelClick?: (code: string) => void;
  activeCategory?: string;
  onCategoryClick?: (category: string) => void;
}

const Sidebar = ({ activeModel, onModelClick, activeCategory, onCategoryClick }: SidebarProps) => {
  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="card-gradient rounded-xl p-4 border border-border">
        <h3 className="text-lg font-display font-bold text-foreground mb-4 tracking-wide">CATEGORIES</h3>
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => onCategoryClick?.(cat.name)}
              className={`flex items-center gap-2 text-sm transition-colors py-1 w-full text-left ${
                activeCategory === cat.name
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-primary font-medium">{cat.count}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Models */}
      <div className="card-gradient rounded-xl p-4 border border-border">
        <h3 className="text-lg font-display font-bold text-foreground mb-4 tracking-wide">MODELS</h3>
        <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
          {modelCodes.map((code, i) => (
            <button
              key={code + i}
              onClick={() => onModelClick?.(code)}
              className={`flex items-center gap-2.5 text-sm transition-all duration-200 py-1.5 px-2 w-full text-left rounded-md ${
                activeModel === code
                  ? "text-primary bg-primary/10 font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              <Play className="w-3 h-3 flex-shrink-0 opacity-60" />
              <span className="truncate">{code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trending Videos */}
      <div className="card-gradient rounded-xl p-4 border border-border">
        <h3 className="text-lg font-display font-bold text-foreground mb-4 tracking-wide">🔥 TRENDING</h3>
        <div className="space-y-3">
          {videos.slice(0, 6).map((video) => (
            <Link
              key={video.id}
              to={`/video/${video.id}`}
              className="group flex gap-3 items-start hover:bg-secondary/50 rounded-lg p-1.5 transition-colors"
            >
              <div className="relative w-24 aspect-video rounded overflow-hidden flex-shrink-0">
                <img
                  src={video.thumb || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/0 group-hover:bg-background/30 transition-colors">
                  <Play className="w-5 h-5 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground truncate">{video.title}</p>
                <p className="text-xs text-muted-foreground truncate">{video.model}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
