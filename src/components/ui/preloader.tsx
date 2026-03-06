"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

export function Preloader({ onComplete }: { onComplete: () => void }) {
    const [progress, setProgress] = useState(0);

    const handleComplete = useCallback(() => {
        onComplete();
    }, [onComplete]);

    useEffect(() => {
        const criticalImages = [
            "/heroimage.png",
            "/posters/poster (1).jpeg",
            "/posters/poster (2).jpeg",
            "/posters/poster (3).jpeg",
            "/posters/poster (4).jpeg",
        ];

        let loadedCount = 0;
        const totalImages = criticalImages.length;

        const incrementProgress = () => {
            loadedCount++;
            const newProgress = Math.floor((loadedCount / totalImages) * 100);
            setProgress(newProgress);
        };

        criticalImages.forEach((src) => {
            const img = new window.Image();
            img.src = src;
            img.onload = incrementProgress;
            img.onerror = incrementProgress; // Count errors too to avoid blocking
        });

        // Fallback interval to ensure progress moves even if images are cached or slow
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                const increment = Math.random() > 0.8 ? 1 : 0;
                return Math.min(prev + increment, 99);
            });
        }, 50);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                handleComplete();
            }, 500);
            return () => clearTimeout(timeout);
        }
    }, [progress, handleComplete]);

    // Shimmer animation for skeletal blocks
    const shimmer: any = {
        hidden: { x: "-100%" },
        visible: {
            x: "200%",
            transition: {
                repeat: Infinity,
                duration: 1.5,
                ease: "linear",
            },
        },
    };

    const SkeletonBlock = ({ className }: { className: string }) => (
        <div className={`relative overflow-hidden bg-foreground/[0.06] ${className}`}>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/[0.04] to-transparent"
                variants={shimmer}
                initial="hidden"
                animate="visible"
            />
        </div>
    );

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
            {/* Skeletal layout mirroring the hero section structure */}
            <div className="absolute inset-0 flex flex-col p-8 md:p-12 max-w-7xl mx-auto w-full">
                {/* Navigation skeleton */}
                <div className="flex items-center justify-between w-full mb-auto">
                    <SkeletonBlock className="h-9 w-36 rounded-lg" />
                    <div className="hidden md:flex items-center gap-8">
                        <SkeletonBlock className="h-4 w-16 rounded-md" />
                        <SkeletonBlock className="h-4 w-20 rounded-md" />
                        <SkeletonBlock className="h-4 w-14 rounded-md" />
                        <SkeletonBlock className="h-4 w-18 rounded-md" />
                    </div>
                </div>

                {/* Main content skeleton — 3-column grid mirroring hero */}
                <div className="grid grid-cols-1 md:grid-cols-3 items-center flex-grow gap-8">
                    {/* Left text area */}
                    <div className="order-2 md:order-1 flex flex-col gap-3 mx-auto md:mx-0">
                        <SkeletonBlock className="h-3 w-48 rounded-md" />
                        <SkeletonBlock className="h-3 w-40 rounded-md" />
                        <SkeletonBlock className="h-3 w-32 rounded-md" />
                    </div>

                    {/* Center circle — mimics hero portrait */}
                    <div className="order-1 md:order-2 flex justify-center items-center">
                        <div className="relative">
                            <SkeletonBlock className="h-[280px] w-[280px] md:h-[360px] md:w-[360px] lg:h-[420px] lg:w-[420px] rounded-full" />
                            {/* Inner accent shimmer ring */}
                            <motion.div
                                className="absolute inset-4 rounded-full border border-accent/10"
                                animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </div>
                    </div>

                    {/* Right text area */}
                    <div className="order-3 flex flex-col gap-2 mx-auto md:mx-0 md:ml-auto items-center md:items-start">
                        <SkeletonBlock className="h-10 w-48 rounded-lg" />
                        <SkeletonBlock className="h-10 w-36 rounded-lg" />
                    </div>
                </div>

                {/* Bottom bar skeleton mirroring social links + location */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-4">
                        <SkeletonBlock className="h-5 w-5 rounded-full" />
                        <SkeletonBlock className="h-5 w-5 rounded-full" />
                        <SkeletonBlock className="h-5 w-5 rounded-full" />
                        <SkeletonBlock className="h-5 w-5 rounded-full" />
                    </div>
                    <SkeletonBlock className="h-4 w-24 rounded-md" />
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full max-w-sm px-8 absolute bottom-10 md:bottom-16">
                <div className="flex justify-between items-center mb-3 text-foreground/60 font-sans tracking-[0.2em] text-[10px] uppercase font-medium">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        Loading
                    </motion.span>
                    <motion.span
                        key={progress}
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 1 }}
                    >
                        {progress > 100 ? 100 : progress}%
                    </motion.span>
                </div>
                <div className="h-px w-full bg-foreground/10 overflow-hidden relative">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-accent"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.15 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
