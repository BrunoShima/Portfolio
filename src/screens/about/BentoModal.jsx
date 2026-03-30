import React, { useEffect } from "react";


export default function BentoModal({ open, title, children, onClose }) {

    useEffect(() => {
        if(!open) return

        const prevOverFlow = document.body.style.overflow
        document.body.style.overflow = "hidden"

        return () => {
            document.body.style.overflow = prevOverFlow
        }
    }, [open])

    useEffect(() => {
        if (!open) return

        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose?.()
        }

        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [open, onClose])

    if (!open) return null
    
    return (

        <div
            className="
                fixed inset-0 z-50
                flex items-center justify-center
                bg-black/50
                px-6
            "
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog"}
        >

            <div
                className="
                    w-[92svw] sm:w-[88svw] lg:w-[72svw] 2xl:w-[60svw]

                    h-[70svh] sm:h-[55svh]
                    max-h-[85svh]

                    rounded-md
                    border-2 border-[var(--color-blackish)]
                    bg-[var(--color-whiteish)]
                    p-6 sm:p-10
                "
                onClick={(e) => e.stopPropagation()}
            >

                <div
                    className="
                        flex
                        items-start
                        justify-between
                        gap-6
                    "
                >

                    <h2
                        className="
                            [font-family:var(--font-main)]
                            font-bold
                            text-[length:var(--text-subheading)]
                            tracking-[-0.06em]
                            text-[var(--color-blackish)]
                        "
                    >

                        {title}

                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            border-2 border-[var(--color-blackish)]
                            rounded-md
                            px-3 py-1
                            [font-family:var(--font-main)]
                            font-medium
                            text-[var(--color-blackish)]
                        "
                    >

                            Close

                    </button>

                </div>

                <div
                    className="
                        mt-6
                        text-[var(--color-blackish)]
                        overflow-y-auto
                        h-[calc(100%-6rem)]
                    "                
                >

                    {children}

                </div>

            </div>

        </div>
    )
}