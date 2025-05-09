import React from "react";
import QRScanner from "../components/QRScanner"; // Đảm bảo đường dẫn đúng

const LoginPage = () => {
  return (
    <div className="login-page">
      <QRScanner />
    </div>
  );
};

export default LoginPage;
