import { Search, Monitor } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const Header = ({ searchQuery, onSearchChange }: HeaderProps) => {
  return (
    <header className="gradient-bg border-b border-border">
      <div className="container mx-auto px-4 py-4">
        {/* Top row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold font-display text-foreground tracking-wide">
              Exclusive<span className="text-primary">Clips4</span>
            </h1>
            <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">
              Premium Fashion • Lifestyle • Glamour Videos
            </p>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {["VIDEOS", "BEST OF", "COMMUNITY"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium tracking-wide"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search videos, models, categories..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-full py-3 pl-12 pr-12 text-sm border border-border focus:border-primary focus:outline-none transition-colors"
          />
          <Monitor className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
};

export default Header;
