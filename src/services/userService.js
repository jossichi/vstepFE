import axios from "axios";
import { getUserToken, getUserId } from "../store/localStore"; // getUserId là hàm bạn cần có để lấy user_id

export const getUserProfile = async () => {
  try {
    const token = getUserToken();
    const user_id = getUserId();

    if (!token || !user_id) {
      console.error("❌ Thiếu token hoặc user_id trong localStorage.");
      return null;
    }

    // console.log("🔐 Token đang gửi:", token);
    // console.log("👤 user_id:", user_id);

    // Gửi yêu cầu GET đến API đúng endpoint
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/users/${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    console.error(
      "❌ Lỗi khi lấy thông tin người dùng:",
      error.response ? error.response.data : error.message
    );
    return null;
  }
};
