"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Lenis from "lenis";

const images = [
    "/posters/poster (1).jpeg",
    "/posters/poster (2).jpeg",
    "/posters/poster (3).jpeg",
    "/posters/poster (4).jpeg",
    "/posters/poster (5).jpeg",
    "/posters/poster (6).jpeg",
    "/posters/poster (7).jpeg",
    "/posters/poster (8).jpeg",
    "/posters/poster (9).jpeg",
    "/posters/poster (10).jpeg",
    "/posters/poster (11).jpeg",
    "/posters/poster (12).jpeg",
    "/posters/poster (13).jpeg",
    "/posters/poster (1).jpeg",
    "/posters/poster (3).jpeg",
];

const Skiper30 = () => {
    const gallery = useRef<HTMLDivElement>(null);
    const [dimension, setDimension] = useState({ width: 0, height: 0 });

    const { scrollYProgress } = useScroll({
        target: gallery,
        offset: ["start end", "end start"],
    });

    const { height } = dimension;
    const y = useTransform(scrollYProgress, [0, 1], [0, height * 1.2]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 1.8]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.8]);
    const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 1.5]);

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });
        let rafId: number;

        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };

        const resize = () => {
            setDimension({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener("resize", resize);
        rafId = requestAnimationFrame(raf);
        resize();

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    const allImages = [...images, ...images]; // Duplicate array for more content

    return (
        <div className="w-full bg-background text-foreground relative z-10">
            <div
                ref={gallery}
                className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-background p-[2vw]"
            >
                <Column images={allImages.slice(0, 18)} y={y} />
                <Column images={allImages.slice(2, 20)} y={y2} />
                <Column images={allImages.slice(4, 22)} y={y3} />
                <Column images={allImages.slice(6, 24)} y={y4} />
            </div>
        </div>
    );
};

type ColumnProps = {
    images: string[];
    y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
    return (
        <motion.div
            className="relative flex w-1/4 min-w-[200px] flex-col gap-[2vw] first:top-[-15%] [&:nth-child(2)]:top-[-50%] [&:nth-child(3)]:top-[-20%] [&:nth-child(4)]:top-[-30%] will-change-transform"
            style={{ y }}
        >
            {images.map((src, i) => (
                <motion.div
                    key={src + i}
                    className="relative w-full overflow-hidden rounded-xl group cursor-pointer aspect-[3/4] flex-shrink-0"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    <Image
                        src={src}
                        alt="poster"
                        fill
                        className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                        priority={i < 2}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500 pointer-events-none" />
                </motion.div>
            ))}
        </motion.div>
    );
};

export { Skiper30 };
