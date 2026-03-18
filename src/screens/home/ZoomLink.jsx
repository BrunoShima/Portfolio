import { useAnimate } from "motion/react";
import { useNavigate } from "react-router";

export default function ZoomLink({ to, children, className }) {
    const [scope, animate] = useAnimate();
    const navigate = useNavigate();

    async function handleClick(e) {
        e.preventDefault();

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
            className={`cursor-pointer inline-block ${className || ""}`}
        >
            {children}
        </span>
    );
}