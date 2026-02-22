export default function AboutHero() {
    return (
        <section
            className="
                min-h-dvh
                flex
                flex-col
                bg-[var(--color-whiteish)]
                relative
            "
        >

            <div className="sticky top-0 z-20 relative overflow-hidden">

                <div
                    className="
                        pointer-events-none
                        absolute top-0 left-0 right-0
                        h-180
                        z-0
                        bg-gradient-to-b
                        from-[var(--color-whiteish)]
                        to-transparent
                    "
                />

                <h1
                    className="
                        relative
                        z-10
                        text-center
                        text-[var(--color-yellow)]
                        [font-family:var(--font-main)]
                        text-[length:var(--text-logo)]
                        font-extrabold
                        tracking-[-0.1em]
                        pt-60
                        pb-10
                    "
                >
                    
                    Hi, I'm <span className="text-[var(--color-blackish)]">Bruno.</span>

                </h1>

            </div>

            {/* Scrolling text (will pass behind the sticky layer) */}
            <div
                className="
                    text-justify [text-align-last:start]
                    text-[length:var(--text-subheading)]
                    px-16 sm:px-22 lg:px-26 max-w-[1600px] mx-auto
                    space-y-10
                    pb-80
                    tracking-[-0.08em]
                "
            >

                <p>
                    I'm a <span className="text-[var(--color-yellow)] font-semibold">multidisciplinary creative</span> with a background in <span className="text-[var(--color-yellow)] font-semibold">psychology</span> and <span className="text-[var(--color-yellow)] font-semibold">political science,</span> now focused on graphic/digital <span className="text-[var(--color-yellow)] font-semibold">design</span> and front-end <span className="text-[var(--color-yellow)] font-semibold">development.</span>
                    
                </p>

                <p>
                    I'm here for design that has <span className="text-[var(--color-yellow)] font-semibold">presence,</span> but still respects the user. Clear structure, strong choices, and a little <span className="text-[var(--color-yellow)] font-semibold">personality.</span> I like moving from idea to execution and polishing until it feels finished, not just “good enough.” I build visual and digital experiences that feel <span className="text-[var(--color-yellow)] font-semibold">bold, contemporary, and human.</span> 
                    
                </p>

            </div>

        </section>
    );
}