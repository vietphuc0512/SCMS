// src/ui/UserManagement.tsx
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';

// Type definitions
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

// Mock data
const mockUsers: User[] = [
  { id: '1', name: 'Nguyen Van A', email: 'a@example.com', role: 'student', active: true },
  { id: '2', name: 'Tran Thi B', email: 'b@example.com', role: 'manager', active: true },
  { id: '3', name: 'Le Van C', email: 'c@example.com', role: 'staff', active: false },
];

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      setUsers(mockUsers);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleActive = (id: string) => {
    setUsers(prev =>
      prev.map(user => 
        user.id === id ? { ...user, active: !user.active } : user
      )
    );
  };

  const handleEdit = (id: string) => {
    // Handle edit action
    console.log('Edit user:', id);
  };

  const handleDelete = (id: string) => {
    // Handle delete action
    console.log('Delete user:', id);
  };

  if (!users.length) {
    return (
      <div className="h-64 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Quản lý người dùng</h2>
          <Button variant="default">Thêm người dùng mới</Button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Tên</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Vai trò</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Trạng thái</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Hành động</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 capitalize">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={user.active ? "default" : "destructive"}
                        className="capitalize"
                      >
                        {user.active ? 'Hoạt động' : 'Khóa'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(user.id)}
                          className="flex items-center gap-1"
                        >
                          <Edit size={14} />
                          <span>Sửa</span>
                        </Button>
                        <Button
                          size="sm"
                          variant={user.active ? "secondary" : "default"}
                          onClick={() => toggleActive(user.id)}
                          className="flex items-center gap-1"
                        >
                          <span>{user.active ? 'Khóa' : 'Mở'}</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDelete(user.id)}
                          className="flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}