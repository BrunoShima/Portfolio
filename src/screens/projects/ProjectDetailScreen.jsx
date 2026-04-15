import { useRef } from "react";
import { useParams, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { PROJECTS } from "../../data/Projects";

const TEXT_SECTIONS = [
  { num: "01", label: "Overview",  key: "overview",  accent: false },
  { num: "02", label: "Strategy",  key: "strategy",  accent: false },
  { num: "03", label: "Direction", key: "direction", accent: false },
  { num: "04", label: "Results",   key: "results",   accent: true  },
];


// ── TEXT PANEL ────────────────────────────────────────────────────────────────

function TextPanel({ panel, scrollYProgress, panelIndex, panelCount, nextPanelType }) {
  const seg = panelCount > 1 ? 1 / (panelCount - 1) : 1;
  const isLast       = panelIndex === panelCount - 1;
  const hasImageNext = nextPanelType === "image";

  const exitStart = panelIndex * seg;
  const exitEnd   = Math.min((panelIndex + 1) * seg, 1);

  const panelX = useTransform(
    scrollYProgress,
    isLast ? [0, 1] : [exitStart, exitEnd],
    isLast || hasImageNext ? ["0vw", "0vw"] : ["0vw", "-100vw"]
  );

  const opacity = useTransform(
    scrollYProgress,
    hasImageNext ? [exitEnd - 0.001, exitEnd] : [0, 1],
    hasImageNext ? [1, 0] : [1, 1]
  );

  return (
    <motion.div
      className="
        absolute inset-0
        flex items-start overflow-hidden
        bg-[var(--color-whiteish)]
      "
      style={{
        x: panelX,
        opacity,
        zIndex: panelCount - panelIndex,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "-0.15em",
          transform: "translateY(-50%) scaleX(0.65)",
          transformOrigin: "left center",
          fontSize: "150vh",
          fontWeight: 800,
          letterSpacing: "-0.1em",
          lineHeight: 1,
          opacity: 0.06,
          color: panel.accent ? "var(--color-yellow)" : "var(--color-blackish)",
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        {panel.num}
      </span>

      <div className="relative z-10 max-w-[1600px] mx-auto px-16 lg:px-26 w-full pt-[15vh]">
        <h2
          className="
            text-[length:var(--text-heading)]
            font-extrabold tracking-[-0.08em] leading-none
            mb-10
          "
          style={{ color: panel.accent ? "var(--color-yellow)" : "var(--color-blackish)" }}
        >
          {panel.label}
        </h2>
        <p
          className="text-[length:var(--text-body)] max-w-[60ch] text-justify [text-align-last:start] whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: panel.body }}
        />
      </div>
    </motion.div>
  );
}


// ── IMAGE PANEL ───────────────────────────────────────────────────────────────

function ImagePanel({ panel, scrollYProgress, panelIndex, panelCount, projectTitle }) {
  const seg    = panelCount > 1 ? 1 / (panelCount - 1) : 1;
  const isLast = panelIndex === panelCount - 1;

  const enterStart = (panelIndex - 1) * seg;
  const enterEnd   = panelIndex * seg;
  const exitEnd    = Math.min((panelIndex + 1) * seg, 1);

  const x = useTransform(
    scrollYProgress,
    isLast ? [enterStart, enterEnd] : [enterStart, enterEnd, exitEnd],
    isLast ? ["100vw", "0vw"]       : ["100vw", "0vw", "-100vw"]
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, zIndex: panelCount + 10, backgroundColor: "var(--color-yellow)" }}
    >
      <div
        className="flex items-stretch h-full w-full px-16 lg:px-26"
        style={{ gap: 0 }}
      >
        {panel.images.map((item, imgIndex) => {
          const isVideo = typeof item === "object" && item.type === "video";
          return (
            <div
              key={imgIndex}
              className="flex-1 flex items-center justify-center p-8"
              style={{ backgroundColor: "var(--color-yellow)" }}
            >
              {isVideo ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={item.poster}
                  className="max-h-full w-auto max-w-full object-contain"
                >
                  <source src={item.src.replace(".mp4", ".webm")} type="video/webm" />
                  <source src={item.src} type="video/mp4" />
                </video>
              ) : (
                <img
                  src={item}
                  alt={`${projectTitle} slide ${imgIndex + 1}`}
                  className="max-h-full w-auto max-w-full object-contain"
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}


// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function ProjectDetailScreen() {
  const { projectId } = useParams();
  const project = PROJECTS.find((item) => item.id === projectId);

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

  const currentIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];
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


      {/* ── DESKTOP — PARALLAX LAYERED SCROLL ───────────────────────────── */}
      <div
        ref={containerRef}
        style={{ height: `${panelCount * 100}vh` }}
        className="relative hidden lg:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Progress bar */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[4px] bg-[var(--color-yellow)] z-30 origin-left"
            style={{ scaleX: scrollYProgress }}
          />

          {/* Layered panels */}
          {allPanels.map((panel, i) =>
            panel.type === "text" ? (
              <TextPanel
                key={i}
                panel={panel}
                scrollYProgress={scrollYProgress}
                panelIndex={i}
                panelCount={panelCount}
                nextPanelType={allPanels[i + 1]?.type ?? null}
              />
            ) : (
              <ImagePanel
                key={i}
                panel={panel}
                scrollYProgress={scrollYProgress}
                panelIndex={i}
                panelCount={panelCount}
                projectTitle={project.title}
              />
            )
          )}

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
              <span
                style={{
                  position: "absolute",
                  left: "-0.25em",
                  top: "50%",
                  transform: "translateY(-50%) scaleX(0.65)",
                  transformOrigin: "left center",
                  fontSize: "150vh",
                  fontWeight: 800,
                  letterSpacing: "-0.1em",
                  lineHeight: 1,
                  opacity: 0.06,
                  color: section.accent ? "var(--color-yellow)" : "var(--color-blackish)",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              >
                {section.num}
              </span>

              <div className="relative z-10">
                <h2
                  className="text-[length:var(--text-subheading)] font-extrabold tracking-[-0.08em] leading-none mb-8"
                  style={{ color: section.accent ? "var(--color-yellow)" : "var(--color-blackish)" }}
                >
                  {section.label}
                </h2>
                  <p
                    className="text-[length:var(--text-body)] text-justify [text-align-last:start] whitespace-pre-line"
                    dangerouslySetInnerHTML={{ __html: project[section.key] }}
                  />
                {slideImages.length > 0 && (
                  <div className="flex flex-col gap-6 mt-10">
                    {slideImages.map((item, imgIndex) => {
                      const isVideo = typeof item === "object" && item.type === "video";
                      return isVideo ? (
                        <video
                          key={imgIndex}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={item.poster}
                          className="w-full object-contain"
                        >
                          <source src={item.src.replace(".mp4", ".webm")} type="video/webm" />
                          <source src={item.src} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          key={imgIndex}
                          src={item}
                          alt={`${project.title} ${imgIndex + 1}`}
                          className="w-full object-contain"
                        />
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>


      {/* ── GALLERY ─────────────────────────────────────────────────────── */}
      {galleryImages.length > 0 && (
        <section className="bg-[var(--color-whiteish)] pt-32 pb-32">
          <div className="max-w-[1600px] mx-auto px-16 sm:px-22 lg:px-26">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {galleryImages.map((src, index) => (
                <motion.figure
                  key={index}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: index * 0.08 }}
                  className="overflow-hidden"
                >
                  <img
                    src={src}
                    alt={`${project.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </motion.figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM NAV ──────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          flex items-center justify-between
          max-w-[1600px] mx-auto
          px-8 sm:px-16 lg:px-26
          py-10 sm:py-20
          [font-family:var(--font-main)]
          text-[length:var(--text-body2)]
          font-medium
          text-[var(--color-blackish)]
        "
      >
        <Link to="/projects">← All Projects</Link>
        <Link to={`/projects/${nextProject.label}/${nextProject.id}`} className="text-right">
          Next Project →
        </Link>
      </motion.div>

    </>
  );
}