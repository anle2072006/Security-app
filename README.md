# 🛡️ Web Security & Vulnerability Demo

SecLab là một ứng dụng web giáo dục được thiết kế để minh họa trực quan các lỗ hổng bảo mật web phổ biến (theo tiêu chuẩn OWASP Top 10) và cách khắc phục chúng. Dự án cung cấp cái nhìn so sánh trực tiếp (Side-by-Side) giữa mã nguồn lỗi (Vulnerable) và mã nguồn đã được gia cố (Hardened).

## 🚀 Tính năng chính
Ứng dụng tập trung vào 3 nhóm lỗ hổng kinh điển và các phương pháp phòng vệ hiện đại:

### 1. SQL Injection (SQLi)
Vulnerable: Minh họa cách nối chuỗi (String Concatenation) dẫn đến việc bị vượt qua đăng nhập (OR bypass) và trích xuất dữ liệu (UNION dump).

Hardened: Sử dụng Parameterized Queries (Prepared Statements) để tách biệt dữ liệu và mã lệnh.

### 2. Cross-Site Scripting (XSS)
Vulnerable: Cho phép chèn mã JavaScript độc hại vào DOM thông qua các ô nhập liệu.

Hardened: Áp dụng HTML Output Encoding và cấu hình Content Security Policy (CSP) để chặn thực thi script lạ.

### 3. Cross-Site Request Forgery (CSRF)
Vulnerable: Minh họa việc thực thi các hành động trái phép thay mặt người dùng thông qua các yêu cầu giả mạo.

Hardened: Sử dụng Anti-CSRF Tokens để xác thực tính hợp lệ của mọi yêu cầu.

### 4. Security Headers (Defense in Depth)
Triển khai thư viện Helmet.js để cấu hình các HTTP Response Headers quan trọng như:

Strict-Transport-Security (HSTS)

X-Frame-Options (Chống Clickjacking)

X-Content-Type-Options (Chống MIME sniffing)

## 🛠️ Công nghệ sử dụng
Frontend: HTML5, CSS3 (Giao diện Dark Mode chuyên nghiệp), JavaScript.

Backend: Node.js, Express.js.

Security Tools: Helmet.js, CSP, Express-Validator.

## 📦 Cài đặt và Chạy thử
Clone repository:

Bash
git clone https://github.com/anle2072006/Security-app.git
cd Security-app
Cài đặt thư viện:

Bash
npm install
Chạy ứng dụng:

Bash
npm start
Sau đó mở trình duyệt và truy cập: http://localhost:3000 (hoặc cổng bạn đã cấu hình).

## 📖 Mục đích học thuật
Dự án này được xây dựng nhằm mục đích:

Giúp lập trình viên hiểu rõ cơ chế hoạt động của các đòn tấn công web phổ biến.

Hướng dẫn áp dụng các Best Practices về bảo mật trong quá trình phát triển phần mềm (SDLC).

Cung cấp môi trường Lab an toàn để thử nghiệm các Payload tấn công cơ bản.

⚠️ Cảnh báo: Dự án này chỉ phục vụ mục đích giáo dục. Vui lòng không sử dụng các kỹ thuật tấn công này trên bất kỳ hệ thống nào khi chưa được phép.

Author: An Lê, Đức Anh
License: MIT
