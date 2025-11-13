// src/contexts/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
// Import các kiểu MỚI
import { CartContextType, CartItem, MenuItem } from '@/types'; 

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (menuItem: MenuItem, quantity: number, notes?: string) => {
    setItems(prevItems => {
      // Tìm món hàng đã có (cùng món, cùng ghi chú)
      const existingItem = prevItems.find(item => 
        item.menuItem.id === menuItem.id && item.notes === notes
      );
      
      if (existingItem) {
        // Nếu đã có, chỉ cập nhật số lượng
        return prevItems.map(item =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      // Nếu là món mới, thêm vào giỏ
      // (Sửa lỗi: Thêm 'id' để khớp với CartItem type mới)
      const newItem: CartItem = {
        id: crypto.randomUUID(), // Thêm id
        menuItem,
        quantity,
        notes
      };
      return [...prevItems, newItem];
    });
  };

  // (Sửa lỗi: Dùng cartItemId để khớp với type mới)
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

  // Tính tổng tiền
  const getTotalAmount = () => {
    return items.reduce((total, item) => total + (item.menuItem.price * item.quantity), 0);
  };

  // Tính tổng số món
  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  // Cung cấp value ĐẦY ĐỦ (khớp với type mới)
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