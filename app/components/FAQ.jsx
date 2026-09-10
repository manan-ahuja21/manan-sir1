"use client";

import React, { useState } from "react";
import { faqData } from "@/data/faq";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="relative py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#00ff88]" />
            <span className="font-mono">// KNOWLEDGE BASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-['Orbitron'] text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-sm text-emerald-100/70 mt-2">
            Everything you need to know about purchasing, redeeming, and safety guarantees.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-gradient-to-b from-[#051f15]/70 to-[#020b08]/80 border border-emerald-500/20 backdrop-blur-xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 text-white hover:text-[#00ff88] transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold font-['Orbitron']">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-xl bg-white/5 border border-emerald-500/20 transform transition-transform duration-200 ${isOpen ? "rotate-180 bg-emerald-500/20 text-[#00ff88]" : "text-emerald-400"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-emerald-100/70 leading-relaxed border-t border-emerald-500/10 pt-3 animate-fadeIn font-normal">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
