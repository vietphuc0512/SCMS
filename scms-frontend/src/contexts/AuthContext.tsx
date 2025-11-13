import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthContextType, User } from '@/types';
import { mockUsers } from '@/data/mockData';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('scms_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser) as User);
      }
    } catch (error) {
      console.error("Failed to load user from localStorage", error);
      localStorage.removeItem('scms_user');
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // 🔴 FIX: Type cast mockUsers item to User
    const foundUser = mockUsers.find(u => u.email === email) as User | undefined;

    if (foundUser && password === '123456') {
      setUser(foundUser);
      localStorage.setItem('scms_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('scms_user');
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      // 🔴 FIX: Type cast to User
      const updatedUser: User = {
        ...user,
        ...userData,
        id: user.id,
        role: user.role,
      } as User;

      setUser(updatedUser);
      localStorage.setItem('scms_user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Failed to update user:', error);
      throw new Error('Failed to update user information');
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};