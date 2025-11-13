import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { mockParentNotifications } from '@/data/mockData';
import { Bell, Trash2, AlertCircle, Info } from 'lucide-react';

export default function Notifications() {
  const { user } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deletedIds, setDeletedIds] = useState<string[]>([]);

  // 🔴 DEBUG: Log user và notifications
  console.log('User:', user);
  console.log('All notifications:', mockParentNotifications);

  // Lấy thông báo của user hiện tại
  const notifications = user?.role === 'parent' 
    ? mockParentNotifications.filter(n => n.parentId === user.id)
    : [];

  console.log('Filtered notifications:', notifications); // 🔴 DEBUG

  const filtered = notifications.filter(n => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  }).filter(n => !deletedIds.includes(n.id));

  const searched = filtered.filter(n =>
    n.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const unreadCount = notifications.filter(n => !n.read && !deletedIds.includes(n.id)).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'order': return <Bell className="h-5 w-5 text-blue-600" />;
      case 'low_balance': return <AlertCircle className="h-5 w-5 text-orange-600" />;
      case 'limit_exceeded': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'daily_summary': return <Info className="h-5 w-5 text-green-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getNotificationTypeLabel = (type: string) => {
    switch (type) {
      case 'order': return 'Đơn hàng';
      case 'low_balance': return 'Số dư thấp';
      case 'limit_exceeded': return 'Vượt giới hạn';
      case 'daily_summary': return 'Báo cáo hàng ngày';
      default: return 'Thông báo';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 text-blue-800';
      case 'low_balance': return 'bg-orange-100 text-orange-800';
      case 'limit_exceeded': return 'bg-red-100 text-red-800';
      case 'daily_summary': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  };

  const handleDelete = (id: string) => {
    setDeletedIds([...deletedIds, id]);
  };

  const handleDeleteAll = () => {
    setDeletedIds(searched.map(n => n.id));
  };

  if (!user || user.role !== 'parent') {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Chỉ phụ huynh mới có thể xem thông báo</p>
        <p className="text-xs text-muted-foreground mt-2">User role: {user?.role}</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold">Thông báo hệ thống</h1>
        <p className="text-sm text-muted-foreground">Quản lý tất cả thông báo từ hệ thống</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
        {/* Search & Filter */}
        <Card className="bg-white">
          <CardContent className="pt-6 space-y-4">
            <div>
              <Input
                placeholder="Tìm kiếm thông báo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-8 text-xs"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={filter === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilter('all')}
                  className="text-xs h-7"
                >
                  Tất cả ({filtered.length})
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  onClick={() => setFilter('unread')}
                  className="text-xs h-7"
                >
                  Chưa đọc ({unreadCount})
                </Button>
                <Button
                  size="sm"
                  variant={filter === 'read' ? 'default' : 'outline'}
                  onClick={() => setFilter('read')}
                  className="text-xs h-7"
                >
                  Đã đọc
                </Button>
              </div>
              {searched.length > 0 && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={handleDeleteAll}
                  className="text-xs h-7 w-full sm:w-auto"
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Xóa tất cả
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <div className="space-y-3">
          {searched.length > 0 ? (
            searched.map((notification) => (
              <Card
                key={notification.id}
                className={`bg-white hover:shadow-md transition-shadow ${
                  !notification.read ? 'border-l-4 border-l-blue-600' : ''
                }`}
              >
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge className={`${getTypeColor(notification.type)} text-xs`}>
                          {getNotificationTypeLabel(notification.type)}
                        </Badge>
                        {!notification.read && (
                          <Badge className="bg-blue-500 text-white text-xs">
                            Mới
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.createdAt.toLocaleString('vi-VN', {
                          hour: '2-digit',
                          minute: '2-digit',
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric'
                        })}
                      </p>
                      {notification.amount && (
                        <p className="text-sm font-semibold text-blue-600 mt-2">
                          Số tiền: {formatCurrency(notification.amount)}
                        </p>
                      )}
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDelete(notification.id)}
                        className="h-6 w-6 p-0 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-muted-foreground mb-1 text-sm">
                {searchTerm ? 'Không tìm thấy thông báo' : 'Chưa có thông báo nào'}
              </p>
              <p className="text-xs text-muted-foreground">
                {searchTerm ? 'Thử tìm kiếm với từ khóa khác' : 'Tất cả thông báo sẽ hiển thị ở đây'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}