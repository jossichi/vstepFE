// localStore.js
export const getUserToken = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("❌ Không tìm thấy token trong localStorage.");
      return null;
    }
    return token;
  } catch (error) {
    console.error("Lỗi khi lấy token từ localStorage:", error);
    return null;
  }
};

export const getUserId = () => {
  try {
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("❌ Không tìm thấy user_id trong localStorage.");
      return null;
    }
    return userId;
  } catch (error) {
    console.error("Lỗi khi lấy user_id từ localStorage:", error);
    return null;
  }
};
