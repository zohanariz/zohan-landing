"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { Check } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  instagram: z.string().regex(/^@?[a-zA-Z0-9_\.]{1,30}$/, "Enter a valid Instagram handle (e.g. @username)"),
  followers: z.coerce.number().min(1, "Please enter your follower count"),
  niche: z.string().min(2, "Please enter your content niche"),
  email: z.string().email("Please enter a valid email address"),
});

type FormData = z.infer<typeof formSchema>;

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [leadData, setLeadData] = useState<FormData | null>(null);

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
      // Ensure instagram starts with '@' for consistency
      const handle = data.instagram.startsWith("@") ? data.instagram : `@${data.instagram}`;
      const payload = { ...data, instagram: handle, created_at: new Date().toISOString() };

      // 1. Supabase Insertion
      if (supabase) {
        const { error } = await supabase.from("leads").insert([payload]);
        if (error) console.error("Supabase insert error:", error);
      } else {
        console.warn("Supabase not configured. Storing locally in console.");
      }

      // 2. n8n Webhook triggering
      const n8nWebhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (n8nWebhookUrl) {
        const response = await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) console.error("n8n webhook error response:", response.statusText);
      }

      toast.success("Details Submitted!", {
        description: "Now please select your slot on Calendly to finalize.",
      });

      setLeadData(data);
      setSubmitted(true);

      // Attempt redirect immediately
      const calendlyUrl = `https://calendly.com/thezohanariz/revenue-roadmap?name=${encodeURIComponent(data.fullName)}&email=${encodeURIComponent(data.email)}`;
      window.open(calendlyUrl, "_blank");

      reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit request", {
        description: "Please try again or contact Zohan directly on Instagram.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setLeadData(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="bg-dark3 border border-white/6 text-white shadow-2xl sm:max-w-lg w-[92%] rounded-none p-6 sm:p-9 md:p-11">
        {submitted ? (
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="w-20 h-20 rounded-none bg-gold/10 text-gold flex items-center justify-center mb-8 shadow-sm border border-gold/20">
              <Check className="w-10 h-10 stroke-[2.5px]" />
            </div>
            <DialogTitle className="font-outfit text-3xl font-extrabold text-white uppercase tracking-wide mb-3">
              Details Submitted!
            </DialogTitle>
            <DialogDescription className="text-muted text-base leading-relaxed max-w-md mb-10">
              Step 2: Choose your time slot on Zohan's calendar to lock in your strategy session.
            </DialogDescription>
            <Button
              onClick={() => {
                const calendlyUrl = `https://calendly.com/thezohanariz/revenue-roadmap?name=${encodeURIComponent(leadData?.fullName || "")}&email=${encodeURIComponent(leadData?.email || "")}`;
                window.open(calendlyUrl, "_blank");
              }}
              className="w-full h-12 bg-gold hover:bg-gold2 text-black font-sans font-semibold text-xs tracking-wider rounded-none transition-all duration-200 cursor-pointer shadow-md uppercase flex items-center justify-center gap-2"
            >
              <span>Schedule on Calendly →</span>
            </Button>
            
            <button
              onClick={handleClose}
              className="text-xs text-muted hover:text-white mt-6 transition-colors font-mono tracking-wider uppercase bg-transparent border-0 cursor-pointer"
            >
              Close Window
            </button>
          </div>
        ) : (
          <>
            <DialogHeader className="mb-4">
              <DialogTitle className="font-outfit text-[28px] sm:text-3xl font-extrabold text-gold uppercase tracking-wide">
                Book Strategy Call
              </DialogTitle>
              <DialogDescription className="text-muted text-sm sm:text-base mt-2">
                Let's evaluate your account and build a custom monetization gameplan.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="fullName" className="text-[10px] sm:text-[11px] font-mono font-bold text-muted uppercase tracking-wider">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Zohan Ariz"
                  className="h-12 bg-dark border-white/6 text-white text-base focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans px-4"
                  disabled={loading}
                  {...register("fullName")}
                />
                {errors.fullName && <p className="text-sm text-red-500">{errors.fullName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="instagram" className="text-[10px] sm:text-[11px] font-mono font-bold text-muted uppercase tracking-wider">Instagram Handle</Label>
                  <Input
                    id="instagram"
                    placeholder="@zohan.ariz"
                    className="h-12 bg-dark border-white/6 text-white text-base focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans px-4"
                    disabled={loading}
                    {...register("instagram")}
                  />
                  {errors.instagram && <p className="text-sm text-red-500">{errors.instagram.message}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="followers" className="text-[10px] sm:text-[11px] font-mono font-bold text-muted uppercase tracking-wider">Followers</Label>
                  <Input
                    id="followers"
                    type="number"
                    placeholder="45000"
                    className="h-12 bg-dark border-white/6 text-white text-base focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans px-4"
                    disabled={loading}
                    {...register("followers")}
                  />
                  {errors.followers && <p className="text-sm text-red-500">{errors.followers.message}</p>}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="niche" className="text-[10px] sm:text-[11px] font-mono font-bold text-muted uppercase tracking-wider">Niche / Industry</Label>
                <Input
                  id="niche"
                  placeholder="Fitness, Business, Design, Finance..."
                  className="h-12 bg-dark border-white/6 text-white text-base focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans px-4"
                  disabled={loading}
                  {...register("niche")}
                />
                {errors.niche && <p className="text-sm text-red-500">{errors.niche.message}</p>}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[10px] sm:text-[11px] font-mono font-bold text-muted uppercase tracking-wider">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="zohan@domain.com"
                  className="h-12 bg-dark border-white/6 text-white text-base focus:border-gold rounded-none focus-visible:ring-gold/25 font-sans px-4"
                  disabled={loading}
                  {...register("email")}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gold hover:bg-gold2 text-black font-sans font-semibold text-xs tracking-wider py-3 rounded-none transition-all duration-200 mt-2 cursor-pointer shadow-md uppercase"
                disabled={loading}
              >
                {loading ? "Submitting Request..." : "Request Call Now →"}
              </Button>

              <p className="text-[10px] text-muted text-center tracking-widest uppercase font-mono pt-1">
                🔒 Pure Privacy. We never share your data.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
