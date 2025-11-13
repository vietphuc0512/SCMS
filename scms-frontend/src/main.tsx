// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthProvider } from '@/contexts/AuthContext.tsx'
import { CartProvider } from '@/contexts/CartContext.tsx' // 1. Thêm dòng này
import { OrderProvider } from '@/contexts/OrderContext.tsx' // 2. Thêm dòng này

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* 2. Thêm Provider này BÊN TRONG AuthProvider */}
        <OrderProvider> {/* 3. Bọc App trong OrderProvider */}
          <App />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)