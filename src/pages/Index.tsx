import { useState, useEffect } from "react";
import AgeVerification from "@/components/AgeVerification";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import FeaturedVideo from "@/components/FeaturedVideo";
import VideoGrid from "@/components/VideoGrid";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import { videos } from "@/data/videos";
import { Banner728x90, Banner320x50, SmartlinkBanner } from "@/components/ui/AdScripts";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("RECENT POSTS");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const verified = sessionStorage.getItem("age-verified");
    if (verified === "true") setIsVerified(true);
  }, []);

  const handleVerify = () => {
    sessionStorage.setItem("age-verified", "true");
    setIsVerified(true);
  };

  if (!isVerified) {
    return <AgeVerification onVerified={handleVerify} />;
  }

  const ITEMS_PER_PAGE = 12;

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
    setActiveCategory(null);
    setActiveModel(null);
    setCurrentPage(1);
  };

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setActiveFilter("All");
    } else {
      setActiveCategory(category);
      setActiveFilter(category);
    }
    setActiveModel(null);
    setCurrentPage(1);
  };

  const handleModelClick = (code: string) => {
    if (activeModel === code) {
      setActiveModel(null);
    } else {
      setActiveModel(code);
    }
    setCurrentPage(1);
  };

  const filtered = videos.filter((v) => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      !q ||
      v.title.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.tags.some((t) => t.toLowerCase().includes(q)) ||
      v.categories.some((c) => c.toLowerCase().includes(q));
    const matchFilter =
      activeFilter === "All" ||
      activeFilter === "Models" ||
      v.categories.includes(activeFilter);
    const matchModel = !activeModel || v.model === activeModel;
    return matchSearch && matchFilter && matchModel;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const displayedVideos = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen gradient-bg">
      <Header searchQuery={searchQuery} onSearchChange={(q) => { setSearchQuery(q); setCurrentPage(1); }} />

      {/* Top Ad Banner */}
      <div className="hidden md:block container mx-auto px-4 mt-4">
        <Banner728x90 />
      </div>
      <div className="block md:hidden container mx-auto px-4 mt-4">
        <Banner320x50 />
      </div>

      <main className="container mx-auto px-4 py-6">
        <FilterBar activeFilter={activeFilter} onFilterChange={handleFilterChange} />

        {(activeModel || activeCategory) && (
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-muted-foreground">Filtering:</span>
            {activeModel && (
              <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground flex items-center gap-1">
                Model: {activeModel}
                <button onClick={() => setActiveModel(null)} className="ml-1 hover:opacity-70">✕</button>
              </span>
            )}
            {activeCategory && (
              <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground flex items-center gap-1">
                {activeCategory}
                <button onClick={() => { setActiveCategory(null); setActiveFilter("All"); }} className="ml-1 hover:opacity-70">✕</button>
              </span>
            )}
            <button
              onClick={() => { setActiveModel(null); setActiveCategory(null); setActiveFilter("All"); setSearchQuery(""); setCurrentPage(1); }}
              className="text-xs text-muted-foreground hover:text-foreground ml-2"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          <div className="flex-1 min-w-0">
            {!searchQuery && !activeModel && !activeCategory && activeFilter === "All" && (
              <FeaturedVideo video={videos[0]} />
            )}

            {filtered.length > 0 ? (
              <VideoGrid videos={displayedVideos} />
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">No videos found</p>
                <button
                  onClick={() => { setActiveModel(null); setActiveCategory(null); setActiveFilter("All"); setSearchQuery(""); setCurrentPage(1); }}
                  className="mt-4 text-primary hover:underline text-sm"
                >
                  Clear filters
                </button>
              </div>
            )}

            {currentPage < totalPages && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  className="px-8 py-3 rounded-lg accent-gradient text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  LOAD MORE
                </button>
              </div>
            )}

            <div className="mt-10 border-t border-border pt-6">
              <div className="flex gap-6 mb-4">
                {["RECENT POSTS", "RECENT SEARCHES", "POPULAR SEARCHES"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium pb-2 transition-colors ${
                      activeTab === tab
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">
                {activeTab === "RECENT POSTS" && "Explore the latest fashion and lifestyle content curated just for you."}
                {activeTab === "RECENT SEARCHES" && "Your recent searches will appear here."}
                {activeTab === "POPULAR SEARCHES" && "Trending: Couture, Runway, Glamour, Premium Style, 4K Fashion"}
              </p>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <span className="text-sm text-muted-foreground mr-2">PAGES</span>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => { setCurrentPage(p); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                    className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                      currentPage === p
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-muted"
                    }`}
                  >
                    {p}
                  </button>
                ))}
                {totalPages > 5 && <span className="text-muted-foreground text-sm">… {totalPages}</span>}
              </div>
            )}
          </div>

          <div className="w-full lg:w-72 flex-shrink-0">
            <Sidebar
              activeModel={activeModel}
              onModelClick={handleModelClick}
              activeCategory={activeCategory || undefined}
              onCategoryClick={handleCategoryClick}
            />
          </div>
        </div>
      </main>

      {/* Bottom Smartlink Banner */}
      <SmartlinkBanner />

      <Footer />
    </div>
  );
};

export default Index;
