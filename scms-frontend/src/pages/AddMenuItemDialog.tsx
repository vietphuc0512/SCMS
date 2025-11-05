// src/components/Menu/AddMenuItemModal.tsx
'use client';

import React, { useState, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';

interface AddMenuItemModalProps {
  onAddItem: (item: { name: string; description: string; image: File | null }) => void;
}

const AddMenuItemModal: React.FC<AddMenuItemModalProps> = ({ onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (!name) return alert('Tên món không được để trống');
    onAddItem({ name, description, image });
    setName('');
    setDescription('');
    setImage(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Thêm món mới</Button>
        <Button variant="outline">Hủy</Button>
        <Button variant="secondary">Lưu</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Thêm món mới</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <Input 
            placeholder="Tên món" 
            value={name} 
            onChange={e => setName(e.target.value)} 
          />
          <Input 
            placeholder="Mô tả món" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
          />
          {image && <p>Ảnh đã chọn: {image.name}</p>}
        </div>

        <DialogFooter>
          <Button onClick={handleSubmit}>Thêm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMenuItemModal;
