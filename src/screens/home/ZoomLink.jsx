import { useState } from "react";
import { useAnimate } from "motion/react";
import { useNavigate } from "react-router";

export default function ZoomLink({ to, children, className, onBeforeNavigate }) {
    const [scope, animate] = useAnimate();
    const navigate = useNavigate();
    const [clicked, setClicked] = useState(false);

    async function handleClick(e) {
        e.preventDefault();
        onBeforeNavigate?.();

        setTimeout(() => setClicked(true), 150);

        await animate(scope.current, {
            scale: 30,
            opacity: 1,
        }, {
            duration: 0.6,
            ease: "easeIn",
        });

        navigate(to);
    }

    return (
        <span
            ref={scope}
            onClick={handleClick}
            style={clicked ? { backgroundColor: "var(--color-whiteish)" } : {}}
            className={`cursor-pointer inline-block ${className || ""}`}
        >
            {children}
        </span>
    );
}