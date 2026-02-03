import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";

import LogoHoverMp4 from "../../assets/videos/PortHero1280x720.mp4";

export default function HoverVideo({
  active = false,
  objectPosition = "50% 50%", // 🔧 KNOB: crop focus (e.g. "50% 40%")
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);

  const src = LogoHoverMp4;

  // Reduced motion: hide moving background entirely (for now)
  const showVideo = useMemo(() => !reduceMotion && !!src, [reduceMotion, src]);

  // Try to start playback once on mount.
  // If the browser blocks autoplay, we'll try again on first hover (below).
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    el.play?.().catch(() => {});
  }, []);

  // On hover, we "nudge" play() again (helps if autoplay was blocked).
  // IMPORTANT: we do NOT pause on unhover, and we do NOT reset currentTime.
  useEffect(() => {
    if (!active) return;

    const el = videoRef.current;
    if (!el) return;

    el.play?.().catch(() => {});
  }, [active]);

  if (!showVideo) return null;

  return (
    <div
      className="
        absolute
        inset-0
        z-0
        pointer-events-none
        overflow-hidden
      "
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 200ms linear", // 🔧 KNOB: fade speed
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full"
        style={{
          objectFit: "cover",
          objectPosition,
        }}
        muted
        playsInline
        loop
        preload="auto"
        autoPlay // ✅ let the browser start it ASAP
      />
    </div>
  );
}