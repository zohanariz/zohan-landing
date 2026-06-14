"use client";

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  return (
    <footer className="relative w-full bg-gradient-to-b from-[#081508] via-[#030a03] to-[#000000] text-white px-6 md:px-16 pt-24 pb-8 mt-auto overflow-hidden">
      {/* Wavy SVG Border at the Top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none transform -translate-y-[99%] pointer-events-none select-none">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="relative block w-full h-[60px] md:h-[100px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,50 C360,130 1080,-30 1440,40 L1440,120 L0,120 Z"
            fill="#081508"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 items-start">
          {/* Column 1: Brand, Copyright & Socials */}
          <div className="flex flex-col gap-5 max-w-sm">
            <a href="#" className="font-serif text-[24px] font-bold text-white select-none">
              Zohan<span className="text-gold"> Ariz</span>
            </a>
            <p className="text-[13px] text-white/50 leading-relaxed font-sans">
              Providing fully managed scaling setups globally.
              <br />
              &copy; 2026 Zohan Ariz. All rights reserved.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://youtube.com/@zohanariz?si=HpAo4qvYKGDvhPWh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11C4.482 20.455 12 20.455 12 20.455s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/zohan_arz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-gold transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col md:items-center">
            <div className="flex flex-col gap-3.5">
              <h4 className="text-[11px] text-muted tracking-widest uppercase font-semibold mb-1">
                Navigation
              </h4>
              <a href="#home" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                Home
              </a>
              <a href="#position" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                What We Do
              </a>
              <a href="#why" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                Why Us
              </a>
              <a href="#fit" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                Fit Test
              </a>
              <a href="#faq" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                FAQ
              </a>
            </div>
          </div>

          {/* Column 3: Contact & Legal */}
          <div className="flex flex-col md:items-end">
            <div className="flex flex-col gap-3.5 md:items-start max-w-xs">
              <h4 className="text-[11px] text-muted tracking-widest uppercase font-semibold mb-1">
                Contact & Legal
              </h4>
              <button
                onClick={onOpenBooking}
                className="text-left text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans cursor-pointer"
              >
                Book Strategy Call
              </button>
              <a href="#" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                Terms & Conditions
              </a>
              <a href="#" className="text-[14px] text-[#F0ECE3]/60 hover:text-gold transition-colors duration-300 font-sans">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-full h-px bg-white/5 relative z-10" />

        {/* Large Watermark Text */}
        <div className="w-full text-center select-none pointer-events-none z-0 -mt-6 md:-mt-8 -mb-6 md:-mb-10 overflow-hidden">
          <span className="font-anton text-[13vw] text-[#F0ECE3]/[0.06] uppercase tracking-wider leading-none block">
            Zohan Ariz
          </span>
        </div>
      </div>
    </footer>
  );
}
