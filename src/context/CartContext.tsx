"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/types";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabase";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartCount: 0,
  totalPrice: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Handle Sync from DB or LocalStorage
  useEffect(() => {
    if (user) {
      // Fetch cart from Supabase
      const fetchCart = async () => {
        const { data, error } = await supabase
          .from("carts")
          .select("items")
          .eq("user_id", user.id)
          .single();

        if (data && !error) {
          setCartItems(data.items || []);
        } else {
          // If no cloud cart, maybe check local storage to migrate?
          const savedCart = localStorage.getItem("hacoo-cart");
          if (savedCart) {
            try {
              const parsed = JSON.parse(savedCart);
              if (parsed.length > 0) {
                setCartItems(parsed);
                // Upload to cloud
                await supabase.from("carts").upsert({ 
                  user_id: user.id, 
                  items: parsed 
                });
                localStorage.removeItem("hacoo-cart"); // Cleanup
              }
            } catch (e) {}
          } else {
             setCartItems([]);
          }
        }
      };

      fetchCart();
      
      // Realtime subscription? Optional, but here's how:
      const channel = supabase
        .channel(`public:carts:user_id=eq.${user.id}`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'carts',
          filter: `user_id=eq.${user.id}`
        }, (payload: any) => {
          if (payload.new) {
            setCartItems(payload.new.items || []);
          }
        })
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      // Not logged in: Use local storage
      const savedCart = localStorage.getItem("hacoo-cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error("Failed to parse cart", e);
        }
      } else {
        setCartItems([]);
      }
    }
  }, [user]);

  // Sync state to destination (DB or LocalStorage)
  const syncCart = async (items: CartItem[]) => {
    if (user) {
      await supabase.from("carts").upsert({ 
        user_id: user.id, 
        items: items 
      });
    } else {
      localStorage.setItem("hacoo-cart", JSON.stringify(items));
    }
  };

  const addToCart = (product: Product) => {
    const updatedCart = (() => {
      const existing = cartItems.find((item) => item.id === product.id);
      if (existing) {
        return cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...cartItems, { ...product, quantity: 1 }];
    })();
    
    setCartItems(updatedCart);
    syncCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    syncCart(updatedCart);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    syncCart(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
    syncCart([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
