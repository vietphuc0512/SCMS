// src/contexts/OrderContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order } from '@/types';

interface OrderContextType {
  activeOrders: Order[];
  completedOrders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, newStatus: 'preparing' | 'ready' | 'cancelled') => void;
  completeOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);

  const addOrder = (order: Order) => {
    setActiveOrders(prev => [...prev, order]);
  };

  const updateOrderStatus = (orderId: string, newStatus: 'preparing' | 'ready' | 'cancelled') => {
    setActiveOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const completeOrder = (orderId: string) => {
    const orderToComplete = activeOrders.find(o => o.id === orderId);
    if (orderToComplete) {
      const completedOrder = { ...orderToComplete, status: 'completed' as const };
      
      // Thêm vào lịch sử
      setCompletedOrders(prev => [...prev, completedOrder]);
      
      // Xóa khỏi danh sách đang hoạt động
      setActiveOrders(prev => prev.filter(o => o.id !== orderId));
    }
  };

  const value = {
    activeOrders,
    completedOrders,
    addOrder,
    updateOrderStatus,
    completeOrder,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};