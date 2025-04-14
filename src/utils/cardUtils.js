import axios from "axios";

export const createCard = async (user_id, studentID) => {
  try {
    // Gửi request tới server để tạo thẻ
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/cards/create`,
      {
        user_id,
        studentID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Trả về dữ liệu từ server
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có từ server
    if (error.response) {
      // Nếu có lỗi từ server, trả về message từ server
      const message =
        error.response.data?.error || "Có lỗi xảy ra, vui lòng thử lại";
      throw new Error(message);
    } else if (error.request) {
      // Nếu không có phản hồi từ server
      throw new Error(
        "Không thể kết nối đến server, vui lòng kiểm tra lại kết nối"
      );
    } else {
      // Nếu có lỗi trong quá trình gửi request
      throw new Error(error.message || "Đã xảy ra lỗi, vui lòng thử lại");
    }
  }
};
