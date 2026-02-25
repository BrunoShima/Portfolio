import { useEffect } from "react";
import { Link, useLocation } from "react-router";

const NAV_LINKS = [
    { to: "/", label: "HOME" },
    { to: "/about", label: "ABOUT" },
    { to: "/projects", label: "PROJECTS" },
    { to: "/contact", label: "CONTACT" },
];

export default function MenuOverlay({ open, onOpenChange }) {

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

                        <li key={item.to}>

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

                        </li>

                    ))}

                </ul>

            </nav>

        </div>
    );
}