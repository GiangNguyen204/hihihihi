import React, { useState } from 'react';
import CreateBranchModal from './modals/CreateBranchModal';
import UpdateBranchModal from './modals/UpdateBranchModal';
import DeleteBranchModal from './modals/DeleteBranchModal';
import ViewBranchModal from './modals/ViewBranchModal';
import { Branch } from './types';

const BranchCategory: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([
    {
      id: 1,
      code: 'CTK14A',
      name: 'Chi đoàn CNTT K14A',
      course: 'K14',
      secretary: 'Nguyễn Văn A',
      members: 42,
      status: 'active',
    },
    {
      id: 2,
      code: 'CTK15A',
      name: 'Chi đoàn CNTT K15A',
      course: 'K15',
      secretary: 'Trần Thị B',
      members: 39,
      status: 'active',
    },
  ]);

  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);
  const [modalType, setModalType] = useState<'create' | 'update' | 'delete' | 'view' | null>(null);

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Danh mục Chi đoàn</h1>
          <p className="text-gray-500">Quản lý danh sách chi đoàn, khóa và Bí thư.</p>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          onClick={() => setModalType('create')}
        >
          + Thêm chi đoàn
        </button>
      </div>

      {/* Bảng danh sách */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-100">
              <th className="py-2">Mã</th>
              <th>Tên chi đoàn</th>
              <th>Khóa</th>
              <th>Bí thư</th>
              <th>Số ĐV</th>
              <th>Trạng thái</th>
              <th className="text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((b) => (
              <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
                <td className="py-2">{b.code}</td>
                <td>{b.name}</td>
                <td>{b.course}</td>
                <td>{b.secretary}</td>
                <td>{b.members}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      b.status === 'active'
                        ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                        : 'bg-gray-100 text-gray-500 border border-gray-200'
                    }`}
                  >
                    {b.status === 'active' ? 'Hoạt động' : 'Ngừng'}
                  </span>
                </td>
                <td className="text-right space-x-2">
                  <button
                    className="text-blue-600 text-xs hover:underline"
                    onClick={() => {
                      setSelectedBranch(b);
                      setModalType('view');
                    }}
                  >
                    Xem
                  </button>
                  <button
                    className="text-indigo-600 text-xs hover:underline"
                    onClick={() => {
                      setSelectedBranch(b);
                      setModalType('update');
                    }}
                  >
                    Sửa
                  </button>
                  <button
                    className="text-red-500 text-xs hover:underline"
                    onClick={() => {
                      setSelectedBranch(b);
                      setModalType('delete');
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {modalType === 'create' && <CreateBranchModal onClose={() => setModalType(null)} />}
      {modalType === 'update' && selectedBranch && (
        <UpdateBranchModal branch={selectedBranch} onClose={() => setModalType(null)} />
      )}
      {modalType === 'delete' && selectedBranch && (
        <DeleteBranchModal branch={selectedBranch} onClose={() => setModalType(null)} />
      )}
      {modalType === 'view' && selectedBranch && (
        <ViewBranchModal branch={selectedBranch} onClose={() => setModalType(null)} />
      )}
    </div>
  );
};

export default BranchCategory;
