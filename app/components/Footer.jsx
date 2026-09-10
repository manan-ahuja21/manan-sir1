"use client";

import React from "react";
import { Gamepad2, ShieldCheck, Zap, Lock } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-emerald-500/20 bg-[#020705]/95 backdrop-blur-2xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Partner Brands Strip */}
        <div className="pb-10 mb-10 border-b border-emerald-500/15 flex flex-wrap items-center justify-between gap-6 text-emerald-300/70 text-xs font-bold uppercase tracking-wider font-mono">
          <span className="text-white flex items-center gap-1.5 font-['Orbitron']">
            <ShieldCheck className="w-4 h-4 text-[#00ff88]" />
            AUTHORIZED RETAIL NETWORK
          </span>
          <div className="flex flex-wrap items-center gap-6 font-['Orbitron'] text-xs text-emerald-300/70">
            <span className="hover:text-[#00ff88] transition-colors">VALVE STEAM</span>
            <span className="hover:text-[#00ff88] transition-colors">RAZER GOLD</span>
            <span className="hover:text-[#00ff88] transition-colors">XBOX LIVE</span>
            <span className="hover:text-[#00ff88] transition-colors">PLAYSTATION</span>
            <span className="hover:text-[#00ff88] transition-colors">RIOT GAMES</span>
            <span className="hover:text-[#00ff88] transition-colors">ROBLOX</span>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-emerald-500/15">
          
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#00ff88] via-emerald-500 to-teal-400 p-[1px]">
                <div className="w-full h-full bg-[#030906] rounded-[10px] flex items-center justify-center">
                  <Gamepad2 className="w-4 h-4 text-[#00ff88]" />
                </div>
              </div>
              <span className="font-['Orbitron'] font-black text-lg text-white">
                NEXUS<span className="text-[#00ff88]">VAULT</span>
              </span>
            </div>
            <p className="text-xs text-emerald-200/60 leading-relaxed max-w-sm">
              The premier glassmorphic marketplace for instant gaming gift cards, verified voucher discounts, and wallet keys.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#00ff88] font-mono">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
              <span>All Systems Operational • 5s Instant Delivery</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Orbitron']">
              Popular Gift Cards
            </h4>
            <ul className="space-y-2 text-xs text-emerald-300/70">
              <li><a href="#gift-cards" className="hover:text-[#00ff88] transition-colors">Steam Wallet Digital Codes</a></li>
              <li><a href="#gift-cards" className="hover:text-[#00ff88] transition-colors">Razer Gold Global PINs</a></li>
              <li><a href="#gift-cards" className="hover:text-[#00ff88] transition-colors">Xbox Game Pass Ultimate</a></li>
              <li><a href="#gift-cards" className="hover:text-[#00ff88] transition-colors">PlayStation PSN Cards</a></li>
              <li><a href="#gift-cards" className="hover:text-[#00ff88] transition-colors">Riot Valorant VP Cards</a></li>
            </ul>
          </div>

          {/* Coupons Links */}
          <div className="md:col-span-2 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Orbitron']">
              Promo Codes
            </h4>
            <ul className="space-y-2 text-xs text-emerald-300/70">
              <li><a href="#coupons" className="hover:text-[#00ff88] transition-colors">Steam 25% Promo</a></li>
              <li><a href="#coupons" className="hover:text-[#00ff88] transition-colors">Razer Chroma 20% Off</a></li>
              <li><a href="#coupons" className="hover:text-[#00ff88] transition-colors">Xbox 50% Voucher</a></li>
              <li><a href="#coupons" className="hover:text-[#00ff88] transition-colors">Welcome Code: NEXUS20</a></li>
            </ul>
          </div>

          {/* Security / Trust */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-['Orbitron']">
              Encrypted Rails
            </h4>
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">Visa / Mastercard</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">Apple Pay</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">PayPal</span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300">Bitcoin / USDT</span>
            </div>
            <p className="text-[11px] text-emerald-300/60 flex items-center gap-1 font-mono">
              <Lock className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>Bank-Grade 256-bit SSL Data Encryption</span>
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-400/50 gap-4 font-mono">
          <p>© {new Date().getFullYear()} NEXUS VAULT Inc. All rights reserved. Gaming trademarks belong to their respective owners.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
