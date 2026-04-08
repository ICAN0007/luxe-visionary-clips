import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Heart, Send, Trash2, Play } from "lucide-react";
import CustomVideoPlayer from "@/components/CustomVideoPlayer";
import { videos, type Video } from "@/data/videos";
import { Banner300x250, Banner320x50, SmartlinkBanner } from "@/components/ui/AdScripts";

interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: number;
  likes: number;
  liked: boolean;
}

const foreignNames = [
  "Aleksei", "Yuki", "Marta", "Chen Wei", "Luca", "Ines", "Bjorn",
  "Sakura", "Pavel", "Freya", "Ravi", "Amara", "Hugo", "Mei Lin",
  "Sven", "Zara", "Dmitri", "Aisha", "Kenji", "Esme",
];

const generateUsername = () => {
  const name = foreignNames[Math.floor(Math.random() * foreignNames.length)];
  return `${name}_${Math.floor(Math.random() * 9000 + 1000)}`;
};

const getStoredUsername = (): string => {
  let name = localStorage.getItem("guest_username");
  if (!name) {
    name = generateUsername();
    localStorage.setItem("guest_username", name);
  }
  return name;
};

const timeAgo = (ts: number) => {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const formatDuration = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const video = videos.find((v) => v.id === id);

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [sortBy, setSortBy] = useState<"latest" | "top">("latest");
  const username = getStoredUsername();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const stored = localStorage.getItem(`comments_${id}`);
    if (stored) setComments(JSON.parse(stored));
    else setComments([]);

    const likeData = localStorage.getItem(`likes_${id}`);
    if (likeData) {
      const parsed = JSON.parse(likeData);
      setLiked(parsed.liked);
      setLikeCount(parsed.count);
    } else {
      setLiked(false);
      setLikeCount(Math.floor(Math.random() * 200 + 10));
    }
  }, [id]);

  const saveComments = (c: Comment[]) => {
    setComments(c);
    localStorage.setItem(`comments_${id}`, JSON.stringify(c));
  };

  const toggleLike = () => {
    const newLiked = !liked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    setLiked(newLiked);
    setLikeCount(newCount);
    localStorage.setItem(`likes_${id}`, JSON.stringify({ liked: newLiked, count: newCount }));
  };

  const addComment = () => {
    if (!commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      username,
      text: commentText.trim(),
      timestamp: Date.now(),
      likes: 0,
      liked: false,
    };
    saveComments([newComment, ...comments]);
    setCommentText("");
  };

  const toggleCommentLike = (commentId: string) => {
    saveComments(
      comments.map((c) =>
        c.id === commentId
          ? { ...c, liked: !c.liked, likes: c.liked ? c.likes - 1 : c.likes + 1 }
          : c
      )
    );
  };

  const deleteComment = (commentId: string) => {
    saveComments(comments.filter((c) => c.id !== commentId));
  };

  if (!video) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display font-bold text-foreground mb-4">Video Not Found</h1>
          <button onClick={() => navigate("/")} className="text-primary hover:underline">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const sameModel = videos.filter((v) => v.id !== video.id && v.model === video.model);
  const sameTag = videos.filter(
    (v) => v.id !== video.id && v.model !== video.model && v.tags.some((t) => video.tags.includes(t))
  );
  const recommended = [...sameModel, ...sameTag].slice(0, 8);
  const relatedByModel = sameModel.slice(0, 6);
  const relatedByTag = sameTag.slice(0, 6);

  const sortedComments = [...comments].sort((a, b) =>
    sortBy === "top" ? b.likes - a.likes : b.timestamp - a.timestamp
  );

  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Back</span>
          </button>
          <Link to="/" className="text-xl font-display font-bold text-primary">
            LUXE
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <CustomVideoPlayer
              src={video.src}
              poster={video.thumb}
              autoPlay
            />

            {/* Video Info */}
            <div className="mt-4">
              <h1 className="text-xl md:text-2xl font-display font-bold text-foreground">
                {video.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2">
                <Link
                  to={`/model/${encodeURIComponent(video.model)}`}
                  className="text-primary hover:underline font-medium text-sm"
                >
                  {video.model}
                </Link>
                <span className="text-muted-foreground text-xs">•</span>
                {video.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tag}
                  </span>
                ))}
                {video.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              {/* Like Button */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={toggleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                    liked
                      ? "bg-primary/20 text-primary"
                      : "bg-secondary text-secondary-foreground hover:bg-muted"
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? "fill-primary" : ""}`} />
                  <span className="text-sm font-medium">{likeCount}</span>
                </button>
              </div>
            </div>

            {/* Comments */}
            <div className="mt-8 border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-display font-bold text-foreground">
                  Comments ({comments.length})
                </h2>
                <div className="flex gap-2">
                  {(["latest", "top"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`text-xs px-3 py-1 rounded-full transition-colors ${
                        sortBy === s ? "pill-active" : "pill-inactive"
                      }`}
                    >
                      {s === "latest" ? "Latest" : "Top"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add Comment */}
              <div className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">
                  {username[0].toUpperCase()}
                </div>
                <div className="flex-1 flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addComment()}
                    placeholder="Add a comment..."
                    className="flex-1 bg-secondary border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                  <button
                    onClick={addComment}
                    disabled={!commentText.trim()}
                    className="p-2 rounded-full accent-gradient text-primary-foreground disabled:opacity-40 transition-opacity"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {sortedComments.map((c) => (
                  <div key={c.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs font-bold flex-shrink-0">
                      {c.username[0].toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{c.username}</span>
                        <span className="text-xs text-muted-foreground">{timeAgo(c.timestamp)}</span>
                      </div>
                      <p className="text-sm text-secondary-foreground mt-1">{c.text}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          onClick={() => toggleCommentLike(c.id)}
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Heart className={`w-3.5 h-3.5 ${c.liked ? "fill-primary text-primary" : ""}`} />
                          {c.likes > 0 && c.likes}
                        </button>
                        {c.username === username && (
                          <button
                            onClick={() => deleteComment(c.id)}
                            className="text-xs text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No comments yet. Be the first!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recommended Videos Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            {/* Sidebar Ad */}
            <div className="hidden lg:block mb-4">
              <Banner300x250 />
            </div>
            <div className="block lg:hidden mb-4">
              <Banner320x50 />
            </div>

            <h3 className="text-lg font-display font-bold text-foreground mb-4">
              Recommended
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
              {recommended.map((v) => (
                <Link
                  key={v.id}
                  to={`/video/${v.id}`}
                  className="video-card group flex flex-col lg:flex-row gap-3"
                >
                  <div className="relative aspect-video lg:w-40 flex-shrink-0 overflow-hidden">
                    <img
                      src={v.thumb || "/placeholder.svg"}
                      alt={v.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                      <Play className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-background/80 text-foreground text-xs px-1.5 py-0.5 rounded">
                      {formatDuration(v.duration)}
                    </span>
                  </div>
                  <div className="p-2 lg:p-0 lg:py-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{v.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{v.model}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        {/* Related Videos - Bottom Section */}
        {(relatedByModel.length > 0 || relatedByTag.length > 0) && (
          <div className="mt-10 border-t border-border pt-8">
            {relatedByModel.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-display font-bold text-foreground mb-4">
                  More from <Link to={`/model/${encodeURIComponent(video.model)}`} className="text-primary hover:underline">{video.model}</Link>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {relatedByModel.map((v) => (
                    <Link key={v.id} to={`/video/${v.id}`} className="video-card group">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img src={v.thumb || "/placeholder.svg"} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                          <Play className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-background/80 text-foreground text-xs px-1.5 py-0.5 rounded">{formatDuration(v.duration)}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground mt-2 truncate">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.model}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {relatedByTag.length > 0 && (
              <div>
                <h3 className="text-lg font-display font-bold text-foreground mb-4">
                  Related Videos
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {relatedByTag.map((v) => (
                    <Link key={v.id} to={`/video/${v.id}`} className="video-card group">
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img src={v.thumb || "/placeholder.svg"} alt={v.title} className="w-full h-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center">
                          <Play className="w-8 h-8 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" fill="currentColor" />
                        </div>
                        <span className="absolute bottom-1 right-1 bg-background/80 text-foreground text-xs px-1.5 py-0.5 rounded">{formatDuration(v.duration)}</span>
                      </div>
                      <p className="text-sm font-medium text-foreground mt-2 truncate">{v.title}</p>
                      <p className="text-xs text-muted-foreground">{v.model}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoPage;
