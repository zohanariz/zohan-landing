"use client";

import { useState, useEffect } from "react";
import Lenis from "lenis";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import PainPoints from "@/components/sections/PainPoints";
import WhatWeDo from "@/components/sections/WhatWeDo";
import FitTest from "@/components/sections/FitTest";
import Proof from "@/components/sections/Proof";
import Faq from "@/components/sections/Faq";
import FinalCta from "@/components/sections/FinalCta";
import BookingModal from "@/components/sections/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    // Initialise Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // standard easeOutExpo
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const openBooking = () => {
    const el = document.getElementById("strategy-session");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsBookingOpen(true);
    }
  };
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-gold selection:text-black">
      {/* Navigation */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main content sections */}
      <main className="flex-grow">
        <Hero onOpenBooking={openBooking} />
        <PainPoints />
        <WhatWeDo onOpenBooking={openBooking} />
        <FitTest />
        <Proof onOpenBooking={openBooking} />
        <Faq onOpenBooking={openBooking} />
        <FinalCta onOpenBooking={openBooking} />
      </main>

      {/* Footer */}
      <Footer onOpenBooking={openBooking} />

      {/* Lead Capture Strategy Call Dialog Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}

