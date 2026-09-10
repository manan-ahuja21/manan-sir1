"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Mail, Gift, ArrowRight, Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function Newsletter() {
  const { addToast } = useCart();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter a valid email address.", "error", "Invalid Email");
      return;
    }

    setIsSubmitted(true);
    addToast("Welcome to VIP Loot Club! Coupon code NEXUS20 unlocked for 20% off!", "success", "VIP Access Granted");
    
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#00ff88', '#10b981', '#a3e635', '#ffffff']
      });
    } catch (err) {}
  };

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#062c1d]/85 via-[#031c12]/90 to-[#020b08]/95 border border-emerald-500/35 backdrop-blur-2xl p-8 sm:p-12 shadow-[0_15px_50px_rgba(0,255,136,0.2)] overflow-hidden">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[#00ff88] text-xs font-semibold mb-3 font-mono">
                <Gift className="w-3.5 h-3.5" />
                <span>// JOIN 85,000+ VIP GAMERS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black font-['Orbitron'] text-white">
                UNLOCK 20% OFF YOUR FIRST ORDER
              </h2>
              <p className="text-xs sm:text-sm text-emerald-100/70 mt-2 max-w-md">
                Subscribe to our Secret Loot Drop alert. Get weekly free game codes, flash sales, and instant 20% vouchers.
              </p>
            </div>

            <div className="md:col-span-5">
              {isSubmitted ? (
                <div className="p-5 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-[#00ff88] flex items-center justify-center mx-auto mb-2">
                    <Check className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-white font-['Orbitron']">VIP ACCESS GRANTED!</h4>
                  <p className="text-xs text-emerald-200 mt-1">Use voucher <strong className="text-[#00ff88] font-mono">NEXUS20</strong> in cart for 20% off.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter gamer email..."
                      className="w-full bg-[#030d08]/90 border border-emerald-500/30 rounded-2xl pl-11 pr-4 py-3.5 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] backdrop-blur-md"
                      required
                    />
                    <Mail className="w-5 h-5 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00ff88] via-emerald-500 to-teal-500 hover:from-[#26ff98] hover:to-teal-400 text-black text-xs sm:text-sm font-black font-['Orbitron'] tracking-wider shadow-[0_0_25px_rgba(0,255,136,0.45)] transition-all flex items-center justify-center gap-2"
                  >
                    <span>CLAIM 20% VOUCHER</span>
                    <ArrowRight className="w-4 h-4 text-black" />
                  </button>
                  <span className="text-[10px] text-emerald-300/60 text-center font-mono">No spam. Unsubscribe anytime.</span>
                </form>
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
