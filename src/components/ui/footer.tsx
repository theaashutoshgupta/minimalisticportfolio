"use client";

import React from 'react';
import { Twitter, Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const stagger = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
};

const fadeUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Footer() {
    const columns = [
        [
            { title: "PORTFOLIO", href: "#" },
            { title: "SERVICES", href: "#" },
            { title: "CLIENTS", href: "#" },
        ],
        [
            { title: "ABOUT ME", href: "#" },
            { title: "PROCESS", href: "#" },
            { title: "RESUME", href: "#" },
        ],
        [
            { title: "TWITTER", href: "#" },
            { title: "INSTAGRAM", href: "#" },
            { title: "CONTACT ME", href: "#" },
        ],
        [
            { title: "PRIVACY POLICY", href: "#" },
            { title: "TERMS OF SERVICE", href: "#" },
            { title: "COOKIE POLICY", href: "#" },
        ],
    ];

    const socialLinks = [
        { icon: Youtube, href: "#" },
        { icon: Twitter, href: "#" },
        { icon: Instagram, href: "#" },
        { icon: Linkedin, href: "#" },
        { icon: Mail, href: "#" },
    ];

    return (
        <motion.footer
            className="w-full bg-background text-foreground pt-20 pb-10 px-8 md:px-12 lg:px-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={stagger}
        >
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12 md:gap-0">
                    {/* Logo Section */}
                    <motion.div className="flex items-center" variants={fadeUp}>
                        <motion.svg
                            width="160"
                            height="36"
                            viewBox="0 0 160 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-foreground"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            <path d="M12.983 5.483L25.966 12.966V27.932L12.983 35.415L0 27.932V12.966L12.983 5.483Z" fill="var(--color-accent, #e5b401)" />
                            <circle cx="12.983" cy="20.449" r="6" fill="var(--color-background, #000)" />
                            <text x="35" y="25" fill="currentColor" fontSize="20" fontWeight="bold" fontFamily="inherit" style={{ fontFamily: 'var(--font-heading)' }} className="uppercase tracking-widest">
                                Robert
                            </text>
                        </motion.svg>
                    </motion.div>

                    {/* Links Section */}
                    <motion.div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16 w-full md:w-auto"
                        variants={stagger}
                    >
                        {columns.map((column, colIdx) => (
                            <motion.div key={colIdx} className="flex flex-col space-y-6" variants={stagger}>
                                {column.map((link) => (
                                    <motion.div key={link.title} variants={fadeUp}>
                                        <Link
                                            href={link.href}
                                            className="relative text-white/70 hover:text-accent transition-colors font-sans text-xs tracking-widest uppercase group inline-block py-0.5"
                                        >
                                            {link.title}
                                            <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Divider */}
                <motion.div
                    className="w-full h-px bg-white/10 mb-12"
                    variants={fadeUp}
                />

                {/* Bottom Section */}
                <motion.div
                    className="flex flex-col items-center justify-center space-y-8"
                    variants={stagger}
                >
                    <motion.div className="flex items-center space-x-6" variants={stagger}>
                        {socialLinks.map((social, index) => {
                            const Icon = social.icon;
                            return (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-accent hover:border-accent transition-all duration-300 group"
                                    variants={fadeUp}
                                    whileHover={{
                                        scale: 1.12,
                                        y: -3,
                                        boxShadow: "0 0 20px rgba(229,180,1,0.15)",
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                >
                                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                </motion.a>
                            );
                        })}
                    </motion.div>
                    <motion.p
                        className="text-white/50 text-xs font-sans"
                        variants={fadeUp}
                    >
                        © Copyright. All rights reserved.
                    </motion.p>
                </motion.div>
            </div>
        </motion.footer>
    );
}
