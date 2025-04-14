export const saveUserId = (user_id) => {
  localStorage.setItem("user_id", user_id);
};

export const getUserId = () => {
  return localStorage.getItem("user_id");
};

export const removeUserId = () => {
  localStorage.removeItem("user_id");
};
export const saveUserToken = (token) => {
  localStorage.setItem("token", token);
};
export const removeUserToken = () => {
  localStorage.removeItem("token");
};
export const getUserToken = () => {
  return localStorage.getItem("token");
};
