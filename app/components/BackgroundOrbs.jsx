"use client";

import React from "react";

export default function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Obsidian Carbon Base */}
      <div className="absolute inset-0 bg-[#030706]" />

      {/* Cyber Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.045]" 
        style={{
          backgroundImage: `linear-gradient(to right, #00ff88 1px, transparent 1px), linear-gradient(to bottom, #00ff88 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Top Left - Razer/Cyber Emerald Neon Orb */}
      <div 
        className="absolute -top-28 -left-28 w-[600px] h-[600px] rounded-full bg-emerald-500/25 blur-[140px] animate-pulse-green"
        style={{ animationDuration: '9s' }}
      />

      {/* Top Center-Right - Cyber Lime / Matrix Neon Glow */}
      <div 
        className="absolute top-0 right-10 w-[550px] h-[550px] rounded-full bg-[#00ff88]/20 blur-[150px] animate-pulse-green"
        style={{ animationDuration: '11s', animationDelay: '2s' }}
      />

      {/* Center - Deep Stealth Teal / Cyan Plasma */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[750px] h-[500px] rounded-full bg-teal-500/15 blur-[160px] animate-pulse-green"
        style={{ animationDuration: '14s', animationDelay: '4s' }}
      />

      {/* Middle-Right - Electric Lime / Mint Glow */}
      <div 
        className="absolute top-2/3 -right-28 w-[500px] h-[500px] rounded-full bg-lime-500/15 blur-[140px] animate-pulse-green"
        style={{ animationDuration: '10s', animationDelay: '1s' }}
      />

      {/* Bottom Left - Dark Forest Cyber Green */}
      <div 
        className="absolute -bottom-24 left-12 w-[600px] h-[600px] rounded-full bg-green-500/20 blur-[150px] animate-pulse-green"
        style={{ animationDuration: '12s', animationDelay: '3s' }}
      />

      {/* Ambient Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,6,0.85)_100%)]" />
    </div>
  );
}
