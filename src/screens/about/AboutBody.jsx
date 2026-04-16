import { motion } from "motion/react";

const SECTIONS = [
  {
    label: "Who I Am",
    body: "Raised at the intersection of Brazilian and Japanese culture, I imbue my work with a unique blend of confidence and restraint. Energy and precision. Warmth and obsession. I live for the moments where moderation can not only coexist with boldness, but where they can harmonize. That duality runs through both my DNA and my work. ",
  },
  {
    label: "How I Work",
    body: "My studies in Psychology and Political Science taught me how people think, decide, and respond. Design and Development gave me the tools to act on that understanding. My ambitions have always run ahead of my abilities, and I've learned to use that tension as fuel. I chase work that excites and intimidates me in equal parts, then reverse-engineer it until it doesn't. I iterate constantly, I love feedback, and I always strive to over-deliver.",
  },
  {
    label: "What I'm After",
    body: "The beauty I consume informs the beauty I create. The throughline in everything I love — films, music, games, books — is intentionality. Nothing accidental, nothing wasted. That's the standard I hold my own work to. What I'm good at is making sure everything looks just right. Designing not just to impress, but to connect. The details others gloss over are where I live.",
  },
];

export default function AboutBody() {
  return (
    <section
      className="
        bg-[var(--color-whiteish)]
        text-[var(--color-blackish)]
        [font-family:var(--font-main)]
      "
    >
      <div className="max-w-[1600px] mx-auto px-8 sm:px-16 lg:px-26">
        {SECTIONS.map((section, i) => (
          <div
            key={section.label}
            className="
              border-t border-[var(--color-blackish)]/20
              py-16 lg:py-24
              flex flex-col lg:flex-row
              gap-8 lg:gap-24 lg:items-center
            "
          >

            {/* Label */}
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              className="
                lg:w-[30%] shrink-0
                text-[length:var(--text-subheading)]
                font-extrabold
                tracking-[-0.08em]
                leading-none
                ml-[-0.03em]
              "
            >
              {section.label}
            </motion.h2>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.25 }}
              className="
                text-[length:var(--text-body)]
                leading-relaxed
                max-w-[65ch]
              "
            >
              {section.body}
            </motion.p>

          </div>
        ))}

        {/* Closing border */}
        <div className="border-t border-[var(--color-blackish)]/20" />
      </div>
    </section>
  );
}