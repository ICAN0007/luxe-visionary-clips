import { useState, useEffect } from "react";
import AgeVerification from "@/components/AgeVerification";
import Header from "@/components/Header";
import FilterBar from "@/components/FilterBar";
import FeaturedVideo from "@/components/FeaturedVideo";
import VideoGrid from "@/components/VideoGrid";
import Sidebar from "@/components/Sidebar";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { videos, type Video } from "@/data/videos";

const Index = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [visibleCount, setVisibleCount] = useState(8);
  const [activeTab, setActiveTab] = useState("RECENT POSTS");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeModel, setActiveModel] = useState<string | null>(null);

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

  const ITEMS_PER_PAGE = 8;

  const filtered = videos.filter((v) => {
    const matchSearch = v.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchFilter = activeFilter === "All" || v.categories.includes(activeFilter);
    const matchModel = !activeModel || (v.models && v.models.includes(activeModel));
    return matchSearch && matchFilter && matchModel;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const displayedVideos = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen gradient-bg">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-6">
        <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        <div className="flex flex-col lg:flex-row gap-8 mt-6">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            <FeaturedVideo video={videos[0]} onPlay={setPlayingVideo} />
            <VideoGrid videos={displayedVideos} onPlay={setPlayingVideo} />

            {/* Load More */}
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

            {/* Bottom Tabs */}
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

            {/* Pagination */}
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
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <Sidebar activeModel={activeModel} onModelClick={(code) => { setActiveModel(code || null); setCurrentPage(1); }} />
          </div>
        </div>
      </main>

      <Footer />

      {playingVideo && (
        <VideoPlayer video={playingVideo} allVideos={videos} onPlay={setPlayingVideo} onClose={() => setPlayingVideo(null)} />
      )}
    </div>
  );
};

export default Index;
