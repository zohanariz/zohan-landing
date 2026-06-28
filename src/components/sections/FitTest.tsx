"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingButton from "@/components/ui/BookingButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FitTestProps {
  onOpenBooking: () => void;
}

export default function FitTest({ onOpenBooking }: FitTestProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal top header
    gsap.fromTo(
      ".fit-header-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fit-trigger-header",
          start: "top 85%",
        },
      }
    );

    // Reveal grid columns from sides
    gsap.fromTo(
      ".fit-col-left",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fit-trigger-grid",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const rightFit = [
    { title: "20K–200K Instagram followers", desc: "Real influence, real trust — even if the income hasn't caught up yet." },
    { title: "You teach something valuable", desc: "Finance, fitness, business, productivity, relationships, skills — content that genuinely helps people." },
    { title: "You're serious about monetization", desc: "Not just curious — you're ready to build and are willing to share and build together." },
    { title: "Committed and dedicated", desc: "You're consistent with your content and you bring that same energy to building your business." },
    { title: "People already ask you for help", desc: "You're consistent. The demand. You just need the system to convert it." }
  ];

  return (
    <section id="fit" ref={containerRef} className="w-full py-24 bg-dark2 border-t border-white/6 relative">
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        
        {/* Header Section */}
        <div className="fit-trigger-header mb-16 max-w-4xl text-left">
          <div className="fit-header-reveal s-tag mb-4">
            Is This For You
          </div>
          <h2 className="fit-header-reveal font-outfit text-[22px] sm:text-[26px] md:text-[36px] lg:text-[42px] font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
            I work with a specific type of creator.<br className="hidden sm:inline" /> Here's how to know <em className="font-outfit italic font-light text-gold">you're one of them.</em>
          </h2>
        </div>

        {/* Comparison Grid replaced by single column list card */}
        <div className="fit-trigger-grid max-w-2xl mx-auto mb-14">
          <div className="fit-col-left group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 p-6 sm:p-10 md:p-11 rounded-[23px] flex flex-col justify-start text-left transition-colors duration-300 group-hover:bg-dark4">
              <div className="text-[11px] tracking-[0.2em] font-sans font-medium uppercase text-emerald-500 mb-6 select-none">
                ✓ &nbsp; You're The Right Fit If…
              </div>
              <h3 className="font-outfit text-2xl font-extrabold text-white mb-7 leading-snug">
                You have the audience. You're ready to build the income.
              </h3>
              
              <ul className="flex flex-col gap-4 list-none">
                {rightFit.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm leading-[1.65] text-[#F0ECE3]/75 font-light">
                    <span className="text-emerald-500 shrink-0 mt-0.5 select-none font-bold">✓</span>
                    <div>
                      <strong className="text-white font-semibold">{item.title}</strong>
                      <br />
                      {item.desc}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Lower Bottom Banner Span & Button */}
        <div className="fit-header-reveal flex flex-col items-center gap-6 text-center max-w-xl mx-auto">
          <p className="text-sm md:text-[14px] text-muted italic leading-relaxed font-light">
            If you read this list and thought <strong className="text-white font-semibold">"that's me"</strong> — it probably is. The next step is a free 15-minute strategy call. No pitch. Just an honest look at what's possible.
          </p>
          <div className="flex flex-col items-center gap-3">
            <BookingButton
              onClick={onOpenBooking}
              variant="pill"
              className="bg-gold hover:bg-gold2 text-black font-sans font-bold text-[16px] py-3.5 px-8 sm:py-4.5 sm:px-14 rounded-full shadow-lg hover:shadow-xl uppercase tracking-wide animate-cta-pulse"
            >
              Book a Discovery Call
            </BookingButton>
            <span className="text-white font-semibold text-xs italic tracking-wide">
              No pitch. No pressure. No obligation.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
