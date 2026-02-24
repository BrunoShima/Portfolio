import { useParams } from "react-router";
import { PROJECTS } from "../../data/Projects";


export default function ProjectDetailScreen() {

  const { projectId } = useParams();
  const project = PROJECTS.find((item) => item.id === projectId);

  if (!project) {
    return (
      <section
        className="
          min-h-dvh flex items-center justify-center
          bg-[var(--color-whiteish)] text-[var(--color-blackish)]
          [font-family:var(--font-main)] px-10
        "
      >
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Project Not Found</h1>
          <p className="text-sm opacity-70">
            The Project <span className="font-mono">{projectId}</span> does not exist.
          </p>
        </div>
      </section>
    );
  }

  const shuffledImages = [...(project.images ?? [])].sort(() => Math.random() - 0.5);

  return (

    <>

      {/* HERO */}
      <section
        className="
          min-h-dvh
          bg-[var(--color-whiteish)] 
          text-[var(--color-blackish)]
          [font-family:var(--font-main)]
          relative overflow-hidden
          pt-70 pb-24
        "
      >

        <div className="max-w-[1600px] mx-auto px-16 sm:px-22 lg:px-26">

          <p
            className="
              text-[length:var(--text-body)]
              font-medium
            "
          >

            {project.type}

          </p>

          <h1
            className="
              text-[length:var(--text-logo)]
              font-bold
              tracking-[-0.1em]
              leading-none
              mt-4
              -translate-x-4
            "
          >

            {project.title}

          </h1>

          <p
            className="
              text-[length:var(--text-subheading)]
              font-extrabold
              tracking-[-0.08em]
              text-[var(--color-yellow)]
              mt-2
              -translate-x-2
            "
          >

            {project.subtitle}

          </p>

          <h2
            className="
              text-[length:var(--text-heading)]
              font-extrabold
              tracking-[-0.08em]
              -translate-x-2
              pt-55
            "
          >

            Project Overview

          </h2>

          <p  
            className="
              text-[length:var(--text-body)]
            "
          >

            {project.overview}

          </p>

          <h2
            className="
              text-[length:var(--text-heading)]
              font-extrabold
              tracking-[-0.08em]
              -translate-x-2
              pt-55
            "
          >

            Strategy

          </h2>

          <p  
            className="
              text-[length:var(--text-body)]
            "
          >

            {project.strategy}

          </p>

          <h2
            className="
              text-[length:var(--text-heading)]
              font-extrabold
              tracking-[-0.08em]
              -translate-x-2
              pt-55
            "
          >

            Direction

          </h2>

          <p  
            className="
              text-[length:var(--text-body)]
            "
          >

            {project.direction}

          </p>

          <h2
            className="
              text-[length:var(--text-heading)]
              font-extrabold
              tracking-[-0.08em]
              -translate-x-2
              pt-55
            "
          >

            Results

          </h2>

          <p  
            className="
              text-[length:var(--text-body)]
            "
          >

            {project.results}

          </p>

          {/* Gallery */}
          {shuffledImages.length > 0 && (
            <section
              className="
                bg-[var(--color-whiteish)]
                text-[var(--color-blackish)]
                [font-family:var(--font-main)]
                pt-55
                pb-30
              "
            >
              <div className="max-w-[1600px] mx-auto px-16 sm:px-22 lg:px-26">

                <div
                  className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-3
                    gap-3
                  "
                >
                  {shuffledImages.map((src, index) => (
                    <figure key={index} className="overflow-hidden">
                      <img
                        src={src}
                        alt={`${project.title} image ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          )}

        </div>

      </section>

    </>

  );

}