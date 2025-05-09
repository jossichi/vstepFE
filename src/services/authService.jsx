// Chỉ cần cập nhật authService.js như sau:

const BASE_URL = process.env.REACT_APP_API_URL + "/api";

// Helper: Lấy user từ localStorage
const getUserFromStorage = () => {
  try {
    // Đổi từ localStorage sang sessionStorage
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("user_id");

    if (!token || !userId) {
      console.error("Thiếu token hoặc user_id trong sessionStorage.");
      return null;
    }

    // Kiểm tra dữ liệu người dùng
    const userData = sessionStorage.getItem("user_data");
    if (userData) {
      return JSON.parse(userData);
    } else {
      console.error("Không tìm thấy dữ liệu người dùng trong sessionStorage.");
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ sessionStorage:", error);
    return null;
  }
};

// Helper: Lưu user data vào sessionStorage
const saveUserDataToLocalStorage = (user, token) => {
  if (!user || !token) {
    console.warn("Invalid data. Không thể lưu dữ liệu vào sessionStorage.");
    return;
  }

  try {
    // Lưu thông tin người dùng và token vào sessionStorage thay vì localStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user_id", user.user_id); // Lưu user_id
    
    // Nếu có user_data, cũng lưu vào sessionStorage
    if (user) {
      sessionStorage.setItem("user_data", JSON.stringify(user));
    }

    console.log("Dữ liệu người dùng đã được lưu vào sessionStorage.");
  } catch (error) {
    console.error("Lỗi khi lưu dữ liệu vào sessionStorage:", error);
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

    // Lưu thông tin người dùng và token vào sessionStorage
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
  // Xóa tất cả dữ liệu từ sessionStorage
  sessionStorage.clear();
  console.log("User logged out and sessionStorage cleared.");
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