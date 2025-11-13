import { useState } from 'react';
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
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Mật khẩu và xác nhận mật khẩu không khớp!');
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (res.ok) {
        toast.success('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
        navigate('/'); // quay về trang login
      } else if (res.status === 409) {
        toast.error('Tài khoản đã tồn tại!');
      } else {
        toast.error('Đăng ký thất bại!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Lỗi kết nối tới máy chủ!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: 'url(/images/canteen.png)',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40" />

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="w-full max-w-md">
          <Card className="shadow-2xl">
            <CardHeader className="space-y-4 pb-8">
              <CardTitle className="text-4xl font-bold">Đăng ký</CardTitle>
              <CardDescription className="text-base text-gray-600">
                Tạo tài khoản mới cho hệ thống quản lý căn tin FSchool Quy Nhon
              </CardDescription>
            </CardHeader>

            <CardContent className="pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div className="space-y-3">
                  <Label htmlFor="name" className="text-sm font-semibold text-gray-700">
                    Họ và tên
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Nhập họ và tên"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="py-3 px-4 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Email */}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-gray-700">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-3 px-4 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Password */}
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                    Mật khẩu
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="py-3 px-4 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div className="space-y-3">
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-gray-700">
                    Xác nhận mật khẩu
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="py-3 px-4 text-base border-gray-300"
                    required
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-start gap-4 pt-4">
                  <Button
                    type="submit"
                    className="px-12 py-3 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
                  </Button>

                  <Button
                    type="button"
                    className="px-12 py-3 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
                    onClick={() => navigate('/')}
                  >
                    Quay về đăng nhập
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Phần giới thiệu bên phải giữ nguyên */}
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
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                  Quản lý dễ dàng
                </h3>
                <p className="text-white drop-shadow-lg">
                  Quản lý toàn bộ hệ thống một cách hiệu quả
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                  An toàn & Bảo mật
                </h3>
                <p className="text-white drop-shadow-lg">
                  Dữ liệu của bạn được bảo vệ tối đa
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold">✓</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">
                  Hỗ trợ 24/7
                </h3>
                <p className="text-white drop-shadow-lg">
                  Đội ngũ hỗ trợ luôn sẵn sàng giúp đỡ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
