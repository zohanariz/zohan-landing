"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Cpu, Compass } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ProofProps {
  onOpenBooking: () => void;
}

export default function Proof({ onOpenBooking }: ProofProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".proof-reveal",
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section id="proof" ref={containerRef} className="w-full py-24 bg-dark relative border-t border-white/6 text-left overflow-hidden">
      {/* Perspective Grid & Light Pillar Background */}
      <div className="absolute top-0 left-0 w-full h-[600px] pointer-events-none select-none overflow-hidden z-0 flex justify-center">
        <svg viewBox="0 0 1200 600" className="w-[1200px] h-[600px] flex-shrink-0 opacity-75" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Soft Ambient Radial Glow */}
            <radialGradient id="ambient-radial" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#064E3B" stopOpacity="0.05" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>

            {/* Grid Line Gradient */}
            <linearGradient id="grid-line-grad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="rgba(124, 255, 77, 0.35)" />
              <stop offset="70%" stopColor="rgba(16, 185, 129, 0.12)" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>

            {/* Vertical Light Pillar Gradient */}
            <linearGradient id="pillar-main" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#7CFF4D" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#10B981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>

            {/* Pillar Core White Highlight */}
            <linearGradient id="pillar-core" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="15%" stopColor="#7CFF4D" stopOpacity="0.8" />
              <stop offset="80%" stopColor="rgba(124, 255, 77, 0)" />
            </linearGradient>

            {/* Mirror Reflection Gradient (fades down) */}
            <linearGradient id="mirror-reflection" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="10%" stopColor="#7CFF4D" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#10B981" stopOpacity="0.15" />
              <stop offset="100%" stopColor="rgba(16, 185, 129, 0)" />
            </linearGradient>

            {/* Radial Glow on Floor Horizon Point */}
            <radialGradient id="horizon-glow" cx="50%" cy="0%" r="50%">
              <stop offset="0%" stopColor="#7CFF4D" stopOpacity="0.5" />
              <stop offset="40%" stopColor="#10B981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>

            {/* Horizontal Grid Mask */}
            <linearGradient id="grid-fade-mask" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="black" />
              <stop offset="15%" stopColor="white" />
              <stop offset="85%" stopColor="white" />
              <stop offset="100%" stopColor="black" />
            </linearGradient>
            
            <mask id="grid-mask">
              <rect x="0" y="0" width="1200" height="600" fill="url(#grid-fade-mask)" />
            </mask>

            {/* Looping Ribbon Gradient */}
            <linearGradient id="ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#10B981" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#7CFF4D" stopOpacity="1" />
              <stop offset="70%" stopColor="#10B981" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#022C22" stopOpacity="0.8" />
            </linearGradient>

            {/* Filters with expanded bounds to prevent clipping */}
            <filter id="soft-blur" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="35" />
            </filter>
            <filter id="medium-blur" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="15" />
            </filter>
            <filter id="sharp-blur" x="-200%" y="-200%" width="500%" height="500%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* 1. Large Ambient Background Aura */}
          <rect x="0" y="0" width="1200" height="600" fill="url(#ambient-radial)" />

          {/* 2. Horizon Glow Center - Below Horizon */}
          <g mask="url(#grid-mask)">
            {/* Horizon Glow Center */}
            <ellipse cx="600" cy="280" rx="300" ry="100" fill="url(#horizon-glow)" />
          </g>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Header */}
        <div className="proof-reveal s-tag mb-4">
          On Proof & Results
        </div>
        <h2 className="proof-reveal font-outfit text-3xl md:text-5xl font-extrabold tracking-wide [word-spacing:0.16em] text-white mb-8 uppercase leading-[1.1]">
          You won't see income screenshots here.
        </h2>

        {/* Blockquote */}
        <div className="proof-reveal border-l-3 border-gold bg-dark3 p-8 my-10 font-serif text-[17px] italic leading-[1.7] text-[#F0ECE3]/80">
          "Posting someone's private income to sell yourself is not a flex. It's a boundary crossed. The right numbers show up in the right room — and that room is <strong className="text-gold font-normal not-italic">a private call.</strong>"
        </div>

        {/* Numbered Proof Items */}
        <div className="proof-reveal flex flex-col gap-8 my-12">
          
          {/* Item 01 */}
          <div className="flex gap-4 sm:gap-8 items-start pb-8 border-b border-white/6">
            <span className="font-serif text-[48px] font-black text-gold opacity-30 leading-none w-[60px] select-none">01</span>
            <div>
              <h3 className="font-sans text-[17px] font-semibold text-white mb-2 uppercase">Privacy over promotion</h3>
              <p className="text-sm text-muted leading-[1.75] font-light">
                A creator's income is their personal business. I will never post their results publicly without explicit consent — no matter how good the numbers look.
              </p>
            </div>
          </div>

          {/* Item 02 */}
          <div className="flex gap-4 sm:gap-8 items-start pb-8 border-b border-white/6">
            <span className="font-serif text-[48px] font-black text-gold opacity-30 leading-none w-[60px] select-none">02</span>
            <div>
              <h3 className="font-sans text-[17px] font-semibold text-white mb-2 uppercase">They earn the credit, always</h3>
              <p className="text-sm text-muted leading-[1.75] font-light">
                I work behind the scenes so their audience sees them grow through their own effort. I never take public credit — that would break the trust they've built with their followers.
              </p>
            </div>
          </div>

          {/* Item 03 */}
          <div className="flex gap-4 sm:gap-8 items-start pb-8 border-b-0">
            <span className="font-serif text-[48px] font-black text-gold opacity-30 leading-none w-[60px] select-none">03</span>
            <div>
              <h3 className="font-sans text-[17px] font-semibold text-white mb-2 uppercase">Revenue share is the real proof</h3>
              <p className="text-sm text-muted leading-[1.75] font-light">
                I only get paid when you grow. No retainers. No upfront fees. And on the call — I'll walk you through the full monetization system, <strong className="text-gold font-semibold">map out your personal gameplan, and run the exact numbers on what this looks like for you specifically.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Call Box */}
        <div className="proof-reveal group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300 mt-14 mb-14 text-left">
          <div className="h-full bg-dark3 p-6 sm:p-10 md:p-11 rounded-[23px] text-left transition-colors duration-300 group-hover:bg-dark4">
            <div className="text-[11px] tracking-[0.2em] font-sans font-medium uppercase text-gold mb-5">
              What Happens On The Call
            </div>
            
            <ul className="flex flex-col gap-3.5 list-none mb-8">
              <li className="flex gap-3 text-sm leading-[1.65] text-[#F0ECE3]/75 font-light items-start">
                <TrendingUp className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>A live revenue projection built around your audience size</span>
              </li>
              <li className="flex gap-3 text-sm leading-[1.65] text-[#F0ECE3]/75 font-light items-start">
                <Cpu className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>The exact system that generates $10K+ monthly predictably</span>
              </li>
              <li className="flex gap-3 text-sm leading-[1.65] text-[#F0ECE3]/75 font-light items-start">
                <Compass className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <span>Where we're at so far — honest context, no hype</span>
              </li>
            </ul>

            <p className="text-[11px] text-muted italic font-sans font-light pl-6">
              ↑ unlocked the moment you book a call
            </p>
          </div>
        </div>

        {/* Three Pillars Grid */}
        <div className="proof-reveal grid grid-cols-1 md:grid-cols-3 gap-6 my-14 select-none">
          {/* Pillar 1 */}
          <div className="group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 flex flex-col items-center justify-start text-center p-6 sm:p-8 rounded-[23px] transition-colors duration-300 group-hover:bg-dark4">
              <span className="text-[28px] text-gold mb-3 block">🔒</span>
              <h4 className="text-sm font-semibold text-white uppercase mb-2">Full privacy</h4>
              <p className="text-xs text-muted leading-[1.65]">
                Your income is never shared. Not in marketing. <strong className="text-[#F0ECE3]/60 font-semibold">Not anywhere.</strong>
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 flex flex-col items-center justify-start text-center p-6 sm:p-8 rounded-[23px] transition-colors duration-300 group-hover:bg-dark4">
              <span className="text-[28px] text-gold mb-3 block">👤</span>
              <h4 className="text-sm font-semibold text-white uppercase mb-2">You take the credit</h4>
              <p className="text-xs text-muted leading-[1.65]">
                Your audience sees you winning. I stay invisible — <strong className="text-[#F0ECE3]/60 font-semibold">by design.</strong>
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 flex flex-col items-center justify-start text-center p-6 sm:p-8 rounded-[23px] transition-colors duration-300 group-hover:bg-dark4">
              <span className="text-[28px] text-gold mb-3 block">📈</span>
              <h4 className="text-sm font-semibold text-white uppercase mb-2">Paid on results</h4>
              <p className="text-xs text-muted leading-[1.65]">
                Revenue share only. I have skin in the game — <strong className="text-[#F0ECE3]/60 font-semibold">always.</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Callout Row */}
        <div className="proof-reveal flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-14 pt-4 text-left">
          <p className="text-[15px] text-[#F0ECE3]/70 font-light max-w-md">
            I work with creators who value integrity as much as income. <strong className="text-white font-semibold">If that's you, let's talk.</strong>
          </p>
          <div className="flex flex-col items-start gap-2 select-none">
            <button
              onClick={onOpenBooking}
              className="btn-gold text-sm font-semibold whitespace-nowrap"
            >
              See Our Results on the Call →
            </button>
            <p className="text-[12px] text-white font-semibold italic pl-1">
              No pitch. No pressure.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
