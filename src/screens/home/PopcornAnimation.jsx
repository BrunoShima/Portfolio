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
  count = 20,         // 🔧 KNOB: number of images visible (try 12–22)
  driftSeconds = 60,  // 🔧 KNOB: speed (higher = slower, lower = faster)
}) {
  const particlesRef = useRef(null);

  const particles = useMemo(() => {
    if (!images.length) return [];
    if (particlesRef.current) return particlesRef.current;

    const actualCount = Math.min(count, images.length);

    const uniqueImageIndices = pickUniqueIndices(images.length, actualCount);

    const lanes = actualCount * 4; // 🔧 KNOB: vertical spacing (increase for more separation)
    const laneIndices = pickUniqueIndices(lanes, actualCount);

    const topPaddingPct = -5;    // 🔧 KNOB: keep off top edge (increase to push down)
    const bottomPaddingPct = 6; // 🔧 KNOB: keep off bottom edge (increase to push up)

    const usablePct = 100 - topPaddingPct - bottomPaddingPct;
    const laneHeightPct = usablePct / lanes;

    const segment = driftSeconds / actualCount;

    const pool = Array.from({ length: actualCount }, (_, i) => {
      const imgIndex = uniqueImageIndices[i];

      const laneTopPct = topPaddingPct + laneIndices[i] * laneHeightPct;

      const jitterY = (Math.random() - 0.5) * laneHeightPct * 0.35; // 🔧 KNOB: vertical randomness
      const topPct = laneTopPct + jitterY;

      const scale = 0.9 + Math.random() * 0.35; // 🔧 KNOB: size variation

      const baseDelay = -(i * segment);
      const jitterDelay = (Math.random() - 0.5) * segment * 0.6; // 🔧 KNOB: horizontal clumping vs evenness
      const delay = Math.max(-driftSeconds, Math.min(0, baseDelay + jitterDelay));

      const opacity = 0.7 + Math.random() * 0.3; // 🔧 KNOB: opacity variation

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
        transition: "opacity 200ms linear", // 🔧 KNOB: fade-in/out speed (ms)
      }}
    >
      <style>
        {`
            @keyframes popcorn-drift {
            from { transform: translate3d(115vw, 0, 0); } /* 🔧 KNOB: start further right */
            to   { transform: translate3d(-35vw, 0, 0); } /* 🔧 KNOB: exit further left */
            }
        `}
      </style>

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
                  width: "clamp(120px, 16vw, 240px)", // 🔧 KNOB: base size across screen sizes
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}