"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FitTest() {
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
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fit-trigger-grid",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".fit-col-right",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
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

  const wrongFit = [
    { title: "Entertainment or meme pages", desc: "If your content lives on laughs and virality, there's no expertise to monetize — and that's a different game entirely." },
    { title: "Looking for overnight results", desc: "This is a real business being built. If you want a quick hack, I'm not your person." },
    { title: "Lifestyle or aesthetic-only content", desc: "Beautiful feed with no educational value won't have a product waiting inside them yet." },
    { title: "Not open to collaboration", desc: "This is a true partnership. If you're not comfortable sharing, iterating, and building together — it won't work." },
    { title: "Already fully monetized", desc: "If you already have a thriving product suite and funnel — great. You probably don't need me." }
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
          <p className="fit-header-reveal text-sm md:text-[15px] text-muted leading-relaxed">
            Not every creator is the right fit — and that's okay. I'd rather be honest upfront than waste your time or mine.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="fit-trigger-grid grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* Left Column: Right Fit */}
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

          {/* Right Column: Wrong Fit */}
          <div className="fit-col-right group relative p-[1px] rounded-[24px] bg-gradient-to-br from-red-500/25 via-rose-500/20 to-red-500/5 hover:from-red-500/50 hover:via-rose-500/45 hover:to-red-500/10 transition-all duration-300">
            <div className="h-full bg-dark3 p-6 sm:p-10 md:p-11 rounded-[23px] flex flex-col justify-start text-left transition-colors duration-300 group-hover:bg-dark4">
              <div className="text-[11px] tracking-[0.2em] font-sans font-medium uppercase text-red-500 mb-6 select-none">
                ✗ &nbsp; This Isn't For You If…
              </div>
              <h3 className="font-outfit text-2xl font-extrabold text-white mb-7 leading-snug">
                Some creators I genuinely can't help — and I'll say so.
              </h3>

              <ul className="flex flex-col gap-4 list-none">
                {wrongFit.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm leading-[1.65] text-[#F0ECE3]/75 font-light">
                    <span className="text-red-500 shrink-0 mt-0.5 select-none font-bold">✗</span>
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

        {/* Lower Bottom Banner Span */}
        <p className="fit-header-reveal text-center text-sm md:text-[14px] text-muted italic leading-relaxed max-w-[600px] mx-auto font-light">
          If you read the left column and thought <strong className="text-white font-semibold">"that's me"</strong> — it probably is. The next step is a free 15-minute strategy call. No pitch. Just an honest look at what's possible.
        </p>

      </div>
    </section>
  );
}
