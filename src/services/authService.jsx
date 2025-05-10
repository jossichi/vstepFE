const BASE_URL = process.env.REACT_APP_API_URL + "/api";

// Helper: Lấy user từ localStorage
const getUserFromStorage = () => {
  try {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("user_id");

    if (!token || !userId) {
      console.error("Thiếu token hoặc user_id trong localStorage.");
      return null;
    }

    // Kiểm tra dữ liệu người dùng
    const userData = localStorage.getItem("user_data");
    if (userData) {
      return JSON.parse(userData);
    } else {
      console.error("Không tìm thấy dữ liệu người dùng trong localStorage.");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ localStorage:", error);
    return null;
  }
};

// Helper: Lưu user data vào localStorage
const saveUserDataToLocalStorage = (user, token) => {
  if (!user || !token) {
    console.warn("Invalid data. Không thể lưu dữ liệu vào localStorage.");
    return;
  }

  try {
    // Lưu thông tin người dùng và token vào localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("user_id", user.user_id); // Lưu user_id

    console.log("Dữ liệu người dùng đã được lưu vào localStorage.");
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu vào localStorage:", error);
  }
};

// Hàm đăng nhập với QR code
const loginWithQR = async (formData) => {
  try {
    // Gửi request đăng nhập đến server
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData);
      throw new Error(errorData.message || "Lỗi đăng nhập, vui lòng thử lại.");
    }

    // Lấy dữ liệu từ server
    const data = await response.json();

    console.log("Login response:", data);

    // Kiểm tra nếu dữ liệu trả về thiếu token hoặc user_id
    if (!data.token || !data.user_id) {
      console.error("Dữ liệu trả về thiếu token hoặc user_id.");
      throw new Error("Dữ liệu trả về không hợp lệ. Vui lòng kiểm tra lại.");
    }

    // Lưu thông tin người dùng và token vào localStorage
    saveUserDataToLocalStorage({ user_id: data.user_id }, data.token);

    console.log("User logged in successfully.");

    return data;
  } catch (error) {
    console.error("Login error:", error.message);
    alert("Lỗi xác thực trong quá trình đăng nhập: " + error.message);
    throw error; // Đảm bảo lỗi được ném ra để có thể xử lý ở nơi gọi
  }
};

// Logout
const logout = async () => {
  // Clear all data from localStorage
  localStorage.clear();
  console.log("User logged out and localStorage cleared.");
  return true;
};

// Assign the object to a variable
const authService = {
  loginWithQR,
  saveUserDataToLocalStorage,
  logout,
  getUserFromStorage,
};

// Export the object
export default authService;