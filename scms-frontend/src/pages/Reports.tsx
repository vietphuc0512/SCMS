import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart,
  Users,
  Clock
} from 'lucide-react';
import { mockStats, mockMenuItems } from '@/data/mockData';

export default function Reports() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    });
  };

  const RevenueChart = () => (
    <Card>
      <CardHeader>
        <CardTitle>Doanh thu 7 ngày qua</CardTitle>
        <CardDescription>Biểu đồ doanh thu hàng ngày</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockStats.revenueData.map((data, index) => (
            <div key={data.date} className="flex items-center space-x-4">
              <div className="w-16 text-sm text-muted-foreground">
                {formatDate(data.date)}
              </div>
              <div className="flex-1">
                <Progress 
                  value={(data.amount / Math.max(...mockStats.revenueData.map(d => d.amount))) * 100} 
                  className="h-6"
                />
              </div>
              <div className="w-24 text-sm font-medium text-right">
                {formatCurrency(data.amount)}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Tổng doanh thu:</span>
            <span className="font-bold text-lg">
              {formatCurrency(mockStats.revenueData.reduce((sum, data) => sum + data.amount, 0))}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const PopularItemsChart = () => (
    <Card>
      <CardHeader>
        <CardTitle>Món ăn phổ biến</CardTitle>
        <CardDescription>Top món được đặt nhiều nhất</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockMenuItems.slice(0, 5).map((item, index) => {
            const popularity = 90 - index * 15; // Mock popularity percentage
            const orders = 45 - index * 8; // Mock order count
            
            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{orders} đơn</p>
                    <p className="text-sm text-muted-foreground">{popularity}%</p>
                  </div>
                </div>
                <Progress value={popularity} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );

  const StatsOverview = () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tổng đơn hàng</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mockStats.totalOrders}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+12%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Doanh thu</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(mockStats.totalRevenue)}</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+8%</span> so với tháng trước
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Khách hàng</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,234</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+15%</span> khách hàng mới
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Thời gian TB</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12 phút</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">-2 phút</span> so với tuần trước
          </p>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Báo cáo & Thống kê</h2>
        <p className="text-muted-foreground">
          Phân tích hiệu suất và xu hướng kinh doanh
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
          <TabsTrigger value="products">Sản phẩm</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <StatsOverview />
          <div className="grid gap-6 md:grid-cols-2">
            <RevenueChart />
            <PopularItemsChart />
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <StatsOverview />
          <RevenueChart />
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <PopularItemsChart />
        </TabsContent>
      </Tabs>
    </div>
  );
}