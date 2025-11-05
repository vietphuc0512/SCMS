'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
  ShoppingCart,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Utensils,
  LucideIcon,
} from 'lucide-react';
import { mockStats } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface ManagerDashboardProps {
  onOpenMenuEditor?: () => void;
}

// 🔹 Component con: StatCard (đã tối ưu)
interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  variant?: 'orders' | 'revenue' | 'pending' | 'completed';
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'orders',
  trend,
}) => {
  const styleMap = {
    orders: {
      gradient: 'from-blue-50 to-blue-100 border-blue-200',
      icon: 'text-blue-600 bg-blue-100',
      text: 'text-blue-700',
    },
    revenue: {
      gradient: 'from-green-50 to-emerald-100 border-emerald-200',
      icon: 'text-emerald-600 bg-emerald-100',
      text: 'text-emerald-700',
    },
    pending: {
      gradient: 'from-amber-50 to-yellow-100 border-yellow-200',
      icon: 'text-yellow-600 bg-yellow-100',
      text: 'text-yellow-700',
    },
    completed: {
      gradient: 'from-lime-50 to-green-100 border-green-200',
      icon: 'text-green-600 bg-green-100',
      text: 'text-green-700',
    },
  } as const;

  const style = styleMap[variant];

  return (
    <Card
      className={`relative border ${style.gradient} ${style.text} rounded-2xl shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300`}
    >
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {subtitle && (
            <CardDescription className="text-xs opacity-80 mt-1">
              {subtitle}
            </CardDescription>
          )}
        </div>
        <div
          className={`p-2 rounded-full ${style.icon} shadow-sm flex items-center justify-center`}
        >
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && <p className="text-xs mt-1 text-emerald-600">{trend}</p>}
      </CardContent>
    </Card>
  );
};

export default function ManagerDashboard({ onOpenMenuEditor }: ManagerDashboardProps) {
  const [isMenuEditorOpen, setIsMenuEditorOpen] = React.useState(false);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);

  return (
    <div className="space-y-8 animate-fadeIn bg-gradient-to-br from-white via-secondary/30 to-emerald-50 p-6 rounded-2xl">
      {/* Header gradient */}
      <div className="bg-gradient-to-r from-emerald-500 via-lime-500 to-green-600 text-white p-6 rounded-2xl shadow-md border border-emerald-400/40 animate-fadeInUp">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-1 drop-shadow-sm">
              🍱 Smart Canteen Dashboard
            </h2>
            <p className="text-white/90">
              Tổng quan hoạt động hôm nay — theo dõi doanh thu & đơn hàng.
            </p>
          </div>
          <Button
            onClick={() => setIsMenuEditorOpen(true)}
            className="bg-gradient-to-r from-white via-emerald-50 to-lime-100 text-green-700 hover:from-emerald-100 hover:to-lime-200 shadow-sm flex items-center gap-2 transition-all rounded-xl px-5"
          >
            <Utensils className="h-4 w-4" />
            Chỉnh sửa thực đơn
          </Button>
        </div>
      </div>

      {/* Thống kê tổng quan */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Tổng đơn hàng"
          value={mockStats.totalOrders}
          subtitle="+12% từ hôm qua"
          icon={ShoppingCart}
          variant="orders"
        />
        <StatCard
          title="Doanh thu"
          value={formatCurrency(mockStats.totalRevenue)}
          subtitle="+8% từ tuần trước"
          icon={DollarSign}
          variant="revenue"
        />
        <StatCard
          title="Đang xử lý"
          value={mockStats.pendingOrders}
          subtitle="Đơn hàng đang xử lý"
          icon={AlertCircle}
          variant="pending"
        />
        <StatCard
          title="Hoàn thành"
          value={mockStats.completedOrders}
          subtitle="Đơn hoàn tất hôm nay"
          icon={CheckCircle}
          variant="completed"
        />
      </div>

      {/* Biểu đồ & danh sách */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg border border-border/50 bg-gradient-to-tr from-white to-secondary/40 rounded-2xl transition-all">
          <CardHeader>
            <CardTitle className="text-foreground">Món ăn phổ biến</CardTitle>
            <CardDescription className="text-muted-foreground">
              Top 3 món được đặt nhiều nhất
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {mockStats.popularItems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-4 border-b last:border-0 pb-3 last:pb-0"
                >
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{85 - index * 10}%</p>
                    <Progress
                      value={85 - index * 10}
                      className="w-20 h-2 rounded-full bg-secondary"
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg border border-border/50 bg-gradient-to-tr from-white to-secondary/40 rounded-2xl transition-all">
          <CardHeader>
            <CardTitle className="text-foreground">Hoạt động hôm nay</CardTitle>
            <CardDescription className="text-muted-foreground">
              Tình hình đơn hàng theo khung giờ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-5">
              {[
                { time: '7:00 - 9:00', value: 30, count: 15 },
                { time: '11:00 - 13:00', value: 90, count: 45 },
                { time: '17:00 - 19:00', value: 70, count: 35 },
              ].map((slot) => (
                <div
                  key={slot.time}
                  className="flex justify-between items-center border-b last:border-0 pb-3 last:pb-0"
                >
                  <span className="text-sm text-foreground/80">{slot.time}</span>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={slot.value}
                      className="w-24 h-2 rounded-full bg-secondary"
                    />
                    <span className="text-sm font-medium text-foreground">
                      {slot.count} đơn
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal */}
      <Modal
        open={isMenuEditorOpen}
        onClose={() => setIsMenuEditorOpen(false)}
        title="Chỉnh sửa thực đơn"
        description="Cập nhật danh sách món ăn và giá tiền tại đây"
      >
        <div className="space-y-4">
          <p>Form chỉnh sửa món ăn sẽ được thêm ở đây...</p>
          <Button
            onClick={() => setIsMenuEditorOpen(false)}
            className="bg-gray-200 hover:bg-gray-300"
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </div>
  );
}
