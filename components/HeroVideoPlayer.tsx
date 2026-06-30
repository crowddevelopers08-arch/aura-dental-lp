'use client';

import { useCallback, useRef, useState } from 'react';

type HeroVideoPlayerProps = {
  className?: string;
  src?: string;
};

export function HeroVideoPlayer({ className, src = '/shirthero.mp4' }: HeroVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10 ${className ?? ''}`}>
      <video
        ref={videoRef}
        className="aspect-video w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
      </video>
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
        <button
          onClick={togglePlay}
          aria-label={playing ? 'Pause video' : 'Play video'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D3BB71]/20 text-[#D3BB71] backdrop-blur-sm transition hover:bg-[#D3BB71]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3BB71]"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            {playing ? 'pause' : 'play_arrow'}
          </span>
        </button>
        <button
          onClick={toggleMute}
          aria-label={muted ? 'Unmute video' : 'Mute video'}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D3BB71]/20 text-[#D3BB71] backdrop-blur-sm transition hover:bg-[#D3BB71]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D3BB71]"
        >
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: '"FILL" 1' }}>
            {muted ? 'volume_off' : 'volume_up'}
          </span>
        </button>
      </div>
    </div>
  );
}
