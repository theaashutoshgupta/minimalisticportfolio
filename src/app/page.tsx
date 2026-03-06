"use client";

import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';

import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { Preloader } from '@/components/ui/preloader';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';

const Skiper30 = dynamic(() => import('@/components/ui/skiper30').then(m => m.Skiper30), { ssr: false });
const Skiper54 = dynamic(() => import('@/components/ui/skiper54').then(m => m.Skiper54), { ssr: false });
const AboutMeSection = dynamic(() => import('@/components/ui/about-me-section').then(m => m.default || m.AboutMeSection as any), { ssr: false });
const Footer = dynamic(() => import('@/components/ui/footer').then(m => m.Footer), { ssr: true });

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT ME', href: '#' },
    { label: 'WORK', href: '#' },
    { label: 'CONTACT', href: '#' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
  ];

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <main className={`bg-background text-foreground min-h-screen ${isLoading ? 'h-screen overflow-hidden opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <MinimalistHero
          logo={
            <svg
              width="160"
              height="36"
              viewBox="0 0 160 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-foreground"
            >
              <path d="M12.983 5.483L25.966 12.966V27.932L12.983 35.415L0 27.932V12.966L12.983 5.483Z" fill="var(--color-accent, #e5b401)" />
              <circle cx="12.983" cy="20.449" r="6" fill="var(--color-background, #000)" />
              <text x="35" y="25" fill="currentColor" fontSize="20" fontWeight="bold" fontFamily="inherit" style={{ fontFamily: 'var(--font-heading)' }} className="uppercase tracking-widest">
                Robert
              </text>
            </svg>
          }
          navLinks={navLinks}
          mainText="Hi! I am Robert Lindo. I design visually appealing posters that convert."
          imageSrc="/heroimage.png"
          imageAlt="Robert Lindo Portrait"
          overlayText={{
            part1: 'less is',
            part2: 'more.',
          }}
          socialLinks={socialLinks}
          locationText="California"
        />

        <ScrollIndicator text="Scroll Down To Explore" direction="down" className="-mt-8" />

        <Skiper30 />

        <ScrollIndicator text="Scroll Up To Return" direction="up" className="pb-16" />

        <Skiper54 />
        <AboutMeSection />
        <Footer />
      </main>
    </>
  );
}
