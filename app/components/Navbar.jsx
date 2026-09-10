"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { 
  Gamepad2, 
  ShoppingBag, 
  Search, 
  Flame, 
  Ticket, 
  Gift, 
  HelpCircle, 
  ShieldCheck, 
  Menu, 
  X,
  Sparkles,
  ChevronDown,
  Terminal,
  Zap
} from "lucide-react";

export default function Navbar({ onSearchChange, searchTerm }) {
  const { totalItemsCount, setIsCartOpen, currency, setCurrency, currencies } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all duration-300">
      <div 
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 border ${
          isScrolled 
            ? "bg-[#040e0a]/85 backdrop-blur-2xl border-emerald-500/30 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(0,255,136,0.15)] py-2.5 px-4 sm:px-6" 
            : "bg-[#06140e]/60 backdrop-blur-xl border-emerald-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.5)] py-3 px-4 sm:px-6"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo with Cyber Green Glow */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00ff88] via-emerald-500 to-teal-400 p-[1.5px] shadow-[0_0_20px_rgba(0,255,136,0.45)] group-hover:shadow-[0_0_35px_rgba(0,255,136,0.8)] transition-all duration-300">
              <div className="w-full h-full bg-[#030906] rounded-[10px] flex items-center justify-center">
                <Gamepad2 className="w-5 h-5 text-[#00ff88] group-hover:scale-115 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-['Orbitron'] font-black tracking-wider text-lg sm:text-xl text-white flex items-center gap-1.5">
                NEXUS<span className="text-[#00ff88] drop-shadow-[0_0_10px_rgba(0,255,136,0.6)]">VAULT</span>
                <span className="w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_#00ff88] animate-pulse" />
              </span>
              <span className="text-[9px] tracking-widest text-emerald-400/80 font-bold uppercase -mt-1 font-mono">
                // GAMING KEYS & CODES
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <a 
              href="#flash-deals" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#00ff88] rounded-xl hover:bg-emerald-500/10 transition-all group"
            >
              <Flame className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Flash Deals</span>
              <span className="bg-emerald-500/20 text-[#00ff88] border border-emerald-500/40 text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow-[0_0_8px_rgba(0,255,136,0.3)]">
                -60%
              </span>
            </a>

            <a 
              href="#gift-cards" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#00ff88] rounded-xl hover:bg-emerald-500/10 transition-all group"
            >
              <Gift className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>Gift Cards</span>
            </a>

            <a 
              href="#coupons" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#00ff88] rounded-xl hover:bg-emerald-500/10 transition-all group"
            >
              <Ticket className="w-4 h-4 text-lime-400 group-hover:scale-110 transition-transform" />
              <span>Promo Vouchers</span>
            </a>

            <a 
              href="#how-it-works" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#00ff88] rounded-xl hover:bg-emerald-500/10 transition-all group"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>How It Works</span>
            </a>

            <a 
              href="#faq" 
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs lg:text-sm font-semibold text-slate-200 hover:text-[#00ff88] rounded-xl hover:bg-emerald-500/10 transition-all group"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 group-hover:scale-110 transition-transform" />
              <span>FAQ</span>
            </a>
          </nav>

          {/* Quick Search & Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Search Input */}
            <div className="relative hidden lg:block w-48 xl:w-56">
              <input
                type="text"
                placeholder="Search Steam, Xbox, Razer..."
                value={searchTerm || ""}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full bg-[#04120c]/80 backdrop-blur-md border border-emerald-500/25 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-emerald-200/40 focus:outline-none focus:border-[#00ff88] focus:ring-1 focus:ring-[#00ff88] transition-all font-medium"
              />
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* Currency Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 bg-[#051a11]/60 hover:bg-[#082619] border border-emerald-500/25 rounded-xl px-2.5 py-1.5 text-xs font-bold text-emerald-200 transition-all"
              >
                <span>{currency}</span>
                <ChevronDown className="w-3.5 h-3.5 text-emerald-400" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-28 bg-[#04140e]/95 backdrop-blur-2xl border border-emerald-500/30 rounded-xl shadow-2xl py-1 z-50 overflow-hidden"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {Object.keys(currencies).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-emerald-500/20 transition-colors ${
                        currency === curr ? "text-[#00ff88] font-bold bg-emerald-500/10" : "text-slate-300"
                      }`}
                    >
                      <span>{curr}</span>
                      <span className="text-[11px] text-emerald-400 font-mono">{currencies[curr].symbol}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Button with Glowing Neon Counter */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-emerald-500/20 via-teal-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-teal-500/30 border border-emerald-400/40 hover:border-[#00ff88] rounded-xl px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white shadow-[0_0_15px_rgba(0,255,136,0.2)] hover:shadow-[0_0_25px_rgba(0,255,136,0.4)] transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-[#00ff88] group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-['Orbitron'] text-xs tracking-wider">VAULT CART</span>
              
              {totalItemsCount > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-gradient-to-r from-[#00ff88] to-emerald-500 text-black text-[11px] font-black rounded-full shadow-[0_0_12px_rgba(0,255,136,0.8)] animate-bounce">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center p-2 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-[#00ff88]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-emerald-500/20 flex flex-col gap-2 pb-2">
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search games, cards, vouchers..."
                value={searchTerm || ""}
                onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
                className="w-full bg-[#04120c] border border-emerald-500/30 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#00ff88]"
              />
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <a
              href="#flash-deals"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-[#00ff88]"
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Flash Deals (-60%)</span>
            </a>
            <a
              href="#gift-cards"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-[#00ff88]"
            >
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>Gift Cards Catalog</span>
            </a>
            <a
              href="#coupons"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-[#00ff88]"
            >
              <Ticket className="w-4 h-4 text-lime-400" />
              <span>Promo Codes & Vouchers</span>
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-[#00ff88]"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>How It Works & Safety</span>
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold text-slate-200 hover:bg-emerald-500/20 hover:text-[#00ff88]"
            >
              <HelpCircle className="w-4 h-4 text-slate-400" />
              <span>Frequently Asked Questions</span>
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
