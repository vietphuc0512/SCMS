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

  // ✅ Type guard - Kiểm tra user là parent
  if (!user || user.role !== 'parent') {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Đang tải...</p>
      </div>
    );
  }

  // Get children data - Sử dụng optional chaining
  const children = mockStudents.filter(student => user.children?.includes(student.id));
  const childrenOrders = mockOrders.filter(order => user.children?.includes(order.userId));
  const notifications = mockParentNotifications.filter(notif => notif.parentId === user.id);
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Calculate total spending
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

  // ✅ Helper function
  const getStudentName = (userId: string) => {
    const student = mockStudents.find(s => s.id === userId);
    return student?.name || 'Unknown Student';
  };

  // ✅ Fix payment method display
  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'qr': return 'QR Code';
      case 'ewallet': return 'Ví điện tử';
      case 'cash': return 'Tiền mặt';
      default: return 'Khác';
    }
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard Phụ Huynh</h1>
          <p className="text-gray-600 text-sm md:text-base">Theo dõi hoạt động của con em tại căn tin</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Thông báo</span>
              {unreadCount > 0 && (
                <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5 py-0.5">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Tổng Số Dư</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowBalance(!showBalance)}
            >
              {showBalance ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">
              {showBalance ? formatCurrency(totalBalance) : '••••••'}
            </div>
            <p className="text-xs text-muted-foreground">
              Của {children.length} con
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Chi Tiêu Tháng</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{formatCurrency(totalMonthlySpent)}</div>
            <p className="text-xs text-muted-foreground">
              TB {formatCurrency(children.length > 0 ? totalMonthlySpent / children.length : 0)}/con
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Chi Tiêu Tuần</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold">{formatCurrency(totalWeeklySpent)}</div>
            <p className="text-xs text-muted-foreground">
              7 ngày qua
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs md:text-sm font-medium">Cảnh Báo</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-2xl font-bold text-orange-600">
              {notifications.filter(n => n.type === 'low_balance' || n.type === 'limit_exceeded').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Cần chú ý
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="children" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="children" className="text-xs md:text-sm">Con Em</TabsTrigger>
          <TabsTrigger value="orders" className="text-xs md:text-sm">Đơn Hàng</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs md:text-sm">Thông Báo</TabsTrigger>
          <TabsTrigger value="settings" className="text-xs md:text-sm">Cài Đặt</TabsTrigger>
        </TabsList>

        <TabsContent value="children" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {children.map((child) => (
              <Card key={child.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12">
                      <AvatarImage src={mockUsers.find(u => u.id === child.id)?.avatar} />
                      <AvatarFallback>{child.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base md:text-lg">{child.name}</CardTitle>
                      <CardDescription>Lớp {child.class}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Số dư</p>
                      <p className="font-semibold text-base md:text-lg">{formatCurrency(child.balance)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Giới hạn tháng</p>
                      <p className="font-semibold">{formatCurrency(child.monthlyLimit || 0)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Chi tiêu tháng</span>
                      <span>{formatCurrency(child.monthlySpent || 0)}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ 
                          width: `${Math.min(((child.monthlySpent || 0) / (child.monthlyLimit || 1)) * 100, 100)}%` 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0đ</span>
                      <span>{formatCurrency(child.monthlyLimit || 0)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" className="flex-1">
                          <Plus className="h-4 w-4 mr-2" />
                          Nạp Tiền
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
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
                          <div className="flex space-x-2">
                            <Button className="flex-1">Xác nhận</Button>
                            <Button variant="outline" className="flex-1">Hủy</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Settings className="h-4 w-4 mr-2" />
                          Cài Đặt
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
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
                          <div className="flex space-x-2">
                            <Button className="flex-1">Lưu</Button>
                            <Button variant="outline" className="flex-1">Hủy</Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lịch Sử Đặt Hàng Gần Đây</CardTitle>
              <CardDescription>Theo dõi các đơn hàng của con em</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childrenOrders.map((order) => (
                  <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={mockUsers.find(u => u.id === order.userId)?.avatar} />
                        <AvatarFallback>
                          {getStudentName(order.userId).split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{getStudentName(order.userId)}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.items.length} món • {formatCurrency(order.total)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {order.createdAt.toLocaleString('vi-VN')}
                        </p>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status === 'completed' ? 'Hoàn thành' :
                         order.status === 'preparing' ? 'Đang chuẩn bị' :
                         order.status === 'ready' ? 'Sẵn sàng' : 'Chờ xử lý'}
                      </Badge>
                      <p className="text-sm text-muted-foreground mt-1">
                        {/* ✅ FIX: Sử dụng helper function */}
                        {getPaymentMethodLabel(order.paymentMethod)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Thông Báo</CardTitle>
              <CardDescription>Cập nhật hoạt động của con em</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getNotificationIcon(notification.type)}</span>
                      <div className="flex-1">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {notification.createdAt.toLocaleString('vi-VN')}
                        </p>
                        {notification.amount && (
                          <p className="text-sm font-semibold text-blue-600">
                            {formatCurrency(notification.amount)}
                          </p>
                        )}
                      </div>
                      {!notification.read && (
                        <Badge variant="secondary">Mới</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cài Đặt Thông Báo</CardTitle>
              <CardDescription>Tùy chỉnh thông báo nhận được</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Thông báo đặt hàng</p>
                  <p className="text-sm text-muted-foreground">Nhận thông báo khi con em đặt hàng</p>
                </div>
                <Button variant="outline" size="sm">Bật</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Cảnh báo số dư thấp</p>
                  <p className="text-sm text-muted-foreground">Thông báo khi số dư dưới 50,000đ</p>
                </div>
                <Button variant="outline" size="sm">Bật</Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Báo cáo hàng ngày</p>
                  <p className="text-sm text-muted-foreground">Tổng kết chi tiêu cuối ngày</p>
                </div>
                <Button variant="outline" size="sm">Tắt</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}