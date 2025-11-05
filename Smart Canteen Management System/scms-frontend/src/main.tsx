// // src/main.tsx
// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'

// import { AuthProvider } from '@/contexts/AuthContext.tsx'
// import { CartProvider } from '@/contexts/CartContext.tsx' // 1. Thêm dòng này

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <React.StrictMode>
//     <AuthProvider>
//       <CartProvider> {/* 2. Thêm Provider này BÊN TRONG AuthProvider */}
//         <App />
//       </CartProvider>
//     </AuthProvider>
//   </React.StrictMode>,
// )

// src/main.tsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { AuthProvider } from '@/contexts/AuthContext.tsx'
import { CartProvider } from '@/contexts/CartContext.tsx'
import { OrderProvider } from '@/contexts/OrderContext.tsx' // --- THÊM DÒNG NÀY ---

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <OrderProvider> {/* --- BỌC APP TRONG ORDERPROVIDER --- */}
          <App />
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
)