import { Link } from "react-router";
import { motion } from "motion/react";

export default function HoverLink({
    id,
    to,
    hoverTarget,
    setHoverTarget,
    className,
    children,
}) {

    const isActive = hoverTarget === id;
    const isInactive = hoverTarget !== null && hoverTarget !== id;
    const canHover = window.matchMedia("(hover: hover)").matches;
    

    return (
        <motion.div
            initial={false}
            animate={{ opacity: isInactive ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className={`
                ${isInactive ? "pointer-events-none" : ""}
            `}
        >
            {to ? (
                <Link
                    to={to}
                    onMouseEnter={() => canHover && setHoverTarget(id)}
                    onMouseLeave={() => canHover && setHoverTarget(null)}
                    className={className || ""}
                >
                    {children}
                </Link>
            ) : (
                <div
                    onMouseEnter={() => canHover && setHoverTarget(id)}
                    onMouseLeave={() => canHover && setHoverTarget(null)}
                    className={className || ""}
                >
                    {children}
                </div>
            )}
        </motion.div>
    );
}