import { useAuth } from '@/contexts/AuthContext';
import StudentDashboard from './StudentDashboard';
import StaffDashboard from './StaffDashboard';
import ManagerDashboard from './ManagerDashboard';
import AdminDashboard from './AdminDashboard';
import ParentDashboard from './ParentDashboard';

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return <div>Loading...</div>;
  }

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
}