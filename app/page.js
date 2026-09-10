"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/Navbar";
import Hero from "@/app/components/Hero";
import FlashDeals from "@/app/components/FlashDeals";
import GiftCardsGrid from "@/app/components/GiftCardsGrid";
import CouponsGrid from "@/app/components/CouponsGrid";
import HowItWorks from "@/app/components/HowItWorks";
import Testimonials from "@/app/components/Testimonials";
import FAQ from "@/app/components/FAQ";
import Newsletter from "@/app/components/Newsletter";
import Footer from "@/app/components/Footer";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    if (term) {
      const giftCardsEl = document.getElementById("gift-cards");
      if (giftCardsEl) {
        giftCardsEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Floating Glass Header */}
      <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Hero Section */}
      <Hero />

      {/* 24-Hour Flash Deals Banner & Grid */}
      <FlashDeals />

      {/* Gift Cards Catalog */}
      <GiftCardsGrid searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {/* Verified Promo Vouchers & Coupons */}
      <CouponsGrid />

      {/* How It Works 3-Step Guide */}
      <HowItWorks />

      {/* Verified Gamer Reviews & Trust */}
      <Testimonials />

      {/* FAQ Accordion */}
      <FAQ />

      {/* VIP Loot Club Email Signup */}
      <Newsletter />

      {/* Glass Footer */}
      <Footer />
    </main>
  );
}
