"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { giftCardsData } from "@/data/giftCards";
import { Flame, Clock, Zap, ShoppingBag, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function FlashDeals() {
  const { addToCart, formatPrice } = useCart();
  const flashCards = giftCardsData.filter((card) => card.isFlashDeal);

  // 24-hour countdown simulation
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, "0");

  return (
    <section id="flash-deals" className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Flash Header Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#052618]/80 via-[#041910]/90 to-[#020a06]/95 border border-emerald-500/35 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,255,136,0.18)] mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#00ff88] to-teal-500 flex items-center justify-center shrink-0 shadow-[0_0_25px_rgba(0,255,136,0.6)]">
                <Flame className="w-6 h-6 text-black animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#00ff88] font-mono">
                    // LIMITED CHROMA ROUND
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-[#00ff88] border border-emerald-500/40 animate-pulse">
                    LIVE NOW
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black font-['Orbitron'] text-white mt-1">
                  24-HOUR FLASH VAULT
                </h2>
                <p className="text-xs sm:text-sm text-emerald-100/70 mt-1">
                  Extreme markdown gaming codes refreshed daily. Extra discount already auto-applied.
                </p>
              </div>
            </div>

            {/* Live Countdown Ticker in Glowing Neon */}
            <div className="flex items-center gap-2 self-start md:self-auto bg-[#020a06]/85 border border-emerald-500/35 rounded-2xl p-3 backdrop-blur-md">
              <Clock className="w-4 h-4 text-[#00ff88] shrink-0 animate-spin" style={{ animationDuration: '10s' }} />
              <div className="flex items-center gap-1.5 text-center font-['Orbitron']">
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/25">
                    {formatNumber(timeLeft.hours)}
                  </span>
                  <span className="text-[9px] text-emerald-300/60 uppercase font-sans mt-0.5">Hours</span>
                </div>
                <span className="text-[#00ff88] font-bold -mt-3">:</span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-500/25">
                    {formatNumber(timeLeft.minutes)}
                  </span>
                  <span className="text-[9px] text-emerald-300/60 uppercase font-sans mt-0.5">Mins</span>
                </div>
                <span className="text-[#00ff88] font-bold -mt-3">:</span>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-[#00ff88] bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/40 shadow-[0_0_10px_rgba(0,255,136,0.3)]">
                    {formatNumber(timeLeft.seconds)}
                  </span>
                  <span className="text-[9px] text-emerald-300/60 uppercase font-sans mt-0.5">Secs</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Flash Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {flashCards.map((card) => {
            const denom = card.denominations[1] || card.denominations[0];
            return (
              <div
                key={card.id}
                className="group relative rounded-2xl bg-gradient-to-b from-[#051f15]/80 via-[#03140d]/90 to-[#010805]/95 border border-emerald-500/20 hover:border-[#00ff88] backdrop-blur-xl p-5 shadow-xl hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg text-black font-['Orbitron']"
                    style={{ backgroundColor: card.accentColor }}
                  >
                    {card.platform}
                  </span>

                  <span className="text-xs font-bold text-[#00ff88] bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#00ff88]" /> -{denom.discount}%
                  </span>
                </div>

                {/* Card Title & Denom */}
                <div className="mb-4">
                  <h3 className="font-bold text-base text-white group-hover:text-[#00ff88] transition-colors line-clamp-1 font-['Orbitron']">
                    {card.name}
                  </h3>
                  <p className="text-xs text-emerald-200/60 mt-1 font-mono">
                    ${denom.amount} USD Instant Dispatch
                  </p>
                </div>

                {/* Stock Left Progress Bar */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-[11px] mb-1.5 font-mono">
                    <span className="text-emerald-300/60">CLAIMED:</span>
                    <span className="font-bold text-[#00ff88]">{card.flashStockPercent}%</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[#020906] overflow-hidden border border-emerald-500/20">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-[#00ff88] to-teal-400 shadow-[0_0_10px_rgba(0,255,136,0.7)]"
                      style={{ width: `${card.flashStockPercent}%` }}
                    />
                  </div>
                </div>

                {/* Pricing & Quick Claim Button */}
                <div className="flex items-center justify-between pt-3 border-t border-emerald-500/20">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-emerald-300/50 line-through">
                      {formatPrice(denom.amount)}
                    </span>
                    <span className="text-lg font-black font-['Orbitron'] text-white">
                      {formatPrice(denom.price)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(card, denom)}
                    className="flex items-center gap-1.5 bg-emerald-500/20 hover:bg-[#00ff88] border border-emerald-500/40 hover:border-[#00ff88] text-emerald-200 hover:text-black text-xs font-black font-['Orbitron'] px-3 py-2 rounded-xl transition-all duration-200 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>CLAIM</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
