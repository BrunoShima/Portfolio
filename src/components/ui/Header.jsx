import { useState } from "react";
import { useLocation, Link } from "react-router";
import MenuOverlay from "./MenuOverlay";

export default function Header(){

    const [open, setOpen] = useState(false);
    const { pathname } = useLocation();
    const isHome = pathname === "/";
    
    return(
        <>
            <header
                className="
                    fixed top-0 left-0 right-0 z-[99999]
                    h-16
                    flex items-center
                    px-5 sm:px-8
                    bg-transparent
                    text-[var(--color-blackish)]
                    [font-family:var(--font-main)]
                    justify-end
                "
            >
                {!isHome && !open && (
                    <Link to="/" className="mr-auto">
                        <img
                            src="/favicon.svg"
                            alt="BRU logo"
                            style={{ height: "32px", width: "32px" }}
                        />
                    </Link>
                )}

                <button
                    type="button"
                    aria-label={open ? "Close Menu" : "Open Menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((prev) => !prev)}
                    className="
                        inline-flex items-center justify-center
                        h-12 w-12
                        bg-transparent
                        cursor-pointer
                    "
                >
                    {open ? (
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-blackish)" strokeWidth="3.5" strokeLinecap="square">
                            <line x1="4" y1="4" x2="24" y2="24" />
                            <line x1="24" y1="4" x2="4" y2="24" />
                        </svg>
                    ) : (
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="var(--color-blackish)" strokeWidth="3.5" strokeLinecap="square">
                            <line x1="3" y1="7" x2="25" y2="7" />
                            <line x1="3" y1="14" x2="25" y2="14" />
                            <line x1="3" y1="21" x2="25" y2="21" />
                        </svg>
                    )}
                </button>
            </header>

            <MenuOverlay open={open} onOpenChange={setOpen} />
        </>
    );
}