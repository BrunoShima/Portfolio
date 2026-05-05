import { useState } from "react";
import { useMotionValueEvent } from "motion/react";

export default function ScrollSpy({ sections, textPanelIndices, panelCount, scrollYProgress, containerRef }) {
  const [activeSection, setActiveSection] = useState(0);
  const seg = panelCount > 1 ? 1 / (panelCount - 1) : 1;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let active = 0;
    textPanelIndices.forEach((panelIdx, sectionIdx) => {
      if (latest >= panelIdx * seg - seg * 0.8) active = sectionIdx;
    });
    setActiveSection(active);
  });

  const scrollToSection = (sectionIdx) => {
    if (!containerRef.current) return;
    const panelIdx = textPanelIndices[sectionIdx];
    const containerTop = containerRef.current.getBoundingClientRect().top + window.scrollY;
    const targetY = containerTop + panelIdx * window.innerHeight;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <div
      className="absolute inset-x-0 hidden lg:block [font-family:var(--font-main)]"
      style={{ top: "calc(15vh - 2rem)", zIndex: panelCount + 5 }}
    >
      <div className="max-w-[1600px] mx-auto px-16 lg:px-26 flex items-center gap-2 translate-x-1">
        {sections.map((section, i) => (
          <div key={section.label} className="flex items-center gap-2">
            <button
              onClick={() => scrollToSection(i)}
              className="text-[length:var(--text-body2)] font-medium tracking-wide transition-all duration-300 cursor-pointer"
              style={{
                color: i === activeSection ? "var(--color-yellow)" : "var(--color-blackish)",
                opacity: i === activeSection ? 1 : 0.3,
              }}
            >
              {section.label}
            </button>
            {i < sections.length - 1 && (
              <span
                className="text-[length:var(--text-body2)] select-none pointer-events-none"
                style={{ color: "var(--color-blackish)", opacity: 0.2 }}
              >
                /
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
