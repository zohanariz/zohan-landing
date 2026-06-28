"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingButton from "@/components/ui/BookingButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WhatWeDoProps {
  onOpenBooking: () => void;
}

export default function WhatWeDo({ onOpenBooking }: WhatWeDoProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".position-reveal",
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="position"
      ref={containerRef}
      className="relative w-full pt-24 pb-56 bg-dark text-center overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(16,185,129,0.04),transparent)] pointer-events-none"></div>

      {/* Glowing Bottom Crescent Arch Background */}
      <div className="absolute bottom-[-90px] left-0 w-full flex justify-center pointer-events-none select-none z-0">
        <svg viewBox="0 0 1920 500" className="w-full h-auto aspect-[1920/500] flex-shrink-0 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Horizontal fade mask to taper off the crescent and grid lines near the screen edges */}
            <linearGradient id="bottom-mask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="3%" stopColor="white" />
              <stop offset="97%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            
            <mask id="bottom-fade-mask">
              <rect x="0" y="0" width="1920" height="500" fill="url(#bottom-mask-grad)" />
            </mask>

            {/* Solid Crescent Body Gradient - White/Mint at bottom, Green/Emerald above */}
            <linearGradient id="bottom-crescent-body" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />               {/* Ultra bright white bottom highlight */}
              <stop offset="8%" stopColor="#E6FFFA" />                {/* Glowing mint */}
              <stop offset="25%" stopColor="#7CFF4D" />               {/* Neon lime core */}
              <stop offset="65%" stopColor="#059669" stopOpacity="0.7" /> {/* Emerald green body */}
              <stop offset="100%" stopColor="rgba(6, 78, 59, 0)" />   {/* Fades to transparent at top */}
            </linearGradient>

            {/* Glowing Atmosphere Gradient */}
            <linearGradient id="bottom-crescent-glow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7CFF4D" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>

            {/* High-Contrast Bottom-Edge Core Highlight */}
            <linearGradient id="bottom-crescent-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(124, 255, 77, 0)" />
              <stop offset="30%" stopColor="#7CFF4D" />
              <stop offset="50%" stopColor="#FFFFFF" />               {/* White hot highlight in center */}
              <stop offset="70%" stopColor="#7CFF4D" />
              <stop offset="100%" stopColor="rgba(124, 255, 77, 0)" />
            </linearGradient>

            <filter id="glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            
            <filter id="deep-glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="35" />
            </filter>
          </defs>



          {/* Deep Blur Atmospheric Glow of the Crescent */}
          <path d="M 0,20 Q 960,430 1920,20 L 1920,40 Q 960,460 0,40 Z" fill="url(#bottom-crescent-glow)" filter="url(#deep-glow-blur)" mask="url(#bottom-fade-mask)" opacity="0.6" />

          {/* Medium Blur Glow of the Crescent */}
          <path d="M 0,20 Q 960,430 1920,20 L 1920,40 Q 960,460 0,40 Z" fill="url(#bottom-crescent-body)" filter="url(#glow-blur)" mask="url(#bottom-fade-mask)" opacity="0.8" />

          {/* Solid Crescent Body Path */}
          <path d="M 0,20 Q 960,430 1920,20 L 1920,40 Q 960,460 0,40 Z" fill="url(#bottom-crescent-body)" mask="url(#bottom-fade-mask)" opacity="0.9" />

          {/* High-Contrast Bottom-Edge Neon Glow Line */}
          <path d="M 0,40 Q 960,460 1920,40" stroke="url(#bottom-crescent-edge)" strokeWidth="3" strokeLinecap="round" filter="url(#glow-blur)" mask="url(#bottom-fade-mask)" opacity="0.9" />

          {/* Sharp Core Bottom-Edge Highlight Line */}
          <path d="M 0,40 Q 960,460 1920,40" stroke="url(#bottom-crescent-edge)" strokeWidth="1.5" strokeLinecap="round" mask="url(#bottom-fade-mask)" opacity="0.95" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16 flex flex-col items-center relative z-10">
        {/* Tag */}
        <div className="position-reveal s-tag justify-center mb-6">
          ROADMAP
        </div>

        <h2 className="position-reveal font-outfit text-[24px] sm:text-[28px] md:text-[36px] lg:text-[44px] font-extrabold tracking-wide [word-spacing:0.16em] text-white leading-[1.2] max-w-[1100px] mx-auto mb-4 uppercase">
          Ready to build your predictable <span className="text-gold">monetization engine?</span>
        </h2>
        <p className="position-reveal text-sm md:text-base text-muted font-light max-w-xl leading-relaxed mb-12">
          Here's how we'll do it in less than <strong className="text-white font-semibold">27 days</strong>:
        </p>

        {/* Split Section Grid replaced by Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">
          {/* Step 1 */}
          <div className="position-reveal group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 p-6 sm:p-8 md:p-9 rounded-[23px] flex flex-col justify-start transition-colors duration-300 group-hover:bg-dark4">
              <span className="font-serif text-[42px] font-black text-gold opacity-30 leading-none mb-4 select-none">01</span>
              <h3 className="font-sans text-[16px] font-bold text-white mb-3 uppercase tracking-wide transition-colors duration-300 group-hover:text-gold">
                1. Design Your Offer
              </h3>
              <p className="text-[13px] text-muted leading-[1.75] font-light">
                We figure out the exact high-ticket offer your followers are already asking for. No guessing, no testing — we build what they will buy.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="position-reveal group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 p-6 sm:p-8 md:p-9 rounded-[23px] flex flex-col justify-start transition-colors duration-300 group-hover:bg-dark4">
              <span className="font-serif text-[42px] font-black text-gold opacity-30 leading-none mb-4 select-none">02</span>
              <h3 className="font-sans text-[16px] font-bold text-white mb-3 uppercase tracking-wide transition-colors duration-300 group-hover:text-gold">
                2. Build Your Funnel
              </h3>
              <p className="text-[13px] text-muted leading-[1.75] font-light">
                We build the high-converting system that runs behind the scenes: the landing page, the emails, the payment portals, and the hosting.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="position-reveal group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 p-6 sm:p-8 md:p-9 rounded-[23px] flex flex-col justify-start transition-colors duration-300 group-hover:bg-dark4">
              <span className="font-serif text-[42px] font-black text-gold opacity-30 leading-none mb-4 select-none">03</span>
              <h3 className="font-sans text-[16px] font-bold text-white mb-3 uppercase tracking-wide transition-colors duration-300 group-hover:text-gold">
                3. Launch & Scale
              </h3>
              <p className="text-[13px] text-muted leading-[1.75] font-light">
                We launch it to your audience. No sleazy sales pitches, no pressure. Just a clean launch that adds $3K - $11K+ in predictable profit.
              </p>
            </div>
          </div>
        </div>

        {/* Value Callout Banner moved from PainPoints */}
        <div className="position-reveal mt-12 p-[28px] md:p-[36px] bg-dark4 border-l-3 border-gold text-left w-full">
          <p className="text-[15px] leading-[1.7] text-[#F0ECE3]/75">
            <strong className="text-white font-semibold">These are not content problems.</strong> You're already showing up consistently. These are monetization problems — and that's exactly what I fix.
          </p>
        </div>
      </div>
    </section>
  );
}
