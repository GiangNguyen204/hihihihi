import React from 'react';
import { Branch } from '../types';

interface ViewBranchModalProps {
  branch: Branch;
  onClose: () => void;
}

const ViewBranchModal: React.FC<ViewBranchModalProps> = ({ branch, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Chi tiết chi đoàn</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Mã chi đoàn</label>
            <p className="text-gray-800">{branch.code}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Tên chi đoàn</label>
            <p className="text-gray-800">{branch.name}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Khóa</label>
            <p className="text-gray-800">{branch.course}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Bí thư</label>
            <p className="text-gray-800">{branch.secretary}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">
              Số lượng đoàn viên
            </label>
            <p className="text-gray-800">{branch.members} đoàn viên</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 mb-1">Trạng thái</label>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                branch.status === 'active'
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                  : 'bg-gray-100 text-gray-500 border border-gray-200'
              }`}
            >
              {branch.status === 'active' ? 'Hoạt động' : 'Ngừng hoạt động'}
            </span>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBranchModal;
