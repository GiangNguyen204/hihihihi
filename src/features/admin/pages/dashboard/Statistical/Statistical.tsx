import { useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const StatisticalDashboard = () => {
  // ====== DỮ LIỆU MẪU (sau này thay bằng API) ======
  const [filters, setFilters] = useState({
    year: '2025',
    semester: 'HK1',
    branch: 'all',
  });

  const branchStats = [
    // year, semester, branch, avgPoint, participation(%), activities
    {
      year: '2025',
      semester: 'HK1',
      branch: 'CTK14A',
      avgPoint: 84,
      participation: 88,
      activities: 12,
    },
    {
      year: '2025',
      semester: 'HK1',
      branch: 'CTK14B',
      avgPoint: 79,
      participation: 82,
      activities: 10,
    },
    {
      year: '2025',
      semester: 'HK1',
      branch: 'CTK15A',
      avgPoint: 81,
      participation: 90,
      activities: 13,
    },
    {
      year: '2025',
      semester: 'HK1',
      branch: 'CTK15B',
      avgPoint: 76,
      participation: 74,
      activities: 9,
    },

    {
      year: '2025',
      semester: 'HK2',
      branch: 'CTK14A',
      avgPoint: 86,
      participation: 91,
      activities: 14,
    },
    {
      year: '2025',
      semester: 'HK2',
      branch: 'CTK14B',
      avgPoint: 80,
      participation: 84,
      activities: 11,
    },
    {
      year: '2025',
      semester: 'HK2',
      branch: 'CTK15A',
      avgPoint: 83,
      participation: 92,
      activities: 15,
    },
    {
      year: '2025',
      semester: 'HK2',
      branch: 'CTK15B',
      avgPoint: 78,
      participation: 79,
      activities: 10,
    },
  ];

  const topMembers = [
    { name: 'Nguyễn Văn A', branch: 'CTK14A', activities: 18, point: 95 },
    { name: 'Trần Thị B', branch: 'CTK15A', activities: 16, point: 93 },
    { name: 'Lê Văn C', branch: 'CTK14B', activities: 15, point: 91 },
    { name: 'Phạm Thị D', branch: 'CTK15B', activities: 14, point: 90 },
    { name: 'Đỗ Văn E', branch: 'CTK14A', activities: 13, point: 89 },
  ];

  const years = ['2024', '2025'];
  const semesters = ['HK1', 'HK2'];
  const branches = ['CTK14A', 'CTK14B', 'CTK15A', 'CTK15B'];

  // ====== TÍNH TOÁN THEO BỘ LỌC ======
  const filteredBranchStats = useMemo(() => {
    return branchStats.filter((item) => {
      const matchYear = item.year === filters.year;
      const matchSem = item.semester === filters.semester;
      const matchBranch = filters.branch === 'all' ? true : item.branch === filters.branch;
      return matchYear && matchSem && matchBranch;
    });
  }, [branchStats, filters]);

  const semesterTrend = useMemo(() => {
    // 👇 ĐÁNH KIỂU RÕ RÀNG CHO GROUPED
    const grouped: Record<string, { semester: string; totalPoint: number; count: number }> = {};

    branchStats.forEach((item) => {
      if (item.year !== filters.year) return;
      if (filters.branch !== 'all' && item.branch !== filters.branch) return;

      const key = item.semester;
      if (!grouped[key]) {
        grouped[key] = { semester: key, totalPoint: 0, count: 0 };
      }
      grouped[key].totalPoint += item.avgPoint;
      grouped[key].count += 1;
    });

    return Object.values(grouped)
      .map((g) => ({
        semester: g.semester,
        avg: g.totalPoint / g.count,
      }))
      .sort((a, b) => (a.semester > b.semester ? 1 : -1));
  }, [branchStats, filters]);

  const summary = useMemo(() => {
    if (filteredBranchStats.length === 0) {
      return { avgPoint: 0, avgParticipation: 0, totalActivities: 0 };
    }
    const totalPoint = filteredBranchStats.reduce((sum, item) => sum + item.avgPoint, 0);
    const totalParticipation = filteredBranchStats.reduce(
      (sum, item) => sum + item.participation,
      0,
    );
    const totalActivities = filteredBranchStats.reduce((sum, item) => sum + item.activities, 0);
    const count = filteredBranchStats.length;

    return {
      avgPoint: (totalPoint / count).toFixed(1),
      avgParticipation: (totalParticipation / count).toFixed(1),
      totalActivities,
    };
  }, [filteredBranchStats]);

  // ====== JSX GIAO DIỆN ======
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Thống kê</h1>
          <p className="text-gray-500">Phân tích dữ liệu theo năm học, học kỳ, chi đoàn</p>
        </div>

        {/* Bộ lọc */}
        <div className="flex flex-wrap gap-3">
          {/* Năm học */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Năm học</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.year}
              onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))}
            >
              {years.map((y) => (
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
              {semesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Chi đoàn */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1">Chi đoàn</label>
            <select
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm"
              value={filters.branch}
              onChange={(e) => setFilters((prev) => ({ ...prev, branch: e.target.value }))}
            >
              <option value="all">Tất cả</option>
              {branches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Thẻ tổng quan */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Điểm rèn luyện trung bình</p>
          <p className="mt-2 text-3xl font-semibold text-blue-600">{summary.avgPoint}</p>
          <p className="mt-1 text-xs text-gray-400">Trung bình của các chi đoàn trong bộ lọc</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Tỷ lệ tham gia trung bình</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-600">
            {summary.avgParticipation}%
          </p>
          <p className="mt-1 text-xs text-gray-400">Tính trên tổng số hoạt động đã tổ chức</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <p className="text-xs font-medium text-gray-500">Tổng số hoạt động</p>
          <p className="mt-2 text-3xl font-semibold text-indigo-600">{summary.totalActivities}</p>
          <p className="mt-1 text-xs text-gray-400">Các hoạt động được thống kê trong kỳ</p>
        </div>
      </div>

      {/* Biểu đồ 1: So sánh chi đoàn */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium text-gray-700">
            📊 So sánh chi đoàn trong {filters.semester} - {filters.year}
          </h2>
          <p className="text-xs text-gray-400">Hiển thị điểm rèn luyện & tỷ lệ tham gia</p>
        </div>

        {filteredBranchStats.length === 0 ? (
          <p className="text-sm text-gray-500">Không có dữ liệu phù hợp với bộ lọc.</p>
        ) : (
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={filteredBranchStats} barGap={8}>
              <XAxis dataKey="branch" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="avgPoint" name="Điểm rèn luyện" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar
                dataKey="participation"
                name="Tỷ lệ tham gia (%)"
                fill="#0ea5e9"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Biểu đồ 2 + Top Đoàn viên */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Xu hướng điểm theo học kỳ */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-700 mb-4">
            📈 Xu hướng điểm rèn luyện theo học kỳ ({filters.year})
          </h2>
          {semesterTrend.length === 0 ? (
            <p className="text-sm text-gray-500">Chưa có dữ liệu để thống kê xu hướng.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={semesterTrend}>
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avg"
                  name="Điểm trung bình"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Đoàn viên tích cực */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-medium text-gray-700 mb-4">🏅 Top Đoàn viên tích cực</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b border-gray-100">
                <th className="py-2">#</th>
                <th>Họ tên</th>
                <th>Chi đoàn</th>
                <th>Hoạt động</th>
                <th>Điểm RL</th>
              </tr>
            </thead>
            <tbody>
              {topMembers.map((m, idx) => (
                <tr key={m.name} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-2 text-gray-500">{idx + 1}</td>
                  <td className="py-2 font-medium text-gray-800">{m.name}</td>
                  <td className="py-2 text-gray-600">{m.branch}</td>
                  <td className="py-2 text-gray-700">{m.activities}</td>
                  <td className="py-2 font-semibold text-emerald-600">{m.point}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-2 text-xs text-gray-400"></p>
        </div>
      </div>
    </div>
  );
};

export default StatisticalDashboard;
