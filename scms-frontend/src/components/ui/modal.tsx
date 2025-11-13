'use client';

import * as React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean; // Thêm option này
}

export function Modal({ 
  open, 
  onClose, 
  title, 
  description, 
  children, 
  className,
  closeOnBackdropClick = true // Default true
}: ModalProps) {
  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Chỉ đóng khi click vào backdrop, không phải modal content
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'relative bg-white rounded-xl shadow-xl w-full max-w-lg p-6 animate-in fade-in slide-in-from-bottom-4',
          className
        )}
        onClick={(e) => e.stopPropagation()} // Ngăn event bubble
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Đóng modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        {title && (
          <div className="mb-4 pr-8">
            <h2 className="text-xl font-semibold text-foreground">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        )}

        {/* Nội dung modal */}
        <div className="overflow-y-auto max-h-[70vh]">
          {children}
        </div>
      </div>
    </div>
  );
}