"use client";

import { useEffect, useState } from "react";
import BookingButton from "@/components/ui/BookingButton";

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);



  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-400 ${
        isSticky
          ? "bg-dark/97 border-b border-gold/12 py-4 px-6 md:px-16 backdrop-blur-md"
          : "py-6 px-6 md:px-16 bg-transparent"
      }`}
    >
      {/* Brand logo & Partnership Indicator */}
      <a href="#" className="font-serif text-xl font-bold tracking-wide text-white select-none">
        Zohan<span className="text-gold"> Ariz</span>
      </a>
      
      {/* Right Action Button */}
      <BookingButton
        onClick={onOpenBooking}
        variant="rect"
        className="bg-gold hover:bg-gold2 text-black font-sans font-medium text-[11px] sm:text-[12px] tracking-[0.12em] uppercase px-4 sm:px-6 py-2.5 h-auto rounded-none"
      >
        Let's Talk
      </BookingButton>
    </nav>
  );
}
