import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { SiLinkedin, SiInstagram } from "react-icons/si";

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

    // ESC Close
    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onOpenChange]);

    // Scroll lock
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Close on Route Change
    useEffect(() => {
        if (open) onOpenChange(false);
    }, [location.pathname]);

    if (!open) return null;

    return (
        <div
            className="
                fixed inset-0 z-[900]
                bg-[var(--color-whiteish)]
                text-[var(--color-blackish)]
                [font-family:var(--font-main)]
            "
            onClick={() => setHoveredItem(null)}
        >
            <nav className="h-full w-full grid place-items-center px-10 sm:px-16">

                <ul className="flex flex-col gap-1 text-center">

                    {NAV_LINKS.map((item) => (
                        <li
                            key={item.to}
                            onMouseEnter={() => item.children ? setHoveredItem(item.to) : null}
                            onMouseLeave={() => setHoveredItem(null)}

                        >
                            <Link
                                to={item.to}
                                onClick={() => onOpenChange(false)}
                                className="
                                    relative
                                    inline-flex items-center justify-center
                                    text-[length:var(--text-heading)]
                                    font-bold tracking-[-0.06em]
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
                                            transform: hoveredItem === item.to ? "rotate(90deg)" : "rotate(0deg)"
                                        }}
                                    >
                                        ▶
                                    </span>
                                )}
                            </Link>

                            {/* Submenu */}
                            {item.children && hoveredItem === item.to && (
                                <ul className="flex flex-col gap-0">
                                    {item.children.map((child) => (
                                        <li key={child.to}>
                                            <Link
                                                to={child.to}
                                                onClick={() => { onOpenChange(false); setHoveredItem(null); }}
                                                className="
                                                    text-[length:var(--text-subheading)]
                                                    font-bold
                                                    tracking-[-0.06em]
                                                    opacity-50
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

            {/* Bottom right — social icons */}
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

        </div>
    );
}