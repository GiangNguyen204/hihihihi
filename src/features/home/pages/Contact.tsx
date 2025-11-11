import React, { useState } from 'react';

type Topic = 'activity' | 'score' | 'account' | 'other';

const ContactPage: React.FC = () => {
  const [topic, setTopic] = useState<Topic>('activity');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call API gửi mail/góp ý
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-10 space-y-8">
        {/* Tiêu đề */}
        <header className="space-y-2 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
            LIÊN HỆ LIÊN CHI ĐOÀN KHOA CNTT
          </h1>
          <p className="text-gray-600">
            Nếu bạn có thắc mắc về hoạt động Đoàn, điểm rèn luyện hoặc cần hỗ trợ, hãy gửi thông tin
            cho chúng tôi.
          </p>
        </header>

        <div className="grid md:grid-cols-[1.4fr,1fr] gap-8">
          {/* Form liên hệ */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Gửi góp ý / hỗ trợ</h2>

            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-600 mb-1">
                    Họ và tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2"
                    placeholder="ban@dnu.edu.vn"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">Nội dung liên quan</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value as Topic)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                >
                  <option value="activity">Hoạt động Đoàn / tham gia</option>
                  <option value="score">Điểm rèn luyện / đánh giá Đoàn viên</option>
                  <option value="account">Tài khoản hệ thống</option>
                  <option value="other">Khác</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-600 mb-1">
                  Nội dung chi tiết <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2"
                  placeholder="Mô tả vấn đề bạn gặp phải hoặc góp ý cho công tác Đoàn..."
                />
              </div>

              <div className="flex justify-between items-center">
                {sent && (
                  <p className="text-xs text-emerald-600">
                    (Demo) Đã gửi thông tin, BCH sẽ phản hồi qua email cho bạn.
                  </p>
                )}
                <button
                  type="submit"
                  className="ml-auto px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
                >
                  Gửi liên hệ
                </button>
              </div>
            </form>
          </section>

          {/* Thông tin liên hệ + bản đồ */}
          <section className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 text-sm space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Thông tin liên hệ</h2>
              <p className="text-gray-700 font-medium">Liên chi Đoàn Khoa Công nghệ thông tin</p>
              <p className="text-gray-600">
                Trường Đại học Đại Nam – Số xx, đường yy, quận zz, Hà Nội
              </p>
              <p className="text-gray-600">
                📞 Điện thoại: <span className="font-medium">0123 456 789</span>
              </p>
              <p className="text-gray-600">
                📧 Email: <span className="font-medium">doan.cntt@dnu.edu.vn</span>
              </p>
              <p className="text-gray-600">
                📘 Fanpage: <span className="font-medium">LCĐ Khoa CNTT – ĐH Đại Nam</span>
              </p>
              <p className="text-gray-500 text-xs">
                Giờ làm việc: Thứ 2 – Thứ 6, 8h00 – 11h30 & 13h30 – 17h00
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
