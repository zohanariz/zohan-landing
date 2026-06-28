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
          Here's What I've Noticed
        </div>

        <h2 className="position-reveal font-outfit text-[24px] sm:text-[28px] md:text-[36px] lg:text-[44px] font-extrabold tracking-wide [word-spacing:0.16em] text-white leading-[1.2] max-w-[1100px] mx-auto mb-7 uppercase">
          Every creator I've spoken to knows they should be making more.<br className="hidden sm:inline" /> They just don't know <em className="font-outfit italic font-light text-gold normal-case">where to start.</em>
        </h2>

        {/* Gold Bar Divider */}
        <div className="position-reveal gold-bar mx-auto my-8"></div>

        {/* Split Section Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center w-full mt-10 text-left">
          {/* Left: Premium Portrait Card */}
          <div className="position-reveal relative w-full max-w-[280px] md:max-w-[310px] aspect-[3.2/4] mx-auto rounded-[24px] overflow-hidden border border-white/6 bg-gradient-to-t from-[#081508]/40 via-[#161616] to-[#0D0D0D] shadow-2xl flex items-end justify-center group">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(124,255,77,0.08),transparent_60%)] z-0" />
            
            {/* Zohan's cutout portrait */}
            <img
              src="/zohan.png"
              alt="Zohan Ariz"
              className="relative z-10 w-full h-[95%] object-contain object-bottom scale-100 group-hover:scale-[1.02] transition-transform duration-500"
            />
            
            {/* Bottom shadow fade to blend the cutout bottom border */}
            <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-[#161616] via-[#161616]/70 to-transparent z-20" />
          </div>

          {/* Right: Content details */}
          <div className="flex flex-col items-start text-left max-w-[540px]">
            {/* Body Text */}
            <p className="position-reveal text-[#F0ECE3]/65 text-base leading-[1.85] mb-5 font-light">
              That's exactly where I come in. Not just a product. Not just a landing page. <strong className="text-gold font-medium">A complete monetization infrastructure</strong> — built around your audience, your expertise, and your goals.
            </p>

            <p className="position-reveal text-[#F0ECE3]/65 text-base leading-[1.85] mb-7 font-light">
              You don't change a thing. No extra work, no upfront investment, no steep learning curve. <strong className="text-white font-semibold">You keep doing what you do best — creating content. I handle everything else.</strong>
            </p>

            {/* Kicker */}
            <em className="position-reveal font-outfit text-[22px] italic font-light text-gold mb-8 block select-none">
              And I only get paid when it works.
            </em>

            {/* Button & Subtext */}
            <div className="position-reveal flex flex-col items-start gap-2.5">
              <BookingButton
                onClick={onOpenBooking}
                variant="cut"
                className="btn-gold px-11 py-5 text-[15px]"
              >
                Book a Free Strategy Call →
              </BookingButton>
              <p className="text-[14px] text-white/50 italic font-sans pl-1">
                15 minutes. No pitch. Just clarity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
