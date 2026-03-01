import { useState } from "react";
import MenuOverlay from "./MenuOverlay";

export default function Header(){

    const [open, setOpen] = useState(false);
    
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
                "
            >

                <button
                    type="button"
                    aria-label={open ? "Close Menu" : "Open Menu"}
                    aria-expanded={open}
                    onClick={() => setOpen((prev) => !prev)}
                    className="
                        inline-flex items-center justify-center
                        h-10 w-10
                        bg-transparent
                    "
                >

                    <span className="text-[length:var(--text-subheading)] font-bold pointer-events-none">
                        
                        {open ? "x" : "≡"}

                    </span>

                </button>

            </header>

            <MenuOverlay open={open} onOpenChange={setOpen} />

        </>

    );

}