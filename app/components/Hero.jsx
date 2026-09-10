"use client";

import React, { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Check, 
  Copy, 
  Star, 
  ShoppingBag,
  TrendingUp,
  Percent,
  Gamepad2
} from "lucide-react";
import confetti from "canvas-confetti";

export default function Hero() {
  const { addToCart, addToast, formatPrice } = useCart();
  const [copied, setCopied] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState("steam");

  // 3D Card mouse tilt physics
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });

  const heroShowcaseCards = {
    steam: {
      id: "steam-wallet",
      name: "Steam Wallet Card",
      platform: "Steam",
      denomination: 50,
      price: 41.99,
      discount: 16,
      accentColor: "#00ff88",
      bgGradient: "from-[#052618]/90 via-[#03170e]/95 to-[#010905]/95",
      glow: "rgba(0, 255, 136, 0.5)",
      badge: "Bestseller",
      serial: "STEAM-XXXX-99X8-44LP",
      code: "STEAM25NEXUS"
    },
    razer: {
      id: "razer-gold",
      name: "Razer Gold Global PIN",
      platform: "Razer Gold",
      denomination: 50,
      price: 41.00,
      discount: 18,
      accentColor: "#00ff88",
      bgGradient: "from-[#062c1d]/90 via-[#041a11]/95 to-[#020b08]/95",
      glow: "rgba(0, 255, 136, 0.55)",
      badge: "Chroma Tier",
      serial: "RAZER-GOLD-8822-11KL",
      code: "RAZER20CHROMA"
    },
    xbox: {
      id: "xbox-game-pass",
      name: "Xbox Game Pass Ultimate",
      platform: "Xbox",
      denomination: 50,
      price: 39.99,
      discount: 20,
      accentColor: "#22c55e",
      bgGradient: "from-[#052617]/90 via-[#041910]/95 to-[#020a07]/95",
      glow: "rgba(34, 197, 94, 0.5)",
      badge: "50% Off 1st Mo",
      serial: "XBOX-PASS-9900-3321",
      code: "ULTIMATE50X"
    },
    psn: {
      id: "playstation-network",
      name: "PlayStation Store PSN",
      platform: "PlayStation",
      denomination: 50,
      price: 42.00,
      discount: 16,
      accentColor: "#10b981",
      bgGradient: "from-[#04241d]/90 via-[#031713]/95 to-[#020a08]/95",
      glow: "rgba(16, 185, 129, 0.5)",
      badge: "Hot Deal",
      serial: "PSN-77QA-99PL-22MK",
      code: "PSPLUS30VIP"
    }
  };

  const currentHero = heroShowcaseCards[activeHeroTab];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12;
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlintPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  const copyPromo = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(currentHero.code);
    setCopied(true);
    addToast(`Voucher "${currentHero.code}" copied to clipboard!`, "success", "Coupon Ready");
    
    // Green & Gold confetti burst
    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.6 },
        colors: ['#00ff88', '#10b981', '#a3e635', '#2dd4bf', '#ffffff']
      });
    } catch (err) {}

    setTimeout(() => setCopied(false), 2500);
  };

  const handleAddHeroCard = () => {
    addToCart(
      {
        id: currentHero.id,
        name: currentHero.name,
        platform: currentHero.platform,
        accentColor: currentHero.accentColor,
        glowColor: currentHero.glow,
        denominations: [{ amount: currentHero.denomination, price: currentHero.price, discount: currentHero.discount }],
      },
      { amount: currentHero.denomination, price: currentHero.price, discount: currentHero.discount }
    );
  };

  return (
    <section className="relative pt-6 sm:pt-10 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
            
            {/* Top Gaming Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-xl shadow-[0_0_15px_rgba(0,255,136,0.25)]">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-ping" />
              <span className="text-white font-bold">NEXT-GEN LOOT ENGINE</span>
              <span className="w-1 h-1 rounded-full bg-emerald-400" />
              <span className="text-[#00ff88] font-mono font-bold">SAVE UP TO 60%</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-['Orbitron'] tracking-tight text-white leading-[1.12]">
              LEVEL UP YOUR PLAY. <br />
              <span className="text-gradient-green drop-shadow-[0_0_25px_rgba(0,255,136,0.3)]">
                INSTANT GAMING KEYS.
              </span> <br />
              ZERO MARKUPS.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-emerald-100/70 max-w-xl font-normal leading-relaxed">
              Buy verified <span className="text-white font-semibold">Steam, Xbox, Razer Gold & PlayStation</span> gift cards and unlock exclusive gaming vouchers. Delivered instantly to your screen and email within 5 seconds.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2 w-full sm:w-auto">
              <a
                href="#gift-cards"
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#00ff88] via-emerald-500 to-teal-500 hover:from-[#26ff98] hover:to-teal-400 text-black font-black px-6 py-3.5 rounded-xl shadow-[0_0_30px_rgba(0,255,136,0.45)] hover:shadow-[0_0_45px_rgba(0,255,136,0.75)] transition-all duration-300 text-sm sm:text-base group font-['Orbitron'] tracking-wider"
              >
                <span>EXPLORE CARDS</span>
                <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#coupons"
                className="flex items-center justify-center gap-2 bg-[#051a11]/80 hover:bg-[#09291b] border border-emerald-500/30 hover:border-[#00ff88] text-emerald-200 hover:text-white font-bold px-5 py-3.5 rounded-xl backdrop-blur-xl transition-all duration-300 text-sm sm:text-base group font-['Orbitron'] tracking-wider"
              >
                <Percent className="w-4 h-4 text-[#00ff88] group-hover:rotate-12 transition-transform" />
                <span>CLAIM VOUCHERS</span>
              </a>
            </div>

            {/* Trust Metrics Pill Bar */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 w-full border-t border-emerald-500/20 mt-6">
              <div className="flex flex-col">
                <span className="text-xl font-black font-['Orbitron'] text-white">250K+</span>
                <span className="text-xs text-emerald-300/60 font-medium">Codes Delivered</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-['Orbitron'] text-[#00ff88] drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]">⚡ 5 SEC</span>
                <span className="text-xs text-emerald-300/60 font-medium">Instant Dispatch</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-['Orbitron'] text-amber-300 flex items-center gap-1">
                  4.9 <Star className="w-4 h-4 fill-amber-300 text-amber-300" />
                </span>
                <span className="text-xs text-emerald-300/60 font-medium">TrustScore (12k+)</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-['Orbitron'] text-[#00ff88]">100%</span>
                <span className="text-xs text-emerald-300/60 font-medium">Official Partners</span>
              </div>
            </div>

          </div>

          {/* Right Hero Column: 3D Holographic Gaming Showcase Card */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            {/* Card Switcher Tabs */}
            <div className="flex items-center p-1 bg-[#04140e]/90 backdrop-blur-xl border border-emerald-500/30 rounded-2xl mb-4 gap-1 shadow-lg">
              {Object.keys(heroShowcaseCards).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveHeroTab(tab)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-xl uppercase tracking-wider font-['Orbitron'] transition-all duration-200 ${
                    activeHeroTab === tab
                      ? "bg-gradient-to-r from-[#00ff88] to-emerald-500 text-black shadow-[0_0_15px_rgba(0,255,136,0.5)] font-black"
                      : "text-emerald-300/70 hover:text-white hover:bg-emerald-500/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* 3D Tilt Card */}
            <div
              className="w-full max-w-md perspective-1000 cursor-pointer"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div
                ref={cardRef}
                style={{
                  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`,
                  transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
                  borderColor: "rgba(0, 255, 136, 0.35)",
                  boxShadow: `0 25px 50px -12px rgba(0,0,0,0.9), 0 0 40px ${currentHero.glow}`,
                }}
                className={`relative overflow-hidden rounded-3xl p-6 sm:p-7 border bg-gradient-to-br ${currentHero.bgGradient} backdrop-blur-2xl laser-glow-sweep`}
              >
                
                {/* Holographic Specular Glint */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 320px at ${glintPos.x}% ${glintPos.y}%, rgba(0,255,136,0.6), transparent 70%)`,
                  }}
                />

                {/* Card Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span 
                      className="px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-wider text-black font-['Orbitron'] shadow-sm bg-[#00ff88]"
                    >
                      {currentHero.platform}
                    </span>
                    <span className="text-xs font-bold text-[#00ff88] flex items-center gap-1 bg-emerald-950/70 border border-emerald-500/40 px-2 py-0.5 rounded-md">
                      <Zap className="w-3 h-3" /> 5-Sec Key
                    </span>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-[#00ff88] border border-emerald-500/40">
                    SAVE {currentHero.discount}%
                  </span>
                </div>

                {/* Title & Denom */}
                <div className="mb-6">
                  <h3 className="text-2xl font-black font-['Orbitron'] text-white tracking-wide">
                    {currentHero.name}
                  </h3>
                  <p className="text-xs text-emerald-200/70 mt-1 flex items-center gap-2 font-mono">
                    <span>REGION: <strong>GLOBAL</strong></span>
                    <span>•</span>
                    <span className="text-[#00ff88]">OFFICIAL PARTNER</span>
                  </p>
                </div>

                {/* Digital Key Barcode Preview */}
                <div className="p-3.5 rounded-2xl bg-[#020a06]/80 border border-emerald-500/30 backdrop-blur-md mb-6 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[9px] uppercase font-bold text-emerald-400/80 tracking-wider font-mono">
                      // DIGITAL VOUCHER SERIAL
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-[#00ff88] font-bold tracking-widest mt-0.5">
                      {currentHero.serial}
                    </span>
                  </div>

                  <button
                    onClick={copyPromo}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-[#00ff88] border border-emerald-500/30 hover:text-black text-xs font-bold text-emerald-200 transition-all group"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#00ff88]" /> : <Copy className="w-3.5 h-3.5 text-emerald-300" />}
                    <span>{copied ? "Copied!" : "Promo"}</span>
                  </button>
                </div>

                {/* Price & Action Row */}
                <div className="flex items-center justify-between pt-2 border-t border-emerald-500/20">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-emerald-300/50 line-through">
                      Valued at {formatPrice(currentHero.denomination)}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black font-['Orbitron'] text-white">
                        {formatPrice(currentHero.price)}
                      </span>
                      <span className="text-xs font-bold text-[#00ff88]">
                        (-{currentHero.discount}%)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleAddHeroCard}
                    className="flex items-center gap-2 bg-gradient-to-r from-[#00ff88] to-emerald-500 hover:from-[#26ff98] hover:to-emerald-400 text-black text-xs sm:text-sm font-black font-['Orbitron'] px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(0,255,136,0.4)] hover:shadow-[0_0_30px_rgba(0,255,136,0.7)] transition-all duration-200"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>ADD TO VAULT</span>
                  </button>
                </div>

              </div>
            </div>

            {/* Micro Helper Note */}
            <p className="text-[11px] text-emerald-400/70 mt-3 text-center flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
              <span>Hover card to activate 3D tilt & holographic sheen</span>
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
