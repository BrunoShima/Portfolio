import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";

const NAV_LINKS = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    {
        to: "/projects",
        label: "PROJECTS",
        children: [
            { to: "/projects/design", label: "Design" },
            { to: "/projects/development", label: "Development" },
            { to: "/projects/creative", label: "Creative" },
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
        >

            <nav className="h-full w-full grid place-items-center px-6">
                
                <ul className="grid text-center">

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
                                text-[length:var(--text-heading)]
                                font-bold tracking-[-0.06em]
                                "
                            >

                                {item.label}

                            </Link>

                            {item.children && hoveredItem === item.to && (
                                
                                <ul className="grid gap-1 mt-1">

                                    {item.children.map((child) => (

                                        <li key={child.to}>

                                            <Link
                                                to={child.to}
                                                onClick={() => { onOpenChange(false); setHoveredItem(null); }}
                                                className="
                                                    text-[length:var(--text-subheading)]
                                                    font-medium
                                                    tracking-[-0.06em]
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

        </div>
    );
}