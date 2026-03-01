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
                
                {label?.toUpperCase() || "All Projects "}

            </h1>

            <ul
                className="
                    grid
                    mt-6
                    gap-3
                "
            >

                {filtered.map((p) => (

                    <li key={p.id}>

                        <Link
                            to={`/projects/${p.label}/${p.id}`}
                            className="
                                !underline
                                !underline-offset-8
                                text-[length:var(--text-subheading)]
                            "
                        >
                        
                            {p.title} - {p.subtitle}

                        </Link>

                    </li>
                ))}
                
                {filtered.length === 0 && (

                    <li className="opacity-70">No Projects found for "{label}".</li>

                )}
                
            </ul>

        </main>

    );
    
}