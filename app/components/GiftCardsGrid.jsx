"use client";

import React, { useState } from "react";
import { giftCardsData, platformCategories } from "@/data/giftCards";
import GiftCardCard from "./GiftCardCard";
import { Search, SlidersHorizontal, Sparkles, Gamepad } from "lucide-react";

export default function GiftCardsGrid({ searchTerm, onSearchChange }) {
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [sortBy, setSortBy] = useState("popular");

  // Filtering
  const filteredCards = giftCardsData
    .filter((card) => {
      const matchPlatform = selectedPlatform === "all" || card.platform.toLowerCase() === selectedPlatform.toLowerCase();
      const matchSearch =
        !searchTerm ||
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchPlatform && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "popular") return b.reviewsCount - a.reviewsCount;
      if (sortBy === "discount") return b.denominations[0].discount - a.denominations[0].discount;
      if (sortBy === "price-low") return a.denominations[0].price - b.denominations[0].price;
      if (sortBy === "price-high") return b.denominations[0].price - a.denominations[0].price;
      return 0;
    });

  return (
    <section id="gift-cards" className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
              <span className="font-mono uppercase">// OFFICIAL DIGITAL INVENTORY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-white">
              GIFT CARDS CATALOG
            </h2>
            <p className="text-sm text-emerald-100/70 mt-2 max-w-xl">
              Choose your platform, select your balance amount, and receive verified digital redemption keys instantly.
            </p>
          </div>

          {/* Sort Filter Selector */}
          <div className="flex items-center gap-3 font-mono">
            <span className="text-xs font-semibold text-emerald-300/70 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#00ff88]" /> SORT:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#04140e] border border-emerald-500/30 rounded-xl px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-[#00ff88] cursor-pointer backdrop-blur-md"
            >
              <option value="popular">Most Popular</option>
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Platform Categories Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {platformCategories.map((cat) => {
            const isSelected = selectedPlatform.toLowerCase() === cat.id.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedPlatform(cat.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black font-['Orbitron'] uppercase tracking-wider whitespace-nowrap transition-all duration-200 flex items-center gap-2 border ${
                  isSelected
                    ? "bg-gradient-to-r from-[#00ff88] to-emerald-500 text-black border-[#00ff88] shadow-[0_0_20px_rgba(0,255,136,0.5)]"
                    : "bg-[#04140e]/70 text-emerald-200 border-emerald-500/20 hover:bg-emerald-500/20 hover:text-white"
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Grid Display */}
        {filteredCards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCards.map((card) => (
              <GiftCardCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center rounded-3xl bg-[#04140e]/60 border border-emerald-500/20 backdrop-blur-xl">
            <Gamepad className="w-12 h-12 text-emerald-500/50 mx-auto mb-3 animate-pulse" />
            <h3 className="text-lg font-bold text-white font-['Orbitron']">No gaming cards found</h3>
            <p className="text-xs text-emerald-200/60 mt-1 max-w-sm mx-auto">
              No cards matched your filter or search "{searchTerm}". Try clearing search keywords or selecting "All Platforms".
            </p>
            <button
              onClick={() => {
                setSelectedPlatform("all");
                if (onSearchChange) onSearchChange("");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-emerald-500/20 text-[#00ff88] border border-emerald-500/40 text-xs font-bold hover:bg-[#00ff88] hover:text-black transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
