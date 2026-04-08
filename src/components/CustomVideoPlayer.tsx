import { useState, useRef, useEffect, useCallback } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
} from "lucide-react";

interface CustomVideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
}

const formatTime = (seconds: number) => {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const CustomVideoPlayer = ({ src, poster, autoPlay = true }: CustomVideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [buffered, setBuffered] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverX, setHoverX] = useState(0);
  const [videoError, setVideoError] = useState(false);

  const resetIdleTimer = useCallback(() => {
    setShowControls(true);
    clearTimeout(idleTimer.current);
    if (playing) {
      idleTimer.current = setTimeout(() => setShowControls(false), 3000);
    }
  }, [playing]);

  useEffect(() => {
    resetIdleTimer();
    return () => clearTimeout(idleTimer.current);
  }, [playing, resetIdleTimer]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const val = parseFloat(e.target.value);
    v.volume = val;
    setVolume(val);
    if (val === 0) {
      v.muted = true;
      setMuted(true);
    } else if (muted) {
      v.muted = false;
      setMuted(false);
    }
  };

  const toggleFullscreen = () => {
    const el = containerRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const onFsChange = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const seekTo = (clientX: number) => {
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = pct * v.duration;
    setCurrentTime(v.currentTime);
  };

  const onProgressMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    seekTo(e.clientX);
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => seekTo(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging]);

  const onProgressHover = (e: React.MouseEvent) => {
    const bar = progressRef.current;
    if (!bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
    setHoverTime(pct * duration);
    setHoverX(e.clientX - rect.left);
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group select-none"
      onMouseMove={resetIdleTimer}
      onMouseLeave={() => playing && setShowControls(false)}
      style={{ cursor: showControls ? "default" : "none" }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onTimeUpdate={() => {
          const v = videoRef.current;
          if (v && !dragging) setCurrentTime(v.currentTime);
        }}
        onLoadedMetadata={() => {
          const v = videoRef.current;
          if (v) {
            setDuration(v.duration);
            if (autoPlay) {
              v.play().then(() => setPlaying(true)).catch(() => {});
            }
          }
        }}
        onProgress={() => {
          const v = videoRef.current;
          if (v && v.buffered.length > 0) {
            setBuffered((v.buffered.end(v.buffered.length - 1) / v.duration) * 100);
          }
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setVideoError(true)}
      />

      {/* Big center play button when paused */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300"
        >
          <div className="w-16 h-16 rounded-full accent-gradient flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110">
            <Play className="w-7 h-7 text-primary-foreground ml-1" fill="currentColor" />
          </div>
        </button>
      )}

      {/* Controls overlay */}
      <div
        className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-12 transition-opacity duration-300"
        style={{
          background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? "auto" : "none",
        }}
      >
        {/* Progress bar */}
        <div
          ref={progressRef}
          className="relative w-full h-1 group/bar cursor-pointer mb-3 rounded-full"
          onMouseDown={onProgressMouseDown}
          onMouseMove={onProgressHover}
          onMouseLeave={() => setHoverTime(null)}
        >
          {/* Track bg */}
          <div className="absolute inset-0 rounded-full bg-white/20" />
          {/* Buffered */}
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-white/30 transition-[width] duration-200"
            style={{ width: `${buffered}%` }}
          />
          {/* Progress fill */}
          <div
            className="absolute inset-y-0 left-0 rounded-full accent-gradient transition-[width] duration-100"
            style={{ width: `${progress}%` }}
          />
          {/* Thumb */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-primary shadow-md transition-transform duration-150 scale-0 group-hover/bar:scale-100"
            style={{ left: `${progress}%`, transform: `translate(-50%, -50%)` }}
          />
          {/* Hover tooltip */}
          {hoverTime !== null && (
            <div
              className="absolute -top-8 px-2 py-0.5 rounded bg-black/80 text-white text-xs pointer-events-none"
              style={{ left: `${hoverX}px`, transform: "translateX(-50%)" }}
            >
              {formatTime(hoverTime)}
            </div>
          )}
          {/* Expand hit area */}
          <div className="absolute -inset-y-2 inset-x-0" />
        </div>

        {/* Bottom controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="text-white hover:text-primary transition-colors duration-200"
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" fill="currentColor" />}
          </button>

          {/* Volume */}
          <div className="flex items-center gap-1.5 group/vol">
            <button
              onClick={toggleMute}
              className="text-white hover:text-primary transition-colors duration-200"
            >
              {muted || volume === 0 ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={muted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-0 group-hover/vol:w-20 transition-all duration-300 accent-primary h-1 cursor-pointer opacity-0 group-hover/vol:opacity-100"
              style={{ accentColor: "hsl(16 100% 50%)" }}
            />
          </div>

          {/* Time */}
          <span className="text-white/80 text-xs font-mono ml-1">
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div className="flex-1" />

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-primary transition-colors duration-200"
          >
            {fullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
