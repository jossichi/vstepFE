// Import statements should always come at the top
// import { saveUserData } from "../utils/tokenUtils";
const BASE_URL =
  (process.env.REACT_APP_API_URL || "https://vstep-be.onrender.com") + "/api";

const authService = {
  loginWithQR: async (formData) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",

      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Error response:", errorData);
      throw new Error("Invalid QR Code");
    }

    const data = await response.json(); // Sau khi đăng nhập thành công, token phải được lưu vào localStorage

    // Trong mã đăng nhập
    if (data.token) {
      console.log("Token received:", data.token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("card_id", data.user.card_id); // assuming `data.user.card_id` exists
    }

    if (data.token && data.user) {
      // Lưu token và dữ liệu người dùng vào localStorage
      localStorage.setItem("token", data.token); // Lưu token vào localStorage
      localStorage.setItem("card_id", data.user.card_id); // Lưu card_id vào localStorage
      localStorage.setItem("user_data", JSON.stringify(data.user)); // Lưu user dữ liệu vào localStorage
    } else {
      console.log("No valid data in response:", data); // Kiểm tra nếu response không có token hoặc user
    }
    return data; // Return the data which includes the token
  },
  logout: async () => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("token");

    // Kiểm tra nếu không có token
    if (!token) {
      throw new Error("No token found. Please login first.");
    }

    // Lấy card_id từ localStorage
    const card_id = localStorage.getItem("card_id");

    // Kiểm tra nếu không có card_id
    if (!card_id) {
      throw new Error("No card_id found. Please login first.");
    }

    // Gửi yêu cầu logout tới server
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Gửi token trong header
      },
      body: JSON.stringify({ card_id }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error logging out");
    }

    // Sau khi logout thành công, xóa token khỏi localStorage
    localStorage.clear();

    return await response.json(); // Trả về thông điệp từ server
  },
};

export default authService;
