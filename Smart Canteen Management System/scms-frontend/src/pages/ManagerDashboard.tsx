import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';
import { mockStats } from '@/data/mockData';

export default function ManagerDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Quản lý</h2>
        <p className="text-muted-foreground">Tổng quan hoạt động căn tin hôm nay.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">+12% từ hôm qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(mockStats.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">+8% từ tuần trước</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang xử lý</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.pendingOrders}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hoàn thành</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">Hôm nay</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Món ăn phổ biến</CardTitle>
            <CardDescription>Top 3 món được đặt nhiều nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.popularItems.map((item, index) => (
                <div key={item.id} className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">85%</p>
                    <Progress value={85 - index * 10} className="w-16 h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hoạt động hôm nay</CardTitle>
            <CardDescription>Tình hình đơn hàng theo giờ</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">7:00 - 9:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={30} className="w-20 h-2" />
                  <span className="text-sm font-medium">15 đơn</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">11:00 - 13:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={90} className="w-20 h-2" />
                  <span className="text-sm font-medium">45 đơn</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">17:00 - 19:00</span>
                <div className="flex items-center space-x-2">
                  <Progress value={70} className="w-20 h-2" />
                  <span className="text-sm font-medium">35 đơn</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}