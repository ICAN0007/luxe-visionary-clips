import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { videos, modelCodes } from "@/data/videos";

const MODELS_PER_PAGE = 18;

const Models = React.forwardRef<HTMLDivElement>((_, ref) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modelSearch, setModelSearch] = useState("");
  const [page, setPage] = useState(1);

  const modelsWithData = useMemo(() => {
    return modelCodes.map((code) => {
      const modelVideos = videos.filter((v) => v.model === code);
      const thumb = modelVideos.find((v) => v.thumb)?.thumb || "";
      return { code, videoCount: modelVideos.length, thumb };
    });
  }, []);

  const filtered = useMemo(() => {
    if (!modelSearch.trim()) return modelsWithData;
    return modelsWithData.filter((m) =>
      m.code.toLowerCase().includes(modelSearch.toLowerCase())
    );
  }, [modelsWithData, modelSearch]);

  const totalPages = Math.ceil(filtered.length / MODELS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * MODELS_PER_PAGE, page * MODELS_PER_PAGE);

  return (
    <div className="min-h-screen gradient-bg">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground">All Models</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {filtered.length} model{filtered.length !== 1 ? "s" : ""} available
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search models..."
              value={modelSearch}
              onChange={(e) => { setModelSearch(e.target.value); setPage(1); }}
              className="w-full bg-secondary text-foreground placeholder:text-muted-foreground rounded-lg py-2.5 pl-10 pr-4 text-sm border border-border focus:border-primary focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Model Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((model) => (
            <Link
              key={model.code}
              to={`/model/${encodeURIComponent(model.code)}`}
              className="group card-gradient rounded-xl border border-border overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-glow)] hover:scale-[1.02]"
            >
              <div className="relative aspect-video bg-secondary overflow-hidden">
                {model.thumb ? (
                  <img
                    src={model.thumb}
                    alt={model.code}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-display font-bold text-foreground group-hover:text-primary transition-colors">
                  {model.code}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {model.videoCount} video{model.videoCount !== 1 ? "s" : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {paginated.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No models found</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-secondary-foreground transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-9 h-9 text-sm rounded-lg transition-colors ${
                  page === p
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground disabled:opacity-40 disabled:hover:bg-secondary disabled:hover:text-secondary-foreground transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Models;
