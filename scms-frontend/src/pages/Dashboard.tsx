'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import StaffDashboard from './StaffDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';
import ParentDashboard from './ParentDashboard';

// ✅ Giả sử đây là popup chỉnh sửa thực đơn (có thể tách ra file riêng)
function MenuEditor({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 animate-in fade-in zoom-in">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            🍽️ Chỉnh sửa thực đơn
          </h2>
          <button
            className="text-gray-500 hover:text-red-600 font-bold text-lg"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="space-y-3">
          <label className="block">
            <span className="text-sm font-medium text-gray-700">Tên món ăn</span>
            <input
              type="text"
              placeholder="Nhập tên món..."
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Giá (VNĐ)</span>
            <input
              type="number"
              placeholder="Nhập giá..."
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700">Mô tả</span>
            <textarea
              placeholder="Mô tả món ăn..."
              className="mt-1 w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-medium"
            onClick={onClose}
          >
            Hủy
          </button>
          <button className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700">
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}

interface DashboardProps {
  activeTab?: string;
}

export default function Dashboard({ activeTab = 'dashboard' }: DashboardProps) {
  const { user } = useAuth();
  const [showMenuEditor, setShowMenuEditor] = useState(false);

  if (!user) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-lg font-semibold">Loading...</div>
      </div>
    );
  }

  // ✅ Hàm bật/tắt popup chỉnh sửa thực đơn
  const handleOpenMenuEditor = () => setShowMenuEditor(true);
  const handleCloseMenuEditor = () => setShowMenuEditor(false);

  return (
    <div className="relative h-full w-full flex flex-col overflow-hidden">
      {/* Nội dung dashboard từng role */}
      {user.role === 'student' && <StudentDashboard />}
      {user.role === 'staff' && <StaffDashboard />}
      {user.role === 'manager' && (
        <ManagerDashboard onOpenMenuEditor={handleOpenMenuEditor} />
      )}
      {user.role === 'admin' && <AdminDashboard />}
      {user.role === 'parent' && <ParentDashboard />}
      {!['student', 'staff', 'manager', 'admin', 'parent'].includes(user.role) && (
        <div className="h-full w-full flex items-center justify-center">
          <div className="text-lg font-semibold">Vai trò không hợp lệ</div>
        </div>
      )}

      {/* ✅ Popup chỉnh sửa thực đơn */}
      {showMenuEditor && <MenuEditor onClose={handleCloseMenuEditor} />}
    </div>
  );
}
