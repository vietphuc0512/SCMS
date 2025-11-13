import { useState, useRef, useEffect } from 'react';
import { Bell, ShoppingCart, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import type { StudentUser, User as UserType } from '@/types';

interface HeaderProps {
  onCartClick?: () => void;
  onProfileClick?: () => void;
  onNotificationsClick?: () => void;
  className?: string;
}

const isStudentUser = (user: UserType | null): user is StudentUser => {
  return user !== null && user.role === 'student';
};

export default function Header({
  onCartClick,
  onProfileClick,
  onNotificationsClick,
  className = '',
}: HeaderProps) {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [showNotifications, setShowNotifications] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    // 👇 SỬA 1: Thay đổi nền thành gradient, thêm text-white, shadow-md
    <header
      className={`flex items-center justify-between w-full px-4 md:px-6 py-3 bg-gradient-to-r from-orange-400 via-amber-400 to-lime-400 text-white shadow-md sticky top-0 z-40 ${className}`}
    >
      {/* Left */}
      <div className="flex-1 min-w-0">
        {/* 👇 SỬA 2: Đổi title thành chữ trắng, bỏ gradient xanh cũ */}
        <h1 className="text-xl font-bold tracking-wide">
          Smart Canteen 🍱
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
        {/* Notifications */}
        <div className="relative" ref={popupRef}>
          <Button
            variant="ghost"
            size="icon"
            // 👇 SỬA 3: Đổi style nút icon sang nền trong suốt, hover sáng hơn
            className="relative h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            onClick={() => {
              setShowNotifications((prev) => !prev);
              onNotificationsClick?.();
            }}
          >
            {/* 👇 SỬA 4: Đổi màu icon thành trắng */}
            <Bell className="h-5 w-5 text-white" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-red-500 flex items-center justify-center">
              3
            </Badge>
          </Button>

          {/* 🔔 Popup (Giữ nguyên nền trắng để dễ đọc) */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2 text-gray-900">
              <div className="p-3 border-b font-semibold">
                Thông báo mới
              </div>
              <ul className="max-h-60 overflow-y-auto text-sm divide-y divide-gray-100">
                <li className="p-3 hover:bg-blue-50/60 transition cursor-pointer">
                  🍱 <span className="font-medium">Suất ăn trưa hôm nay</span> đã được cập nhật.
                </li>
                <li className="p-3 hover:bg-blue-50/60 transition cursor-pointer">
                  💸 Bạn vừa nạp <span className="font-semibold text-green-600">200.000đ</span> vào ví.
                </li>
                <li className="p-3 hover:bg-blue-50/60 transition cursor-pointer">
                  🧾 Báo cáo tháng 10 đã sẵn sàng.
                </li>
              </ul>
              <div className="p-2 text-center border-t">
                <button className="text-xs text-blue-600 hover:underline">
                  Xem tất cả
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        {isStudentUser(user) && (
          <Button
            variant="ghost"
            size="icon"
            // 👇 SỬA 5: Áp dụng style nút icon tương tự
            className="relative h-9 w-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            onClick={onCartClick}
          >
            {/* 👇 SỬA 6: Đổi màu icon thành trắng */}
            <ShoppingCart className="h-5 w-5 text-white" />
            {getTotalItems() > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs bg-orange-500 flex items-center justify-center">
                {getTotalItems()}
              </Badge>
            )}
          </Button>
        )}

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              // 👇 SỬA 7: Đổi border theo gợi ý (trắng)
              className="relative h-9 w-9 rounded-full p-0 border-2 border-white hover:opacity-90 transition-opacity"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-xs bg-blue-100 text-blue-700 font-semibold">
                  {user.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          {/* (Giữ nguyên nội dung Dropdown nền trắng để dễ đọc) */}
          <DropdownMenuContent className="w-52 shadow-lg rounded-xl" align="end">
            <DropdownMenuLabel className="text-xs">
              <div className="space-y-1">
                <p className="font-semibold">{user.name}</p>
                <p className="text-muted-foreground truncate">{user.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-xs cursor-pointer hover:bg-blue-50"
              onClick={onProfileClick}
            >
              <User className="mr-2 h-4 w-4 text-blue-600" />
              Hồ sơ cá nhân
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-xs cursor-pointer text-red-600 hover:bg-red-50"
              onClick={() => {
                if (window.confirm('Đăng xuất?')) logout();
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}