// src/pages/Orders.tsx

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Clock, Eye, CheckCircle, XCircle, AlertCircle, Plus, Minus, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useOrder } from '@/contexts/OrderContext'; // --- THAY ĐỔI 1: Import useOrder ---
import { Order } from '@/types';
import { CartItem } from '@/types';

export default function Orders() {
  const { user } = useAuth();
  const { items, getTotalAmount, updateQuantity, removeItem, clearCart } = useCart();
  
  // --- THAY ĐỔI 2: Lấy dữ liệu và hàm từ OrderContext ---
  const { activeOrders, completedOrders, addOrder, updateOrderStatus, completeOrder } = useOrder();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const handlePlaceOrder = async () => {
    if (items.length === 0) {
      alert('Giỏ hàng của bạn đang trống!');
      return;
    }

    if (!user || !user.id || !user.name) {
      alert('Thông tin người dùng không hợp lệ. Vui lòng đăng nhập lại!');
      return;
    }

    setIsPlacingOrder(true);
    const newOrder: Order = {
      id: `ORDER-${Date.now()}`,
      userId: user.id,
      studentName: user.name,
      items: items,
      total: getTotalAmount(),
      status: 'pending',
      paymentStatus: 'paid',
      paymentMethod: 'cash',
      createdAt: new Date(),
    };

    // --- THAY ĐỔI 3: Gọi hàm addOrder từ OrderContext ---
    addOrder(newOrder);
    
    console.log('Đã đặt hàng:', newOrder);
    alert(`Đặt hàng thành công! Mã đơn hàng: ${newOrder.id}`);
    
    clearCart();
    setIsPlacingOrder(false);
  };

  // ... (Giữ nguyên các hàm format khác)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'preparing': return 'bg-blue-500';
      case 'ready': return 'bg-green-500';
      case 'completed': return 'bg-gray-500';
      case 'cancelled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Chờ xử lý';
      case 'preparing': return 'Đang chuẩn bị';
      case 'ready': return 'Sẵn sàng';
      case 'completed': return 'Hoàn thành';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'preparing': return <AlertCircle className="h-4 w-4" />;
      case 'ready': return <CheckCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'cash': return 'Tiền mặt';
      case 'card': return 'Thẻ';
      case 'qr': return 'QR Code';
      case 'ewallet': return 'Ví điện tử';
      default: return method;
    }
  };

  // --- THAY ĐỔI 4: Xóa các hàm updateOrderStatus và completeOrder ở đây vì đã có trong OrderContext ---
  
  // ... (Giữ nguyên các component OrderCard và OrderDetailDialog)
  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">#{order.id}</CardTitle>
            <CardDescription>
              {formatDateTime(order.createdAt)}
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`} />
            <Badge variant="secondary">{getStatusText(order.status)}</Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {order.items.length} món
            </span>
            <span className="font-semibold">
              {formatCurrency(order.total)}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              {getPaymentMethodText(order.paymentMethod)}
            </span>
            <Badge variant={order.paymentStatus === 'paid' ? 'default' : 'destructive'}>
              {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}
            </Badge>
          </div>

          <div className="flex justify-between items-center pt-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrder(order)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Chi tiết
                </Button>
              </DialogTrigger>
            </Dialog>

            {/* --- THAY ĐỔI 5: Các nút hành động cho Staff (giữ nguyên) --- */}
            {user?.role === 'staff' && (
              <div className="flex space-x-2">
                {order.status === 'pending' && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, 'preparing')}>
                    Bắt đầu làm
                  </Button>
                )}
                {order.status === 'preparing' && (
                  <Button size="sm" onClick={() => updateOrderStatus(order.id, 'ready')}>
                    Hoàn thành món
                  </Button>
                )}
                {order.status === 'ready' && (
                  <Button size="sm" onClick={() => completeOrder(order.id)}>
                    Xác nhận đã giao
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const OrderDetailDialog = () => (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Chi tiết đơn hàng #{selectedOrder?.id}</DialogTitle>
        <DialogDescription>
          Đặt lúc: {selectedOrder && formatDateTime(selectedOrder.createdAt)}
        </DialogDescription>
      </DialogHeader>
      
      {selectedOrder && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Trạng thái:</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(selectedOrder.status)}
              <Badge variant="secondary">{getStatusText(selectedOrder.status)}</Badge>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Món đã đặt:</h4>
            {selectedOrder.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">{item.menuItem.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatCurrency(item.menuItem.price)} x {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.menuItem.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center pt-2 border-t">
            <span className="font-semibold">Tổng cộng:</span>
            <span className="font-bold text-lg">
              {formatCurrency(selectedOrder.total)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Thanh toán:</span>
              <p>{getPaymentMethodText(selectedOrder.paymentMethod)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Trạng thái TT:</span>
              <p>{selectedOrder.paymentStatus === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán'}</p>
            </div>
          </div>
        </div>
      )}
    </DialogContent>
  );

  const renderCurrentCart = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Giỏ hàng của bạn</h3>
      {items.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Giỏ hàng của bạn đang trống. Hãy thêm món từ thực đơn!</p>
          </CardContent>
        </Card>
      ) : (
        <>
          {items.map((item: CartItem) => (
            <Card key={item.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.menuItem.name}</h4>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.menuItem.price)}</p>
                    {item.notes && <p className="text-sm text-muted-foreground">Ghi chú: {item.notes}</p>}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="ml-4 text-right">
                    <p className="font-semibold">{formatCurrency(item.menuItem.price * item.quantity)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Tổng cộng:</span>
                <span>{formatCurrency(getTotalAmount())}</span>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={handlePlaceOrder} 
                disabled={isPlacingOrder}
              >
                {isPlacingOrder ? 'Đang đặt hàng...' : 'Đặt hàng'}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );

  // --- THAY ĐỔI 6: Lọc đơn hàng cho học sinh ---
  const studentActiveOrders = activeOrders.filter(order => order.userId === user?.id);
  const studentCompletedOrders = completedOrders.filter(order => order.userId === user?.id);

  const renderActiveOrders = () => {
    const ordersToShow = user?.role === 'student' ? studentActiveOrders : activeOrders;
    return (
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
          <TabsTrigger value="preparing">Đang làm</TabsTrigger>
          <TabsTrigger value="ready">Sẵn sàng</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {ordersToShow.filter(o => o.status === 'pending').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
          {ordersToShow.filter(o => o.status === 'pending').length === 0 && <p className="text-muted-foreground">Không có đơn hàng nào chờ xử lý.</p>}
        </TabsContent>

        <TabsContent value="preparing" className="space-y-4">
          {ordersToShow.filter(o => o.status === 'preparing').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
          {ordersToShow.filter(o => o.status === 'preparing').length === 0 && <p className="text-muted-foreground">Không có đơn hàng nào đang được chuẩn bị.</p>}
        </TabsContent>

        <TabsContent value="ready" className="space-y-4">
          {ordersToShow.filter(o => o.status === 'ready').map(order => (
            <OrderCard key={order.id} order={order} />
          ))}
          {ordersToShow.filter(o => o.status === 'ready').length === 0 && <p className="text-muted-foreground">Không có đơn hàng nào sẵn sàng.</p>}
        </TabsContent>
      </Tabs>
    );
  };

  const renderOrderHistory = () => {
    const ordersToShow = user?.role === 'student' ? studentCompletedOrders : completedOrders;
    return (
      <div className="space-y-4">
        {ordersToShow.length > 0 ? (
          ordersToShow.map(order => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <p className="text-muted-foreground">Bạn chưa có đơn hàng nào đã hoàn thành.</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">
          {user?.role === 'student' ? 'Đơn hàng của tôi' : 'Quản lý đơn hàng'}
        </h2>
        <p className="text-muted-foreground">
          {user?.role === 'student' 
            ? 'Quản lý giỏ hàng và theo dõi đơn hàng của bạn'
            : 'Xử lý và theo dõi tất cả đơn hàng'
          }
        </p>
      </div>

      {user?.role === 'student' && (
        <Tabs defaultValue="cart" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cart">Giỏ hàng</TabsTrigger>
            <TabsTrigger value="active">Đơn hàng hiện tại</TabsTrigger>
            <TabsTrigger value="history">Lịch sử</TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            {renderCurrentCart()}
          </TabsContent>
          <TabsContent value="active">
            {renderActiveOrders()}
          </TabsContent>
          <TabsContent value="history">
            {renderOrderHistory()}
          </TabsContent>
        </Tabs>
      )}

      {user?.role !== 'student' && renderActiveOrders()}

      <Dialog>
        <OrderDetailDialog />
      </Dialog>
    </div>
  );
}