"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrendingUp, Network, ShieldCheck, KeyRound, Check, Calendar, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  instagram: z.string().regex(/^@?[a-zA-Z0-9_\.]{1,30}$/, "Enter a valid Instagram handle (e.g. @username)"),
  followers: z.coerce.number().min(1, "Please enter your follower count"),
  niche: z.string().min(2, "Please enter your content niche"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

export default function StrategySession() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState("10:30 AM");
  const [formStep, setFormStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadData, setLeadData] = useState<FormData | null>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".session-reveal",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  // 7 days calendar generator starting tomorrow
  const getDays = () => {
    const days = [];
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 1; i <= 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        name: weekday[d.getDay()],
        date: d.getDate(),
        month: d.toLocaleString("en-US", { month: "short" }),
        fullDateString: d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
      });
    }
    return days;
  };

  const days = getDays();

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM"];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      instagram: "",
      followers: 0,
      niche: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const handle = data.instagram.startsWith("@") ? data.instagram : `@${data.instagram}`;
      const payload = {
        ...data,
        instagram: handle,
        scheduledDay: days[selectedDay].fullDateString,
        scheduledTime: selectedTime,
        created_at: new Date().toISOString()
      };

      // 1. Supabase insert
      if (supabase) {
        const { error } = await supabase.from("leads").insert([payload]);
        if (error) console.error("Supabase error:", error);
      }

      // 2. n8n webhook call
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      toast.success("Details Submitted!");
      setLeadData(data);
      setSubmitted(true);

      // Attempt redirect immediately
      const calendlyUrl = `https://calendly.com/thezohanariz/revenue-roadmap?name=${encodeURIComponent(data.fullName)}&email=${encodeURIComponent(data.email)}`;
      window.open(calendlyUrl, "_blank");

      reset();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const bullets = [
    {
      icon: <TrendingUp className="w-5 h-5 text-gold" />,
      title: "Revenue Projection",
      desc: "A cold, data-driven look at your untapped revenue potential based on your current assets."
    },
    {
      icon: <Network className="w-5 h-5 text-gold" />,
      title: "Exact System",
      desc: "The specific architecture required to automate your high-ticket acquisition without sacrificing authority."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold" />,
      title: "Honest Context",
      desc: "A direct assessment of why your current model is capping your growth or draining your freedom."
    },
    {
      icon: <KeyRound className="w-5 h-5 text-gold" />,
      title: "Unlocked Value",
      desc: "Identification of the high-leverage activities you should be focused on to double your hourly value."
    }
  ];

  return (
    <section id="strategy-session" ref={containerRef} className="w-full py-24 bg-[#0A0A0A] border-t border-[#2D2D2D] relative">
      <div className="max-w-6xl mx-auto px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        {/* Left Column Info */}
        <div className="session-reveal flex flex-col items-start text-left">
          <p className="text-gold text-[10px] font-mono tracking-[0.2em] uppercase mb-4">
            // THE NEXT STEP
          </p>
          <h2 className="font-outfit text-4xl md:text-6xl font-extrabold tracking-tight text-white uppercase leading-[1.0] mb-8">
            Prepare for <br />
            Clarity.
          </h2>
          <p className="text-sm md:text-base text-muted font-light leading-relaxed mb-10 max-w-md">
            This is not a sales pitch. It is a rigorous audit of your current trajectory and a blueprint for your evolution.
          </p>

          <div className="space-y-6 mb-10 w-full">
            {bullets.map((b, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-none bg-dark3 border border-white/6 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  {b.icon}
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-white mb-1">
                    {b.title}
                  </h4>
                  <p className="text-xs text-muted leading-relaxed font-light max-w-sm">
                    {b.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Privacy Guarantee Badge */}
          <div className="bg-gold/5 border border-gold/20 px-4 py-3 rounded-none flex items-center gap-3 shadow-sm select-none">
            <ShieldCheck className="w-5 h-5 text-gold shrink-0" />
            <div className="text-left">
              <span className="block text-[10px] font-bold text-gold uppercase tracking-wide leading-none mb-0.5">Privacy Guarantee</span>
              <span className="text-[9px] text-gold/80 font-semibold uppercase tracking-wider leading-none">100% CONFIDENTIAL • NO-OBLIGATION</span>
            </div>
          </div>
        </div>

        {/* Right Column Calendar Card */}
        <div className="session-reveal">
          <div className="w-full bg-dark3 border border-white/6 rounded-none p-8 md:p-10 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col justify-between">
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-none blur-2xl pointer-events-none"></div>
            
            <AnimatePresence mode="wait">
              {!formStep ? (
                // STEP 1: Time & Day Selection
                <motion.div
                  key="calendar-step"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between flex-grow h-full"
                >
                  <div>
                    <h3 className="font-outfit text-xl font-extrabold text-white uppercase tracking-wide mb-2">
                      Claim Your 15-Minute Strategy Session
                    </h3>
                    <p className="text-xs text-muted font-mono uppercase tracking-wider mb-6">
                      Select a time that aligns with your peak focus hours.
                    </p>

                    {/* Horizontal Day Picker */}
                    <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-thin select-none">
                      {days.map((day, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedDay(idx)}
                          className={`flex-shrink-0 flex flex-col items-center justify-center w-14 py-2.5 rounded-none border text-center transition-all cursor-pointer ${
                            selectedDay === idx
                              ? "bg-gold border-gold text-black shadow-md font-semibold"
                              : "bg-dark border-white/6 text-muted hover:bg-dark3 hover:text-white"
                          }`}
                        >
                          <span className="text-[9px] font-mono uppercase tracking-widest leading-none mb-1 opacity-80">{day.name}</span>
                          <span className="text-base font-mono font-bold leading-none">{day.date}</span>
                        </button>
                      ))}
                    </div>

                    {/* Time Slots List */}
                    <div className="space-y-3 mb-6">
                      {timeSlots.map((time) => {
                        const isSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`w-full flex items-center justify-between p-4 rounded-none border text-left font-mono font-bold text-xs tracking-wider transition-all cursor-pointer ${
                              isSelected
                                ? "bg-dark border-gold text-gold shadow-sm"
                                : "bg-dark border-white/6 text-muted hover:bg-dark3 hover:text-white"
                            }`}
                          >
                            <span>{time}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-gold stroke-[2px]" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Secure Lock Loader */}
                    <div className="flex items-center justify-center gap-2 text-gold font-mono font-bold text-[10px] tracking-widest uppercase mb-4">
                      <span className="w-1.5 h-1.5 rounded-none bg-gold animate-ping"></span>
                      <span>Secure Calendar Link Initializing</span>
                    </div>
                  </div>

                  {/* Bottom Avatar & Action Button Row */}
                  <div className="border-t border-white/6 pt-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
                        alt="Zohan Ariz"
                        className="w-10 h-10 rounded-none object-cover border border-white/6"
                      />
                      <div className="text-left leading-none">
                        <span className="block text-xs font-bold text-white mb-0.5">Zohan Ariz</span>
                        <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">Direct Access</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => setFormStep(true)}
                      className="bg-gold hover:bg-gold2 text-black font-sans font-semibold text-xs tracking-wider px-6 py-3.5 rounded-none cursor-pointer shadow-md uppercase"
                    >
                      Confirm Time
                    </Button>
                  </div>
                </motion.div>
              ) : submitted ? (
                // SUCCESS SCREEN
                <motion.div
                  key="success-step"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center text-center flex-grow py-12"
                >
                  <div className="w-16 h-16 rounded-none bg-gold/10 text-gold flex items-center justify-center mb-6 shadow-sm border border-gold/20">
                    <Check className="w-8 h-8 stroke-[2.5px]" />
                  </div>
                  <h3 className="font-outfit text-2xl font-extrabold text-white uppercase tracking-wide mb-3">
                    Details Submitted!
                  </h3>
                  <p className="text-xs text-muted leading-relaxed max-w-xs mb-8 font-light">
                    Step 2: Please select your actual booking slot on Zohan's calendar using the button below to lock in the time.
                  </p>
                  
                  <Button
                    onClick={() => {
                      const calendlyUrl = `https://calendly.com/thezohanariz/revenue-roadmap?name=${encodeURIComponent(leadData?.fullName || "")}&email=${encodeURIComponent(leadData?.email || "")}`;
                      window.open(calendlyUrl, "_blank");
                    }}
                    className="w-full bg-gold hover:bg-gold2 text-black font-sans font-semibold text-xs tracking-wider py-4 rounded-none transition-all duration-200 cursor-pointer shadow-md uppercase flex items-center justify-center gap-2 mb-6"
                  >
                    <span>Schedule on Calendly →</span>
                  </Button>

                  <Button
                    onClick={() => {
                      setSubmitted(false);
                      setFormStep(false);
                      setLeadData(null);
                    }}
                    className="bg-transparent border border-white/6 text-muted hover:text-white font-mono font-bold text-[10px] py-2 px-6 rounded-none cursor-pointer"
                  >
                    Go Back / Edit Details
                  </Button>
                </motion.div>
              ) : (
                // STEP 2: Details Submission Form
                <motion.div
                  key="form-step"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col justify-between flex-grow h-full"
                >
                  <div>
                    {/* Back Button */}
                    <button
                      onClick={() => setFormStep(false)}
                      className="flex items-center gap-2 text-xs font-bold text-muted hover:text-gold uppercase tracking-wider mb-6 cursor-pointer font-mono"
                    >
                      <ArrowLeft className="w-4 h-4 text-muted hover:text-gold" />
                      <span>Back to Calendar</span>
                    </button>

                    <h3 className="font-outfit text-xl font-extrabold text-white uppercase tracking-wide mb-2">
                      Enter Booking Details
                    </h3>
                    <p className="text-xs text-muted font-mono uppercase tracking-wider mb-6">
                      Selected slot: <strong>{days[selectedDay].name} {days[selectedDay].date}</strong> at <strong>{selectedTime}</strong>
                    </p>

                    {/* Lead Form */}
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-1">
                        <Label htmlFor="fullName" className="text-[9px] font-mono font-bold text-muted uppercase tracking-wider">Full Name</Label>
                        <Input
                          id="fullName"
                          placeholder="Your Name"
                          className="bg-dark border-white/6 text-white text-sm focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans"
                          disabled={loading}
                          {...register("fullName")}
                        />
                        {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <Label htmlFor="instagram" className="text-[9px] font-mono font-bold text-muted uppercase tracking-wider">Instagram Handle</Label>
                          <Input
                            id="instagram"
                            placeholder="@handle"
                            className="bg-dark border-white/6 text-white text-sm focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans"
                            disabled={loading}
                            {...register("instagram")}
                          />
                          {errors.instagram && <p className="text-xs text-red-500">{errors.instagram.message}</p>}
                        </div>

                        <div className="space-y-1">
                          <Label htmlFor="followers" className="text-[9px] font-mono font-bold text-muted uppercase tracking-wider">Followers</Label>
                          <Input
                            id="followers"
                            type="number"
                            placeholder="45000"
                            className="bg-dark border-white/6 text-white text-sm focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans"
                            disabled={loading}
                            {...register("followers")}
                          />
                          {errors.followers && <p className="text-xs text-red-500">{errors.followers.message}</p>}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="niche" className="text-[9px] font-mono font-bold text-muted uppercase tracking-wider">Niche / Industry</Label>
                        <Input
                          id="niche"
                          placeholder="Fitness, Business, Finance..."
                          className="bg-dark border-white/6 text-white text-sm focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans"
                          disabled={loading}
                          {...register("niche")}
                        />
                        {errors.niche && <p className="text-xs text-red-500">{errors.niche.message}</p>}
                      </div>

                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-[9px] font-mono font-bold text-muted uppercase tracking-wider">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@domain.com"
                          className="bg-dark border-white/6 text-white text-sm focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans"
                          disabled={loading}
                          {...register("email")}
                        />
                        {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                      </div>

                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gold hover:bg-gold2 text-black font-sans font-semibold text-xs tracking-wider py-3.5 rounded-none cursor-pointer shadow-md transition-all mt-2 flex items-center justify-center gap-2 uppercase"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-black" />
                            <span>Confirming call...</span>
                          </>
                        ) : (
                          <span>Confirm strategy call</span>
                        )}
                      </Button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
