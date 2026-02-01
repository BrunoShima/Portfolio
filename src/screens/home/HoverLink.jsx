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

    return (

        <motion.div
            initial={false}
            animate={{ opacity: isInactive ? 0 : 1 }}
            transition={{ duration: 0.4 }}
            className={`
                ${isInactive ? "pointer-events-none" : ""}
            `}
        >

            <Link
                to={to}
                onMouseEnter={() => setHoverTarget(id)}
                onMouseLeave={() => setHoverTarget(null)}
                className={`
                    ${className || ""}
                `}
            >

                {children}

            </Link>

        </motion.div>

    );
}