"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import {
    PenTool,
    Type,
    Layout,
    Printer,
    Palette,
    Image as ImageIcon,
    Award,
    Users,
    Calendar,
    Zap,
    TrendingUp,
    Sparkles,
    Star,
    CheckCircle
} from "lucide-react"
import { motion, useScroll, useTransform, useInView, useSpring } from "framer-motion"
import Image from "next/image"

export function AboutMeSection() {
    const sectionRef = useRef<HTMLDivElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 })
    const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 })

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    })

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50])
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50])
    const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20])
    const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants: any = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
    }

    const services = [
        {
            icon: <PenTool className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-foreground/50" />,
            title: "Concept Design",
            description:
                "Transform your ideas into striking visual concepts. I blend functionality and aesthetics to create posters that reflect your unique message.",
            position: "left",
        },
        {
            icon: <Type className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-foreground/50" />,
            title: "Typography",
            description:
                "Make a lasting impression with stunning typographic designs that enhance readability and create harmonious hierarchy.",
            position: "left",
        },
        {
            icon: <Palette className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-foreground/50" />,
            title: "Illustration",
            description:
                "My innovative illustration process combines creativity with bold visuals, resulting in posters that are both beautiful and impactful.",
            position: "left",
        },
        {
            icon: <ImageIcon className="w-6 h-6" />,
            secondaryIcon: <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-foreground/50" />,
            title: "Brand Identity",
            description:
                "Elevate your brand with my curated design services. From color schemes to visual identity, I perfect every detail to bring your vision to life.",
            position: "right",
        },
        {
            icon: <Layout className="w-6 h-6" />,
            secondaryIcon: <CheckCircle className="w-4 h-4 absolute -top-1 -right-1 text-foreground/50" />,
            title: "Layouting",
            description:
                "My meticulous layouting process ensures every project runs smoothly from concept to completion, with careful attention to structure and flow.",
            position: "right",
        },
        {
            icon: <Printer className="w-6 h-6" />,
            secondaryIcon: <Star className="w-4 h-4 absolute -top-1 -right-1 text-foreground/50" />,
            title: "Print Ready",
            description:
                "Watch your dream posters come to life through my flawless execution. I ensure files are properly setup for high-quality production.",
            position: "right",
        },
    ]

    const stats = [
        { icon: <Award />, value: 150, label: "Posters Designed", suffix: "+" },
        { icon: <Users />, value: 120, label: "Happy Clients", suffix: "+" },
        { icon: <Calendar />, value: 5, label: "Years Experience", suffix: "" },
        { icon: <TrendingUp />, value: 99, label: "Satisfaction Rate", suffix: "%" },
    ]

    return (
        <section
            id="about-section"
            ref={sectionRef}
            className="w-full py-32 px-4 bg-background text-foreground overflow-hidden relative"
        >
            {/* Decorative background elements */}
            <motion.div
                className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/5 blur-3xl pointer-events-none"
                style={{ y: y1, rotate: rotate1 }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-foreground/5 blur-3xl pointer-events-none"
                style={{ y: y2, rotate: rotate2 }}
            />
            <motion.div
                className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-accent/30 pointer-events-none"
                animate={{
                    y: [0, -15, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-foreground/20 pointer-events-none"
                animate={{
                    y: [0, 20, 0],
                    opacity: [0.5, 1, 0.5],
                }}
                transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                    delay: 1,
                }}
            />

            <motion.div
                className="container mx-auto max-w-6xl relative z-10"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <motion.div className="flex flex-col items-center mb-16" variants={itemVariants}>
                    <motion.span
                        className="text-accent font-medium mb-2 flex items-center gap-2 font-sans tracking-widest text-sm uppercase"
                        initial={{ opacity: 0, y: -10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Zap className="w-4 h-4" />
                        DISCOVER MY STORY
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-center font-heading tracking-tight">About Me</h2>
                    <motion.div
                        className="w-24 h-1 bg-accent rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: 96 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        viewport={{ once: true }}
                    />
                </motion.div>

                <motion.p
                    className="text-center max-w-2xl mx-auto mb-20 text-foreground/80 font-sans leading-relaxed text-lg"
                    variants={itemVariants}
                >
                    I am a passionate graphic designer dedicated to creating beautiful, highly-converting posters that inspire and captivate audiences. With attention to detail and commitment to excellence, I transform creative visions into stunning visual reality.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative items-center">
                    {/* Left Column */}
                    <div className="space-y-12">
                        {services
                            .filter((service) => service.position === "left")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`left-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.15}
                                    direction="left"
                                />
                            ))}
                    </div>

                    {/* Center Image */}
                    <div className="flex justify-center items-center order-first md:order-none mb-12 md:mb-0">
                        <motion.div className="relative w-full max-w-xs h-[450px]" variants={itemVariants}>
                            <motion.div
                                className="rounded-3xl overflow-hidden shadow-2xl h-full w-full bg-accent/5 border border-foreground/10 group"
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
                            >
                                <Image
                                    src="/heroimage.png"
                                    alt="Graphic Designer"
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end justify-center p-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-foreground font-heading font-extrabold text-2xl tracking-tighter drop-shadow-md pb-4">
                                        Robert Lindo
                                    </span>
                                </motion.div>
                            </motion.div>
                            <motion.div
                                className="absolute inset-0 border-2 border-foreground/20 rounded-3xl -m-4 z-[-1]"
                                initial={{ opacity: 0, scale: 1.1 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                viewport={{ once: true }}
                            />

                            {/* Floating accent elements */}
                            <motion.div
                                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-accent/10"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.9 }}
                                viewport={{ once: true }}
                                style={{ y: y1 }}
                            />
                            <motion.div
                                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-foreground/10"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1.1 }}
                                viewport={{ once: true }}
                                style={{ y: y2 }}
                            />
                        </motion.div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-12">
                        {services
                            .filter((service) => service.position === "right")
                            .map((service, index) => (
                                <ServiceItem
                                    key={`right-${index}`}
                                    icon={service.icon}
                                    secondaryIcon={service.secondaryIcon}
                                    title={service.title}
                                    description={service.description}
                                    variants={itemVariants}
                                    delay={index * 0.15}
                                    direction="right"
                                />
                            ))}
                    </div>
                </div>

                {/* Stats Section */}
                <motion.div
                    ref={statsRef}
                    className="mt-32 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate={isStatsInView ? "visible" : "hidden"}
                    variants={containerVariants}
                >
                    {stats.map((stat, index) => (
                        <StatCounter
                            key={index}
                            icon={stat.icon}
                            value={stat.value}
                            label={stat.label}
                            suffix={stat.suffix}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

interface ServiceItemProps {
    icon: React.ReactNode
    secondaryIcon?: React.ReactNode
    title: string
    description: string
    variants: any
    delay: number
    direction: "left" | "right"
}

function ServiceItem({ icon, secondaryIcon, title, description, variants, delay, direction }: ServiceItemProps) {
    return (
        <motion.div
            className="flex flex-col group cursor-pointer"
            variants={variants}
            transition={{ delay }}
            whileHover={{ y: -5, transition: { duration: 0.25, ease: "easeOut" } }}
        >
            <motion.div
                className={`flex items-center gap-4 mb-4 ${direction === "right" ? "md:flex-row-reverse" : ""}`}
                initial={{ x: direction === "left" ? -20 : 20, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.2 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="text-accent bg-accent/10 p-3 rounded-xl transition-all duration-300 group-hover:bg-accent/20 group-hover:shadow-[0_0_20px_rgba(229,180,1,0.15)] relative shrink-0"
                >
                    {icon}
                    {secondaryIcon}
                </motion.div>
                <h3 className={`text-xl font-bold font-heading text-foreground group-hover:text-accent transition-colors duration-300 ${direction === 'right' ? "md:text-right" : ""}`}>
                    {title}
                </h3>
            </motion.div>
            <motion.p
                className={`text-sm text-foreground/70 leading-relaxed font-sans group-hover:text-foreground/90 transition-colors duration-300 ${direction === 'left' ? "pl-16" : "md:pr-16 md:text-right"}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: delay + 0.4 }}
                viewport={{ once: true }}
            >
                {description}
            </motion.p>
        </motion.div>
    )
}

interface StatCounterProps {
    icon: React.ReactNode
    value: number
    label: string
    suffix: string
    delay: number
}

function StatCounter({ icon, value, label, suffix, delay }: StatCounterProps) {
    const countRef = useRef(null)
    const isInView = useInView(countRef, { once: false })
    const [hasAnimated, setHasAnimated] = useState(false)

    const springValue = useSpring(0, {
        stiffness: 50,
        damping: 10,
    })

    useEffect(() => {
        if (isInView && !hasAnimated) {
            springValue.set(value)
            setHasAnimated(true)
        } else if (!isInView && hasAnimated) {
            springValue.set(0)
            setHasAnimated(false)
        }
    }, [isInView, value, springValue, hasAnimated])

    const displayValue = useTransform(springValue, (latest) => Math.floor(latest))

    return (
        <motion.div
            className="bg-foreground/5 backdrop-blur-sm p-8 rounded-2xl flex flex-col items-center text-center group hover:bg-foreground/10 transition-all duration-300 border border-foreground/5 hover:border-accent/20 hover:shadow-[0_0_30px_rgba(229,180,1,0.08)] cursor-pointer"
            variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.6, delay },
                },
            } as any}
            whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
        >
            <div
                className="w-16 h-16 rounded-full bg-background flex items-center justify-center mb-6 text-accent group-hover:bg-accent/10 transition-colors duration-300 shadow-sm"
            >
                {icon}
            </div>
            <motion.div ref={countRef} className="text-4xl font-extrabold font-heading text-foreground flex items-center mb-2">
                <motion.span>{displayValue}</motion.span>
                <span>{suffix}</span>
            </motion.div>
            <p className="text-foreground/70 text-sm font-sans font-medium uppercase tracking-wider">{label}</p>
            <motion.div className="w-12 h-1 bg-accent/50 mt-4 group-hover:w-20 group-hover:bg-accent transition-all duration-300 rounded-full" />
        </motion.div>
    )
}

export default AboutMeSection;
