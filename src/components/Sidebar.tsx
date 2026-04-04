import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import { categories, modelCodes, videos } from "@/data/videos";
interface SidebarProps {
  activeModel?: string | null;
  onModelClick?: (code: string) => void;
}

const Sidebar = ({ activeModel, onModelClick }: SidebarProps) => {
  const navigate = useNavigate();
  return (
    <aside className="space-y-6">
      {/* Categories */}
      <div className="card-gradient rounded-xl p-4 border border-border">
        <h3 className="text-lg font-display font-bold text-foreground mb-4 tracking-wide">CATEGORIES</h3>
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {categories.map((cat) => (
            <a
              key={cat.name}
              href="#"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
            >
              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
              <span className="text-primary font-medium">{cat.count}</span>
              <span>{cat.name}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Models */}
      <div className="card-gradient rounded-xl p-4 border border-border">
        <h3 className="text-lg font-display font-bold text-foreground mb-4 tracking-wide">
          MODELS
        </h3>
        <div className="flex flex-wrap gap-2">
          {modelCodes.map((code, i) => (
            <button
              key={code + i}
              onClick={() => navigate(`/model/${code}`)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                activeModel === code
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Videos */}
      <div className="card-gradient rounded-xl p-4 border border-border">
        <h3 className="text-lg font-display font-bold text-foreground mb-4 tracking-wide">
          🔥 TRENDING
        </h3>
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
