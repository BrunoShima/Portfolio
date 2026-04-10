import { useState, useRef } from "react";
import { Link } from "react-router";

import Logo from "../../assets/illustrations/Logo.svg";

import { SiLinkedin, SiInstagram } from "react-icons/si";
import { FiMessageCircle } from "react-icons/fi";
import { motion } from "motion/react";

import HoverLink from "./HoverLink";
import PopcornAnimation from "./PopcornAnimation";
import HoverVideo from "./HoverVideo";
import ZoomLink from './ZoomLink';

import { PROJECT_IMAGES } from "../../data/ProjectImages";

import DesignerMarquee from "../../assets/images/designermarquee.jpg";
import CreativeMarquee from "../../assets/images/creativemarquee.jpg";

export default function HomeScreen() {
    const [hoverTarget, setHoverTarget] = useState(null);
    const iconsEnteredRef = useRef(false);

    return (
        <main
            className={`
                relative
                min-h-screen
                w-full
                flex
                justify-center
                items-center
                overflow-x-hidden
            `}
        >

            <HoverVideo active={hoverTarget === "logo"} />

            <PopcornAnimation
                images={PROJECT_IMAGES.designer}
                active={hoverTarget === "designer"}
                bgSrc={DesignerMarquee}
            />

            <PopcornAnimation
                images={PROJECT_IMAGES.developer}
                active={hoverTarget === "developer"}
                bgSrc={DesignerMarquee}
            />

            <PopcornAnimation
                images={PROJECT_IMAGES.creative}
                active={hoverTarget === "creative"}
                bgSrc={CreativeMarquee}
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
                    to={null}
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
                    <ZoomLink to="/about" onBeforeNavigate={() => setHoverTarget(null)}>
                        <motion.img
                            src={Logo}
                            alt="Bru"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="block h-[var(--text-logo)] w-auto"
                        />
                    </ZoomLink>
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
                        tracking-[-0.08em]
                        [column-gap:clamp(1.5rem,5vw,10rem)]
                        max-sm:[row-gap:2rem]
                        translate-y-10
                    "
                >
                    {[
                        { id: "designer", to: "/projects/design", label: "Designer" },
                        { id: "developer", to: "/projects/development", label: "Developer" },
                        { id: "creative", to: "/projects/creative", label: "Creative" },
                    ].map((item, index) => (

                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20, transition: {duration: 0.4, ease: "easeOut"} }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.7 + index * 0.40 }}
                        >

                            <HoverLink
                                id={item.id}
                                to={item.to}
                                hoverTarget={hoverTarget}
                                setHoverTarget={setHoverTarget}
                            >

                                {item.label}

                            </HoverLink>

                        </motion.div>

                    ))}

                </div>

            </div>

            {/* Button Icons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: hoverTarget !== null ? 0 : 1, y: 0 }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                transition={{
                    opacity: { 
                        duration: 0.4, 
                        delay: hoverTarget !== null ? 0 : (iconsEnteredRef.current ? 0 : 2.3)
                    },
                    y: { duration: 0.4, ease: "easeOut", delay: 2.3 }
                }}
                onAnimationComplete={() => {iconsEnteredRef.current = true; }}
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

                <Link to="https://www.linkedin.com/in/bruno-shimabukuro" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center">
                    <SiLinkedin
                        className="h-12 w-12 lg:h-10 lg:w-10 max-lg:h-8 max-lg:w-8 max-sm:h-6 max-sm:w-6"
                        color="var(--color-blackish)"
                    />
                </Link>

                <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex items-center justify-center">
                    <SiInstagram
                        className="h-12 w-12 lg:h-10 lg:w-10 max-lg:h-8 max-lg:w-8 max-sm:h-6 max-sm:w-6"
                        color="var(--color-blackish)"
                    />
                </Link>

                <Link to="/contact" aria-label="Message" className="inline-flex items-center justify-center">
                    <FiMessageCircle
                        className="h-12 w-12 lg:h-10 lg:w-10 max-lg:h-8 max-lg:w-8 max-sm:h-6 max-sm:w-6"
                        color="var(--color-blackish)"
                    />
                </Link>

            </motion.div>

        </main>

    );

}