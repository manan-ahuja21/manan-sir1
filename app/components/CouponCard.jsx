"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Copy, Check, Sparkles, Clock, CheckCircle2, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";

export default function CouponCard({ coupon }) {
  const { addToast, applyCoupon, setIsCartOpen } = useCart();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(coupon.code);
    setCopied(true);
    addToast(`Voucher "${coupon.code}" copied to clipboard!`, "success", "Coupon Ready");
    
    // Confetti burst with cyber green palette
    try {
      confetti({
        particleCount: 45,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#00ff88', '#10b981', '#a3e635', '#2dd4bf', '#ffffff']
      });
    } catch (e) {}

    setTimeout(() => setCopied(false), 2500);
  };

  const handleApplyToCart = () => {
    handleCopy();
    applyCoupon(coupon.code);
    setIsCartOpen(true);
  };

  return (
    <div className="relative group rounded-3xl bg-gradient-to-br from-[#062417]/90 via-[#03170e]/95 to-[#010905]/95 border border-emerald-500/20 hover:border-[#00ff88] backdrop-blur-2xl p-6 shadow-xl hover:shadow-[0_0_35px_rgba(0,255,136,0.3)] transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Top Accent Line */}
      <div 
        className="absolute top-0 left-0 right-0 h-[2px] opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${coupon.accentColor}, transparent)` }}
      />

      {/* Header Row */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <span 
            className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xl text-black font-['Orbitron'] shadow-sm"
            style={{ backgroundColor: coupon.accentColor }}
          >
            {coupon.platform}
          </span>

          <span className="text-[11px] font-bold text-[#00ff88] bg-emerald-950/70 border border-emerald-500/40 px-2.5 py-1 rounded-full flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3 h-3 text-[#00ff88]" />
            {coupon.badge}
          </span>
        </div>

        {/* Discount Big Headline */}
        <div className="mb-3">
          <span className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-[#00ff88]">
            {coupon.discountText}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white mt-1 group-hover:text-[#00ff88] transition-colors font-['Orbitron']">
            {coupon.title}
          </h3>
        </div>

        <p className="text-xs text-emerald-100/70 mb-5 leading-relaxed">
          {coupon.description}
        </p>

        {/* Requirements & Expiration info */}
        <div className="flex items-center justify-between text-[11px] text-emerald-300/70 bg-[#020a06]/80 border border-emerald-500/20 rounded-xl p-2.5 mb-5 font-mono">
          <span>MIN SPEND: <strong className="text-white">{coupon.minSpend}</strong></span>
          <span className="flex items-center gap-1 text-[#00ff88] font-bold">
            <Clock className="w-3 h-3" /> {coupon.expiresIn}
          </span>
        </div>
      </div>

      {/* Code Box with One-Click Copy & Apply */}
      <div className="space-y-2 pt-2 border-t border-emerald-500/20">
        <div 
          onClick={handleCopy}
          className="cursor-pointer flex items-center justify-between bg-[#020b06] hover:bg-[#04150c] border border-emerald-500/30 hover:border-[#00ff88] rounded-2xl p-2.5 px-4 transition-all duration-200 group/code"
        >
          <div className="flex flex-col">
            <span className="text-[9px] uppercase tracking-widest text-emerald-400/80 font-bold font-mono">
              // PROMO VOUCHER CODE
            </span>
            <span className="font-mono text-sm font-black text-[#00ff88] tracking-wider">
              {coupon.code}
            </span>
          </div>

          <button
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-[#00ff88] text-emerald-200 hover:text-black text-xs font-bold transition-all shadow-sm font-mono"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-black" />
                <span className="text-black font-black">COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>

        <button
          onClick={handleApplyToCart}
          className="w-full py-2 rounded-xl text-xs font-bold text-emerald-300 hover:text-[#00ff88] hover:bg-emerald-500/10 border border-transparent hover:border-emerald-500/20 transition-all flex items-center justify-center gap-1 font-mono"
        >
          <span>APPLY IN CART DRAWER</span>
          <span>→</span>
        </button>
      </div>

    </div>
  );
}
