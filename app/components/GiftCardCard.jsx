"use client";

import React, { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { Zap, ShoppingBag, Star, ShieldCheck, Check } from "lucide-react";

export default function GiftCardCard({ card }) {
  const { addToCart, formatPrice } = useCart();
  const [selectedDenom, setSelectedDenom] = useState(card.denominations[0]);
  const [isAdded, setIsAdded] = useState(false);

  // 3D Tilt interaction
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glintPos, setGlintPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 8;
    const rotY = ((x - centerX) / centerX) * 8;

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

  const handleAdd = () => {
    addToCart(card, selectedDenom);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <div
      className="perspective-1000 group h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0px)`,
          transition: "transform 0.15s ease-out, border-color 0.3s ease, box-shadow 0.3s ease",
        }}
        className="relative h-full flex flex-col justify-between rounded-3xl bg-gradient-to-b from-[#062016]/85 via-[#03150e]/90 to-[#010906]/95 border border-emerald-500/20 hover:border-[#00ff88] backdrop-blur-2xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,255,136,0.25)] overflow-hidden"
      >
        
        {/* Holographic Specular Glint */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-40 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: `radial-gradient(circle 240px at ${glintPos.x}% ${glintPos.y}%, rgba(0,255,136,0.8), transparent 70%)`,
          }}
        />

        {/* Ambient Top Glow Line */}
        <div 
          className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity"
          style={{ background: `linear-gradient(90deg, transparent, ${card.accentColor}, transparent)` }}
        />

        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span
              className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-xl text-black font-['Orbitron'] shadow-sm"
              style={{ backgroundColor: card.accentColor }}
            >
              {card.platform}
            </span>

            <div className="flex items-center gap-1.5">
              <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-lg">
                <Star className="w-3 h-3 fill-amber-300" />
                {card.rating}
              </span>
              <span className="text-[10px] text-emerald-300/60 font-medium">
                ({card.reviewsCount})
              </span>
            </div>
          </div>

          {/* Card Title & Description */}
          <h3 className="text-xl font-black font-['Orbitron'] text-white group-hover:text-[#00ff88] transition-colors">
            {card.name}
          </h3>

          <p className="text-xs text-emerald-100/70 mt-2 line-clamp-2 leading-relaxed font-normal">
            {card.description}
          </p>

          {/* Denomination Selector Pills */}
          <div className="mt-5 mb-4">
            <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300/70 mb-2 uppercase tracking-wider font-mono">
              <span>VALUE:</span>
              <span className="text-[#00ff88]">SAVE {selectedDenom.discount}%</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {card.denominations.map((denom) => {
                const isSelected = selectedDenom.amount === denom.amount;
                return (
                  <button
                    key={denom.amount}
                    onClick={() => setSelectedDenom(denom)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold font-['Orbitron'] transition-all flex flex-col items-center justify-center border ${
                      isSelected
                        ? "bg-[#00ff88] text-black border-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.6)] font-black"
                        : "bg-emerald-950/40 text-emerald-200 border-emerald-500/20 hover:bg-emerald-500/20 hover:text-white"
                    }`}
                  >
                    <span>${denom.amount}</span>
                    <span className={`text-[9px] font-sans ${isSelected ? "text-black font-extrabold" : "text-[#00ff88]"}`}>
                      -{denom.discount}%
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-1.5 py-2 font-mono">
            <span className="text-[10px] font-semibold bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-[#00ff88]" /> Instant Email
            </span>
            <span className="text-[10px] font-semibold bg-emerald-950/50 border border-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md flex items-center gap-1">
              <ShieldCheck className="w-2.5 h-2.5 text-[#00ff88]" /> {card.region}
            </span>
          </div>
        </div>

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-4 mt-4 border-t border-emerald-500/20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] text-emerald-300/50 line-through">
              {formatPrice(selectedDenom.amount)}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black font-['Orbitron'] text-white">
                {formatPrice(selectedDenom.price)}
              </span>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className={`flex items-center gap-2 text-xs sm:text-sm font-black font-['Orbitron'] px-4 py-2.5 rounded-xl transition-all duration-200 shadow-lg ${
              isAdded
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                : "bg-gradient-to-r from-[#00ff88] to-teal-500 hover:from-[#26ff98] hover:to-teal-400 text-black shadow-[0_0_15px_rgba(0,255,136,0.35)] hover:shadow-[0_0_25px_rgba(0,255,136,0.65)]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 text-black" />
                <span>ADDED!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-black" />
                <span>ADD TO CART</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
