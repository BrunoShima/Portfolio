import { useMemo } from "react";

const SLOTS = [
  { topPct: -5, delay: 0      },
  { topPct: 65, delay: 4.375  },
  { topPct: 25, delay: 8.75   },
  { topPct: 85, delay: 13.125 },
  { topPct: 42, delay: 17.5   },
  { topPct: -3, delay: 21.875 },
  { topPct: 70, delay: 26.25  },
  { topPct: 35, delay: 30.625 },
  { topPct: 55, delay: 35     },
  { topPct: 8,  delay: 39.375 },
  { topPct: 88, delay: 43.75  },
  { topPct: 30, delay: 48.125 },
  { topPct: 50, delay: 52.5   },
  { topPct: -8, delay: 56.875 },
  { topPct: 75, delay: 61.25  },
  { topPct: 40, delay: 65.625 },
];

const DURATION = 70; // seconds to cross the screen

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function PopcornAnimation({
  images = [],
  active = false,
  bgSrc = "",
  bgDriftSeconds = 180,
}) {
  const assigned = useMemo(() => {
    if (!images.length) return [];

    const shuffled = shuffle(images);
    return SLOTS.map((slot, i) => ({
      ...slot,
      src: shuffled[i % shuffled.length],
    }));
  }, [images]);

  if (!images.length) return null;

  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      style={{
        opacity: active ? 1 : 0,
        transition: "opacity 200ms linear",
      }}
    >
      <style>{`
        @keyframes popcorn-drift {
          from { transform: translate3d(105vw, 0, 0); }
          to   { transform: translate3d(-15vw, 0, 0); }
        }
        @keyframes bg-drift {
          from { transform: translate3d(0, 0, 0) scale(1.08); }
          to   { transform: translate3d(-60vw, 0, 0) scale(1.08); }
        }
      `}</style>

      {bgSrc && (
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
            transformOrigin: "left center",
            animationName: "bg-drift",
            animationDuration: `${bgDriftSeconds}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationPlayState: active ? "running" : "paused",
          }}
        />
      )}

      {assigned.map((slot, i) => (
        <div
          key={i}
          className="absolute left-0 select-none"
          style={{
            top: `${slot.topPct}%`,
            animationName: "popcorn-drift",
            animationDuration: `${DURATION}s`,
            animationTimingFunction: "linear",
            animationIterationCount: "infinite",
            animationDelay: `-${slot.delay}s`,
            animationPlayState: active ? "running" : "paused",
          }}
        >
          <img
            src={slot.src}
            alt=""
            aria-hidden="true"
            draggable="false"
            decoding="async"
            className="block h-auto"
            style={{
              width: "clamp(150px, 14vw, 280px)",
            }}
          />
        </div>
      ))}
    </div>
  );
}