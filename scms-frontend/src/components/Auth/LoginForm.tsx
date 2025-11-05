import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
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

  return (
    // Background hình ảnh căng tràn
    <div 
      className="fixed inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/images/canteen.png)',
      }}
    >
      {/* Overlay để làm tối background */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Phần bên trái - Form đăng nhập */}
        <div className="w-full max-w-md">
          <Card className="shadow-2xl">
            <CardHeader className="space-y-4 pb-8">
              <CardTitle className="text-4xl font-bold">Đăng nhập</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Hệ thống quản lý căn tin thông minh FSchool Quy Nhon
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Email Field */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email của bạn"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    className="py-3 px-4 text-base border-gray-300"
                    required
                  />
                </div>
                
                {/* Password Field */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    className="py-3 px-4 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Custom Checkbox */}
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 bg-white border-2 border-indigo-400 rounded-md group-hover:border-indigo-600 transition-colors" />
                    {rememberMe && (
                      <div className="absolute inset-0 bg-indigo-500 rounded-md flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600 transition-colors">
                    Nhớ mật khẩu lần sau
                  </span>
                </label>

                {/* Button Đăng nhập */}
                <div className="flex justify-start pt-4">
                  <Button 
                    type="submit" 
                    className="px-16 py-3 text-base font-semibold" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Phần bên phải - Thông tin */}
        <div className="hidden lg:flex flex-col space-y-6">
          <div>
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Chào mừng
            </h1>
            <p className="text-xl text-white leading-relaxed drop-shadow-lg">
              Hệ thống quản lý căn tin thông minh FSchool Quy Nhon
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">Quản lý dễ dàng</h3>
                <p className="text-white drop-shadow-lg">Quản lý toàn bộ hệ thống một cách hiệu quả</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">An toàn & Bảo mật</h3>
                <p className="text-white drop-shadow-lg">Dữ liệu của bạn được bảo vệ tối đa</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">Hỗ trợ 24/7</h3>
                <p className="text-white drop-shadow-lg">Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}