<h2 align="center">
    <a href="https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin">
    🎓 Khoa Công Nghệ Thông Tin – Trường Đại học Đại Nam
    </a>
</h2>
<h2 align="center">
   🚀 Hệ Thống Web Quản Lý Công Tác Đoàn
</h2>

<div align="center">
    <p align="center">
        <img width="170"  alt="AIoTLab Logo" src="https://github.com/user-attachments/assets/722ef6fe-9b09-41f4-9d58-a752e2be9da4" />
        <img width="180"  alt="FIT DNU Logo" src="https://github.com/user-attachments/assets/38f342e5-4c81-4d22-b1d0-985cf91c702c" />
        <img width="200"  alt="DaiNam University" src="https://github.com/user-attachments/assets/11138726-5355-4c53-9fdb-bec177681ae0" />
    </p>

[![Faculty of Information Technology](https://img.shields.io/badge/Faculty%20of%20Information%20Technology-blue?style=for-the-badge)](https://dainam.edu.vn/vi/khoa-cong-nghe-thong-tin)
[![DaiNam University](https://img.shields.io/badge/DaiNam%20University-orange?style=for-the-badge)](https://dainam.edu.vn)
[![Node.js](https://img.shields.io/badge/Node.js-green?style=for-the-badge)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React.js-blue?style=for-the-badge)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/TailwindCSS-lightblue?style=for-the-badge)](https://tailwindcss.com/)
</div>

---

## 📘 1. Giới thiệu hệ thống

**Hệ thống Web Quản lý Công tác Đoàn** được phát triển nhằm số hoá nghiệp vụ quản lý hoạt động Đoàn – Hội của **Liên Chi Đoàn Khoa CNTT**, giúp tự động hoá việc thống kê, tra cứu và truyền thông nội bộ trong công tác thanh niên.

### 🎯 Mục tiêu chính
- Quản lý thông tin **đoàn viên, chi đoàn, Ban Chấp hành** và các **hoạt động Đoàn – Hội**.
- Cho phép **tra cứu lịch sử tham gia hoạt động** của đoàn viên dựa trên mã sinh viên.
- Cung cấp **bảng tin – liên hệ – phân quyền truy cập** cho 3 nhóm vai trò: Đoàn viên, Cán bộ Đoàn, Quản trị viên.
- Tăng hiệu quả phối hợp giữa đoàn viên và Ban Chấp hành thông qua nền tảng web hiện đại.

---

## ⚙️ 2. Công nghệ và công cụ phát triển

| Thành phần | Công nghệ / Công cụ sử dụng | Mô tả |
|-------------|-----------------------------|--------|
| **Frontend** | React.js + Tailwind CSS | Xây dựng giao diện động, responsive, theo mô hình component. |
| **Backend** | Node.js (Express.js) | Cung cấp REST API, xử lý xác thực và kết nối dữ liệu. |
| **API mô tả** | Swagger / OpenAPI | Sinh tài liệu API và thử nghiệm các endpoint. |
| **Môi trường lập trình** | Visual Studio / Visual Studio Code | Soạn thảo, quản lý và gỡ lỗi mã nguồn. |
| **Cơ sở dữ liệu (mô phỏng)** | JSON hoặc API mẫu | Minh họa lưu trữ thông tin đoàn viên, hoạt động, BCH. |

---

## 🧭 3. Chức năng chính

### 👥 Quản lý người dùng và phân quyền
- Đăng nhập với ba vai trò: **Đoàn viên – Cán bộ Đoàn – Admin**.  
- Giao diện đăng nhập trực quan, chia tab theo vai trò.  
- Mỗi vai trò có mức truy cập và quyền thao tác riêng biệt.

### 📰 Trang chủ & Tin tức
- Hiển thị banner, giới thiệu về **Liên Chi Đoàn Khoa CNTT**.  
- Danh mục **tin tức** được trình bày dưới dạng thẻ bài, có ảnh, tiêu đề, ngày đăng.

### 🔍 Tra cứu hoạt động Đoàn
- Tra cứu theo **mã sinh viên** để xem danh sách các hoạt động đã tham gia.  
- Kết quả bao gồm tên hoạt động, thời gian, vai trò (tham gia / hỗ trợ / BTC).  
- API mẫu minh họa cho khả năng kết nối hệ thống điểm rèn luyện trong tương lai.

### 🧑‍💼 Ban Chấp Hành Chi Đoàn
- Hiển thị danh sách **Bí thư, Phó bí thư, Ủy viên, Cán bộ chi đoàn**.  
- Có bộ lọc theo **nhiệm kỳ** và **chi đoàn**.  
- Mỗi thẻ hiển thị họ tên, chức vụ, email, số điện thoại, chi đoàn phụ trách.

### 💬 Liên hệ & Góp ý
- Biểu mẫu liên hệ gồm họ tên, email, chủ đề, nội dung chi tiết.  
- Gửi dữ liệu về backend lưu lại và phân loại cho cán bộ phụ trách.

---

## 🏗️ 4. Kiến trúc hệ thống

```text
[React.js + Tailwind CSS] ⇄ [Node.js Backend + Express]
          ⇓ Swagger/OpenAPI
     [Database / Mock API / JSON Data]
