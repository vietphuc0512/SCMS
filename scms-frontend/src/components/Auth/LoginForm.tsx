import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function LoginInfo() {
  return (
    <div className="hidden lg:flex flex-col space-y-6">
      <div>
        <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Chào mừng
        </h1>
        <p className="text-xl text-white leading-relaxed drop-shadow-lg">
          Hệ thống quản lý căn tin thông minh FSchool Quy Nhơn
        </p>
      </div>
      <div className="space-y-4">
        {[
          { title: 'Quản lý dễ dàng', desc: 'Quản lý toàn bộ hệ thống một cách hiệu quả' },
          { title: 'An toàn & Bảo mật', desc: 'Dữ liệu của bạn được bảo vệ tối đa' },
          { title: 'Hỗ trợ 24/7', desc: 'Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ' },
        ].map((item) => (
          <div key={item.title} className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white font-bold">✓</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white drop-shadow-lg">{item.title}</h3>
              <p className="text-white drop-shadow-lg">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast.success('Đăng nhập thành công!');
      navigate('/dashboard'); // navigate tới trang chính
    } catch (err) {
      toast.error('Email hoặc mật khẩu không đúng!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: 'url(/images/canteen.png)' }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
{/* Form login */}
<div className="w-full max-w-md mx-auto px-4">
  <Card className="shadow-lg rounded-lg overflow-hidden border border-gray-200">
    <CardHeader className="flex flex-col items-center py-8 px-4">
      <CardTitle className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow">
        Đăng nhập
      </CardTitle>
      <CardDescription className="text-gray-700 text-sm text-center mt-2 leading-relaxed">
        Hệ thống quản lý căn tin thông minh FSchool Quy Nhơn
      </CardDescription>
      <div className="mt-4 w-12 h-1 bg-indigo-600 rounded-full"></div>
    </CardHeader>

    <CardContent className="px-4 py-6 bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="text-left">
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </Label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full"
              required
              autoFocus
              disabled={isLoading}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
          </div>
        </div>

        {/* Password */}
        <div className="text-left">
          <Label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Mật khẩu
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 w-full"
              required
              disabled={isLoading}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
          </div>
        </div>

        {/* Checkbox Nhớ mật khẩu */}
        <div className="flex items-center mt-1">
          <input
            id="remember"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            disabled={isLoading}
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
            Nhớ mật khẩu lần sau
          </label>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3">
          <Button
            type="submit"
            className="flex-1 px-4 py-2 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow transition"
            disabled={isLoading}
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Button>
          <Button
            type="button"
            onClick={() => navigate('/register')}
            className="flex-1 px-4 py-2 text-sm font-semibold bg-gray-100 hover:bg-gray-200 text-indigo-700 rounded-md shadow transition"
            disabled={isLoading}
          >
            Đăng ký
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</div>
        {/* Info bên phải */}
        <LoginInfo />
      </div>
    </div>
  );
}
