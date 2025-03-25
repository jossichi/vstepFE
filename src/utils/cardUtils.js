import axios from "axios";

export const createCard = async (user_id, card_id) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cards/create`,
      { user_id, card_id } // 📌 Gửi cả hai giá trị
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Có lỗi xảy ra, vui lòng thử lại" };
  }
};
