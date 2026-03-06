"use client";
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRef } from 'react';

interface MinimalistHeroProps {
    logo: React.ReactNode;
    navLinks: { label: string; href: string }[];
    mainText: string;
    readMoreLink?: string;
    imageSrc: string;
    imageAlt: string;
    overlayText: {
        part1: string;
        part2: string;
    };
    socialLinks: { icon: LucideIcon; href: string }[];
    locationText: string;
    className?: string;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <motion.a
        href={href}
        className="relative text-sm font-medium tracking-widest text-foreground/60 transition-colors hover:text-foreground font-sans py-1 group"
        whileHover={{ y: -1 }}
        transition={{ duration: 0.2 }}
    >
        {children}
        <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
    </motion.a>
);

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: LucideIcon }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground/50 transition-colors hover:text-accent"
        whileHover={{ y: -3, scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
    >
        <Icon className="h-5 w-5" />
    </motion.a>
);

// Stagger animation variants
const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
};

const fadeUp: any = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const fadeIn: any = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
};

export const MinimalistHero = ({
    logo,
    navLinks,
    mainText,
    readMoreLink,
    imageSrc,
    imageAlt,
    overlayText,
    socialLinks,
    locationText,
    className,
}: MinimalistHeroProps) => {
    const sectionRef = useRef<HTMLDivElement>(null);

    // Parallax on scroll — hero elements drift slightly as user scrolls down
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);
    const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const circleScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.15]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

    return (
        <motion.div
            ref={sectionRef}
            className={cn(
                'relative flex min-h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 md:p-12',
                className
            )}
            initial="hidden"
            animate="visible"
            variants={stagger}
            style={{ opacity: heroOpacity }}
        >
            {/* Header */}
            <motion.header
                className="z-30 flex w-full max-w-7xl items-center justify-between"
                variants={fadeUp}
            >
                <motion.div
                    className="flex items-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                    {logo}
                </motion.div>
                <motion.div className="hidden items-center space-x-8 md:flex" variants={stagger}>
                    {navLinks.map((link) => (
                        <motion.div key={link.label} variants={fadeUp}>
                            <NavLink href={link.href}>
                                {link.label}
                            </NavLink>
                        </motion.div>
                    ))}
                </motion.div>
                <motion.button
                    variants={fadeUp}
                    className="flex flex-col space-y-1.5 md:hidden group"
                    aria-label="Open menu"
                    whileTap={{ scale: 0.9 }}
                >
                    <span className="block h-0.5 w-6 bg-foreground transition-transform group-hover:w-7"></span>
                    <span className="block h-0.5 w-6 bg-foreground"></span>
                    <span className="block h-0.5 w-5 bg-foreground transition-transform group-hover:w-7"></span>
                </motion.button>
            </motion.header>

            {/* Main Content Area */}
            <div className="relative grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3 mt-12 md:mt-0">
                {/* Left Text Content */}
                <motion.div
                    className="z-20 order-2 md:order-1 text-center md:text-left mt-8 md:mt-0"
                    variants={fadeUp}
                    style={{ y: textY }}
                >
                    <p className="mx-auto max-w-xs text-base leading-relaxed text-foreground/80 md:mx-0 font-sans">{mainText}</p>
                    {readMoreLink && (
                        <motion.a
                            href={readMoreLink}
                            className="mt-4 inline-block text-sm font-medium text-foreground underline decoration-1 underline-offset-4 hover:text-accent transition-colors font-sans group"
                            whileHover={{ x: 4 }}
                        >
                            Read More
                        </motion.a>
                    )}
                </motion.div>

                {/* Center Image with Circle */}
                <div className="relative order-1 md:order-2 flex justify-center items-center h-[50vh] md:h-full">
                    <motion.div
                        className="absolute z-0 h-[300px] w-[300px] rounded-full bg-accent md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                        style={{ scale: circleScale }}
                    />
                    <motion.div
                        className="relative z-10 w-[280px] h-[350px] md:w-[350px] md:h-[450px] lg:w-[450px] lg:h-[600px] flex justify-center items-end"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                        style={{ y: imageY }}
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-contain object-bottom"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right Text */}
                <motion.div
                    className="z-20 order-3 flex items-center justify-end text-right mt-8 md:mt-0"
                    variants={fadeUp}
                    style={{ y: textY }}
                >
                    <motion.h1
                        className="text-5xl font-extrabold text-foreground md:text-6xl lg:text-[5.5rem] xl:text-[7.5rem] font-heading tracking-tighter mix-blend-difference pointer-events-none select-none lg:translate-x-0"
                        initial={{ clipPath: "inset(100% 0 0 0)" }}
                        animate={{ clipPath: "inset(0% 0 0 0)" }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
                    >
                        {overlayText.part1}
                        <br />
                        {overlayText.part2}
                    </motion.h1>
                </motion.div>
            </div>

            {/* Footer Elements */}
            <motion.footer
                className="z-30 flex w-full max-w-7xl items-center justify-between mt-12 md:mt-0"
                variants={fadeUp}
            >
                <div className="flex items-center space-x-6 md:space-x-4">
                    {socialLinks.map((link, index) => (
                        <SocialIcon key={index} href={link.href} icon={link.icon} />
                    ))}
                </div>
                <motion.div
                    className="text-sm font-medium text-foreground/80 font-sans tracking-widest uppercase"
                    whileHover={{ letterSpacing: "0.2em" }}
                    transition={{ duration: 0.3 }}
                >
                    {locationText}
                </motion.div>
            </motion.footer>

        </motion.div>
    );
};
