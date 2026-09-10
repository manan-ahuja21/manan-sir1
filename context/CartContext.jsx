"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

const CURRENCIES = {
  USD: { symbol: "$", rate: 1.0, label: "USD ($)" },
  EUR: { symbol: "€", rate: 0.92, label: "EUR (€)" },
  GBP: { symbol: "£", rate: 0.79, label: "GBP (£)" },
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [toasts, setToasts] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("nexus_vault_cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nexus_vault_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const addToast = (message, type = "success", title = "Notification") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (card, selectedDenom) => {
    const denom = selectedDenom || card.denominations[0];
    const cartItemId = `${card.id}-${denom.amount}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        addToast(`Increased quantity for ${card.name} ($${denom.amount})`, "info", "Cart Updated");
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        addToast(`Added ${card.name} ($${denom.amount}) to your cart`, "success", "Item Added");
        return [
          ...prev,
          {
            cartItemId,
            id: card.id,
            name: card.name,
            platform: card.platform,
            accentColor: card.accentColor,
            glowColor: card.glowColor,
            denomination: denom.amount,
            originalPrice: denom.amount,
            price: denom.price,
            discount: denom.discount,
            quantity: 1,
          },
        ];
      }
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast("Item removed from cart", "info", "Removed");
  };

  const updateQuantity = (cartItemId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === "NEXUS20") {
      setAppliedCoupon({ code: "NEXUS20", discountPercent: 20, name: "20% Flash Coupon" });
      addToast("Coupon NEXUS20 applied for 20% off your total!", "success", "Discount Unlocked");
      return { success: true, message: "20% off applied!" };
    } else if (cleanCode === "STEAM25NEXUS") {
      setAppliedCoupon({ code: "STEAM25NEXUS", discountPercent: 25, name: "25% Steam Mega Promo" });
      addToast("Coupon STEAM25NEXUS applied for 25% off!", "success", "Discount Unlocked");
      return { success: true, message: "25% off applied!" };
    } else if (cleanCode === "ULTIMATE50X") {
      setAppliedCoupon({ code: "ULTIMATE50X", discountPercent: 50, name: "50% Ultimate Pass Discount" });
      addToast("50% Super Coupon applied!", "success", "Massive Discount");
      return { success: true, message: "50% off applied!" };
    } else if (cleanCode === "PSPLUS30VIP") {
      setAppliedCoupon({ code: "PSPLUS30VIP", discountPercent: 30, name: "30% PSN VIP Promo" });
      addToast("30% PSN VIP coupon applied!", "success", "Discount Unlocked");
      return { success: true, message: "30% off applied!" };
    } else {
      addToast("Invalid or expired coupon code. Try 'NEXUS20'", "error", "Invalid Code");
      return { success: false, message: "Invalid promo code" };
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    addToast("Promo discount removed", "info", "Coupon Removed");
  };

  const formatPrice = (usdAmount) => {
    const curr = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = (usdAmount * curr.rate).toFixed(2);
    return `${curr.symbol}${converted}`;
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = appliedCoupon ? (subtotal * (appliedCoupon.discountPercent / 100)) : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        currency,
        setCurrency,
        currencies: CURRENCIES,
        formatPrice,
        subtotal,
        discountAmount,
        total,
        totalItemsCount,
        couponCode,
        setCouponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        toasts,
        addToast,
        removeToast,
        isCheckoutOpen,
        setIsCheckoutOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
