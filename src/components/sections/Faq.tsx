"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FaqProps {
  onOpenBooking: () => void;
}

export default function Faq({ onOpenBooking }: FaqProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".faq-reveal",
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

  const faqs = [
    {
      q: "What exactly do you handle and what do I have to do?",
      a: (
        <>
          I build and run the entire backend: the offer design, the funnel, the email sequences, the automations, the payment setup, and the course hosting. You bring your knowledge and your audience. Your only job is to show up as yourself, the content you already create, the trust you've already built. <strong className="text-gold font-semibold">The system handles everything else.</strong>
        </>
      )
    },
    {
      q: "If there's no upfront investment, how does this actually work?",
      a: (
        <>
          You keep 80%. I take 20%. No retainers, no upfront fees, no monthly charges. I only earn when you do, which means my incentive is completely aligned with yours. <strong className="text-gold font-semibold">If it doesn't generate income, I don't get paid.</strong> That structure is intentional. It keeps me accountable to results, not just effort.
        </>
      )
    },
    {
      q: "I've never launched anything before. Is that a problem?",
      a: (
        <>
          It's honestly ideal. There's nothing to unlearn and no old setup to rebuild around. We start with a clean structure and build the offer around what your followers are already asking you for.
        </>
      )
    },
    {
      q: "What kind of product will we build together?",
      a: (
        <>
          Masterclass or a digital course built around the knowledge you're already sharing for free, the thing your audience keeps asking you to go deeper on. We figure out the exact offer on the call and price it based on your niche and the level of trust you've built with your followers.
        </>
      )
    },
    {
      q: "My following is engaged but not huge, say, 25K. Does this still work?",
      a: (
        <>
          Yes. Size matters far less than trust. <strong className="text-gold font-semibold">A 25K audience that genuinely listens to you will outperform a 250K audience that treats you like entertainment.</strong> If your followers ask for your advice, follow your recommendations, and engage with your posts, the audience is ready. That's the only metric that actually matters.
        </>
      )
    },
    {
      q: "What if it doesn't convert? What's my risk?",
      a: (
        <>
          You've invested nothing upfront. If a launch doesn't perform, you've lost no money. <strong className="text-gold font-semibold">I've lost the time, money, and resources I put into building it</strong>, including the softwares, the automations, and the entire backend infrastructure. That's not charity, it's how the model keeps me accountable. I don't get paid for effort. I only get paid for results.
        </>
      )
    },
    {
      q: "Do I own everything we build?",
      a: (
        <>
          Completely. Your audience, your brand, your product, your income. <strong className="text-gold font-semibold">I own none of it.</strong> I build the infrastructure that runs behind the scenes, but the business, the relationship with your followers, and every dollar it generates belong entirely to you.
        </>
      )
    }
  ];

  return (
    <section id="faq" ref={containerRef} className="w-full py-24 bg-dark2 border-t border-white/6 relative text-left">
      <div className="container max-w-4xl mx-auto px-6 md:px-16">
        
        <div className="faq-reveal s-tag mb-4">
          FAQ
        </div>
        
        <h2 className="faq-reveal font-outfit text-3xl md:text-5xl font-extrabold tracking-wide [word-spacing:0.16em] mb-6 text-white leading-[1.1] uppercase">
          Questions worth asking before you book.
        </h2>
        <p className="faq-reveal text-sm md:text-base text-muted font-light max-w-xl leading-relaxed mb-12">
          If something isn't covered here, I'll answer it directly on the call.
        </p>

        {/* Customized Accordion */}
        <div className="faq-reveal faq-list border-t border-white/6 mb-16">
          <Accordion className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-b border-white/6 py-2"
              >
                <AccordionTrigger className="hover:no-underline font-sans text-sm md:text-base font-semibold text-white hover:text-gold text-left transition-all duration-300 py-4 [&[data-state=open]]:text-gold">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-xs md:text-sm text-muted leading-relaxed font-light pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

      </div>
    </section>
  );
}
