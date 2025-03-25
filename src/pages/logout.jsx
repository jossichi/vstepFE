import React, { useState } from "react";
import { logout } from "../utils/logoutUtils"; // Import hàm logout từ utils

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Hàm logout người dùng
  const handleLogout = async () => {
    setLoading(true);
    setMessage("");
    setError("");

    try {
      // Gọi hàm logout từ utils
      const successMessage = await logout();

      setMessage(successMessage);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="logout-container">
      <h2>Đăng xuất</h2>
      {loading ? (
        <p>Đang đăng xuất...</p>
      ) : (
        <div>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </div>
  );
};

export default Logout;
