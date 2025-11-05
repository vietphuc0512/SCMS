// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Import các kiểu MỚI
import { CartContextType, CartItem, MenuItem } from '@/types'; 

// --- THAY ĐỔI 1: Import useAuth ---
import { useAuth } from '@/contexts/AuthContext'; 

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // --- THAY ĐỔI 2: Lấy thông tin user thật từ AuthContext ---
  const { user } = useAuth();

  // --- Tạo key lưu trữ giỏ hàng riêng cho mỗi user ---
  const getCartKey = () => `cart_${user?.id || 'guest'}`;

  // --- Khởi tạo state từ localStorage ---
  const [items, setItems] = useState<CartItem[]>(() => {
    const cartKey = getCartKey();
    const storedCart = localStorage.getItem(cartKey);
    return storedCart ? JSON.parse(storedCart) : [];
  });

  // --- Tự động lưu giỏ hàng vào localStorage mỗi khi items hoặc user thay đổi ---
  useEffect(() => {
    const cartKey = getCartKey();
    localStorage.setItem(cartKey, JSON.stringify(items));
  }, [items, user]);

  const addItem = (menuItem: MenuItem, quantity: number, notes?: string) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => 
        item.menuItem.id === menuItem.id && item.notes === notes
      );
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      const newItem: CartItem = {
        id: crypto.randomUUID(),
        menuItem,
        quantity,
        notes
      };
      return [...prevItems, newItem];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(cartItemId);
      return;
    }
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === cartItemId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    items,
    addItem,
    removeItem,
    updateQuantity, 
    clearCart,
    getTotalAmount,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};