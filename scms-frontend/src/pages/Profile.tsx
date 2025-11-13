import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import type { User } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Upload } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

export default function Profile() {
  const { user: contextUser, updateUser } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showLoginActivity, setShowLoginActivity] = useState(false);

  // States cho Change Password
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // 🔴 FIX: Type assertion - khẳng định user là User, không phải null
  const user = contextUser as User;

  if (!contextUser) return null;

  const [formData, setFormData] = useState<Partial<User>>({
    name: user.name || '',
    email: user.email || '',
    phone: user.phone || '',
    address: user.address || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateUser(formData);
      toast({
        title: 'Thành công',
        description: 'Thông tin cá nhân đã được cập nhật',
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Cập nhật thông tin thất bại',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('Avatar uploaded:', event.target?.result);
        toast({
          title: 'Thành công',
          description: 'Avatar đã được cập nhật',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // 🔴 FIX: getRoleDisplay - user đã được type assertion rồi
  const getRoleDisplay = (): string => {
    const roleMap: Record<string, string> = {
      student: 'Học sinh',
      staff: 'Nhân viên',
      manager: 'Quản lý',
      admin: 'Quản trị viên',
      parent: 'Phụ huynh',
    };
    return roleMap[user.role] || user.role;
  };

  // Handle Change Password
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChangePasswordSubmit = async () => {
    // Validate
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng điền tất cả các trường',
        variant: 'destructive',
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu mới không khớp',
        variant: 'destructive',
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: 'Lỗi',
        description: 'Mật khẩu mới phải có ít nhất 6 ký tự',
        variant: 'destructive',
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      // Call API để thay đổi mật khẩu
      // await changePassword(passwordData);
      
      toast({
        title: 'Thành công',
        description: 'Mật khẩu đã được thay đổi',
      });
      setShowChangePassword(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'Thay đổi mật khẩu thất bại',
        variant: 'destructive',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Mock Login Activity Data
  const loginActivity = [
    {
      id: 1,
      device: 'Chrome - Windows 10',
      location: 'Hà Nội, Việt Nam',
      ip: '192.168.1.1',
      date: '2024-01-15 14:30',
      status: 'Đang hoạt động',
    },
    {
      id: 2,
      device: 'Safari - iPhone',
      location: 'Hà Nội, Việt Nam',
      ip: '192.168.1.2',
      date: '2024-01-14 10:15',
      status: 'Offline',
    },
    {
      id: 3,
      device: 'Chrome - Ubuntu',
      location: 'Hồ Chí Minh, Việt Nam',
      ip: '192.168.1.3',
      date: '2024-01-13 09:45',
      status: 'Offline',
    },
  ];

  return (
    <div className="w-full h-full flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0">
        <h1 className="text-2xl font-bold">Hồ sơ cá nhân</h1>
        <p className="text-sm text-muted-foreground">Quản lý thông tin cá nhân của bạn</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4">
        {/* Avatar Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Ảnh đại diện</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-blue-100">
                {user.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <Label htmlFor="avatar-upload" className="cursor-pointer">
                <Button asChild variant="outline" className="text-xs h-8">
                  <span>
                    <Upload className="h-3 w-3 mr-1" />
                    Thay đổi ảnh
                  </span>
                </Button>
              </Label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <p className="text-xs text-muted-foreground mt-2">JPG, PNG (tối đa 5MB)</p>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info Section */}
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <CardTitle className="text-sm">Thông tin cá nhân</CardTitle>
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="text-xs h-7"
              >
                Chỉnh sửa
              </Button>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="name" className="text-xs font-medium w-24 flex-shrink-0">Họ và tên</Label>
              <Input
                id="name"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-8 text-xs flex-1"
              />
            </div>

            {/* Email */}
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="email" className="text-xs font-medium w-24 flex-shrink-0">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-8 text-xs flex-1"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="phone" className="text-xs font-medium w-24 flex-shrink-0">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-8 text-xs flex-1"
              />
            </div>

            {/* Address */}
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="address" className="text-xs font-medium w-24 flex-shrink-0">Địa chỉ</Label>
              <Input
                id="address"
                name="address"
                value={formData.address || ''}
                onChange={handleChange}
                disabled={!isEditing}
                className="h-8 text-xs flex-1"
              />
            </div>

            {/* Role */}
            <div className="flex flex-row items-center gap-4">
              <Label htmlFor="role" className="text-xs font-medium w-24 flex-shrink-0">Vai trò</Label>
              <Input
                id="role"
                value={getRoleDisplay()}
                disabled
                className="h-8 text-xs flex-1 bg-gray-100"
              />
            </div>

            {/* Action Buttons */}
            {isEditing && (
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 h-8 text-xs"
                >
                  {isSaving ? 'Đang lưu...' : 'Lưu'}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1 h-8 text-xs"
                >
                  Hủy
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Account Security Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Bảo mật tài khoản</CardTitle>
            <CardDescription className="text-xs">Quản lý mật khẩu và bảo mật</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex flex-row items-center gap-4">
              <Label className="text-xs font-medium w-24 flex-shrink-0">Đổi mật khẩu</Label>
              <Button 
                variant="outline" 
                className="h-8 text-xs flex-1"
                onClick={() => setShowChangePassword(true)}
              >
                Thay đổi
              </Button>
            </div>
            <div className="flex flex-row items-center gap-4">
              <Label className="text-xs font-medium w-24 flex-shrink-0">Hoạt động đăng nhập</Label>
              <Button 
                variant="outline" 
                className="h-8 text-xs flex-1"
                onClick={() => setShowLoginActivity(true)}
              >
                Xem
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings Section */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-sm">Cài đặt tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 border rounded text-xs">
              <div>
                <p className="font-medium">Nhận thông báo</p>
                <p className="text-muted-foreground text-xs">Email thông báo</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-2 border rounded text-xs">
              <div>
                <p className="font-medium">Hiển thị công khai</p>
                <p className="text-muted-foreground text-xs">Cho phép hiển thị hồ sơ</p>
              </div>
              <input type="checkbox" defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password Dialog */}
      <Dialog open={showChangePassword} onOpenChange={setShowChangePassword}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="text-sm">Thay đổi mật khẩu</DialogTitle>
            <DialogDescription className="text-xs">
              Nhập mật khẩu hiện tại và mật khẩu mới của bạn
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Current Password */}
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-xs font-medium">
                Mật khẩu hiện tại
              </Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Nhập mật khẩu hiện tại"
                className="h-8 text-xs"
              />
            </div>

            {/* New Password */}
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-xs font-medium">
                Mật khẩu mới
              </Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Nhập mật khẩu mới"
                className="h-8 text-xs"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-xs font-medium">
                Xác nhận mật khẩu mới
              </Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Xác nhận mật khẩu mới"
                className="h-8 text-xs"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowChangePassword(false)}
              className="text-xs h-7"
            >
              Hủy
            </Button>
            <Button
              size="sm"
              onClick={handleChangePasswordSubmit}
              disabled={isChangingPassword}
              className="text-xs h-7"
            >
              {isChangingPassword ? 'Đang xử lý...' : 'Thay đổi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Login Activity Dialog */}
      <Dialog open={showLoginActivity} onOpenChange={setShowLoginActivity}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-sm">Hoạt động đăng nhập</DialogTitle>
            <DialogDescription className="text-xs">
              Danh sách các thiết bị và địa điểm đăng nhập gần đây
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4 max-h-96 overflow-y-auto">
            {loginActivity.map((activity) => (
              <div key={activity.id} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-medium">{activity.device}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      📍 {activity.location}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      IP: {activity.ip}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ⏱️ {activity.date}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                      activity.status === 'Đang hoạt động'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button
              size="sm"
              onClick={() => setShowLoginActivity(false)}
              className="text-xs h-7"
            >
              Đóng
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}