import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Offering, Product } from "@/data/catalog";

type CartLine = Product & { quantity: number };
type Booking = { item: Offering; kind: "event" | "auto" };

type PlatformContextValue = {
  cart: CartLine[];
  cartOpen: boolean;
  searchOpen: boolean;
  booking: Booking | null;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setBooking: (booking: Booking | null) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const value = useMemo<PlatformContextValue>(() => ({
    cart,
    cartOpen,
    searchOpen,
    booking,
    setCartOpen,
    setSearchOpen,
    setBooking,
    addToCart: (product) => {
      setCart((current) => {
        const existing = current.find((line) => line.id === product.id);
        return existing
          ? current.map((line) => line.id === product.id ? { ...line, quantity: line.quantity + 1 } : line)
          : [...current, { ...product, quantity: 1 }];
      });
      setCartOpen(true);
    },
    removeFromCart: (id) => setCart((current) => current.filter((line) => line.id !== id)),
    clearCart: () => setCart([]),
  }), [booking, cart, cartOpen, searchOpen]);

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) throw new Error("usePlatform must be used inside PlatformProvider");
  return context;
}
