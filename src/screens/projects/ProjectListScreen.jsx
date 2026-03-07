import { Link, useParams} from "react-router";
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

            <h1
                className="
                    text-[length:var(--text-logo)]
                    font-bold
                    tracking-[-0.1em]
                    leading-none
                    -translate-x-4
                    pb-10
                "
            >
                {label?.toUpperCase() || "All Projects"}
            </h1>

            <ul className="grid mt-6">

                {filtered.map((p, index) => (

                    <li
                        key={p.id}
                        className="
                            relative flex items-center py-5
                            border-b border-[var(--color-blackish)]/20
                        "
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
                                "
                                style={{ transform: "translateY(2px)" }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>

                            {/* Title */}
                            <span className="
                                px-2
                                text-[length:var(--text-subheading)]
                                font-bold
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
                            ">
                                {p.subtitle}
                            </span>

                        </Link>

                    </li>

                ))}

                {filtered.length === 0 && (
                    <li className="opacity-70">No projects found for "{label}".</li>
                )}

            </ul>

        </main>

    );

}