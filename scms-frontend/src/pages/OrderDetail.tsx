import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockOrders, mockUsers } from '@/data/mockData';
import { ChevronLeft, Clock, DollarSign, User, MapPin, Phone } from 'lucide-react';

interface OrderDetailProps {
  orderId: string;
  onBack: () => void;
}

export default function OrderDetail({ orderId, onBack }: OrderDetailProps) {
  const { user } = useAuth();
  const [orderStatus, setOrderStatus] = useState<'pending' | 'preparing' | 'ready' | 'completed'>(
    (mockOrders.find(o => o.id === orderId)?.status as any) || 'pending'
  );

  const order = mockOrders.find(o => o.id === orderId);
  const student = mockUsers.find(u => u.id === order?.userId);

  if (!order) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-orange-100 text-orange-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'preparing': return 'Đang chuẩn bị';
      case 'ready': return 'Sẵn sàng';
      case 'pending': return 'Chờ xử lý';
      default: return 'Không xác định';
    }
  };

  const handleStatusUpdate = (newStatus: 'pending' | 'preparing' | 'ready' | 'completed') => {
    setOrderStatus(newStatus);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack} className="h-8 w-8 p-0">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Chi tiết đơn hàng</h1>
          <p className="text-sm text-muted-foreground">Đơn #{order.id}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
        {/* Order Status */}
        <Card className="bg-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">Trạng thái đơn hàng</CardTitle>
              <Badge className={`${getStatusColor(orderStatus)}`}>
                {getStatusLabel(orderStatus)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* Status Timeline */}
            <div className="space-y-2">
              {['pending', 'preparing', 'ready', 'completed'].map((status, index) => (
                <div key={status} className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full ${
                    ['pending', 'preparing', 'ready', 'completed'].indexOf(orderStatus) >= index
                      ? 'bg-blue-600'
                      : 'bg-gray-300'
                  }`} />
                  <span className="text-xs flex-1">{getStatusLabel(status as any)}</span>
                  <Button
                    size="sm"
                    variant={orderStatus === status ? 'default' : 'outline'}
                    className="h-6 text-xs"
                    onClick={() => handleStatusUpdate(status as any)}
                    disabled={['pending', 'preparing', 'ready', 'completed'].indexOf(orderStatus) > index}
                  >
                    {orderStatus === status ? '✓' : 'Cập nhật'}
                  </Button>
                </div>
              ))}
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
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <p className="font-semibold text-sm truncate">{student?.name}</p>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">{student?.phone || 'N/A'}</p>
                </div>
                {student?.role === 'student' && 'class' in student && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">Lớp {(student as any).class}</p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Items */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Danh sách món ăn</CardTitle>
            <CardDescription className="text-xs">{order.items.length} món</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg bg-gray-50">
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
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">
                      x{item.quantity}
                    </p>
                    <p className="font-semibold text-sm">
                      {formatCurrency(item.menuItem.price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Summary */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Tóm tắt đơn hàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tổng tiền:</span>
              <span className="font-semibold">{formatCurrency(order.total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Phương thức thanh toán:</span>
              <span className="font-semibold">
                {order.paymentMethod === 'qr' ? 'QR Code' :
                 order.paymentMethod === 'ewallet' ? 'Ví điện tử' :
                 order.paymentMethod === 'cash' ? 'Tiền mặt' : 'Khác'}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t pt-2 mt-2">
              <span className="text-muted-foreground">Trạng thái thanh toán:</span>
              <Badge className={order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Order Time */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Thời gian</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm">
              {order.createdAt.toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
              })}
            </p>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2 pb-4">
          <Button variant="outline" className="flex-1 h-8 text-xs" onClick={onBack}>
            Quay lại
          </Button>
          <Button className="flex-1 h-8 text-xs">
            In đơn hàng
          </Button>
        </div>
      </div>
    </div>
  );
}