"use client";

import React from "react";
import { MousePointerClick, ShieldCheck, MailCheck, Zap, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: MousePointerClick,
      title: "Select Card or Voucher",
      description: "Pick your gaming platform (Steam, Xbox, Razer, PSN) and choose your denomination ($10, $25, $50, $100) or copy free vouchers.",
      accent: "from-[#00ff88] to-emerald-600",
      glow: "rgba(0, 255, 136, 0.4)"
    },
    {
      step: "02",
      icon: ShieldCheck,
      title: "Instant Encrypted Checkout",
      description: "Pay with Credit/Debit card, Apple Pay, PayPal, or Crypto with 256-bit bank-grade encryption and zero hidden fees.",
      accent: "from-emerald-400 to-teal-600",
      glow: "rgba(16, 185, 129, 0.4)"
    },
    {
      step: "03",
      icon: MailCheck,
      title: "Receive Code in 5 Seconds",
      description: "Your official redemption key displays instantly on screen and is delivered to your email inbox with easy activation guide.",
      accent: "from-teal-400 to-lime-500",
      glow: "rgba(45, 212, 191, 0.4)"
    }
  ];

  return (
    <section id="how-it-works" className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="font-mono">// 100% AUTOMATED PROTOCOL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-white">
            HOW NEXUS VAULT WORKS
          </h2>
          <p className="text-sm text-emerald-100/70 mt-2">
            No waiting. No verification queues. Get back into your favorite games in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative rounded-3xl bg-gradient-to-b from-[#051f15]/80 to-[#020b08]/90 border border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-start group"
              >
                {/* Step Number Watermark */}
                <span className="absolute top-6 right-6 font-['Orbitron'] text-4xl font-black text-emerald-500/10 group-hover:text-emerald-500/25 transition-colors select-none">
                  {item.step}
                </span>

                {/* Icon Badge */}
                <div 
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${item.accent} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 transition-transform`}
                  style={{ boxShadow: `0 0 25px ${item.glow}` }}
                >
                  <Icon className="w-7 h-7 text-black" />
                </div>

                <h3 className="text-xl font-bold font-['Orbitron'] text-white mb-2 group-hover:text-[#00ff88] transition-colors">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-emerald-100/70 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
