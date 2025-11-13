// src/types/index.ts

// --- CÁC KIỂU USER ---

// Kiểu User cơ bản
interface UserBase {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'staff' | 'manager' | 'admin' | 'parent';
  avatar?: string;
  parentEmail?: string;
}

// Kiểu User được mở rộng cho Student
export interface StudentUser extends UserBase {
  role: 'student';
  studentId: string;
  balance: number;
}

// Kiểu User được mở rộng cho Staff/Manager/Admin
export interface StaffUser extends UserBase {
  role: 'staff' | 'manager' | 'admin';
  department: string;
}

// Kiểu User được mở rộng cho Parent
export interface ParentUser extends UserBase {
  role: 'parent';
  children: string[]; // Mảng các studentId
}

// Kiểu User tổng hợp (sử dụng trong AuthContext)
export type User = StudentUser | StaffUser | ParentUser;

// Kiểu Student (sử dụng trong mockStudents)
export interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  balance: number;
  parentId: string;
  monthlyLimit: number;
  weeklySpent: number;
  monthlySpent: number;
}

// Kiểu Thông báo cho Phụ huynh
export interface ParentNotification {
  id: string;
  parentId: string;
  studentId: string;
  type: 'order' | 'low_balance' | 'daily_summary' | 'limit_exceeded';
  message: string;
  amount: number;
  createdAt: Date;
  read: boolean;
}

// --- CÁC KIỂU MENU VÀ GIỎ HÀNG ---

// Kiểu MenuItem (món ăn trong menu) - Cập nhật
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // File mới dùng 'image' thay vì 'imageUrl'
  available: boolean;
  preparationTime: number;
}

// Kiểu CartItem (món hàng trong giỏ) - Cập nhật
export interface CartItem {
  id: string; // File mockOrders mới có 'id' cho CartItem
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

// --- CÁC KIỂU ORDER (ĐƠN HÀNG) ---
export interface Order {
  id: string;
  userId: string;
  items: CartItem[]; // Dùng CartItem đã cập nhật
  total: number;
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'; // Thêm các status
  paymentMethod: 'qr' | 'ewallet' | 'cash';
  paymentStatus: 'paid' | 'unpaid';
  createdAt: Date;
  studentName: string;
}


// --- CÁC KIỂU CONTEXT (PHẢI KHỚP VỚI CÁC KIỂU MỚI) ---

// Kiểu AuthContext (dùng User tổng hợp mới)
export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Kiểu CartContext (dùng CartItem và MenuItem mới)
export interface CartContextType {
  items: CartItem[];
  addItem: (menuItem: MenuItem, quantity: number, notes?: string) => void;
  removeItem: (menuItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void; // Sửa: dùng cartItemId
  clearCart: () => void;
  getTotalAmount: () => number;
  getTotalItems: () => number;
}