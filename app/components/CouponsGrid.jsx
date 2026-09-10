"use client";

import React, { useState } from "react";
import { couponsData } from "@/data/coupons";
import CouponCard from "./CouponCard";
import { Ticket, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function CouponsGrid() {
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredCoupons = couponsData.filter((c) => {
    if (filterCategory === "all") return true;
    return c.platform.toLowerCase().includes(filterCategory.toLowerCase());
  });

  return (
    <section id="coupons" className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <Ticket className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="font-mono">// 100% VERIFIED GAMER PROMOS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-white">
            EXCLUSIVE GAME VOUCHERS
          </h2>
          <p className="text-sm text-emerald-100/70 mt-2">
            Claim verified discount codes for Steam sales, Razer Gold pins, Xbox Game Pass, and in-game currencies.
          </p>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {["all", "Steam", "Razer Gold", "Xbox", "PlayStation", "Riot"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-['Orbitron'] uppercase tracking-wider transition-all ${
                  filterCategory === cat
                    ? "bg-[#00ff88] text-black shadow-[0_0_15px_rgba(0,255,136,0.6)] border border-[#00ff88] font-black"
                    : "bg-[#04140e] text-emerald-200 border border-emerald-500/20 hover:bg-emerald-500/20 hover:text-white"
                }`}
              >
                {cat === "all" ? "ALL VOUCHERS" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Coupons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoupons.map((coupon) => (
            <CouponCard key={coupon.id} coupon={coupon} />
          ))}
        </div>

      </div>
    </section>
  );
}
