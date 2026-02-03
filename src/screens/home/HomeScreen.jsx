import { useState } from "react";

import Logo from "../../assets/illustrations/Logo.svg";

import { SiLinkedin, SiInstagram } from "react-icons/si";
import { FiMessageCircle } from "react-icons/fi";
import { motion } from "motion/react";

import HoverLink from "./HoverLink";
import PopcornAnimation from "./PopcornAnimation";
import HoverVideo from "./HoverVideo";

import { POPCORN_IMAGES } from "../../data/PopcornImages";

export default function HomeScreen() {
    const [hoverTarget, setHoverTarget] = useState(null);

    return (
        <main
            className={`
                relative
                min-h-screen
                w-full
                flex
                items-center
                justify-center
                overflow-x-hidden
            `}
        >

            <HoverVideo active={hoverTarget === "logo"} />

            <PopcornAnimation
                images={POPCORN_IMAGES.designer}
                active={hoverTarget === "designer"}
            />

            <PopcornAnimation
                images={POPCORN_IMAGES.developer}
                active={hoverTarget === "developer"}
            />

            <PopcornAnimation
                images={POPCORN_IMAGES.creative}
                active={hoverTarget === "creative"}
            />

            {/* Hover Overlay */}
            {hoverTarget !== null && (
                <div
                    className="
                        absolute
                        inset-0
                        z-0
                        bg-[var(--color-yellow)]
                        opacity-70
                        pointer-events-none
                    "
                />
            )}

            <div
                className="
                    relative
                    z-10
                    items-center
                    text-center
                "
            >
                {/* Logo */}
                <HoverLink
                    id="logo"
                    to="/about"
                    hoverTarget={hoverTarget}
                    setHoverTarget={setHoverTarget}
                    className="
                        relative
                        z-10
                        inline-flex
                        w-fit
                        justify-self-center
                    "
                >
                    <img
                        src={Logo}
                        alt="Bru"
                        className="
                        block
                        h-[var(--text-logo)]
                        w-auto
                        "
                    />
                </HoverLink>

                {/* Categories/Links */}
                <div
                    className="
                        mt-8
                        w-full
                        flex flex-row max-sm:flex-col
                        items-center
                        justify-center
                        text-center
                        text-[var(--color-blackish)]
                        [font-family:var(--font-main)]
                        text-[length:var(--text-subheading)]
                        font-extrabold
                        [column-gap:clamp(1.5rem,5vw,10rem)]
                        max-sm:[row-gap:2rem]
                        translate-y-10
                    "
                >
                    <HoverLink
                        id="designer"
                        to="/projects"
                        hoverTarget={hoverTarget}
                        setHoverTarget={setHoverTarget}
                    >
                        Designer
                    </HoverLink>

                    <HoverLink
                        id="developer"
                        to="/projects"
                        hoverTarget={hoverTarget}
                        setHoverTarget={setHoverTarget}
                    >
                        Developer
                    </HoverLink>

                    <HoverLink
                        id="creative"
                        to="/projects"
                        hoverTarget={hoverTarget}
                        setHoverTarget={setHoverTarget}
                    >
                        Creative
                    </HoverLink>
                </div>
            </div>

            {/* Button Icons */}
            <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: hoverTarget !== null ? 0 : 1 }}
                transition={{ duration: 0.4 }}
                className="
                    absolute 
                    left-0 
                    right-0 
                    bottom-10 sm:bottom-20
                    z-10
                    flex 
                    justify-center 
                    [gap:clamp(1.5rem,5vw,10rem)]
                "
            >

                <a href="#" aria-label="LinkedIn" className="inline-flex items-center justify-center">
                    <SiLinkedin
                        className="h-7 w-7 max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5"
                        color="var(--color-blackish)"
                    />
                </a>

                <a href="#" aria-label="Instagram" className="inline-flex items-center justify-center">
                    <SiInstagram
                        className="h-7 w-7 max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5"
                        color="var(--color-blackish)"
                    />
                </a>

                <a href="#" aria-label="Message" className="inline-flex items-center justify-center">
                    <FiMessageCircle
                        className="h-7 w-7 max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5"
                        color="var(--color-blackish)"
                    />
                </a>

            </motion.div>

        </main>

    );

}