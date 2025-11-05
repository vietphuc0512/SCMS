import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckCircle, ClipboardList } from 'lucide-react';
import { mockOrders } from '@/data/mockData';

export default function StaffDashboard() {
  // Lấy dữ liệu thật từ mockData
  const pendingOrders = mockOrders.filter(order => order.status === 'pending');
  const preparingOrders = mockOrders.filter(order => order.status === 'preparing');
  const readyOrders = mockOrders.filter(order => order.status === 'ready');
  const recentOrders = mockOrders.slice(0, 5); // 5 đơn gần nhất

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      pending: { label: 'Chờ xử lý', className: 'bg-yellow-100 text-yellow-800' },
      preparing: { label: 'Đang chuẩn bị', className: 'bg-blue-100 text-blue-800' },
      ready: { label: 'Sẵn sàng', className: 'bg-green-100 text-green-800' },
      completed: { label: 'Hoàn thành', className: 'bg-gray-100 text-gray-800' },
    };
    return statusMap[status] || statusMap.pending;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Dashboard Nhân viên</h2>
        <p className="text-muted-foreground">Quản lý đơn hàng và bếp.</p>
      </div>

      {/* Stats Cards với dữ liệu thật */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đơn chờ xử lý</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingOrders.length}</div>
            <p className="text-xs text-muted-foreground">Cần xử lý ngay</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đang chuẩn bị</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{preparingOrders.length}</div>
            <p className="text-xs text-muted-foreground">Đơn hàng</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{readyOrders.length}</div>
            <p className="text-xs text-muted-foreground">Chờ giao</p>
          </CardContent>
        </Card>
      </div>

      {/* Danh sách đơn hàng gần đây */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            Đơn Hàng Gần Đây
          </CardTitle>
          <CardDescription>Cần xử lý ưu tiên</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => {
                const statusInfo = getStatusBadge(order.status);
                return (
                  <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <p className="font-semibold">#{order.id}</p>
                        <Badge className={statusInfo.className}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {order.studentName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} món • {formatCurrency(order.total)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {order.createdAt.toLocaleString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit'
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {order.status === 'pending' && (
                        <Button size="sm" variant="default">
                          Xác nhận
                        </Button>
                      )}
                      {order.status === 'preparing' && (
                        <Button size="sm" variant="outline">
                          Hoàn thành
                        </Button>
                      )}
                      {order.status === 'ready' && (
                        <Button size="sm" variant="secondary">
                          Đã giao
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        Chi tiết
                      </Button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Chưa có đơn hàng nào
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Thống kê nhanh */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Đơn Chờ Xử Lý</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingOrders.length > 0 ? (
                pendingOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm font-medium">#{order.id}</span>
                    <span className="text-sm text-muted-foreground">{order.studentName}</span>
                    <Badge variant="outline" className="bg-yellow-50">
                      {order.items.length} món
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Không có đơn chờ xử lý
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Đơn Đang Chuẩn Bị</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {preparingOrders.length > 0 ? (
                preparingOrders.map((order) => (
                  <div key={order.id} className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm font-medium">#{order.id}</span>
                    <span className="text-sm text-muted-foreground">{order.studentName}</span>
                    <Badge variant="outline" className="bg-blue-50">
                      {order.items.length} món
                    </Badge>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Không có đơn đang chuẩn bị
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}