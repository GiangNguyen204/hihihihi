import { useMemo, useState } from 'react';

type ReportType = 'activity' | 'point' | 'member';

interface BranchReport {
  branch: string;
  activities: number;
  participants: number;
  avgPoint: number;
}

const BRANCH_REPORT_DATA: BranchReport[] = [
  { branch: 'CTK14A', activities: 14, participants: 220, avgPoint: 86 },
  { branch: 'CTK14B', activities: 11, participants: 185, avgPoint: 80 },
  { branch: 'CTK15A', activities: 15, participants: 245, avgPoint: 88 },
  { branch: 'CTK15B', activities: 10, participants: 170, avgPoint: 79 },
];

const YEARS = ['2024', '2025'];
const SEMESTERS = ['HK1', 'HK2'];

const ReportsDashboard = () => {
  const [filters, setFilters] = useState<{
    year: string;
    semester: string;
    type: ReportType;
  }>({
    year: '2025',
    semester: 'HK1',
    type: 'activity',
  });

  // Tạm thời data không đổi theo filter, nhưng bạn có thể dùng filters để call API
  const filteredBranchReport = useMemo(() => {
    return BRANCH_REPORT_DATA;
  }, []);

  const summary = useMemo(() => {
    const totalActivities = filteredBranchReport.reduce((sum, r) => sum + r.activities, 0);
    const totalParticipants = filteredBranchReport.reduce((sum, r) => sum + r.participants, 0);
    const avgPoint =
      filteredBranchReport.reduce((sum, r) => sum + r.avgPoint, 0) / filteredBranchReport.length;

    return {
      totalActivities,
      totalParticipants,
      avgPoint: avgPoint.toFixed(1),
    };
  }, [filteredBranchReport]);

  const handleExportExcel = () => {
    // TODO: thay bằng logic export thật (ví dụ gọi API / generate file)
    console.log('Export Excel với filters:', filters);
    alert('(Demo) Đang giả lập xuất báo cáo Excel...');
  };

  const handleExportPDF = () => {
    console.log('Export PDF với filters:', filters);
    alert('(Demo) Đang giả lập xuất báo cáo PDF...');
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Báo cáo</h1>
          <p className="text-gray-500">
            Tổng hợp và xuất báo cáo hoạt động, điểm rèn luyện, Đoàn viên
          </p>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-3">
          {/* Mẫu báo cáo */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Mẫu báo cáo</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.type}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  type: e.target.value as ReportType,
                }))
              }
            >
              <option value="activity">Hoạt động & tham gia</option>
              <option value="point">Điểm rèn luyện theo chi đoàn</option>
              <option value="member">Danh sách Đoàn viên</option>
            </select>
          </div>

          {/* Năm học */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Năm học</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.year}
              onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y} - {parseInt(y, 10) + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Học kỳ */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Học kỳ</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.semester}
              onChange={(e) => setFilters((prev) => ({ ...prev, semester: e.target.value }))}
            >
              {SEMESTERS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Vùng nút Export */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs text-gray-500">
          Báo cáo sẽ lấy dữ liệu theo{' '}
          <span className="font-medium text-gray-700">
            {filters.semester} - {filters.year}
          </span>{' '}
          với mẫu{' '}
          <span className="font-medium text-gray-700">
            {filters.type === 'activity'
              ? 'Hoạt động & tham gia'
              : filters.type === 'point'
              ? 'Điểm rèn luyện'
              : 'Danh sách Đoàn viên'}
          </span>
          .
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleExportExcel}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-emerald-500 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition"
          >
            Xuất Excel
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-indigo-500 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition"
          >
            Xuất PDF
          </button>
        </div>
      </div>

      {/* Thẻ tóm tắt */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Tổng số hoạt động</p>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">{summary.totalActivities}</p>
          <p className="mt-1 text-xs text-gray-400">Tính trên tất cả chi đoàn</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Tổng lượt tham gia</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">
            {summary.totalParticipants}
          </p>
          <p className="mt-1 text-xs text-gray-400">Lượt điểm danh trong kỳ</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Điểm rèn luyện TB</p>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{summary.avgPoint}</p>
          <p className="mt-1 text-xs text-gray-400">Trung bình của các chi đoàn</p>
        </div>
      </div>

      {/* Bảng chi tiết */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-medium text-gray-700">
            {filters.type === 'activity' && 'Báo cáo hoạt động & tham gia theo chi đoàn'}
            {filters.type === 'point' && 'Báo cáo điểm rèn luyện theo chi đoàn'}
            {filters.type === 'member' && 'Báo cáo tổng hợp Đoàn viên theo chi đoàn'}
          </h2>
          <span className="text-xs text-gray-400">Dữ liệu minh họa – sẽ nối API sau</span>
        </div>

        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="py-2 pr-4">Chi đoàn</th>
                {filters.type !== 'member' && <th className="py-2 pr-4">Số hoạt động</th>}
                <th className="py-2 pr-4">
                  {filters.type === 'member' ? 'Số Đoàn viên' : 'Lượt tham gia'}
                </th>
                {(filters.type === 'point' || filters.type === 'activity') && (
                  <th className="py-2 pr-4">Điểm RL TB</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredBranchReport.map((row) => (
                <tr key={row.branch} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 pr-4 font-medium text-gray-800">{row.branch}</td>

                  {filters.type !== 'member' && (
                    <td className="py-2 pr-4 text-gray-700">{row.activities}</td>
                  )}

                  <td className="py-2 pr-4 text-gray-700">
                    {filters.type === 'member'
                      ? Math.round(row.participants / 5) // demo: xem như số đoàn viên
                      : row.participants}
                  </td>

                  {(filters.type === 'point' || filters.type === 'activity') && (
                    <td className="py-2 pr-4 font-semibold text-emerald-600">{row.avgPoint}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-gray-400"></p>
      </div>
    </div>
  );
};

export default ReportsDashboard;
