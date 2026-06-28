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
          Ready to turn your audience<br className="hidden sm:inline" /> into <em className="font-outfit italic font-extrabold text-gold normal-case">predictable income?</em>
        </h2>
        
        <p className="text-sm md:text-base text-muted leading-[1.75] max-w-[480px] mb-12 font-light">
          15 minutes. Live revenue projection built around your audience. No pitch. Just an honest look at what's possible.
        </p>

        <div className="flex flex-col items-center gap-3.5">
          <BookingButton
            onClick={onOpenBooking}
            variant="cut"
            className="btn-gold text-[15px] px-[52px] py-[20px]"
          >
            Book a Discovery Call →
          </BookingButton>
          <p className="text-[13px] text-white font-semibold italic">
            No pitch. No pressure. No obligation.
          </p>
        </div>

      </div>
    </section>
  );
}
