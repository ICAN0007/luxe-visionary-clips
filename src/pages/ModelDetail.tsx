import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import VideoGrid from "@/components/VideoGrid";
import { videos } from "@/data/videos";
import { useState } from "react";

const ModelDetail = () => {
  const { code } = useParams<{ code: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const modelVideos = useMemo(
    () => videos.filter((v) => v.model === code),
    [code]
  );

  return (
    <div className="min-h-screen gradient-bg">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Link
            to="/models"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back to Models</span>
          </Link>
        </div>

        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          {code}
        </h1>
        <p className="text-muted-foreground mb-8">
          {modelVideos.length} video{modelVideos.length !== 1 ? "s" : ""}
        </p>

        {modelVideos.length > 0 ? (
          <VideoGrid videos={modelVideos} />
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No videos found for {code}
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ModelDetail;
