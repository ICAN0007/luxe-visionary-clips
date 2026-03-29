import { categories, modelCodes } from "@/data/videos";

const Sidebar = () => {
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
          Foreign → MODELS
        </h3>
        <div className="flex flex-wrap gap-2">
          {modelCodes.map((code, i) => (
            <a
              key={code + i}
              href="#"
              className="px-3 py-1 text-xs rounded bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {code}
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
