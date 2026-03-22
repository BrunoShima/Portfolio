import { Link, useParams } from "react-router";
import { motion } from "motion/react";
import { PROJECTS } from "../../data/Projects";

export default function ProjectListScreen() {
    const { label } = useParams();
    const filtered = label ? PROJECTS.filter((p) => p.label === label) : PROJECTS;

    return (
        <main
            className="
                min-h-dvh
                bg-[var(--color-whiteish)]
                text-[var(--color-blackish)]
                [font-family:var(--font-main)]
                pt-70
                max-w-[1600px] mx-auto px-16 sm:px-22 lg:px-26
            "
        >
            <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="
                    text-[length:var(--text-logo)]
                    font-bold
                    tracking-[-0.1em]
                    leading-none
                    -translate-x-4
                    pb-10
                "
            >
                {label ? label.charAt(0).toUpperCase() + label.slice(1) : "All Projects"}
            </motion.h1>

            <ul className="grid mt-6">
                {filtered.map((p) => (
                    <motion.li
                        key={p.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                        className="
                            relative flex items-center py-5
                            border-b border-[var(--color-blackish)]/20
                            group
                        "
                    >
                        <motion.div
                            whileHover={{ x: 8 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="w-full"
                        >
                            <Link
                                to={`/projects/${p.label}/${p.id}`}
                                className="
                                    relative z-10
                                    w-full
                                    grid
                                    grid-cols-[auto_1fr]
                                    sm:grid-cols-[auto_1fr_auto]
                                    items-center
                                    gap-x-4
                                    tracking-[-0.08em]
                                "
                            >
                                {/* Number */}
                                <span
                                    className="
                                        px-2
                                        text-[length:var(--text-body)]
                                        font-medium
                                        text-[var(--color-blackish)]/40
                                        group-hover:text-[var(--color-yellow)]
                                        group-hover:opacity-100
                                        transition-all duration-300
                                    "
                                    style={{ transform: "translateY(2px)" }}
                                >
                                    {String(filtered.indexOf(p) + 1).padStart(2, "0")}
                                </span>

                                {/* Title */}
                                <span className="
                                    px-2
                                    text-[length:var(--text-subheading)]
                                    font-bold
                                    group-hover:text-[var(--color-yellow)]
                                    transition-all duration-300
                                ">
                                    {p.title}
                                </span>

                                {/* Subtitle desktop */}
                                <span
                                    className="
                                        hidden sm:block
                                        px-2
                                        text-[length:var(--text-body)]
                                        font-medium
                                        text-[var(--color-blackish)]/40
                                        group-hover:opacity-100
                                        transition-all duration-300
                                        text-right
                                    "
                                    style={{ transform: "translateY(2px)" }}
                                >
                                    {p.subtitle}
                                </span>

                                {/* Subtitle mobile */}
                                <span className="
                                    block sm:hidden
                                    col-start-2
                                    px-2
                                    text-[length:var(--text-body)]
                                    font-medium
                                    text-[var(--color-blackish)]/40
                                    group-hover:opacity-100
                                    transition-all duration-300
                                ">
                                    {p.subtitle}
                                </span>
                            </Link>
                        </motion.div>
                    </motion.li>
                ))}

                {filtered.length === 0 && (
                    <li className="opacity-70">No projects found for "{label}".</li>
                )}
            </ul>
        </main>
    );
}