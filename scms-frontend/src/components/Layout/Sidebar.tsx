'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react';
import {
  Home,
  UtensilsCrossed,
  ClipboardList,
  BarChart3,
  Users,
  Settings,
  LogOut,
  Baby,
  Bell,
  CreditCard,
  Menu,
  X,
  Pencil,
  Salad // Icon mới cho logo
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onOpenMenuEditor?: () => void;
}

export default function Sidebar({
  activeTab = 'dashboard',
  onTabChange,
  onOpenMenuEditor
}: SidebarProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRoleDisplayName = (role: string) => {
    const roleMap: Record<string, string> = {
      student: 'Học sinh',
      staff: 'Nhân viên',
      manager: 'Quản lý',
      admin: 'Quản trị viên',
      parent: 'Phụ huynh',
    };
    return roleMap[role] || role;
  };

  const menus: Record<string, Array<{ id: string; label: string; icon: any }>> = {
    student: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'menu', label: 'Thực đơn', icon: UtensilsCrossed },
      { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
    ],
    staff: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'orders', label: 'Quản lý đơn hàng', icon: ClipboardList },
      { id: 'menu', label: 'Thực đơn', icon: UtensilsCrossed },
    ],
    manager: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'menu', label: 'Quản lý thực đơn', icon: UtensilsCrossed },
      { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
      { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
      { id: 'users', label: 'Người dùng', icon: Users },
    ],
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'users', label: 'Quản lý người dùng', icon: Users },
      { id: 'menu', label: 'Thực đơn', icon: UtensilsCrossed },
      { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
      { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
      { id: 'settings', label: 'Cài đặt', icon: Settings },
    ],
    parent: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'children', label: 'Thông tin con em', icon: Baby },
      { id: 'orders', label: 'Lịch sử đặt hàng', icon: ClipboardList },
      { id: 'notifications', label: 'Thông báo', icon: Bell },
      { id: 'payments', label: 'Nạp tiền', icon: CreditCard },
      { id: 'settings', label: 'Cài đặt', icon: Settings },
    ],
  };

  const menuItems = user?.role ? menus[user.role] || [] : [];

  const handleTabChange = (tabId: string) => {
    if (tabId === 'menu' && onOpenMenuEditor) {
      onOpenMenuEditor();
    }
    if (onTabChange) onTabChange(tabId);
    if (isMobile) setIsOpen(false);
  };

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      logout();
    }
  };

  if (!user) return null;

  return (
    <>
      {/* Mobile toggle */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* 👇 SỬA 1: Thay đổi nền và màu viền cho sidebar */}
      <aside
        className={cn(
          'fixed md:relative inset-y-0 left-0 z-40 w-64 h-full bg-gradient-to-b from-orange-50 to-emerald-50 border-r border-black/5 flex flex-col transition-transform duration-300 ease-in-out',
          isMobile && !isOpen && '-translate-x-full',
          !isMobile && 'translate-x-0'
        )}
      >
        {/* 👇 SỬA 2: Thêm Logo/Header mới */}
        <div className="flex h-16 items-center gap-2 border-b border-black/5 px-6">
          <Salad className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold text-primary">Smart Canteen</h1>
        </div>

        {/* User Role */}
        <div className="flex h-12 items-center justify-between px-6">
          <h2 className="text-sm font-semibold text-slate-700">
            {getRoleDisplayName(user.role)}
          </h2>
        </div>

        {/* Menu */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {menuItems.length > 0 ? (
            <div className="space-y-1">
              {menuItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'secondary' : 'ghost'}
                    // 👇 SỬA 3: Cập nhật màu sắc cho các nút menu
                    className={cn(
                      'w-full justify-start text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-orange-100 text-primary hover:bg-orange-200'
                        : 'text-slate-700 hover:bg-orange-100 hover:text-primary'
                    )}
                    onClick={() => handleTabChange(item.id)}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.label}</span>
                    {item.id === 'menu' && (
                      <Pencil
                        className="ml-auto h-4 w-4 text-gray-400 group-hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenMenuEditor?.();
                        }}
                      />
                    )}
                  </Button>
                );
              })}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-red-600">
              Vai trò không hợp lệ
            </div>
          )}
        </nav>

        {/* Logout */}
        <div className="border-t border-black/5 p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 font-medium"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </aside>
    </>
  );
}