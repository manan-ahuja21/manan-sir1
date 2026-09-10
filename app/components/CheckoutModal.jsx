"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Zap, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles,
  Lock,
  Mail
} from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, total, formatPrice, clearCart, addToast } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedKeys, setGeneratedKeys] = useState([]);
  const [copiedKeyIndex, setCopiedKeyIndex] = useState(null);

  if (!isCheckoutOpen) return null;

  const handlePay = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      addToast("Please enter an email address for digital code dispatch.", "error", "Email Required");
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const keys = cart.map((item) => ({
        id: item.cartItemId,
        name: item.name,
        platform: item.platform,
        denomination: item.denomination,
        key: `${item.platform.slice(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      }));

      setGeneratedKeys(keys);
      setIsProcessing(false);
      setIsComplete(true);
      clearCart();

      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#00ff88', '#10b981', '#a3e635', '#ffffff']
        });
      } catch (err) {}
    }, 1800);
  };

  const copyKey = (keyString, idx) => {
    navigator.clipboard.writeText(keyString);
    setCopiedKeyIndex(idx);
    addToast("Key copied to clipboard!", "success", "Code Copied");
    setTimeout(() => setCopiedKeyIndex(null), 2000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setIsComplete(false);
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Frosted Backdrop */}
      <div 
        onClick={handleClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#062016]/95 to-[#020b08]/95 border border-emerald-500/35 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl z-10 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-emerald-300/60 hover:text-[#00ff88] hover:bg-emerald-500/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isComplete ? (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[#00ff88]">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-black font-['Orbitron'] text-white">
                  SECURE VAULT CHECKOUT
                </h3>
                <p className="text-xs text-emerald-200/70 font-mono">
                  TOTAL ORDER: <strong className="text-[#00ff88] font-bold">{formatPrice(total)}</strong>
                </p>
              </div>
            </div>

            <form onSubmit={handlePay} className="space-y-4">
              
              {/* Email Input */}
              <div>
                <label className="block text-xs font-bold text-emerald-200/80 mb-1.5 uppercase tracking-wider font-mono">
                  DELIVERY EMAIL ADDRESS
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-gamer-email@example.com"
                    required
                    className="w-full bg-[#030d08] border border-emerald-500/30 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#00ff88]"
                  />
                  <Mail className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
                <span className="text-[10px] text-emerald-300/60 mt-1 block font-mono">
                  Keys will display on screen and send to this email in 5s.
                </span>
              </div>

              {/* Payment Rail */}
              <div>
                <label className="block text-xs font-bold text-emerald-200/80 mb-1.5 uppercase tracking-wider font-mono">
                  PAYMENT METHOD
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { id: "card", label: "Credit Card", icon: "💳" },
                    { id: "crypto", label: "Crypto / BTC", icon: "⚡" },
                    { id: "paypal", label: "Apple / PayPal", icon: "🍏" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`p-3 rounded-xl border text-xs font-bold font-['Orbitron'] transition-all flex flex-col items-center gap-1 ${
                        paymentMethod === m.id
                          ? "bg-emerald-500/20 border-[#00ff88] text-[#00ff88] shadow-[0_0_15px_rgba(0,255,136,0.4)]"
                          : "bg-[#020a06] border-emerald-500/20 text-emerald-300/60 hover:bg-emerald-500/10 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{m.icon}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Simulated Card Form */}
              {paymentMethod === "card" && (
                <div className="space-y-2.5 p-3.5 rounded-2xl bg-[#020906] border border-emerald-500/20">
                  <div>
                    <input
                      type="text"
                      placeholder="Card Number (4242 •••• •••• 4242)"
                      defaultValue="4242 •••• •••• 4242"
                      className="w-full bg-[#030e09] border border-emerald-500/20 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none font-mono"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      defaultValue="12/28"
                      className="bg-[#030e09] border border-emerald-500/20 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none font-mono"
                    />
                    <input
                      type="password"
                      placeholder="CVC"
                      defaultValue="888"
                      className="bg-[#030e09] border border-emerald-500/20 rounded-xl px-3 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Pay Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00ff88] via-emerald-500 to-teal-500 hover:from-[#26ff98] hover:to-teal-400 text-black font-black font-['Orbitron'] tracking-wider text-sm shadow-[0_0_25px_rgba(0,255,136,0.45)] transition-all flex items-center justify-center gap-2 mt-4"
              >
                {isProcessing ? (
                  <>
                    <Zap className="w-4 h-4 text-black animate-spin" />
                    <span>AUTHORIZING ENCRYPTED TRANSACTION...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-black" />
                    <span>PAY {formatPrice(total)} & UNLOCK KEYS</span>
                  </>
                )}
              </button>

            </form>
          </div>
        ) : (
          /* Instant Success Screen */
          <div className="text-center py-2 space-y-5">
            <div className="w-14 h-14 rounded-3xl bg-emerald-500/20 border border-emerald-500/40 text-[#00ff88] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(0,255,136,0.6)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-black font-['Orbitron'] text-white">
                ORDER DISPATCHED!
              </h3>
              <p className="text-xs text-emerald-100/70 mt-1">
                Your official gaming keys are unlocked below and dispatched to <strong className="text-[#00ff88]">{email}</strong>.
              </p>
            </div>

            {/* Keys Display */}
            <div className="space-y-2.5 max-h-60 overflow-y-auto text-left">
              {generatedKeys.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#020b06] border border-emerald-500/40 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1.5 mb-1 font-['Orbitron']">
                      <span className="text-[10px] uppercase font-bold text-emerald-300/70">
                        {item.platform} • ${item.denomination}
                      </span>
                    </div>
                    <span className="font-mono text-xs sm:text-sm font-black text-[#00ff88] tracking-wider">
                      {item.key}
                    </span>
                  </div>

                  <button
                    onClick={() => copyKey(item.key, idx)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-[#00ff88] text-emerald-200 hover:text-black text-xs font-bold transition-all font-mono"
                  >
                    {copiedKeyIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-black" />
                        <span className="text-black font-bold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#00ff88]" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-[#00ff88] border border-emerald-500/40 text-xs font-black font-['Orbitron'] transition-all"
            >
              DONE & RETURN TO STORE
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
