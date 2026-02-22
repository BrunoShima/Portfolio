import { Link } from "react-router"

import { SiLinkedin, SiInstagram } from "react-icons/si"
import { FiMessageCircle } from "react-icons/fi"

const ICON_SIZE =
    "h-12 w-12 lg:h-10 lg:w-10 max-lg:h-8 max-lg:w-8 max-sm:h-6 max-sm:w-6"

export default function AboutOutro() {

    return (

        <section
            aria-label="intro card"
            className="
                relative
                min-h-screen
                w-full
                bg-[var(--color-whiteish)]
                overflow-x-hidden
                flex
                items-center
                justify-center
                px-6 sm:px-10 lg:px-16
            "
        >


        <div 
            className="
                relative
                z-10
                flex 
                flex-col 
                items-center 
                text-[var(--color-blackish)]
            "
        >

            <h1
                className="
                    text-center
                    font-bold
                    [font-family:var(--font-main)]
                    text-[length:var(--text-logo)]
                    tracking-[-0.1em]
                "
            >

            Let's <span className="text-[var(--color-yellow)]">Chat?</span>
            
            </h1>

            <Link to="/contact" aria-label="Message me" className="mt-6">

                <FiMessageCircle className={ICON_SIZE} color="var(--color-blackish)" /> 
            
            </Link>

        </div>

        <div
            className="
                absolute
                left-0
                right-0
                bottom-10 sm:bottom-20
                z-10
                flex
                items-center
                justify-between
                max-w-[1600px]
                mx-auto
                px-6 sm:px-10 lg:px-16
            "
        >

            <Link
                to="/"
                className="
                    [font-family:var(--font-main)]
                    text-[length:var(--text-body2)]
                    font-medium
                "
            >

                Back Home

            </Link>

            <div
                className="
                    flex
                    items-center
                    justify-center
                    [gap:clamp(1.5rem,5vw,10rem)]
                "
            >

                <a
                    href="https://www.linkedin.com/in/bruno-shimabukuro"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center justify-center"
                >

                    <SiLinkedin className={ICON_SIZE} color="var(--color-blackish)" />

                </a>

                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center"
                >

                    <SiInstagram className={ICON_SIZE} color="var(--color-blackish)" />

                </a>

            </div>

            <Link
                to="/projects"
                className="
                    text-right
                    [font-family:var(--font-main)]
                    text-[length:var(--text-body2)]
                    font-medium
                "
            >

                My Work

            </Link>

        </div>

    </section>

  )
  
}