"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PainPoints() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal header
    gsap.fromTo(
      ".pain-header-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".pain-trigger-header",
          start: "top 85%",
        },
      }
    );

    // Reveal grid items
    gsap.fromTo(
      ".pain-card-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".pain-trigger-grid",
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  const painPoints = [
    {
      icon: (
        <svg className="w-[28px] h-[28px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="coin-crack-mask">
              <rect width="100" height="100" fill="white" />
              <path
                d="M 46 95 L 49 70 L 56 48 L 51 28 L 59 12"
                stroke="black"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </mask>
          </defs>
          <g mask="url(#coin-crack-mask)">
            <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="6.5" className="text-gold/90" />
            <circle cx="50" cy="50" r="36" stroke="currentColor" strokeWidth="2.5" strokeDasharray="3 3" className="text-gold/60" />
            <line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" strokeWidth="6.5" strokeLinecap="round" className="text-gold" />
            <path
              d="M 62 35 C 62 24, 38 24, 38 37 C 38 49, 62 47, 62 61 C 62 74, 38 74, 38 63"
              stroke="currentColor"
              strokeWidth="7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              className="text-gold"
            />
          </g>
        </svg>
      ),
      title: "Income feels unpredictable",
      desc: "Some months are great, some are slow, and you never really know what's coming. You can't plan, save, or grow when your income has no consistency."
    },
    {
      icon: (
        <svg className="w-[28px] h-[28px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="28" y1="78" x2="68" y2="24" stroke="#F9BC05" strokeWidth="18" strokeLinecap="round" />
          <line x1="56" y1="84" x2="83" y2="48" stroke="#4285F4" strokeWidth="18" strokeLinecap="round" />
          <circle cx="28" cy="78" r="9" fill="#34A853" />
        </svg>
      ),
      title: "Need income beyond Adsense",
      desc: "AdSense can't be your business. AdSense rewards views, not expertise. Your expertise deserves more than ad revenue."
    },
    {
      icon: "💸",
      title: "Need income beyond sponsorships",
      desc: "You know brand deals can't be your only income forever. You want something you own, something that compounds, you just haven't built it yet."
    },
    {
      icon: (
        <svg className="w-[30px] h-[30px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red Arrows pointing down */}
          <path d="M 52 8 L 52 20 M 52 20 L 48 16 M 52 20 L 56 16" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 72 16 L 72 28 M 72 28 L 68 24 M 72 28 L 76 24" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Falling Coins (Gold circles with $) */}
          <g>
            <circle cx="52" cy="34" r="11" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <text x="52" y="38" fontFamily="sans-serif" fontSize="13" fontWeight="extrabold" fill="#B45309" textAnchor="middle">$</text>
          </g>
          <g>
            <circle cx="72" cy="42" r="11" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
            <text x="72" y="46" fontFamily="sans-serif" fontSize="13" fontWeight="extrabold" fill="#B45309" textAnchor="middle">$</text>
          </g>

          {/* Lying Stick Figure */}
          {/* Head (orange-peach) */}
          <circle cx="30" cy="46" r="7" fill="#FBBF24" />
          
          {/* Body (blue line) */}
          <path d="M 22 80 L 32 55" stroke="#60A5FA" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 32 55 L 50 60" stroke="#60A5FA" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 32 55 L 40 80" stroke="#60A5FA" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M 40 80 L 58 68 L 74 80 L 82 80" stroke="#60A5FA" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      title: "Affiliate income isn't enough",
      desc: "You share links, a few people click, and the commission barely adds up. It works as a nice bonus, not as a real income stream you can count on."
    },
    {
      icon: "👥",
      title: "Followers already ask for help",
      desc: "People DM you for advice, recommendations, and guidance every day. The demand is already there, you just don't have a way to monetize it yet."
    },
    {
      icon: (
        <svg className="w-[30px] h-[30px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="rotate(-35 50 50)">
            <defs>
              <mask id="tag-hole-mask">
                <rect width="100" height="100" fill="white" />
                <circle cx="68" cy="50" r="4.5" fill="black" />
              </mask>
            </defs>
            {/* Black string loop */}
            <path
              d="M 70 50 C 82 50, 92 40, 92 25 C 92 12, 80 20, 71 43"
              stroke="#1A1A1A"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {/* Tag shape with hole mask applied */}
            <path
              d="M 16 66 L 16 34 L 66 34 L 78 46 C 80 48, 80 52, 78 54 L 66 66 Z"
              fill="#EF4444"
              stroke="#DC2626"
              strokeWidth="1.5"
              strokeLinejoin="round"
              mask="url(#tag-hole-mask)"
            />
            {/* White inner border of the tag */}
            <rect
              x="22"
              y="39"
              width="38"
              height="22"
              rx="3"
              stroke="#FFFFFF"
              strokeWidth="3.5"
              fill="none"
            />
            {/* Percentage symbol inside tag */}
            <line x1="48" y1="44" x2="34" y2="56" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
            <circle cx="37" cy="46" r="2.5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
            <circle cx="45" cy="54" r="2.5" stroke="#FFFFFF" strokeWidth="3" fill="none" />
          </g>
        </svg>
      ),
      title: "Trapped in the low-ticket cycle",
      desc: "Ebooks at $29, PDFs at $17, tracking sheets for $15. You'd need thousands of sales every month just to hit decent income. Low-ticket offers keep you busy, they don't build real wealth."
    },
    {
      icon: "❓",
      title: "No clear product or launch plan",
      desc: "You have an audience that trusts you but nothing of your own to offer them. And even when you think about creating something, you don't know what they'd actually pay for or where to begin."
    },
    {
      icon: (
        <svg className="w-[28px] h-[28px]" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Gear body circle */}
          <circle cx="50" cy="50" r="34" stroke="currentColor" strokeWidth="6.5" className="text-gold/90" />
          {/* Teeth */}
          <rect x="45" y="10" width="10" height="12" rx="2" fill="currentColor" className="text-gold/90" />
          <rect x="45" y="78" width="10" height="12" rx="2" fill="currentColor" className="text-gold/90" />
          <rect x="10" y="45" width="12" height="10" rx="2" fill="currentColor" className="text-gold/90" />
          <rect x="78" y="45" width="12" height="10" rx="2" fill="currentColor" className="text-gold/90" />
          <rect x="45" y="10" width="10" height="12" rx="2" fill="currentColor" className="text-gold/90" transform="rotate(45 50 50)" />
          <rect x="45" y="10" width="10" height="12" rx="2" fill="currentColor" className="text-gold/90" transform="rotate(135 50 50)" />
          <rect x="45" y="10" width="10" height="12" rx="2" fill="currentColor" className="text-gold/90" transform="rotate(225 50 50)" />
          <rect x="45" y="10" width="10" height="12" rx="2" fill="currentColor" className="text-gold/90" transform="rotate(315 50 50)" />
          
          {/* Circuit tracks */}
          <path d="M 28 62 L 38 52 L 38 38 L 46 30" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" />
          <circle cx="46" cy="30" r="4.5" fill="currentColor" className="text-gold" />

          <path d="M 32 68 L 58 42" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" />
          <circle cx="58" cy="42" r="4.5" fill="currentColor" className="text-gold" />

          <path d="M 38 74 L 48 64 L 58 64 L 66 56" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold" />
          <circle cx="66" cy="56" r="4.5" fill="currentColor" className="text-gold" />
        </svg>
      ),
      title: "No automated system working while you sleep",
      desc: "No high-converting funnel, no automated follow-up, no system that turns a follower into a buyer without you manually stepping in every time. Your content works hard. Your business doesn't work at all."
    }
  ];

  return (
    <section id="why" ref={containerRef} className="w-full py-24 bg-dark2 border-t border-white/6 relative overflow-hidden">
      {/* Glowing Green Ribbon / Crossing Wave Light Strand Design */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        <svg 
          viewBox="0 0 1920 1200" 
          className="w-full h-full absolute inset-0 opacity-70" 
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Background radial glow */}
            <radialGradient id="pain-ambient-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.12" />
              <stop offset="60%" stopColor="#064E3B" stopOpacity="0.03" />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>

            {/* Ribbon Gradient 1 (Neon Green to Emerald) */}
            <linearGradient id="pain-ribbon-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#064E3B" stopOpacity="0.6" />
              <stop offset="25%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#7CFF4D" stopOpacity="1" />
              <stop offset="75%" stopColor="#34D399" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#022C22" stopOpacity="0.6" />
            </linearGradient>

            {/* Ribbon Gradient 2 (Mint to Lime) */}
            <linearGradient id="pain-ribbon-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#022C22" stopOpacity="0.5" />
              <stop offset="30%" stopColor="#34D399" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#7CFF4D" stopOpacity="1" />
              <stop offset="85%" stopColor="#10B981" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#064E3B" stopOpacity="0.5" />
            </linearGradient>

            {/* Blur filters */}
            <filter id="pain-soft-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="30" />
            </filter>
            <filter id="pain-medium-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="12" />
            </filter>
            <filter id="pain-sharp-blur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Ambient center glow */}
          <ellipse cx="960" cy="600" rx="700" ry="500" fill="url(#pain-ambient-glow)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto px-6 md:px-16 relative z-10">
        
        {/* Header Trigger */}
        <div className="pain-trigger-header mb-14 text-left">
          <div className="pain-header-reveal s-tag mb-4">
            Sound familiar?
          </div>
           <h2 className="pain-header-reveal font-outfit text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-extrabold tracking-wide [word-spacing:0.16em] text-white mb-4 leading-[1.15] uppercase max-w-none">
            Most creators I talk to have 2 or 3 of these.<br /> <span className="text-red-500">A few have all <span className="font-outfit italic font-light normal-case">8.</span></span>
          </h2>
          <p className="pain-header-reveal text-sm md:text-[15px] text-muted leading-relaxed max-w-[500px] mb-3">
            Read through and count yours.
          </p>
          <p className="pain-header-reveal text-sm md:text-[15px] text-red-500 italic font-light">
            Psst... Most creators have 2–3. If you have all 8, we should talk.
          </p>
        </div>

        {/* Grid Items Trigger */}
        <div className="pain-trigger-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {painPoints.map((item, idx) => (
              <div
                key={idx}
                className={`pain-card-reveal group relative p-[1px] rounded-[24px] bg-gradient-to-br from-emerald-500/25 via-gold/20 to-emerald-500/5 hover:from-emerald-500/50 hover:via-gold/45 hover:to-emerald-500/10 transition-all duration-300 col-span-1 sm:col-span-1 lg:col-span-2 ${
                  idx === 6 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="h-full bg-dark3 p-6 sm:p-8 md:p-9 rounded-[23px] flex flex-col items-start text-left transition-colors duration-300 group-hover:bg-dark4">
                  <div className="text-[22px] mb-4 opacity-80 select-none">
                    {item.icon}
                  </div>
                  <h3 className="font-sans text-[16px] font-semibold text-white mb-2.5 transition-colors duration-300 group-hover:text-gold">
                    {item.title}
                  </h3>
                  <p className="text-[13px] text-muted leading-[1.75] font-light">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>

          {/* Value Callout Banner (Centered, Bold, Two Lines, font-outfit) */}
          <div className="pain-card-reveal mt-16 max-w-4xl mx-auto text-center">
            <p className="font-cursive text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed tracking-wide">
              These are not content problems. You're already showing up consistently.<br className="hidden sm:inline" />
              <span className="text-gold">These are monetization problems and that's exactly what I fix.</span>
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
