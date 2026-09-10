"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { 
  ShoppingBag, 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Ticket, 
  ShieldCheck, 
  Zap, 
  CheckCircle2,
  Sparkles
} from "lucide-react";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    total,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState("");

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!inputCode) return;
    const res = applyCoupon(inputCode);
    if (res.success) {
      setInputCode("");
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Frosted Overlay */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#030d08]/95 backdrop-blur-2xl border-l border-emerald-500/25 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[#00ff88]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black font-['Orbitron'] text-white tracking-wider">
                  VAULT CART
                </h3>
                <span className="text-[11px] text-emerald-300/60 font-mono">
                  {cart.length} items ({cart.reduce((a, b) => a + b.quantity, 0)} keys queued)
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-emerald-300/60 hover:text-[#00ff88] hover:bg-emerald-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center">
                <div className="w-16 h-16 rounded-3xl bg-emerald-950/40 border border-emerald-500/20 flex items-center justify-center text-emerald-500/50 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-white font-['Orbitron']">Your Vault Cart is empty</h4>
                <p className="text-xs text-emerald-200/60 mt-1 max-w-xs">
                  Browse our high-discount gift cards or claim a promo voucher to get started.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-5 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-[#00ff88] border border-emerald-500/40 text-xs font-black font-['Orbitron'] hover:bg-[#00ff88] hover:text-black transition-all"
                >
                  EXPLORE GAMING DEALS
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="p-4 rounded-2xl bg-[#04140d]/80 border border-emerald-500/20 backdrop-blur-md flex gap-3.5 items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[9px] font-black uppercase px-2 py-0.5 rounded text-black font-['Orbitron']"
                        style={{ backgroundColor: item.accentColor || "#00ff88" }}
                      >
                        {item.platform}
                      </span>
                      <span className="text-xs font-bold text-white truncate font-['Orbitron']">
                        ${item.denomination} Card
                      </span>
                    </div>

                    <p className="text-xs text-emerald-100/80 truncate font-medium">
                      {item.name}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs font-black font-['Orbitron'] text-[#00ff88]">
                        {formatPrice(item.price)}
                      </span>
                      {item.discount > 0 && (
                        <span className="text-[10px] text-emerald-400 font-bold">
                          (-{item.discount}%)
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Modifier & Remove */}
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-emerald-400/40 hover:text-rose-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-1.5 bg-[#020a06] border border-emerald-500/30 rounded-xl px-2 py-1">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="text-emerald-300/70 hover:text-white p-0.5"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white w-4 text-center font-mono">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="text-emerald-300/70 hover:text-white p-0.5"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer / Promo Box / Checkout */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-emerald-500/20 bg-[#020906]/95 backdrop-blur-xl space-y-4">
              
              {/* Promo Code Box */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00ff88]" />
                    <span className="text-[#00ff88] font-black font-mono">
                      {appliedCoupon.code} (-{appliedCoupon.discountPercent}%)
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-emerald-300/60 hover:text-rose-400 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      placeholder="Promo code (e.g. NEXUS20)"
                      className="w-full bg-[#030d08] border border-emerald-500/30 rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-emerald-300/40 focus:outline-none focus:border-[#00ff88] font-mono"
                    />
                    <Ticket className="w-3.5 h-3.5 text-emerald-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-emerald-500/20 hover:bg-[#00ff88] text-[#00ff88] hover:text-black border border-emerald-500/40 text-xs font-black font-['Orbitron'] transition-all"
                  >
                    APPLY
                  </button>
                </form>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-emerald-300/70">
                  <span>SUBTOTAL</span>
                  <span className="text-white font-medium">{formatPrice(subtotal)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-[#00ff88] font-bold">
                    <span>VOUCHER DISCOUNT</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-emerald-300/70">
                  <span>DELIVERY FEE</span>
                  <span className="text-[#00ff88] font-bold">FREE (Instant 5-sec)</span>
                </div>
                <div className="pt-2 border-t border-emerald-500/20 flex justify-between items-baseline font-['Orbitron']">
                  <span className="text-sm font-bold text-white">TOTAL DUE</span>
                  <span className="text-xl font-black text-white">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#00ff88] via-emerald-500 to-teal-500 hover:from-[#26ff98] hover:to-teal-400 text-black font-black font-['Orbitron'] tracking-wider text-sm shadow-[0_0_25px_rgba(0,255,136,0.45)] transition-all flex items-center justify-center gap-2"
              >
                <span>PROCEED TO CHECKOUT</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-300/60 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
                <span>256-Bit SSL Encrypted • Instant Dispatch</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
