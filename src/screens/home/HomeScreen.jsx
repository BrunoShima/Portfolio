import { SiLinkedin, SiInstagram } from "react-icons/si";
import { FiMessageCircle } from "react-icons/fi";

export default function HomeScreen() {

    return (

        <main
            className="
            min-h-screen
            w-full
            grid 
            place-items-center
            overflow-x-hidden
        "
        >

            <div
                className="
                    relative
                    text-center
                "
            >

                {/* Flushed Logo */}
                <h1
                    className="
                        relative
                        z-10
                        text-[var(--color-blackish)]
                        [font-family:var(--font-main)]
                        [font-size:var(--text-logo)]
                        font-extrabold
                        tracking-[-0.1em]
                        "
                >

                    BRU.

                </h1>

                <h1
                    aria-hidden="true"
                    className="
                        absolute inset-0
                        text-[var(--color-yellow)]
                        [font-family:var(--font-main)]
                        [font-size:var(--text-logo)]
                        font-extrabold
                        tracking-[-0.1em]
                        -translate-x-3
                        "
                >

                    BRU.

                </h1>

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
                    "
                >
                    <span>Designer</span>

                    <span>Developer</span>

                    <span>Creative</span>

                </div>

                {/* Button Icons */}
                <div 
                    className="
                        absolute 
                        mt-30 
                        left-0 
                        right-0 
                        flex 
                        justify-center 
                        [gap:clamp(1.5rem,5vw,10rem)]
                    "
                >

                <a
                    href="#"
                    aria-label="LinkedIn"
                    className="
                        inline-flex 
                        items-center 
                        justify-center  
                        hover:opacity-70
                        transition
                    "
                >

                    <SiLinkedin 
                        className="
                            h-7 w-7
                            max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5
                        "
                        color="var(--color-blackish)"
                    />

                </a>

                <a
                    href="#"
                    aria-label="Instagram"
                    className="
                        inline-flex 
                        items-center 
                        justify-center 
                        hover:opacity-70 
                        transition
                    "
                >

                    <SiInstagram 
                        className="
                            h-7 w-7
                            max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5
                        "
                        color="var(--color-blackish)"
                    />

                </a>

                <a
                    href="#"
                    aria-label="Message"
                    className="
                        inline-flex 
                        items-center 
                        justify-center 
                        hover:opacity-70
                        transition
                    "
                >

                    <FiMessageCircle 
                        className="
                            h-7 w-7
                            max-lg:w-6 max-lg:h-6 max-sm:w-5 max-sm:h-5
                        "
                        color="var(--color-blackish)"
                    />
                    
                </a>

                </div>

            </div>

        </main>
    );
}