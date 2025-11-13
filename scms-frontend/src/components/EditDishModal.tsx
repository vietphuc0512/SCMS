import React from "react";
import { Modal } from "@/components/ui/modal";

interface EditDishModalProps {
  open: boolean;
  onClose: () => void;
  dish?: any;
}

export default function EditDishModal({ open, onClose, dish }: EditDishModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Chỉnh sửa món ăn"
      description="Cập nhật thông tin món ăn ở đây"
    >
      <form className="space-y-4">
        <input type="text" placeholder="Tên món" className="border p-2 w-full rounded-md" />
        <input type="number" placeholder="Giá món" className="border p-2 w-full rounded-md" />
        <textarea placeholder="Mô tả" className="border p-2 w-full rounded-md" />
        <div className="flex justify-end space-x-2">
          <button type="button" className="px-4 py-2 bg-gray-200 rounded-md" onClick={onClose}>
            Hủy
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Lưu
          </button>
        </div>
      </form>
    </Modal>
  );
}
