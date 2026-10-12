'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { VIDEOS } from '@/components/TestimonialVideoSection';

type Video = (typeof VIDEOS)[number];

// `oardefault` keeps the original 9:16 Shorts framing; `hqdefault` is the safe fallback
const poster = (id: string) => `https://i.ytimg.com/vi/${id}/oardefault.jpg`;
const posterFallback = (id: string) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
};

function Poster({ youtubeId, className }: { youtubeId: string; className?: string }) {
  const [src, setSrc] = useState(poster(youtubeId));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      loading="lazy"
      draggable={false}
      className={className}
      onError={() => setSrc(posterFallback(youtubeId))}
    />
  );
}

// ── Icons (lucide: play, pause, volume-2, volume-x, chevron-left/right) ──
const iconProps = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};
const PlayIcon = ({ className }: { className?: string }) => (
  <svg {...iconProps} className={className}><polygon points="6 3 20 12 6 21 6 3" /></svg>
);
const PauseIcon = ({ className }: { className?: string }) => (
  <svg {...iconProps} className={className}><rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" /></svg>
);
const VolumeIcon = ({ className }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
    <path d="M16 9a5 5 0 0 1 0 6" />
    <path d="M19.364 18.364a9 9 0 0 0 0-12.728" />
  </svg>
);
const MuteIcon = ({ className }: { className?: string }) => (
  <svg {...iconProps} className={className}>
    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
    <line x1="22" x2="16" y1="9" y2="15" />
    <line x1="16" x2="22" y1="9" y2="15" />
  </svg>
);
const ChevronLeft = ({ className }: { className?: string }) => (
  <svg {...iconProps} className={className}><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRight = ({ className }: { className?: string }) => (
  <svg {...iconProps} className={className}><path d="m9 18 6-6-6-6" /></svg>
);

// ── Active card: YouTube player driven through the iframe postMessage API ──
// Browsers only allow muted autoplay, so videos start muted; the speaker button turns sound on.
// `inView` starts / pauses playback as the section scrolls in and out; `onEnded` advances the carousel.
function ActiveVideo({ video, inView, onEnded }: { video: Video; inView: boolean; onEnded: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const userPaused = useRef(false);
  const gotInfo = useRef(false);
  const lastTime = useRef(0);
  const ended = useRef(false);
  const onEndedRef = useRef(() => {
    if (ended.current) return;
    ended.current = true;
    onEnded();
  });

  const command = useCallback((func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), '*');
  }, []);

  // Autoplay when visible, pause when scrolled away
  useEffect(() => {
    if (inView) {
      if (!started) { setStarted(true); setPlaying(true); }
      else if (!userPaused.current) { command('playVideo'); setPlaying(true); }
    } else if (started) {
      command('pauseVideo');
      setPlaying(false);
    }
  }, [inView, started, command]);

  // Safety net: if the player never reports back (blocked embed), move on instead of stalling
  useEffect(() => {
    if (!started || !inView) return;
    const t = setTimeout(() => { if (!gotInfo.current) onEndedRef.current(); }, 15000);
    return () => clearTimeout(t);
  }, [started, inView]);

  useEffect(() => {
    if (!started) return;
    const onMessage = (e: MessageEvent) => {
      if (e.source !== iframeRef.current?.contentWindow || typeof e.data !== 'string') return;
      let data: { event?: string; info?: { currentTime?: number; duration?: number; playerState?: number; muted?: boolean } };
      try { data = JSON.parse(e.data); } catch { return; }
      if (data.event !== 'infoDelivery' || !data.info) return;
      gotInfo.current = true;
      const { currentTime, duration: d, playerState, muted: m } = data.info;
      if (typeof currentTime === 'number') {
        // Some embeds only stream currentTime, never playerState — treat advancing time as playing
        if (currentTime > lastTime.current + 0.05 && !userPaused.current) setPlaying(true);
        lastTime.current = currentTime;
        setTime(currentTime);
      }
      if (typeof d === 'number' && d > 0) setDuration(d);
      if (playerState === 0) { onEndedRef.current(); return; }
      if (typeof playerState === 'number') setPlaying(playerState === 1 || playerState === 3);
      if (typeof m === 'boolean') setMuted(m);
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [started]);

  const onIframeLoad = () => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: video.youtubeId, channel: 'widget' }), '*');
  };

  const togglePlay = () => {
    if (!started) { userPaused.current = false; setStarted(true); setPlaying(true); return; }
    if (playing) { userPaused.current = true; command('pauseVideo'); setPlaying(false); }
    else { userPaused.current = false; command('playVideo'); setPlaying(true); }
  };

  const toggleMute = () => {
    if (!started) return;
    command(muted ? 'unMute' : 'mute');
    setMuted(!muted);
  };

  const seek = (t: number) => {
    setTime(t);
    command('seekTo', [t, true]);
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  return (
    <>
      {started ? (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?enablejsapi=1&autoplay=1&mute=1&controls=0&cc_load_policy=0&playsinline=1&rel=0&modestbranding=1&iv_load_policy=3&origin=${encodeURIComponent(origin)}`}
          title={`Patient video: ${video.name}`}
          onLoad={onIframeLoad}
          className="pointer-events-none absolute inset-0 h-full w-full scale-[1.02] bg-black"
          allow="autoplay; encrypted-media; picture-in-picture"
        />
      ) : (
        <Poster youtubeId={video.youtubeId} className="absolute inset-0 h-full w-full bg-black object-cover" />
      )}

      {/* Click anywhere on the video to play / pause */}
      <button type="button" aria-label={playing ? 'Pause video' : 'Play video'} onClick={togglePlay} className="absolute inset-0 h-full w-full cursor-pointer" />

      {!playing && (
        <button
          type="button"
          aria-label="Play video"
          onClick={togglePlay}
          className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#D3BB71] text-[#1D4231] shadow-[0_0_0_10px_rgba(211,187,113,.3)] transition hover:scale-110"
        >
          <PlayIcon className="ml-1 h-6 w-6 fill-[#1D4231]" />
        </button>
      )}

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/45 to-transparent px-3 pt-12 pb-3">
        <p className="text-[15px] leading-tight font-semibold text-white">{video.name}</p>
        <p className="mt-0.5 text-[11px] font-medium tracking-[1px] text-[#D3BB71] uppercase">Dental Implant</p>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={Math.min(time, duration || 0)}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek video"
          className="mt-2.5 h-1 w-full cursor-pointer accent-[#D3BB71]"
        />
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            aria-label={playing ? 'Pause video' : 'Play video'}
            onClick={togglePlay}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-[#D3BB71] hover:text-[#1D4231]"
          >
            {playing ? <PauseIcon className="h-4 w-4 fill-white" /> : <PlayIcon className="ml-0.5 h-4 w-4 fill-white" />}
          </button>
          <span className="text-xs font-medium text-white/85 tabular-nums">
            {formatTime(time)} / {formatTime(duration)}
          </span>
          <button
            type="button"
            aria-label={muted ? 'Unmute video' : 'Mute video'}
            onClick={toggleMute}
            className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-[#D3BB71] hover:text-[#1D4231]"
          >
            {muted ? <MuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </>
  );
}

// ── Fanned carousel: active card in front, neighbours tilted behind ──
export default function PatientVideoCarousel() {
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const n = VIDEOS.length;
  const go = (i: number) => setActive((i + n) % n);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cardBase =
    'absolute inset-0 overflow-hidden rounded-[22px] bg-[#0a1f17] shadow-[0_14px_34px_rgba(29,66,49,.3)] ring-1 ring-black/5 transition-all duration-700 ease-out';

  return (
    <div ref={rootRef} className="relative py-4 lg:w-[460px]" role="region" aria-roledescription="carousel" aria-label="Patient videos">
      <div className="relative mx-auto aspect-[9/16] w-[230px] sm:w-[300px]">
        {VIDEOS.map((video, i) => {
          const offset = (i - active + n) % n;
          const isActive = offset === 0;
          const isNext = offset === 1;
          const isPrev = offset === n - 1;

          if (isActive) {
            return (
              <div key={video.id} aria-hidden="false" className={`${cardBase} z-20 translate-x-0 rotate-0 scale-100 opacity-100`}>
                <ActiveVideo key={video.youtubeId} video={video} inView={inView} onEnded={() => go(active + 1)} />
              </div>
            );
          }

          const pos = isNext
            ? 'z-10 translate-x-[34%] rotate-[8deg] scale-[.82] opacity-60 hover:opacity-80'
            : isPrev
              ? 'z-10 -translate-x-[34%] -rotate-[8deg] scale-[.82] opacity-60 hover:opacity-80'
              : 'pointer-events-none z-0 translate-x-0 rotate-0 scale-[.7] opacity-0';

          return (
            <div key={video.id} aria-hidden="true" className={`${cardBase} ${pos}`}>
              <button
                type="button"
                tabIndex={isNext || isPrev ? 0 : -1}
                aria-label={`Show patient video: ${video.name}`}
                onClick={() => go(i)}
                className="absolute inset-0 h-full w-full"
              >
                <Poster youtubeId={video.youtubeId} className="h-full w-full object-cover" />
              </button>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous video"
        onClick={() => go(active - 1)}
        className="absolute top-1/2 left-0 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#D3BB71]/50 bg-white text-[#1D4231] shadow-sm transition hover:border-[#1D4231] hover:bg-[#1D4231] hover:text-[#D3BB71]"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next video"
        onClick={() => go(active + 1)}
        className="absolute top-1/2 right-0 z-30 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-[#D3BB71]/50 bg-white text-[#1D4231] shadow-sm transition hover:border-[#1D4231] hover:bg-[#1D4231] hover:text-[#D3BB71]"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
