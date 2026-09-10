import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Toast from "@/app/components/Toast";
import CartDrawer from "@/app/components/CartDrawer";
import CheckoutModal from "@/app/components/CheckoutModal";
import BackgroundOrbs from "@/app/components/BackgroundOrbs";

export const metadata = {
  title: "NEXUS VAULT | Gaming Gift Cards & Verified Coupon Codes",
  description: "Instant delivery gaming gift cards, Steam wallet codes, PlayStation, Xbox, and exclusive gamer discount vouchers with up to 60% off.",
  keywords: ["gaming coupons", "game gift cards", "steam wallet codes", "playstation network", "xbox game pass", "valorant riot points", "roblox robux", "gaming deals"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#060813] text-slate-100 min-h-screen relative antialiased selection:bg-indigo-500/30 selection:text-white">
        <CartProvider>
          {/* Ambient Glowing Glass Mesh & Background Orbs */}
          <BackgroundOrbs />
          
          {/* Main Layout Container */}
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>

          {/* Global Interactive Drawers & Overlays */}
          <CartDrawer />
          <CheckoutModal />
          <Toast />
        </CartProvider>
      </body>
    </html>
  );
}
