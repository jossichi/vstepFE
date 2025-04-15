import authService from "../services/authService"; // Dịch vụ logout
import "../assets/styles/logoutBtn.css";
const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await authService.logout(); // Gọi logout từ authService
      window.location.href = "/"; // Điều hướng về trang chủ
    } catch (err) {
      console.error("Logout error:", err); // In lỗi nếu logout thất bại
    }
  };

  return (
    <button onClick={handleLogout} className="btn btn-logout">
      <span className="logout-title"> LOG OUT</span>
    </button>
  );
};

export default LogoutButton;
