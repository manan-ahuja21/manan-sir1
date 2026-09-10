"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast() {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === "success";
        const isError = toast.type === "error";

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto transform transition-all duration-300 ease-out flex items-start gap-3.5 p-4 rounded-2xl backdrop-blur-2xl border shadow-2xl ${
              isSuccess
                ? "bg-slate-900/90 border-emerald-500/40 text-emerald-100 shadow-emerald-950/40"
                : isError
                ? "bg-slate-900/90 border-rose-500/40 text-rose-100 shadow-rose-950/40"
                : "bg-slate-900/90 border-cyan-500/40 text-cyan-100 shadow-cyan-950/40"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {isSuccess ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : isError ? (
                <AlertCircle className="w-5 h-5 text-rose-400" />
              ) : (
                <Info className="w-5 h-5 text-cyan-400" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {toast.title}
              </p>
              <p className="text-sm font-medium text-slate-100 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
