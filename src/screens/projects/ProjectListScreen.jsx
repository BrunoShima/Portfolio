import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { PROJECTS } from "../../data/Projects";

const FILTERS = ["design", "development", "creative"];

export default function ProjectListScreen() {
    const [searchParams, setSearchParams] = useSearchParams();
    const activeFilter = searchParams.get("filter");

    const filtered = activeFilter
        ? PROJECTS.filter((p) => p.label === activeFilter)
        : PROJECTS;

    const toggleFilter = (label) => {
        setSearchParams(activeFilter === label ? {} : { filter: label });
    };

    return (
        <main
            className="
                min-h-dvh
                bg-[var(--color-whiteish)]
                text-[var(--color-blackish)]
                [font-family:var(--font-main)]
                pt-70
                max-w-[1600px] mx-auto px-16 sm:px-22 lg:px-26
                pb-20
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
                    pb-6
                "
            >
                Projects
            </motion.h1>

            {/* Filter toggles */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                className="flex gap-3 pb-8 flex-wrap pt-10"
            >
                {FILTERS.map((f) => {
                    const active = activeFilter === f;
                    return (
                        <button
                            key={f}
                            onClick={() => toggleFilter(f)}
                            className="
                                text-[length:var(--text-body2)]
                                font-semibold
                                tracking-[-0.04em]
                                px-5 py-2
                                rounded-full
                                border
                                transition-all duration-200
                                cursor-pointer
                            "
                            style={{
                                color: active ? "var(--color-yellow)" : "var(--color-blackish)",
                                borderColor: active ? "var(--color-yellow)" : "color-mix(in srgb, var(--color-blackish) 20%, transparent)",
                                opacity: active ? 1 : 0.5,
                            }}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    );
                })}
            </motion.div>

            <ul className="grid mt-6" key={activeFilter ?? "all"}>
                {filtered.map((p, i) => (
                    <motion.li
                        key={p.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 + i * 0.08 }}
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
                                to={`/projects/${p.label}/${p.slug}`}
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
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                <span className="
                                    px-2
                                    text-[length:var(--text-subheading)]
                                    font-bold
                                    group-hover:text-[var(--color-yellow)]
                                    transition-all duration-300
                                ">
                                    {p.title}
                                </span>

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
                    <li className="opacity-70 pt-6">No projects found.</li>
                )}
            </ul>
        </main>
    );
}
