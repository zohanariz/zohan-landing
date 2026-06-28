"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import BookingButton from "@/components/ui/BookingButton";

interface HeroProps {
  onOpenBooking: () => void;
}

export default function Hero({ onOpenBooking }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    const videoElement = videoRef.current;
    if (!videoElement) return;

    // 1. Intersection Observer to pause when scrolled out of view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If the video is less than 20% visible, pause it
          if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
            if (!videoElement.paused) {
              videoElement.pause();
            }
          }
        });
      },
      {
        threshold: [0, 0.2, 0.5, 0.8, 1.0],
      }
    );

    observer.observe(videoElement);

    // 2. Page Visibility API to pause when changing tabs
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (!videoElement.paused) {
          videoElement.pause();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [hasStarted]);

  const handlePlayClick = () => {
    setHasStarted(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch((err) => {
          console.log("Video playback failed:", err);
        });
      }
    }, 50);
  };

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-anim",
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#040c05]/30 to-black px-6 md:px-16 pt-36 pb-20 overflow-hidden"
    >
      {/* Ambient Gradient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[radial-gradient(circle,rgba(124,255,77,0.08)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />
      <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />
      <div className="absolute -top-[250px] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(124,255,77,0.07)_0%,transparent_70%)] pointer-events-none z-0 blur-3xl" />

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)'
        }}
      />

      {/* Glowing Bottom Crescent with Mirror Reflection Background */}
      <div className="absolute bottom-[-160px] left-0 w-full flex justify-center pointer-events-none select-none z-0">
        <svg viewBox="0 0 1920 600" className="w-full h-auto aspect-[1920/600] flex-shrink-0 opacity-80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Horizontal fade mask to taper off the crescent and grid lines near the screen edges */}
            <linearGradient id="hero-bottom-mask-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="3%" stopColor="white" />
              <stop offset="97%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>

            <mask id="hero-bottom-fade-mask">
              <rect x="0" y="0" width="1920" height="600" fill="url(#hero-bottom-mask-grad)" />
            </mask>

            {/* Solid Crescent Body Gradient - White/Mint at bottom, Green/Emerald above */}
            <linearGradient id="hero-crescent-body" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />               {/* Ultra bright white bottom highlight */}
              <stop offset="8%" stopColor="#E6FFFA" />                {/* Glowing mint */}
              <stop offset="25%" stopColor="#7CFF4D" />               {/* Neon lime core */}
              <stop offset="65%" stopColor="#059669" stopOpacity="0.7" /> {/* Emerald green body */}
              <stop offset="100%" stopColor="rgba(6, 78, 59, 0)" />   {/* Fades to transparent at top */}
            </linearGradient>

            {/* Glowing Atmosphere Gradient */}
            <linearGradient id="hero-crescent-glow" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7CFF4D" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>

            {/* High-Contrast Bottom-Edge Core Highlight */}
            <linearGradient id="hero-crescent-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(124, 255, 77, 0)" />
              <stop offset="30%" stopColor="#7CFF4D" />
              <stop offset="50%" stopColor="#FFFFFF" />               {/* White hot highlight in center */}
              <stop offset="70%" stopColor="#7CFF4D" />
              <stop offset="100%" stopColor="rgba(124, 255, 77, 0)" />
            </linearGradient>

            {/* Mirror Reflection Gradient (fades down) */}
            <linearGradient id="hero-mirror-reflection" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.75" />
              <stop offset="15%" stopColor="#7CFF4D" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#059669" stopOpacity="0.18" />
              <stop offset="100%" stopColor="rgba(6, 78, 59, 0)" />
            </linearGradient>

            <filter id="hero-glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="15" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <filter id="hero-deep-glow-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="35" />
            </filter>
          </defs>



          {/* 3. Deep Blur Atmospheric Glow of the Crescent */}
          <path d="M 0,20 Q 960,430 1920,20 L 1920,35 Q 960,445 0,35 Z" fill="url(#hero-crescent-glow)" filter="url(#hero-deep-glow-blur)" mask="url(#hero-bottom-fade-mask)" opacity="0.6" />

          {/* 4. Medium Blur Glow of the Crescent */}
          <path d="M 0,20 Q 960,430 1920,20 L 1920,35 Q 960,445 0,35 Z" fill="url(#hero-crescent-body)" filter="url(#hero-glow-blur)" mask="url(#hero-bottom-fade-mask)" opacity="0.8" />

          {/* 5. Solid Crescent Body Path */}
          <path d="M 0,20 Q 960,430 1920,20 L 1920,35 Q 960,445 0,35 Z" fill="url(#hero-crescent-body)" mask="url(#hero-bottom-fade-mask)" opacity="0.9" />

          {/* 6. High-Contrast Bottom-Edge Neon Glow Line */}
          <path d="M 0,35 Q 960,445 1920,35" stroke="url(#hero-crescent-edge)" strokeWidth="3.5" strokeLinecap="round" filter="url(#hero-glow-blur)" mask="url(#hero-bottom-fade-mask)" opacity="0.9" />

          {/* 7. Sharp Core Bottom-Edge Highlight Line */}
          <path d="M 0,35 Q 960,445 1920,35" stroke="url(#hero-crescent-edge)" strokeWidth="1.8" strokeLinecap="round" mask="url(#hero-bottom-fade-mask)" opacity="0.95" />

          {/* 8. Mirror Reflection of the crescent extending downwards */}
          {/* Soft blur reflection */}
          <path d="M 0,600 Q 960,455 1920,600 L 1920,600 Q 960,455 0,600 Z" fill="url(#hero-mirror-reflection)" filter="url(#hero-deep-glow-blur)" mask="url(#hero-bottom-fade-mask)" opacity="0.55" />

          {/* Sharp reflection edge */}
          <path d="M 300,600 Q 960,455 1620,600" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" mask="url(#hero-bottom-fade-mask)" opacity="0.9" fill="none" />
        </svg>
      </div>



      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col items-center text-center">
        {/* Title */}
        <h1 className="hero-anim font-outfit text-white text-[26px] sm:text-[32px] md:text-[38px] lg:text-[46px] xl:text-[52px] font-black leading-[1.15] tracking-wide [word-spacing:0.14em] uppercase max-w-none mb-6">
          You've Built the <span className="font-outfit italic font-black text-gold normal-case drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">Audience.</span><br />Now Let's Build <span className="font-outfit italic font-black text-gold normal-case drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">Predictable Monthly Income.</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-anim font-sans italic text-sm sm:text-base md:text-lg leading-[1.65] text-[#F0ECE3]/80 max-w-[760px] mb-10">
          I help <strong className="text-white font-bold">educational YouTube and Instagram creators</strong> like you launch a <strong className="text-white font-bold">high ticket coaching program</strong> built entirely on your existing expertise. You make <strong className="text-white font-bold">$3K to $11K+ in predictable monthly income</strong> beyond AdSense, sponsorships and affiliates <strong className="text-white font-bold">within 27 days</strong>.
        </p>

        {/* VSL Video Player Box */}
        <div className="hero-anim w-full max-w-3xl aspect-video relative mb-6 group/vsl z-10">

          {/* Video Player */}
          <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl relative">
            <video
              ref={videoRef}
              src="/vsl.mp4"
              controls={hasStarted}
              className="w-full h-full object-cover"
            />

            {/* Thumbnail Overlay */}
            {!hasStarted && (
              <div
                onClick={handlePlayClick}
                className="absolute inset-0 group cursor-pointer bg-[#161616] z-20"
              >
                {/* VSL Thumbnail Image */}
                <img
                  src="/vsl_thumbnail.jpg"
                  alt="VSL Thumbnail Diagram"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Translucent overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                {/* Big Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-black/40 backdrop-blur-xs shadow-2xl transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-8 h-8 text-white fill-white ml-1.5" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* VSL Info Subtext */}
        <p className="hero-anim font-sans italic text-sm sm:text-base leading-[1.65] text-[#F0ECE3]/85 max-w-[720px] mb-10">
          We charge nothing upfront and handle every technical piece so you just show up as the expert you already are and do what you already do best: <strong className="text-white font-semibold">Content.</strong>
        </p>

        {/* Actions Button */}
        <div className="hero-anim flex flex-col items-center gap-3">
          <BookingButton
            onClick={onOpenBooking}
            variant="pill"
            className="bg-gold hover:bg-gold2 text-black font-sans font-bold text-[16px] sm:text-[20px] py-3.5 px-8 sm:py-4.5 sm:px-14 rounded-full shadow-lg hover:shadow-xl uppercase tracking-wide animate-cta-pulse"
          >
            Book a Discovery Call
          </BookingButton>
          <span className="text-white font-semibold text-xs italic tracking-wide">
            No pitch. No pressure. No obligation.
          </span>
        </div>
      </div>
    </section>
  );
}
