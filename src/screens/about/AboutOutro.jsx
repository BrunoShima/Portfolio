import { Link } from "react-router";
import { motion } from "motion/react";

import { SiLinkedin, SiInstagram } from "react-icons/si";
import { FiMessageCircle } from "react-icons/fi";

const ICON_SIZE = "h-12 w-12 lg:h-10 lg:w-10 max-lg:h-8 max-lg:w-8 max-sm:h-6 max-sm:w-6";

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
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                    transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                    className="
                        text-center
                        font-bold
                        [font-family:var(--font-main)]
                        text-[length:var(--text-logo)]
                        tracking-[-0.1em]
                    "
                >
                    Let's <span className="text-[var(--color-yellow)]">Chat?</span>
                </motion.h1>

                <div
                    className="
                        mt-8
                        flex flex-row
                        items-center
                        [gap:clamp(1.5rem,5vw,10rem)]
                    "
                >
                    {[
                        { href: "https://www.linkedin.com/in/bruno-shimabukuro", icon: <SiLinkedin className={ICON_SIZE} color="var(--color-blackish)" />, label: "LinkedIn", external: true },
                        { href: "https://instagram.com", icon: <SiInstagram className={ICON_SIZE} color="var(--color-blackish)" />, label: "Instagram", external: true },
                        { to: "/contact", icon: <FiMessageCircle className={ICON_SIZE} color="var(--color-blackish)" />, label: "Message", external: false },
                    ].map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                            transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 }}
                        >
                            {item.external ? (
                                <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={item.label} className="inline-flex items-center justify-center">
                                    {item.icon}
                                </a>
                            ) : (
                                <Link to={item.to} aria-label={item.label} className="inline-flex items-center justify-center">
                                    {item.icon}
                                </Link>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                exit={{ opacity: 0, y: 20, transition: { duration: 0.4, ease: "easeOut" } }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 1.3 }}
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
                    ← Back Home
                </Link>

                <Link
                    to="/projects"
                    className="
                        text-right
                        [font-family:var(--font-main)]
                        text-[length:var(--text-body2)]
                        font-medium
                    "
                >
                    My Work →
                </Link>
            </motion.div>
        </section>
    );
}