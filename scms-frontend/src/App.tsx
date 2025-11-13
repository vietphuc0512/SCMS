// src/App.tsx
import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoginForm from '@/components/Auth/LoginForm';
import RegisterForm from '@/components/Auth/RegisterForm';
import { Toaster } from '@/components/ui/toaster'; 
import Sidebar from '@/components/Layout/Sidebar';
import Header from '@/components/Layout/Header';
import UserManagement from '@/data/UserManagement';

// Import pages
import StudentDashboard from '@/pages/StudentDashboard';
import StaffDashboard from '@/pages/StaffDashboard';
import ManagerDashboard from '@/pages/ManagerDashboard';
import AdminDashboard from '@/pages/AdminDashboard';
import ParentDashboard from '@/pages/ParentDashboard';
import Menu from '@/pages/Menu';
import Orders from '@/pages/Orders';
import Reports from '@/pages/Reports';
import Profile from '@/pages/Profile'; 
import Notifications from '@/pages/Notifications';

function App() {
  const { user, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleCartClick = () => setActiveTab('orders');
  const handleProfileClick = () => setActiveTab('profile');

  const renderDashboard = () => {
    if (!user) return null;
    switch (user.role) {
      case 'student': return <StudentDashboard />;
      case 'staff': return <StaffDashboard />;
      case 'manager': return <ManagerDashboard />;
      case 'admin': return <AdminDashboard />;
      case 'parent': return <ParentDashboard />;
      default: return <div>Vai trò không hợp lệ</div>;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return renderDashboard();
      case 'menu': return <Menu />;
      case 'orders': return <Orders />;
      case 'reports': return <Reports />;
      case 'profile': return <Profile />;
      case 'users': return <UserManagement />;
      case 'children': 
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Thông tin con em</h2>
          </div>
        );
      case 'notifications': return <Notifications />;
      case 'payments': 
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Nạp tiền</h2>
          </div>
        );
      case 'settings': 
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold">Cài đặt</h2>
          </div>
        );
      default: return renderDashboard();
    }
  };

  // Màn hình loading
  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập → hiển thị router cho Login & Register
  if (!user) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
        <Toaster />
      </Router>
    );
  }

  // Nếu đã đăng nhập → hiển thị giao diện chính
  return (
    <Router>
      <div className="fixed inset-0 flex bg-gray-50 overflow-hidden">
        <Sidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onCartClick={handleCartClick}
            onProfileClick={handleProfileClick}
            className="h-16 border-b bg-white px-4 md:px-6 flex items-center"
          />

          <main className="flex-1 overflow-y-auto bg-gray-50">
            <div className="p-4 md:p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
