"use client";

import React, { useState, useRef } from "react";

interface BookingButtonProps {
  onClick: () => void;
  className?: string;
  children: React.ReactNode;
  variant?: "pill" | "cut" | "rect";
}

export default function BookingButton({
  onClick,
  className = "",
  children,
  variant = "cut",
}: BookingButtonProps) {
  const [ripple, setRipple] = useState<{ x: number; y: number; show: boolean }>({
    x: 0,
    y: 0,
    show: false,
  });
  const [showShockwave, setShowShockwave] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setRipple({ x, y, show: true });
      setShowShockwave(true);

      // Hide ripple after animation completes (600ms)
      setTimeout(() => {
        setRipple((prev) => ({ ...prev, show: false }));
      }, 600);

      // Hide shockwave after animation completes (600ms)
      setTimeout(() => {
        setShowShockwave(false);
      }, 600);
    }

    // Call the original onClick function
    onClick();
  };

  const shockClass =
    variant === "pill"
      ? "absolute inset-0 pointer-events-none z-0 rounded-full border border-gold/40 bg-gold/15"
      : "absolute inset-0 pointer-events-none z-0 border border-gold/40 bg-gold/15";

  return (
    <div className="relative inline-block select-none">
      {/* Outward Shockwave Halo */}
      {showShockwave && (
        <span
          className={`${shockClass} animate-btn-shockwave`}
          style={{
            clipPath:
              variant === "cut"
                ? "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))"
                : undefined,
          }}
        />
      )}

      <button
        ref={buttonRef}
        onClick={handleClick}
        className={`${className} relative overflow-hidden active:scale-95 active:translate-y-px transition-all duration-150 cursor-pointer`}
      >
        {/* Custom Ripple inside the button */}
        {ripple.show && (
          <span
            className="absolute bg-white/40 rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 animate-btn-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "160px",
              height: "160px",
            }}
          />
        )}

        {/* Button Content */}
        <span className="relative z-10 pointer-events-none flex items-center justify-center gap-2">
          {children}
        </span>
      </button>
    </div>
  );
}
