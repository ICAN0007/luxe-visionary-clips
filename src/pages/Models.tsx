import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import VideoGrid from "@/components/VideoGrid";
import VideoPlayer from "@/components/VideoPlayer";
import Footer from "@/components/Footer";
import { videos, modelCodes, type Video } from "@/data/videos";

const Models = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedModel = searchParams.get("code");
  const [playingVideo, setPlayingVideo] = useState<Video | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const modelVideos = selectedModel
    ? videos.filter((v) => v.model === selectedModel)
    : [];

  return (
    <div className="min-h-screen gradient-bg">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          {selectedModel ? `Model: ${selectedModel}` : "All Models"}
        </h1>
        <p className="text-muted-foreground mb-6">
          {selectedModel
            ? `Showing ${modelVideos.length} video${modelVideos.length !== 1 ? "s" : ""} for model ${selectedModel}`
            : "Select a model to view their videos"}
        </p>

        {/* Model Code Grid */}
        <div className="flex flex-wrap gap-2 mb-8">
          {modelCodes.map((code, i) => (
            <button
              key={code + i}
              onClick={() =>
                setSearchParams(selectedModel === code ? {} : { code })
              }
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                selectedModel === code
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                  : "bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {code}
            </button>
          ))}
        </div>

        {/* Videos for selected model */}
        {selectedModel ? (
          modelVideos.length > 0 ? (
            <VideoGrid videos={modelVideos} onPlay={setPlayingVideo} />
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">No videos found for model {selectedModel}</p>
            </div>
          )
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">Click a model code above to see their videos</p>
          </div>
        )}
      </main>

      <Footer />

      {playingVideo && (
        <VideoPlayer
          video={playingVideo}
          allVideos={videos}
          onPlay={setPlayingVideo}
          onClose={() => setPlayingVideo(null)}
        />
      )}
    </div>
  );
};

export default Models;
