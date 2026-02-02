import { useEffect } from "react";
import { motion, animate, useMotionValue } from "motion/react";

export default function PopcornAnimation({ images = []}) {

    const x = useMotionValue(0);

    useEffect(() => {
        if (!images.length) return;

        let controls;

        const run = () => {

            x.set(window.innerWidth + 200);

            controls = animate(x, -400, {

                duration: 6,

                ease: "linear",

                onComplete: run,

            });

        };

        run();

        return () => {
            controls?.cancel?.();
        };

    }, [images.length, x]);


    if (!images.length) return null;

    return (

        <div
            className="
                absolute
                inset-0
                z-0
                pointer-events-none
                overflow-hidden
            "
        >

            <motion.img
                src={images[0]}
                alt=""
                style={{ x }}
                className="
                    absolute 
                    top-20 
                    left-20 
                    w-40 
                    h-auto 
                "
            />
        
        </div>

    );

}