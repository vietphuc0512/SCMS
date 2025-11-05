// src/App.tsx
import './App.css';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import { Toaster } from '@/components/ui/toaster';
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';

// Import pages
import StudentDashboard from '@/pages/StudentDashboard';
import StaffDashboard from '@/pages/StaffDashboard';
import ManagerDashboard from '@/pages/ManagerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import ParentDashboard from '@/pages/ParentDashboard';
import Menu from '@/pages/Menu';
import Orders from '@/pages/Orders';
import Reports from '@/pages/Reports';

function App() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleCartClick = () => {
    setActiveTab('orders');
  };

  const renderDashboard = () => {
    if (!user) return null;

    switch (user.role) {
      case 'student':
        return <StudentDashboard />;
      case 'staff':
        return <StaffDashboard />;
      case 'manager':
        return <ManagerDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <div>Vai trò không hợp lệ</div>;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'menu':
        return <Menu />;
      case 'orders':
        return <Orders />;
      case 'reports':
        return <Reports />;
      case 'children':
        return <div className="p-6"><h2 className="text-2xl font-bold">Thông tin con em</h2></div>;
      case 'notifications':
        return <div className="p-6"><h2 className="text-2xl font-bold">Thông báo</h2></div>;
      case 'payments':
        return <div className="p-6"><h2 className="text-2xl font-bold">Nạp tiền</h2></div>;
      case 'users':
        return <div className="p-6"><h2 className="text-2xl font-bold">Quản lý người dùng</h2></div>;
      case 'settings':
        return <div className="p-6"><h2 className="text-2xl font-bold">Cài đặt</h2></div>;
      default:
        return renderDashboard();
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải ứng dụng...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <>
        <LoginForm />
        <Toaster />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onCartClick={handleCartClick} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>
      <Toaster />
    </div>
  );
}

export default App;