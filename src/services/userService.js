import axios from "axios";
import { getUserToken, getUserId } from "../store/localStore"; // Đảm bảo rằng bạn import đúng file

export const getUserProfile = async () => {
  try {
    // Lấy token và user_id từ localStorage
    const token = getUserToken();
    const user_id = getUserId();

    if (!token || !user_id) {
      console.error("❌ Thiếu token hoặc user_id trong localStorage.");
      return null;
    }

    // Gửi yêu cầu GET đến API để lấy thông tin người dùng
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      }
    );

    return res.data; // Trả về dữ liệu người dùng nhận được
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy thông tin người dùng:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
