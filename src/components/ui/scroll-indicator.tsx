"use client";

import { motion } from "framer-motion";

interface ScrollIndicatorProps {
    text: string;
    direction?: "down" | "up";
    className?: string;
}

export function ScrollIndicator({ text, direction = "down", className = "" }: ScrollIndicatorProps) {
    return (
        <motion.div
            className={`flex flex-col items-center justify-center gap-6 py-12 ${className}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
            {direction === "up" && (
                <motion.div
                    className="w-[1px] h-16 bg-gradient-to-t from-foreground/40 to-transparent"
                    animate={{ scaleY: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            )}

            <span className="text-[10px] sm:text-xs font-sans uppercase tracking-[0.5em] text-foreground/60 font-light">
                {text}
            </span>

            {direction === "down" && (
                <motion.div
                    className="w-[1px] h-16 bg-gradient-to-b from-foreground/40 to-transparent"
                    animate={{ scaleY: [0, 1] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            )}
        </motion.div>
    );
}
