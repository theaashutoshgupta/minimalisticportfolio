"use client";

import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
    Carousel,
    CarouselApi,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

const Skiper54 = () => {
    const images = [
        {
            src: "/posters/poster (1).jpeg",
            alt: "Poster 1",
            title: "Block Reader",
        },
        {
            src: "/posters/poster (2).jpeg",
            alt: "Poster 2",
            title: "Forest Fungi",
        },
        {
            src: "/posters/poster (3).jpeg",
            alt: "Poster 3",
            title: "Golden Dusk",
        },
        {
            src: "/posters/poster (4).jpeg",
            alt: "Poster 4",
            title: "Silent Peaks",
        },
        {
            src: "/posters/poster (5).jpeg",
            alt: "Poster 5",
            title: "Emerald Woods",
        },
        {
            src: "/posters/poster (6).jpeg",
            alt: "Poster 6",
            title: "Falling Mist",
        },
        {
            src: "/posters/poster (7).jpeg",
            alt: "Poster 7",
            title: "Midnight Veil",
        },
        {
            src: "/posters/poster (8).jpeg",
            alt: "Poster 8",
            title: "Azure Ridge",
        },
        {
            src: "/posters/poster (9).jpeg",
            alt: "Poster 9",
            title: "Cloud Summit",
        },
    ];
    return (
        <motion.div
            className="flex w-full items-center justify-center overflow-hidden bg-background py-20 pb-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.1 }}
        >
            <Carousel_006
                images={images}
                className=""
                loop={true}
                showNavigation={true}
                showPagination={true}
            />
        </motion.div>
    );
};

interface Carousel_006Props {
    images: { src: string; alt: string; title: string }[];
    className?: string;
    autoplay?: boolean;
    loop?: boolean;
    showNavigation?: boolean;
    showPagination?: boolean;
}

const Carousel_006 = ({
    images,
    className,
    autoplay = false,
    loop = true,
    showNavigation = true,
    showPagination = true,
}: Carousel_006Props) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    return (
        <Carousel
            setApi={setApi}
            className={cn("w-full max-w-7xl relative mx-auto", className)}
            opts={{
                loop,
                slidesToScroll: 1,
            }}
            plugins={
                autoplay
                    ? [
                        Autoplay({
                            delay: 2000,
                            stopOnInteraction: true,
                            stopOnMouseEnter: true,
                        }),
                    ]
                    : []
            }
        >
            <CarouselContent className="flex h-[400px] md:h-[500px] w-full items-center">
                {images.map((img, index) => (
                    <CarouselItem
                        key={index}
                        className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
                    >
                        <motion.div
                            initial={false}
                            animate={{
                                clipPath:
                                    current !== index
                                        ? "inset(15% 0 15% 0 round 2rem)"
                                        : "inset(0 0 0 0 round 2rem)",
                                opacity: current !== index ? 0.6 : 1,
                                scale: current !== index ? 0.9 : 1,
                            }}
                            className="h-[100%] w-full overflow-hidden rounded-3xl group cursor-pointer"
                            whileHover={current === index ? { scale: 1.02 } : {}}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        >
                            <div className="relative h-full w-full border border-foreground/10 bg-accent/5">
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    sizes="(max-width: 768px) 73vw, (max-width: 1024px) 30vw, 25vw"
                                    className="scale-105 object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Subtle gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        </motion.div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            <div className="flex flex-col items-center justify-center w-full mt-12 space-y-4">
                {showNavigation && (
                    <div className="flex items-center justify-center gap-4">
                        <motion.button
                            aria-label="Previous slide"
                            onClick={() => api?.scrollPrev()}
                            className="rounded-full bg-foreground/10 hover:bg-accent/20 hover:text-accent transition-all p-3 group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="text-foreground h-5 w-5 group-hover:text-accent transition-colors" />
                        </motion.button>
                        <motion.button
                            aria-label="Next slide"
                            onClick={() => api?.scrollNext()}
                            className="rounded-full bg-foreground/10 hover:bg-accent/20 hover:text-accent transition-all p-3 group"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="text-foreground h-5 w-5 group-hover:text-accent transition-colors" />
                        </motion.button>
                    </div>
                )}

                {showPagination && (
                    <div className="flex items-center justify-center gap-2 mt-4">
                        {Array.from({ length: images.length }).map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => api?.scrollTo(index)}
                                className={cn(
                                    "h-2 cursor-pointer rounded-full transition-all duration-300",
                                    current === index ? "bg-accent w-6" : "bg-foreground/20 w-2 hover:bg-foreground/40",
                                )}
                                whileHover={{ scale: 1.3 }}
                                whileTap={{ scale: 0.8 }}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Carousel>
    );
};

export { Skiper54 };
