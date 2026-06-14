"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Safely register ScrollTrigger in client environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".stat-reveal",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  const stats = [
    { num: "$24,850", label: "Monthly Revenue Achieved" },
    { num: "<45", label: "Days to First Launch" },
    { num: "80%", label: "Revenue You Keep" },
    { num: "$0", label: "Upfront Investment" },
  ];

  return (
    <div ref={containerRef} className="w-full bg-[#0A0A0A] border-y border-[#2D2D2D] py-0 z-10 relative">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[#2D2D2D] border-x border-[#2D2D2D]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-reveal group relative flex flex-col justify-center items-start p-8 overflow-hidden cursor-default transition-all duration-300 hover:bg-[#1A1A1A]/80"
            >
              {/* Animated hover border on bottom */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#7CFF4D] scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"></div>
              
              <span className="font-mono text-4xl md:text-5xl font-bold text-[#7CFF4D] leading-none tracking-tight mb-2 select-none group-hover:translate-x-1 transition-transform duration-300">
                {stat.num}
              </span>
              <span className="text-[9px] text-[#8D8D8D] font-mono tracking-widest uppercase font-semibold leading-tight select-none">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
