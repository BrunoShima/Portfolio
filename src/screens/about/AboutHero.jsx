import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export default function AboutHero() {
    const p1Ref = useRef(null);
    const p2Ref = useRef(null);

    // Block scroll events for 800ms — no overflow change, no layout shift
    useEffect(() => {
        const preventDefault = (e) => e.preventDefault();

        document.addEventListener("wheel", preventDefault, { passive: false });
        document.addEventListener("touchmove", preventDefault, { passive: false });

        const timer = setTimeout(() => {
            document.removeEventListener("wheel", preventDefault);
            document.removeEventListener("touchmove", preventDefault);
        }, 800);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("wheel", preventDefault);
            document.removeEventListener("touchmove", preventDefault);
        };
    }, []);

    useEffect(() => {
        const split1 = new SplitText(p1Ref.current, { type: "lines", linesClass: "line-wrapper" });
        const split2 = new SplitText(p2Ref.current, { type: "lines", linesClass: "line-wrapper" });

        const allLines = [...split1.lines, ...split2.lines];

        gsap.set([p1Ref.current, p2Ref.current], { opacity: 1 });
        gsap.set(allLines, { y: "100%", opacity: 0 });

        gsap.to(allLines, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.1,
            delay: 0.8,
        });
    }, []);

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
                        h-[32rem]
                        z-0
                        bg-gradient-to-b
                        from-[var(--color-whiteish)]
                        via-[var(--color-whiteish)]
                        to-transparent
                    "
                />
                <motion.h1
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, transition: { duration: 0.4, ease: "easeOut" }}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
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
                </motion.h1>
            </div>

            <div
                className="
                    text-center
                    text-[length:var(--text-subheading)]
                    px-16 sm:px-22 lg:px-26 max-w-[1600px] mx-auto
                    space-y-10
                    pb-80
                    tracking-[-0.08em]
                "
            >
                <div style={{ overflow: "hidden" }}>
                    <p ref={p1Ref} style={{ opacity: 0 }}>
                        I'm a multidisciplinary creative with a background in <span className="text-[var(--color-yellow)] font-semibold">psychology</span> and <span className="text-[var(--color-yellow)] font-semibold">political science,</span> now focused on graphic/digital <span className="text-[var(--color-yellow)] font-semibold">design</span> and front-end <span className="text-[var(--color-yellow)] font-semibold">development.</span>
                    </p>
                </div>

                <div style={{ overflow: "hidden" }}>
                    <p ref={p2Ref} style={{ opacity: 0 }}>
                       A template won't know you want to change the world, and AI doesn't <span className="text-[var(--color-yellow)] font-semibold">care.</span> I build visual and digital experiences that feel bold, contemporary, and human. Your vision deserves a <span className="text-[var(--color-yellow)] font-semibold">human touch.</span>
                    </p>
                </div>
            </div>
        </section>
    );
}