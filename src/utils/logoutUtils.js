import axios from "axios";

// Hàm logout
export const logout = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Không tìm thấy token đăng nhập");
    }

    // Gửi request đến server để logout
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/logout`, // Đảm bảo API URL chính xác
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    // Xóa token khỏi localStorage sau khi logout thành công
    localStorage.removeItem("token");

    return response.data.message; // Trả về thông điệp từ server (thường là "Logout successful.")
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Có lỗi xảy ra khi đăng xuất"
    );
  }
};
