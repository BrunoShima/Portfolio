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

          {project.chips?.length > 0 && (

            <div className="flex flex-wrap gap-2 mt-6">

              {project.chips.map((chip) => (

                <span
                  key={chip}
                  className="
                    border-2
                    border-[var(--color-blackish)]
                    rounded-full
                    px-4 py-1
                    [font-family:var(--font-main)]
                    text-[length:var(--text-body2)]
                    font-medium
                  "
                >

                  {chip}

                </span>

              ))}

            </div>

          )}


          <div className="
              flex flex-col
              lg:flex-row 
              gap-10 
              pt-45 
              items-start
            "
          >

            <div className="flex-1">

              <h2 className="
                  text-[length:var(--text-heading)]
                  font-extrabold
                  tracking-[-0.08em]
                  -translate-x-2
                  pb-6
                "
              >

                Project Overview

              </h2>

              <p className="
                  text-[length:var(--text-body)]
                  text-justify [text-align-last:start]
                "
              >
                
                {project.overview}
              
              </p>

            </div>

            <div className="
                w-full 
                lg:w-[38%] 
                shrink-0
              "
            >

              <img
                src={project.images?.[0]}
                alt={`${project.title} overview`}
                className="w-full object-cover pt-10"
              />

            </div>

          </div>


          <div className="
              flex flex-col lg:flex-row-reverse 
              gap-10 
              pt-45 
              items-start
            "
          >

            <div className="flex-1">

              <h2 className="
                  text-[length:var(--text-heading)]
                  font-extrabold
                  tracking-[-0.08em]
                  -translate-x-2
                  pb-6
                "
              >
                
                Strategy
                
              </h2>

              <p className="
                  text-[length:var(--text-body)] 
                  text-justify [text-align-last:start]
                "
              >
                
                {project.strategy}
                
              </p>

            </div>

            <div className="
                w-full 
                lg:w-[38%] 
                shrink-0
              "
            >

              <img
                src={project.images?.[1]}
                alt={`${project.title} strategy`}
                className="w-full object-cover pt-10"
              />

            </div>

          </div>


          <div className="
                flex 
                flex-col lg:flex-row 
                gap-10 
                pt-45 
                items-start
              "
            >

            <div className="flex-1">

              <h2 className="
                  text-[length:var(--text-heading)]
                  font-extrabold
                  tracking-[-0.08em]
                  -translate-x-2
                  pb-6
                "
              >
                
                Direction
              
              </h2>

              <p className="
                  text-[length:var(--text-body)] 
                  text-justify [text-align-last:start]
                "
              >
                
                {project.direction}
                
              </p>

            </div>

            <div className="
                w-full 
                lg:w-[38%] 
                shrink-0
              "
            >

              <img
                src={project.images?.[2]}
                alt={`${project.title} direction`}
                className="w-full object-cover pt-10"
              />

            </div>

          </div>


          <div className="pt-45">

            <h2 className="
                text-[length:var(--text-heading)]
                font-extrabold
                tracking-[-0.08em]
                -translate-x-2
                pb-6
              "
            >
              
              Results
              
            </h2>

            <p className="
                text-[length:var(--text-body)] 
                text-justify 
                [text-align-last:start]
              "
            >
              
              {project.results}
              
            </p>
          </div>


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
            </section>
          )}

        </div>

      </section>

    </>

  );

}