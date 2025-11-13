import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ShoppingCart, DollarSign, AlertCircle, CheckCircle, Users, Settings } from 'lucide-react';
import { mockStats } from '@/data/mockData';

export default function AdminDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    // ✅ SỬA 1: Thay "space-y-6" → "h-full w-full flex flex-col gap-6 p-6 overflow-auto"
    <div className="h-full w-full flex flex-col gap-6 p-6 overflow-auto">
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Quản trị</h2>
        <p className="text-muted-foreground">Tổng quan toàn hệ thống SCMS.</p>
      </div>

      {/* Stats Cards - 4 cột */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+15 người dùng mới</p>
          </CardContent>
        </Card>

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
            <CardTitle className="text-sm font-medium">Trạng thái hệ thống</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Ổn định</div>
            <p className="text-xs text-muted-foreground">Uptime 99.9%</p>
          </CardContent>
        </Card>
      </div>

      {/* ✅ SỬA 2: Grid 2 cột - thêm "flex-1" để lấp đầy không gian */}
      <div className="grid gap-4 md:grid-cols-2 flex-1">
        
        {/* Card 1 */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle>Thống kê người dùng</CardTitle>
            <CardDescription>Phân bố theo vai trò</CardDescription>
          </CardHeader>
          {/* ✅ SỬA 3: CardContent có flex-1 + overflow-auto */}
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Học sinh</span>
                <div className="flex items-center space-x-2">
                  <Progress value={75} className="w-20 h-2" />
                  <span className="text-sm font-medium">935</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Phụ huynh</span>
                <div className="flex items-center space-x-2">
                  <Progress value={60} className="w-20 h-2" />
                  <span className="text-sm font-medium">280</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Nhân viên</span>
                <div className="flex items-center space-x-2">
                  <Progress value={20} className="w-20 h-2" />
                  <span className="text-sm font-medium">25</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Quản lý</span>
                <div className="flex items-center space-x-2">
                  <Progress value={5} className="w-20 h-2" />
                  <span className="text-sm font-medium">7</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card className="flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle>Hoạt động hệ thống</CardTitle>
            <CardDescription>Tình trạng các module</CardDescription>
          </CardHeader>
          {/* ✅ SỬA 4: CardContent có flex-1 + overflow-auto */}
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Hệ thống đặt hàng</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Hoạt động</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Thanh toán</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Hoạt động</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Thông báo</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Bảo trì</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Báo cáo</span>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Hoạt động</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}