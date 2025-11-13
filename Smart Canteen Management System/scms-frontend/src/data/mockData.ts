import { User, MenuItem, Order, Student, ParentNotification } from '../types';

export const mockUsers: User[] = [
  // Students
  {
    id: 'student1',
    name: 'Nguyễn Văn An',
    email: 'an.student@fschool.edu.vn',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    studentId: 'SE160001',
    balance: 150000,
  },
  {
    id: 'student2',
    name: 'Trần Thị Bình',
    email: 'binh.student@fschool.edu.vn',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    studentId: 'SE160002',
    balance: 200000,
  },
  {
    id: 'student3',
    name: 'Lê Minh Cường',
    email: 'cuong.student@fschool.edu.vn',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    studentId: 'SE160003',
    balance: 75000,
  },
  
  // Staff
  {
    id: 'staff1',
    name: 'Phạm Thị Dung',
    email: 'dung.staff@fschool.edu.vn',
    role: 'staff',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    department: 'Bếp',
  },
  
  // Manager
  {
    id: 'manager1',
    name: 'Hoàng Văn Em',
    email: 'em.manager@fschool.edu.vn',
    role: 'manager',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face',
    department: 'Quản lý Căn tin',
  },
  
  // Admin
  {
    id: 'admin1',
    name: 'Đinh Thị Phương',
    email: 'phuong.admin@fschool.edu.vn',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face',
    department: 'Hệ thống',
  },

  // Parents
  {
    id: 'parent1',
    name: 'Nguyễn Văn Hùng',
    email: 'hung.parent@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face',
    children: ['student1', 'student2'], // Parent of An and Binh
  },
  {
    id: 'parent2',
    name: 'Lê Thị Mai',
    email: 'mai.parent@gmail.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=150&h=150&fit=crop&crop=face',
    children: ['student3'], // Parent of Cuong
  },
];

export const mockStudents: Student[] = [
  {
    id: 'student1',
    name: 'Nguyễn Văn An',
    email: 'an.student@fschool.edu.vn',
    class: 'SE1601',
    balance: 150000,
    parentId: 'parent1',
    monthlyLimit: 500000,
    weeklySpent: 85000,
    monthlySpent: 320000,
  },
  {
    id: 'student2',
    name: 'Trần Thị Bình',
    email: 'binh.student@fschool.edu.vn',
    class: 'SE1602',
    balance: 200000,
    parentId: 'parent1',
    monthlyLimit: 600000,
    weeklySpent: 120000,
    monthlySpent: 480000,
  },
  {
    id: 'student3',
    name: 'Lê Minh Cường',
    email: 'cuong.student@fschool.edu.vn',
    class: 'SE1603',
    balance: 75000,
    parentId: 'parent2',
    monthlyLimit: 400000,
    weeklySpent: 45000,
    monthlySpent: 180000,
  },
];

export const mockParentNotifications: ParentNotification[] = [
  {
    id: 'notif1',
    parentId: 'parent1',
    studentId: 'student1',
    type: 'order',
    message: 'Nguyễn Văn An đã đặt đơn hàng trị giá 45,000đ',
    amount: 45000,
    createdAt: new Date('2024-01-15T10:30:00'),
    read: false,
  },
  {
    id: 'notif2',
    parentId: 'parent1',
    studentId: 'student2',
    type: 'low_balance',
    message: 'Số dư của Trần Thị Bình còn 50,000đ, cần nạp thêm',
    amount: 50000,
    createdAt: new Date('2024-01-15T09:15:00'),
    read: false,
  },
  {
    id: 'notif3',
    parentId: 'parent2',
    studentId: 'student3',
    type: 'daily_summary',
    message: 'Lê Minh Cường đã chi tiêu 25,000đ hôm nay',
    amount: 25000,
    createdAt: new Date('2024-01-14T18:00:00'),
    read: true,
  },
  {
    id: 'notif4',
    parentId: 'parent1',
    studentId: 'student2',
    type: 'limit_exceeded',
    message: 'Trần Thị Bình đã vượt quá giới hạn chi tiêu tuần (120,000đ/100,000đ)',
    amount: 120000,
    createdAt: new Date('2024-01-13T14:20:00'),
    read: true,
  },
];

