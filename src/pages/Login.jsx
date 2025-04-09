import { useContext, useState } from "react";
import QRScanner from "../components/QRScanner";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (qrData) => {
    console.log("📌 QR Data nhận được:", qrData);

    try {
      const response = await authService.loginWithQR({ qrCode: qrData });

      // Lưu thông tin vào localStorage
      const { token, user, card_id } = response;
      if (token && user) {
        localStorage.setItem("token", token);
        localStorage.setItem("card_id", card_id);
        localStorage.setItem("user_data", JSON.stringify(user));
      }

      login(response);
      navigate("/dashboard"); // Chuyển hướng
    } catch (err) {
      setError("Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h2>Đăng nhập bằng QR Code</h2>
      <QRScanner onScan={handleScan} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
