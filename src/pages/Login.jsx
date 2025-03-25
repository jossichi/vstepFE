import { useContext, useState } from "react";
import QRScanner from "../components/QRScanner";
import { AuthContext } from "../context/AuthContext";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleScan = async (qrData, qrImage) => {
    console.log("QR Data: ", qrData); // Log QR data to ensure it's correct
    console.log("QR Image: ", qrImage); // Log QR image to check if it's a valid file

    // Kiểm tra nếu không có qrImage hoặc không phải là đối tượng file hợp lệ
    if (!qrImage || !(qrImage instanceof File)) {
      setError("No image file provided or invalid file format.");
      return; // Return early if no image file
    }

    try {
      const formData = new FormData();
      formData.append("qrCode", JSON.stringify(qrData)); // Assuming qrData is an object
      formData.append("qrImage", qrImage); // qrImage should be a file object

      // Gửi request login và nhận dữ liệu user
      const response = await authService.loginWithQR(formData);

      // Lưu toàn bộ dữ liệu vào localStorage
      const { token, user, card_id } = response; // Dữ liệu nhận được từ API
      if (token && user) {
        localStorage.setItem("token", token); // Lưu token vào localStorage
        localStorage.setItem("card_id", card_id); // Lưu card_id vào localStorage
        localStorage.setItem("user_data", JSON.stringify(user)); // Lưu thông tin user vào localStorage
      }

      // Hiển thị dữ liệu đã lưu vào localStorage
      console.log("Token saved:", localStorage.getItem("token"));
      console.log("Card ID saved:", localStorage.getItem("card_id"));
      console.log(
        "User Data saved:",
        JSON.parse(localStorage.getItem("user_data"))
      );

      login(response); // Đăng nhập thành công, gọi login context
      navigate("/dashboard"); // Chuyển hướng đến dashboard
    } catch (err) {
      setError("Đăng nhập thất bại, vui lòng thử lại.");
    }
  };

  return (
    <div>
      <h2>Đăng nhập bằng QR Code</h2>
      <QRScanner onScan={handleScan} />{" "}
      {/* Pass the qrData and qrImage to handleScan */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* Display saved data from localStorage */}
      <div>
        <h3>Thông tin người dùng từ localStorage:</h3>
        <p>
          <strong>Token:</strong> {localStorage.getItem("token")}
        </p>
        <p>
          <strong>Card ID:</strong> {localStorage.getItem("card_id")}
        </p>
        <p>
          <strong>User Data:</strong>{" "}
          {JSON.stringify(JSON.parse(localStorage.getItem("user_data")))}
        </p>
      </div>
    </div>
  );
};

export default Login;
