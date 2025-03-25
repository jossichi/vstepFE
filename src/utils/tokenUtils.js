// utils/tokenUtils.js
const TOKEN_KEY = "authToken";

// Save the token to localStorage
export const saveToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
  }
};

// Retrieve the token from localStorage
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove the token from localStorage
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
// src/utils/tokenUtils.js

export const saveUserData = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData)); // Lưu toàn bộ thông tin người dùng vào localStorage
};

export const getUserData = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null; // Trả về thông tin người dùng nếu có, nếu không có thì trả về null
};

export const removeUserData = () => {
  localStorage.removeItem("user"); // Xóa thông tin người dùng khi đăng xuất
};
