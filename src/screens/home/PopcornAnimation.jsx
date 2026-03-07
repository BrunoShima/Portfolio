import { useMemo, useRef } from "react";

function pickUniqueIndices(total, count) {
  const indices = Array.from({ length: total }, (_, i) => i);

  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  return indices.slice(0, count);
}

export default function PopcornAnimation({
  images = [],
  active = false,
  count = 25,          // KNOB: number of images visible
  driftSeconds = 99,   // KNOB: popcorn speed (higher = slower / lower = faster)
  bgSrc = "",
  bgDriftSeconds = 180
}) {
  const particlesRef = useRef(null);

  const particles = useMemo(() => {
    if (!images.length) return [];
    if (particlesRef.current) return particlesRef.current;

    const actualCount = Math.min(count, images.length);

    const uniqueImageIndices = pickUniqueIndices(images.length, actualCount);

    // Vertical lanes
    const lanes = actualCount * 4;          // KNOB: vertical spacing
    const laneIndices = pickUniqueIndices(lanes, actualCount);

    const topPaddingPct = -5;               // KNOB: top edge
    const bottomPaddingPct = 6;             // KNOB: bottom edge
    const usablePct = 100 - topPaddingPct - bottomPaddingPct;
    const laneHeightPct = usablePct / lanes;

    // Horizontal lanes
    const timeSlots = actualCount * 4;      // KNOB: horizontal breathing room
    const timeSlotIndices = pickUniqueIndices(timeSlots, actualCount);
    const slotDuration = driftSeconds / timeSlots;

    const pool = Array.from({ length: actualCount }, (_, i) => {
      const imgIndex = uniqueImageIndices[i];

      const laneTopPct = topPaddingPct + laneIndices[i] * laneHeightPct;
      const jitterY = (Math.random() - 0.5) * laneHeightPct * 0.9; // KNOB
      const topPct = laneTopPct + jitterY;

      const scale = 0.9 + Math.random() * 0.35; // KNOB

      const baseDelay = -(timeSlotIndices[i] * slotDuration);
      const jitterDelay = (Math.random() - 0.5) * slotDuration * 0.5; // KNOB
      const delay = Math.max(-driftSeconds, Math.min(0, baseDelay + jitterDelay));

      const opacity = 0.7 + Math.random() * 0.3; // KNOB

      return {
        id: i,
        imgIndex,
        topPct,
        scale,
        delay,
        opacity,
      };
    });

    particlesRef.current = pool;
    return pool;
  }, [images.length, count, driftSeconds]);

  if (!images.length) return null;

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
        transition: "opacity 200ms linear", // KNOB
      }}
    >
      <style>
        {`
          @keyframes popcorn-drift {
            from { transform: translate3d(115vw, 0, 0); }
            to   { transform: translate3d(-35vw, 0, 0); }
          }
          @keyframes bg-drift {
            from { transform: translate3d(0, 0, 0); }
            to   { transform: translate3d(-60vw, 0, 0); }
          }
        `}
      </style>

      {bgSrc ? (
        <img
          src={bgSrc}
          alt=""
          aria-hidden="true"
          draggable="false"
          className="absolute top-0 left-0 block"
          style={{
            height: "100vh",
            width: "auto",
            maxWidth: "none",
            transform: "scale(1.08)",
            transformOrigin: "left center",
            animationName: "bg-drift",
            animationDuration: `${bgDriftSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: active ? "running" : "paused",
          }}
        />
      ) : null}

      {particles.map((p) => {
        const safeIndex = Math.min(p.imgIndex, images.length - 1);

        return (
          <div
            key={p.id}
            className="absolute left-0 select-none"
            style={{
              top: `${p.topPct}%`,
              opacity: p.opacity,
              animationName: "popcorn-drift",
              animationDuration: `${driftSeconds}s`,
              animationTimingFunction: "linear",
              animationIterationCount: "infinite",
              animationDelay: `${p.delay}s`,
              animationPlayState: active ? "running" : "paused",
            }}
          >
            <div
              style={{
                transform: `scale(${p.scale})`,
                transformOrigin: "center",
              }}
            >
              <img
                src={images[safeIndex]}
                alt=""
                aria-hidden="true"
                draggable="false"
                decoding="async"
                className="block h-auto"
                style={{
                  width: "clamp(200px, 16vw, 1000px)", // KNOB
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}