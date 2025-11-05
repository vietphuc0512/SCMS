import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Đăng nhập thành công!');
    } catch (error) {
      toast.error('Email hoặc mật khẩu không đúng!');
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Student', email: 'an.student@fschool.edu.vn', name: 'Nguyễn Văn An', color: 'bg-blue-100 text-blue-800' },
    { role: 'Staff', email: 'dung.staff@fschool.edu.vn', name: 'Phạm Thị Dung', color: 'bg-green-100 text-green-800' },
    { role: 'Manager', email: 'em.manager@fschool.edu.vn', name: 'Hoàng Văn Em', color: 'bg-purple-100 text-purple-800' },
    { role: 'Admin', email: 'phuong.admin@fschool.edu.vn', name: 'Đinh Thị Phương', color: 'bg-red-100 text-red-800' },
    { role: 'Parent', email: 'hung.parent@gmail.com', name: 'Nguyễn Văn Hùng', color: 'bg-orange-100 text-orange-800' },
    { role: 'Parent', email: 'mai.parent@gmail.com', name: 'Lê Thị Mai', color: 'bg-orange-100 text-orange-800' },
  ];

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('123456');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Login Form */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Đăng nhập</CardTitle>
            <CardDescription className="text-center">
              Hệ thống quản lý căn tin thông minh FSchool Quy Nhon
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Tài khoản Demo</CardTitle>
            <CardDescription>
              Nhấp vào tài khoản để đăng nhập nhanh (mật khẩu: 123456)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {demoAccounts.map((account, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleDemoLogin(account.email)}
                >
                  <div className="flex items-center space-x-3">
                    <Badge className={account.color}>
                      {account.role}
                    </Badge>
                    <div>
                      <p className="font-medium text-sm">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Lưu ý:</strong> Đây là dữ liệu demo. Trong thực tế, hệ thống sẽ kết nối với cơ sở dữ liệu thật.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}