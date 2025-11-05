import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Users, CheckCircle, ClipboardList, ChevronLeft } from 'lucide-react';
import { mockOrders, mockUsers } from '@/data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function StaffDashboard() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const pendingOrders = mockOrders.filter(order => order.status === 'pending');
  const preparingOrders = mockOrders.filter(order => order.status === 'preparing');
  const readyOrders = mockOrders.filter(order => order.status === 'ready');
  const recentOrders = mockOrders.slice(0, 5);

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

  // 🔴 FIX: Nếu có selectedOrderId, hiển thị detail
  if (selectedOrderId) {
    const order = mockOrders.find(o => o.id === selectedOrderId);
    const student = mockUsers.find(u => u.id === order?.userId);

    if (!order) return null;

    return (
      <div className="h-full w-full flex flex-col bg-gray-50 overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b px-8 py-6 flex-shrink-0 shadow-sm flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedOrderId(null)}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{order.id}</h1>
            <p className="text-gray-600 text-sm">Nhấn mũi tên để quay lại</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto w-full scrollbar-hide">
          <div className="px-8 py-6 space-y-6">
            {/* Order Status */}
            <Card className="bg-white">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Trạng thái đơn hàng</CardTitle>
                  <Badge className={getStatusBadge(order.status).className}>
                    {getStatusBadge(order.status).label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {order.createdAt.toLocaleString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </p>
                <div className="space-y-2">
                  {['pending', 'preparing', 'ready', 'completed'].map((status, index) => {
                    const statusLabels: Record<string, string> = {
                      pending: 'Chờ xử lý',
                      preparing: 'Đang chuẩn bị',
                      ready: 'Sẵn sàng',
                      completed: 'Hoàn thành'
                    };
                    const isCompleted = ['pending', 'preparing', 'ready', 'completed'].indexOf(order.status) >= index;
                    
                    return (
                      <div key={status} className="flex items-center gap-3">
                        <div className={`h-3 w-3 rounded-full ${isCompleted ? 'bg-blue-600' : 'bg-gray-300'}`} />
                        <span className="text-sm flex-1">{statusLabels[status as keyof typeof statusLabels]}</span>
                        {isCompleted && <span className="text-xs text-green-600 font-semibold">✓</span>}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Student Info */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm">Thông tin học sinh</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={student?.avatar} alt={student?.name} />
                    <AvatarFallback>
                      {student?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm">{student?.name}</p>
                    <p className="text-xs text-muted-foreground">{student?.email}</p>
                    {student?.phone && (
                      <p className="text-xs text-muted-foreground">{student.phone}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm">Danh sách món ăn ({order.items.length} món)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="p-3 border rounded-lg bg-gray-50">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{item.menuItem.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {item.menuItem.description}
                        </p>
                        {item.notes && (
                          <p className="text-xs text-orange-600 mt-1">
                            <span className="font-semibold">Ghi chú:</span> {item.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0 whitespace-nowrap">
                        <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                        <p className="font-semibold text-sm">
                          {formatCurrency(item.menuItem.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-sm">Tóm tắt đơn hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tổng tiền:</span>
                  <span className="font-bold text-lg">{formatCurrency(order.total)}</span>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Phương thức thanh toán:</span>
                    <span className="font-semibold">
                      {order.paymentMethod === 'qr' ? 'QR Code' :
                       order.paymentMethod === 'ewallet' ? 'Ví điện tử' :
                       order.paymentMethod === 'cash' ? 'Tiền mặt' : 'Khác'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Trạng thái thanh toán:</span>
                    <Badge className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-4">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setSelectedOrderId(null)}
              >
                Quay lại
              </Button>
              <Button className="flex-1">
                In đơn hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 🔴 DASHBOARD CHÍNH
  return (
    <div className="h-full w-full flex flex-col bg-gray-50 overflow-hidden">
      {/* Header - Fixed */}
      <div className="bg-white border-b px-8 py-6 flex-shrink-0 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Nhân viên</h1>
        <p className="text-gray-600 mt-1">Quản lý đơn hàng và bếp</p>
      </div>

      {/* Main Content - Chiếm hết không gian còn lại */}
      <div className="flex-1 overflow-auto w-full">
        <div className="px-8 py-6 h-full">
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-6">
              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đơn chờ xử lý</CardTitle>
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{pendingOrders.length}</div>
                  <p className="text-sm text-muted-foreground mt-2">Cần xử lý ngay</p>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Đang chuẩn bị</CardTitle>
                  <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{preparingOrders.length}</div>
                  <p className="text-sm text-muted-foreground mt-2">Đơn hàng</p>
                </CardContent>
              </Card>

              <Card className="bg-white hover:shadow-md transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sẵn sàng</CardTitle>
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">{readyOrders.length}</div>
                  <p className="text-sm text-muted-foreground mt-2">Chờ giao</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Orders */}
            <Card className="bg-white">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <ClipboardList className="h-5 w-5" />
                  Đơn Hàng Gần Đây
                </CardTitle>
                <CardDescription>Nhấp vào đơn để xem chi tiết</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => {
                      const statusInfo = getStatusBadge(order.status);
                      return (
                        <div
                          key={order.id}
                          onClick={() => setSelectedOrderId(order.id)}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-blue-50 hover:border-blue-300 cursor-pointer transition-colors"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <p className="font-semibold text-base">#{order.id}</p>
                              <Badge className={`${statusInfo.className} text-xs`}>
                                {statusInfo.label}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{order.studentName}</p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} món • {formatCurrency(order.total)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {order.createdAt.toLocaleString('vi-VN', {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                              })}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2 flex-shrink-0 ml-4 min-w-max">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedOrderId(order.id);
                              }}
                            >
                              Xem chi tiết
                            </Button>
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
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">Chưa có đơn hàng nào</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Lists */}
            <div className="grid grid-cols-2 gap-6">
              {/* Pending Orders */}
              <Card className="bg-white flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Đơn Chờ Xử Lý</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px]">
                    {pendingOrders.length > 0 ? (
                      pendingOrders.map((order) => (
                        <div
                          key={order.id}
                          onClick={() => setSelectedOrderId(order.id)}
                          className="flex items-center justify-between gap-2 p-3 border rounded hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <span className="font-semibold text-sm flex-shrink-0">#{order.id}</span>
                          <span className="text-sm text-muted-foreground truncate flex-1">{order.studentName}</span>
                          <Badge variant="outline" className="bg-yellow-50 text-xs flex-shrink-0">
                            {order.items.length} món
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">Không có đơn chờ xử lý</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Preparing Orders */}
              <Card className="bg-white flex flex-col">
                <CardHeader className="border-b">
                  <CardTitle className="text-lg">Đơn Đang Chuẩn Bị</CardTitle>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col">
                  <div className="space-y-2 flex-1 overflow-y-auto max-h-[300px]">
                    {preparingOrders.length > 0 ? (
                      preparingOrders.map((order) => (
                        <div
                          key={order.id}
                          onClick={() => setSelectedOrderId(order.id)}
                          className="flex items-center justify-between gap-2 p-3 border rounded hover:bg-blue-50 cursor-pointer transition-colors"
                        >
                          <span className="font-semibold text-sm flex-shrink-0">#{order.id}</span>
                          <span className="text-sm text-muted-foreground truncate flex-1">{order.studentName}</span>
                          <Badge variant="outline" className="bg-blue-50 text-xs flex-shrink-0">
                            {order.items.length} món
                          </Badge>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-sm text-muted-foreground">Không có đơn đang chuẩn bị</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}