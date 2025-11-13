import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useState, useEffect } from 'react'; // Thêm import để khắc phục lỗi
import {
  Home,
  UtensilsCrossed,
  ShoppingCart,
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
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Kiểm tra responsive và khóa cuộn khi sidebar mở trên mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Khóa cuộn khi sidebar mở trên mobile
    if (isMobile && isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      window.removeEventListener('resize', checkMobile);
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobile, isOpen]);

  // Hàm hiển thị tên vai trò (đồng bộ với Header.tsx)
  const getRoleDisplayName = (role: string) => {
    const roleMap = {
      student: 'Học sinh',
      staff: 'Nhân viên',
      manager: 'Quản lý',
      admin: 'Quản trị viên',
      parent: 'Phụ huynh',
    };
    return roleMap[role as keyof typeof roleMap] || role;
  };

  // Lấy menu theo vai trò
  const getMenuItems = () => {
    if (!user?.role) return [];
    switch (user.role) {
      case 'student':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'menu', label: 'Thực đơn', icon: UtensilsCrossed },
          { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
        ];
      case 'staff':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'orders', label: 'Quản lý đơn hàng', icon: ClipboardList },
          { id: 'menu', label: 'Thực đơn', icon: UtensilsCrossed },
        ];
      case 'manager':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'menu', label: 'Quản lý thực đơn', icon: UtensilsCrossed },
          { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
          { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
          { id: 'users', label: 'Người dùng', icon: Users },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'users', label: 'Quản lý người dùng', icon: Users },
          { id: 'menu', label: 'Thực đơn', icon: UtensilsCrossed },
          { id: 'orders', label: 'Đơn hàng', icon: ClipboardList },
          { id: 'reports', label: 'Báo cáo', icon: BarChart3 },
          { id: 'settings', label: 'Cài đặt', icon: Settings },
        ];
      case 'parent':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: Home },
          { id: 'children', label: 'Thông tin con em', icon: Baby },
          { id: 'orders', label: 'Lịch sử đặt hàng', icon: ClipboardList },
          { id: 'notifications', label: 'Thông báo', icon: Bell },
          { id: 'payments', label: 'Nạp tiền', icon: CreditCard },
          { id: 'settings', label: 'Cài đặt', icon: Settings },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    if (isMobile) setIsOpen(false);
  };

  const toggleSidebar = () => setIsOpen(!isOpen);

  if (!user) return null;

  return (
    <>
      {/* Nút toggle trên mobile */}
      {isMobile && (
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden bg-white shadow-md"
          onClick={toggleSidebar}
          aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      )}

      {/* Lớp phủ khi mở sidebar trên mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar chính */}
      <div
        className={cn(
          'fixed md:relative inset-y-0 left-0 z-50 flex h-full w-64 flex-col bg-white border-r transition-transform duration-300 ease-in-out',
          isMobile && !isOpen && '-translate-x-full',
          !isMobile && 'translate-x-0'
        )}
      >
        {/* Tiêu đề vai trò */}
        <div className="flex h-16 items-center border-b px-6">
          <h2 className="text-lg font-semibold">{getRoleDisplayName(user.role)}</h2>
        </div>

        {/* Danh sách menu */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? 'secondary' : 'ghost'}
                  className={cn('w-full justify-start', activeTab === item.id && 'bg-secondary')}
                  onClick={() => handleTabChange(item.id)}
                  aria-current={activeTab === item.id ? 'page' : undefined}
                >
                  <item.icon className="mr-2 h-4 w-4" aria-hidden="true" />
                  {item.label}
                </Button>
              ))
            ) : (
              <div className="p-4 text-red-600">Vai trò không hợp lệ</div>
            )}
          </nav>
        </div>

        {/* Nút đăng xuất */}
        <div className="border-t p-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={() => {
              if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
                logout();
              }
            }}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Đăng xuất
          </Button>
        </div>
      </div>
    </>
  );
}