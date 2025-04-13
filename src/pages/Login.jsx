import React from "react";
import QRScanner from "../components/QRScanner"; // Đảm bảo đường dẫn đúng

const LoginPage = () => {
  return (
    <div className="login-page">
      <h1>Đăng Nhập</h1>
      <QRScanner />
    </div>
  );
};

export default LoginPage;
