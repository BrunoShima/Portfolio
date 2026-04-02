import { useRef } from "react";
import { useParams } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { PROJECTS } from "../../data/Projects";

// Shared number watermark style
const numStyle = (accent, mobile = false) => ({
  position: "absolute",
  left: mobile ? "-0.25em" : "-0.15em",
  top: "50%",
  transform: "translateY(-50%) scaleX(0.65)",
  transformOrigin: "left center",
  fontSize: "150vh",
  fontWeight: 800,
  letterSpacing: "-0.1em",
  lineHeight: 1,
  opacity: 0.06,
  color: accent ? "var(--color-yellow)" : "var(--color-blackish)",
  userSelect: "none",
  pointerEvents: "none",
});

const TEXT_SECTIONS = [
  { num: "01", label: "Overview",  key: "overview",  accent: false },
  { num: "02", label: "Strategy",  key: "strategy",  accent: false },
  { num: "03", label: "Direction", key: "direction", accent: false },
  { num: "04", label: "Results",   key: "results",   accent: true  },
];

export default function ProjectDetailScreen() {
  const { projectId } = useParams();
  const project = PROJECTS.find((item) => item.id === projectId);

  // Build panels dynamically — must happen before hooks
  const allPanels = project
    ? TEXT_SECTIONS.flatMap((section, i) => {
        const slideImages = project.slides?.[i] ?? [];
        return [
          { type: "text", ...section, body: project[section.key] },
          ...(slideImages.length > 0 ? [{ type: "image", images: slideImages }] : []),
        ];
      })
    : [];

  const panelCount = Math.max(allPanels.length, 1);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", `-${(panelCount - 1) * 100}vw`]);

  if (!project) {
    return (
      <section className="min-h-dvh flex items-center justify-center bg-[var(--color-whiteish)] text-[var(--color-blackish)] [font-family:var(--font-main)] px-8">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Project Not Found</h1>
          <p className="text-sm opacity-70">
            The project <span className="font-mono">{projectId}</span> does not exist.
          </p>
        </div>
      </section>
    );
  }

  const galleryImages = project.images ?? [];

  return (
    <>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <section className="
        min-h-dvh relative flex flex-col
        bg-[var(--color-whiteish)] text-[var(--color-blackish)]
        [font-family:var(--font-main)] overflow-hidden
      ">
        <div className="
          flex-1 flex flex-col justify-center
          max-w-[1600px] w-full mx-auto
          px-8 sm:px-16 lg:px-26 pt-24
        ">
          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="text-[length:var(--text-body)] font-medium"
          >
            {project.type}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="text-[length:var(--text-logo)] font-bold tracking-[-0.1em] leading-none mt-4 ml-[-0.05em]"
          >
            {project.title}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
            className="text-[length:var(--text-subheading)] font-extrabold tracking-[-0.08em] text-[var(--color-yellow)] mt-2 ml-[-0.03em]"
          >
            {project.subtitle}
          </motion.p>

          {project.chips?.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.6 }}
              className="flex flex-wrap gap-2 mt-6"
            >
              {project.chips.map((chip) => (
                <span key={chip} className="
                  border-2 border-[var(--color-blackish)] rounded-full
                  px-4 py-1 text-[length:var(--text-body2)] font-medium
                ">
                  {chip}
                </span>
              ))}
            </motion.div>
          )}
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 1.2 }}
          className="
            w-full flex flex-col items-center gap-1
            pb-10 sm:pb-14
            text-[length:var(--text-body2)] font-medium
            text-[var(--color-blackish)]/40
            tracking-widest uppercase
          "
        >
          <span>Scroll to explore</span>
          <motion.span
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.2, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
            className="block"
          >
            ↓
          </motion.span>
        </motion.div>
      </section>


      {/* ── DESKTOP — HORIZONTAL SCROLL ─────────────────────────────────── */}
      <div
        ref={containerRef}
        style={{ height: `${panelCount * 100}vh` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[4px] bg-[var(--color-yellow)] z-20 origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Horizontal strip */}
          <motion.div
            style={{ x, width: `${panelCount * 100}vw` }}
            className="flex h-full"
          >
            {allPanels.map((panel, i) => {

              // ── IMAGE PANEL ──
              if (panel.type === "image") {
                return (
                  <div
                    key={i}
                    className="shrink-0 h-full flex items-center justify-center"
                    style={{ width: "100vw", backgroundColor: "var(--color-yellow)" }}
                  >
                  <div
                    className="flex items-stretch h-full w-full pl-16 lg:pl-26"
                    style={{ gap: 0 }}
                  >
                      {panel.images.map((src, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="flex-1 flex items-center justify-center p-8"
                          style={{
                            // ↓ Tweak this to change the white box background color
                            backgroundColor: "color-mix(in srgb, var(--color-yellow) 30%, transparent)",
                          }}
                        >
                          <img
                            src={src}
                            alt={`${project.title} slide ${imgIndex + 1}`}
                            className="max-h-full w-auto max-w-full object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              // ── TEXT PANEL ──
              return (
                <div
                  key={i}
                  className="
                    shrink-0 h-full relative
                    bg-[var(--color-whiteish)] flex items-center overflow-hidden
                  "
                  style={{ width: "100vw" }}
                >
                  <span style={numStyle(panel.accent)}>{panel.num}</span>

                  <div className="relative z-10 max-w-[1600px] mx-auto px-16 lg:px-26 w-full">
                    <h2
                      className="text-[length:var(--text-heading)] font-extrabold tracking-[-0.08em] leading-none mb-10"
                      style={{ color: panel.accent ? "var(--color-yellow)" : "var(--color-blackish)" }}
                    >
                      {panel.label}
                    </h2>
                    <p className="text-[length:var(--text-body)] max-w-[60ch] text-justify [text-align-last:start]">
                      {panel.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>


      {/* ── MOBILE — VERTICAL STACKED ────────────────────────────────────── */}
      <div className="block lg:hidden border-t border-[var(--color-blackish)]/20">
        {TEXT_SECTIONS.map((section, i) => {
          const slideImages = project.slides?.[i] ?? [];

          return (
            <section
              key={section.key}
              className="
                relative overflow-hidden
                bg-[var(--color-whiteish)] text-[var(--color-blackish)]
                [font-family:var(--font-main)]
                py-20 px-8 sm:px-16
                border-b border-[var(--color-blackish)]/20
              "
            >
              <span style={numStyle(section.accent, true)}>{section.num}</span>

              <div className="relative z-10">
                <h2
                  className="text-[length:var(--text-subheading)] font-extrabold tracking-[-0.08em] leading-none mb-8"
                  style={{ color: section.accent ? "var(--color-yellow)" : "var(--color-blackish)" }}
                >
                  {section.label}
                </h2>

                <p className="text-[length:var(--text-body)] text-justify [text-align-last:start]">
                  {project[section.key]}
                </p>

                {/* Slide images for this section */}
                {slideImages.length > 0 && (
                  <div className="flex flex-col gap-6 mt-10">
                    {slideImages.map((src, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={src}
                        alt={`${project.title} ${imgIndex + 1}`}
                        className="w-full object-contain"
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>


      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      {/* Coming next */}

    </>
  );
}