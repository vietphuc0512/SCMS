import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, DollarSign, Clock, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockOrders, mockStudents } from '@/data/mockData';

export default function StudentDashboard() {
  const { user } = useAuth();

  const studentData = mockStudents.find(s => s.id === user?.id);
  const myOrders = mockOrders.filter(order => order.userId === user?.id);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'preparing': return 'Đang chuẩn bị';
      case 'ready': return 'Sẵn sàng';
      case 'completed': return 'Hoàn thành';
      default: return status;
    }
  };

  return (
    // ✅ SỬA 1: h-full để căng 100% chiều cao
    <div className="h-full w-full flex flex-col gap-6 p-6">
      
      <div>
        <h2 className="text-2xl font-bold mb-2">Chào mừng, {user?.name || 'Học sinh'}!</h2>
        <p className="text-muted-foreground">Đây là tổng quan về hoạt động của bạn hôm nay.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số dư tài khoản</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(studentData?.balance || 0)}</div>
            <p className="text-xs text-muted-foreground">Có thể sử dụng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi tiêu tuần</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(studentData?.weeklySpent || 0)}</div>
            <p className="text-xs text-muted-foreground">7 ngày qua</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myOrders.length}</div>
            <p className="text-xs text-muted-foreground">Đơn đã đặt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang chờ</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {myOrders.filter(o => o.status === 'pending' || o.status === 'preparing').length}
            </div>
            <p className="text-xs text-muted-foreground">Đơn hàng</p>
          </CardContent>
        </Card>
      </div>

      {/* ✅ SỬA 2: flex-1 + overflow-auto để căng ra và scroll khi cần */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <CardHeader>
          <CardTitle>Đơn hàng gần đây</CardTitle>
          <CardDescription>Trạng thái đơn hàng của bạn</CardDescription>
        </CardHeader>
        {/* ✅ SỬA 3: CardContent có overflow-auto */}
        <CardContent className="flex-1 overflow-auto">
          {myOrders.length > 0 ? (
            <div className="space-y-4">
              {myOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      order.status === 'pending' ? 'bg-yellow-500' :
                      order.status === 'preparing' ? 'bg-blue-500' :
                      order.status === 'ready' ? 'bg-green-500' : 'bg-gray-500'
                    }`} />
                    <div>
                      <p className="font-medium">#{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} món • {formatCurrency(order.total)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.createdAt.toLocaleString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(order.status)}>
                    {getStatusText(order.status)}
                  </Badge>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">Chưa có đơn hàng nào</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}