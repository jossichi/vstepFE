import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService"; // Dịch vụ logout
import { AuthContext } from "../context/AuthContext"; // Context người dùng

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Kiểm tra token trước khi logout
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login first.");
      }
      console.log("Token found:", token);

      // Gọi service logout
      const response = await authService.logout(); // Gọi API logout

      // Xóa dữ liệu người dùng khỏi localStorage
      localStorage.clear();

      // Cập nhật context với trạng thái logout
      logout();

      // Điều hướng người dùng đến trang đăng nhập sau khi logout
      navigate("/login");

      alert(response.message); // Thông báo thành công
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <button className="nav-link" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
