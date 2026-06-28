"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingButton from "@/components/ui/BookingButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FinalCtaProps {
  onOpenBooking: () => void;
}

export default function FinalCta({ onOpenBooking }: FinalCtaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".final-cta-reveal",
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      id="cta"
      ref={containerRef}
      className="relative w-full pt-48 pb-36 bg-dark text-center overflow-hidden px-6"
    >
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_55%_at_50%_50%,rgba(16,185,129,0.04),transparent)] pointer-events-none"></div>



      <div className="final-cta-reveal max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        <div className="text-[11px] tracking-[0.22em] uppercase text-gold font-sans flex items-center justify-center gap-3 mb-6">
          Book Your Call
        </div>

        <h2 className="font-outfit text-[24px] sm:text-[28px] md:text-[38px] lg:text-[46px] font-extrabold text-white tracking-wide [word-spacing:0.16em] leading-[1.15] max-w-[900px] mb-6 uppercase">
          Ready to turn your audience<br className="hidden sm:inline" /> into <span className="font-outfit italic font-extrabold text-gold normal-case">predictable revenue?</span>
        </h2>
        
        <p className="text-sm md:text-base text-muted leading-[1.75] max-w-[480px] mb-12 font-light">
          30 minutes. No pitch. Just a clear, honest look at what your audience can generate — and what it would take to get there.
        </p>

        <div className="flex flex-col items-center gap-3.5">
          <BookingButton
            onClick={onOpenBooking}
            variant="pill"
            className="bg-gold hover:bg-gold2 text-black font-sans font-bold text-[16px] sm:text-[20px] py-3.5 px-8 sm:py-4.5 sm:px-14 rounded-full shadow-lg hover:shadow-xl uppercase tracking-wide animate-cta-pulse"
          >
            Book a Free Discovery Call
          </BookingButton>
          <p className="text-[13px] text-white font-semibold italic">
            No obligation · Revenue share only · You keep 80%
          </p>
        </div>

      </div>
    </section>
  );
}
