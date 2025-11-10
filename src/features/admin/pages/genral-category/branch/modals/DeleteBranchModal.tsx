import React from 'react';
import { Branch } from '../types';

interface DeleteBranchModalProps {
  branch: Branch;
  onClose: () => void;
}

const DeleteBranchModal: React.FC<DeleteBranchModalProps> = ({ branch, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-red-100">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">Xác nhận xóa</h2>
          <p className="text-gray-500 mb-6">
            Bạn có chắc chắn muốn xóa chi đoàn <strong>{branch.name}</strong>?<br />
            Hành động này không thể hoàn tác.
          </p>

          <div className="flex justify-center space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={() => {
                // Xử lý xóa chi đoàn
                onClose();
              }}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBranchModal;
