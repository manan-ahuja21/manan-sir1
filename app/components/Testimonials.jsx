"use client";

import React from "react";
import { Star, CheckCircle, Quote, ShieldCheck } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      name: "Alex 'Vortex' K.",
      role: "Competitive FPS Player",
      rating: 5,
      time: "2 hours ago",
      platform: "Steam $100 Card",
      text: "Saved $20 on a $100 Steam wallet card and used it immediately during the Steam sale. Got the code on screen literally in 3 seconds!",
      avatarGradient: "from-[#00ff88] to-emerald-600"
    },
    {
      id: 2,
      name: "Marcus Reynolds",
      role: "Console Gamer",
      rating: 5,
      time: "5 hours ago",
      platform: "Xbox Game Pass Ultimate",
      text: "Was skeptical at first, but the 50% off Game Pass voucher worked flawlessly. NEXUS VAULT is my new go-to for gaming top-ups.",
      avatarGradient: "from-emerald-500 to-teal-600"
    },
    {
      id: 3,
      name: "Elena 'Luna' Vance",
      role: "Valorant & Razer Gold Streamer",
      rating: 5,
      time: "1 day ago",
      platform: "Razer Gold + VP",
      text: "The coupon codes here are actually verified and active. The UI is super smooth and applying the promo code directly saved me a ton.",
      avatarGradient: "from-lime-400 to-emerald-600"
    }
  ];

  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
              <span>// VERIFIED GAMER FEEDBACK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-white">
              TRUSTED BY 250,000+ GAMERS
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-[#04140e] border border-emerald-500/30 rounded-2xl px-4 py-2.5 backdrop-blur-md">
            <div className="flex text-amber-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-300" />
              ))}
            </div>
            <span className="text-xs font-bold text-white font-['Orbitron']">4.9 / 5.0</span>
            <span className="text-xs text-emerald-300/60 font-mono">(12,450+ Reviews)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-3xl bg-gradient-to-b from-[#051f15]/80 to-[#020b08]/90 border border-emerald-500/20 backdrop-blur-2xl p-6 shadow-xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-300">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-300" />
                    ))}
                  </div>
                  <span className="text-[11px] text-emerald-300/50 font-mono">{rev.time}</span>
                </div>

                <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed italic mb-6">
                  "{rev.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-emerald-500/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${rev.avatarGradient} flex items-center justify-center text-xs font-black text-black shadow-md`}>
                    {rev.name[0]}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1 font-['Orbitron']">
                      {rev.name}
                      <CheckCircle className="w-3.5 h-3.5 text-[#00ff88]" />
                    </h4>
                    <p className="text-[10px] text-emerald-300/60 font-mono">{rev.role}</p>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-[#00ff88] bg-emerald-950/70 border border-emerald-500/30 px-2 py-0.5 rounded-lg font-mono">
                  {rev.platform}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
