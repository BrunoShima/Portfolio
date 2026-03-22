import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { SiLinkedin, SiInstagram } from "react-icons/si";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    {
        to: "/projects",
        label: "PROJECTS",
        children: [
            { to: "/projects/design", label: "DESIGN" },
            { to: "/projects/development", label: "DEVELOPMENT" },
            { to: "/projects/creative", label: "CREATIVE" },
        ],
    },
    { to: "/contact", label: "CONTACT" },
];

export default function MenuOverlay({ open, onOpenChange }) {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [openSubmenu, setOpenSubmenu] = useState(null);
    const location = useLocation();

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onOpenChange]);

    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (open) onOpenChange(false);
    }, [location.pathname]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ y: "-100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="
                        fixed inset-0 z-[900]
                        bg-[var(--color-whiteish)]
                        text-[var(--color-blackish)]
                        [font-family:var(--font-main)]
                    "
                    onClick={() => setHoveredItem(null)}
                >
                    <nav className="
                        h-full w-full
                        flex flex-col items-center
                        justify-start
                        pt-7
                    ">
                        <ul
                            className="flex flex-col gap-0 text-center"
                            onMouseLeave={() => {
                                setHoveredItem(null);
                                setOpenSubmenu(null);
                            }}
                        >
                            {NAV_LINKS.map((item) => (
                                <li
                                    key={item.to}
                                    onMouseEnter={() => {
                                        setHoveredItem(item.to);
                                        if (item.children) setOpenSubmenu(item.to);
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
                                    >
                                        <Link
                                            to={item.to}
                                            onClick={() => onOpenChange(false)}
                                            style={{ color: hoveredItem === item.to ? "var(--color-yellow)" : "var(--color-blackish)" }}
                                            className="
                                                relative
                                                inline-flex items-center justify-center
                                                text-[length:var(--text-heading)]
                                                font-bold tracking-[-0.06em]
                                                transition-colors duration-200
                                            "
                                        >
                                            {item.label}

                                            {item.children && (
                                                <span
                                                    style={{
                                                        position: "absolute",
                                                        right: "-1.2em",
                                                        fontSize: "0.3em",
                                                        transition: "transform 200ms",
                                                        transform: openSubmenu === item.to ? "rotate(90deg)" : "rotate(0deg)"
                                                    }}
                                                >
                                                    ▶
                                                </span>
                                            )}
                                        </Link>
                                    </motion.div>

                                    {item.children && openSubmenu === item.to && (
                                        <ul className="flex flex-col gap-0">
                                            {item.children.map((child) => (
                                                <li key={child.to}>
                                                    <Link
                                                        to={child.to}
                                                        onClick={() => { onOpenChange(false); setHoveredItem(null); setOpenSubmenu(null); }}
                                                        className="
                                                            text-[length:var(--text-subheading)]
                                                            font-bold
                                                            tracking-[-0.06em]
                                                            opacity-50
                                                            transition-colors duration-200
                                                            hover:text-[var(--color-yellow)]
                                                            hover:opacity-100
                                                        "
                                                    >
                                                        {child.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="absolute bottom-10 right-10 flex items-center gap-6">
                        <a
                            href="https://www.linkedin.com/in/bruno-shimabukuro"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="inline-flex items-center justify-center"
                        >
                            <SiLinkedin className="h-10 w-10" color="var(--color-blackish)" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="inline-flex items-center justify-center"
                        >
                            <SiInstagram className="h-10 w-10" color="var(--color-blackish)" />
                        </a>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}