export const mockMenuItems: MenuItem[] = [
  // Món chính
  {
    id: 'menu1',
    name: 'Cơm Gà Teriyaki',
    description: 'Cơm trắng với gà nướng teriyaki, rau củ và trứng',
    price: 45000,
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop',
    available: true,
    preparationTime: 15,
  },
  {
    id: 'menu2',
    name: 'Phở Bò Tái',
    description: 'Phở bò truyền thống với thịt bò tái, hành lá',
    price: 50000,
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1555126634-323283e090fa?w=300&h=200&fit=crop',
    available: true,
    preparationTime: 10,
  },
  {
    id: 'menu3',
    name: 'Bánh Mì Thịt Nướng',
    description: 'Bánh mì giòn với thịt nướng, pate, rau thơm',
    price: 25000,
    category: 'Món chính',
    image: 'https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=200&fit=crop',
    available: true,
    preparationTime: 5,
  },
  
  // Đồ uống
  {
    id: 'menu4',
    name: 'Trà Sữa Trân Châu',
    description: 'Trà sữa thơm ngon với trân châu dai',
    price: 30000,
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=300&h=200&fit=crop',
    available: true,
    preparationTime: 3,
  },
  {
    id: 'menu5',
    name: 'Cà Phê Sữa Đá',
    description: 'Cà phê phin truyền thống với sữa đặc',
    price: 20000,
    category: 'Đồ uống',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=300&h=200&fit=crop',
    available: true,
    preparationTime: 5,
  },
  
  // Tráng miệng
  {
    id: 'menu6',
    name: 'Chè Ba Màu',
    description: 'Chè truyền thống với đậu xanh, đậu đỏ, thạch',
    price: 15000,
    category: 'Tráng miệng',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    available: true,
    preparationTime: 2,
  },
];

export const mockOrders: Order[] = [
  {
    id: 'order1',
    userId: 'student1',
    items: [
      {
        id: 'cart1',
        menuItem: mockMenuItems[0],
        quantity: 1,
      },
    ],
    total: 45000,
    status: 'completed',
    paymentMethod: 'qr',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-15T10:30:00'),
    studentName: 'Nguyễn Văn An',
  },
  {
    id: 'order2',
    userId: 'student2',
    items: [
      {
        id: 'cart2',
        menuItem: mockMenuItems[1],
        quantity: 1,
      },
      {
        id: 'cart3',
        menuItem: mockMenuItems[3],
        quantity: 1,
      },
    ],
    total: 80000,
    status: 'preparing',
    paymentMethod: 'ewallet',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-15T11:15:00'),
    studentName: 'Trần Thị Bình',
  },
  {
    id: 'order3',
    userId: 'student3',
    items: [
      {
        id: 'cart4',
        menuItem: mockMenuItems[2],
        quantity: 1,
      },
    ],
    total: 25000,
    status: 'ready',
    paymentMethod: 'cash',
    paymentStatus: 'paid',
    createdAt: new Date('2024-01-15T12:00:00'),
    studentName: 'Lê Minh Cường',
  },
];

export const mockStats = {
  totalOrders: 156,
  totalRevenue: 8750000,
  pendingOrders: 12,
  completedOrders: 144,
  popularItems: mockMenuItems.slice(0, 3),
  revenueData: [
    { date: '2024-01-08', amount: 1200000 },
    { date: '2024-01-09', amount: 1350000 },
    { date: '2024-01-10', amount: 1100000 },
    { date: '2024-01-11', amount: 1450000 },
    { date: '2024-01-12', amount: 1300000 },
    { date: '2024-01-13', amount: 1250000 },
    { date: '2024-01-14', amount: 1100000 }
  ]
};

export const categories = ['Tất cả', 'Món chính', 'Đồ uống', 'Tráng miệng'];