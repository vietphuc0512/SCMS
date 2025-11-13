import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Bell, DollarSign, TrendingUp, AlertTriangle, Eye, EyeOff, Plus, Settings } from 'lucide-react';
import { mockStudents, mockOrders, mockParentNotifications, mockUsers } from '@/data/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ParentDashboard() {
  const { user } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  if (!user || user.role !== 'parent') {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  const children = mockStudents.filter(student => user.children?.includes(student.id));
  const childrenOrders = mockOrders.filter(order => user.children?.includes(order.userId));
  const notifications = mockParentNotifications.filter(notif => notif.parentId === user.id);
  const unreadCount = notifications.filter(notif => !notif.read).length;

  const totalMonthlySpent = children.reduce((sum, child) => sum + (child.monthlySpent || 0), 0);
  const totalWeeklySpent = children.reduce((sum, child) => sum + (child.weeklySpent || 0), 0);
  const totalBalance = children.reduce((sum, child) => sum + child.balance, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return '🍽️';
      case 'low_balance': return '⚠️';
      case 'limit_exceeded': return '🚫';
      case 'daily_summary': return '📊';
      default: return '📱';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'ready': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStudentName = (userId: string) => {
    const student = mockStudents.find(s => s.id === userId);
    return student?.name || 'Unknown Student';
  };

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'qr': return 'QR Code';
      case 'ewallet': return 'Ví điện tử';
      case 'cash': return 'Tiền mặt';
      default: return 'Khác';
    }
  };

  return (
    // 🔴 FIX: Không cần h-full w-full vì đã có trong App.tsx
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6">
        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng Số Dư</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
              className="h-8 w-8 p-0"
            >
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {showBalance ? formatCurrency(totalBalance) : '••••••'}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Của {children.length} con
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi Tiêu Tháng</CardTitle>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalMonthlySpent)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              TB {formatCurrency(children.length > 0 ? totalMonthlySpent / children.length : 0)}/con
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Chi Tiêu Tuần</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {formatCurrency(totalWeeklySpent)}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              7 ngày qua
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cảnh Báo</CardTitle>
            <AlertTriangle className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">
              {notifications.filter(n => n.type === 'low_balance' || n.type === 'limit_exceeded').length}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Cần chú ý
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg border">
        <Tabs defaultValue="children" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-gray-50 p-0 h-auto">
            <TabsTrigger 
              value="children" 
              className="rounded-none text-sm py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white"
            >
              Con Em
            </TabsTrigger>
            <TabsTrigger 
              value="orders" 
              className="rounded-none text-sm py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white"
            >
              Đơn Hàng
            </TabsTrigger>
            <TabsTrigger 
              value="notifications" 
              className="rounded-none text-sm py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white"
            >
              Thông Báo
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="rounded-none text-sm py-4 border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-white"
            >
              Cài Đặt
            </TabsTrigger>
          </TabsList>

          {/* Children Tab */}
          <TabsContent value="children" className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {children.length > 0 ? (
                children.map((child) => (
                  <Card key={child.id} className="bg-white hover:shadow-lg transition-shadow flex flex-col">
                    <CardHeader className="pb-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 flex-shrink-0">
                          <AvatarImage src={mockUsers.find(u => u.id === child.id)?.avatar} />
                          <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0 flex-1">
                          <CardTitle className="text-lg">{child.name}</CardTitle>
                          <CardDescription>Lớp {child.class}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Số dư</p>
                          <p className="text-lg font-semibold">{formatCurrency(child.balance)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Giới hạn tháng</p>
                          <p className="text-lg font-semibold">{formatCurrency(child.monthlyLimit || 0)}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Chi tiêu tháng</span>
                          <span className="font-semibold">{formatCurrency(child.monthlySpent || 0)}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-blue-600 h-3 rounded-full transition-all"
                            style={{
                              width: `${Math.min(((child.monthlySpent || 0) / (child.monthlyLimit || 1)) * 100, 100)}%`,
                            }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>0đ</span>
                          <span>{formatCurrency(child.monthlyLimit || 0)}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 mt-auto pt-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" className="w-full text-xs">
                              <Plus className="h-4 w-4 mr-1" />
                              Nạp Tiền
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Nạp tiền cho {child.name}</DialogTitle>
                              <DialogDescription>
                                Số dư hiện tại: {formatCurrency(child.balance)}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="amount">Số tiền nạp</Label>
                                <Input id="amount" placeholder="Nhập số tiền..." />
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1">Xác nhận</Button>
                                <Button variant="outline" className="flex-1">
                                  Hủy
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="w-full text-xs">
                              <Settings className="h-4 w-4 mr-1" />
                              Cài Đặt
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Cài đặt cho {child.name}</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="monthly-limit">Giới hạn chi tiêu tháng</Label>
                                <Input
                                  id="monthly-limit"
                                  defaultValue={child.monthlyLimit?.toString()}
                                  placeholder="Nhập giới hạn..."
                                />
                              </div>
                              <div className="flex gap-2">
                                <Button className="flex-1">Lưu</Button>
                                <Button variant="outline" className="flex-1">
                                  Hủy
                                </Button>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-3 text-center py-12">
                  <p className="text-muted-foreground">Không có con em nào</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders" className="p-6">
            <div className="space-y-3 scrollbar-hide">
              {childrenOrders.length > 0 ? (
                childrenOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center space-x-4 flex-1">
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={mockUsers.find(u => u.id === order.userId)?.avatar} />
                        <AvatarFallback>
                          {getStudentName(order.userId)
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm truncate">{getStudentName(order.userId)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} món • {formatCurrency(order.total)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.createdAt.toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status === 'completed'
                          ? 'Hoàn thành'
                          : order.status === 'preparing'
                          ? 'Đang chuẩn bị'
                          : order.status === 'ready'
                          ? 'Sẵn sàng'
                          : 'Chờ xử lý'}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {getPaymentMethodLabel(order.paymentMethod)}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Chưa có đơn hàng nào</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="p-6">
            <div className="space-y-3 scrollbar-hide">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border rounded-lg transition-colors ${
                      !notification.read ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {notification.createdAt.toLocaleString('vi-VN')}
                        </p>
                        {notification.amount && (
                          <p className="text-sm font-semibold text-blue-600 mt-1">
                            {formatCurrency(notification.amount)}
                          </p>
                        )}
                      </div>
                      {!notification.read && (
                        <Badge variant="secondary" className="flex-shrink-0">
                          Mới
                        </Badge>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Không có thông báo</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="p-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center justify-between gap-4 pb-4 border-b">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Thông báo đặt hàng</p>
                  <p className="text-sm text-muted-foreground">Nhận thông báo khi con em đặt hàng</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  Bật
                </Button>
              </div>
              <div className="flex items-center justify-between gap-4 pb-4 border-b">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Cảnh báo số dư thấp</p>
                  <p className="text-sm text-muted-foreground">Thông báo khi số dư dưới 50,000đ</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  Bật
                </Button>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <p className="font-medium">Báo cáo hàng ngày</p>
                  <p className="text-sm text-muted-foreground">Tổng kết chi tiêu cuối ngày</p>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  Tắt
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}