import { useEffect, useMemo, useRef } from "react";
import { useReducedMotion } from "motion/react";

import LogoHoverMp4 from "../../assets/videos/PortHero1280x720.mp4";

export default function HoverVideo({
  active = false,
  objectPosition = "50% 50%",
}) {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef(null);
  const src = LogoHoverMp4;
  const showVideo = useMemo(() => !reduceMotion && !!src, [reduceMotion, src]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.play?.().catch(() => {});
  }, []);

  useEffect(() => {
    if (!active) return;
    const el = videoRef.current;
    if (!el) return;
    el.play?.().catch(() => {});
  }, [active]);

  if (!showVideo) return null;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 200ms linear",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "cover", objectPosition }}
        muted
        playsInline
        loop
        preload="auto"
        autoPlay
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at top left, rgba(255,183,2,0.8) 0%, transparent 60%),
            radial-gradient(ellipse at bottom right, rgba(255,183,2,0.8) 0%, transparent 60%)
          `
        }}
      />
    </div>
  );
}