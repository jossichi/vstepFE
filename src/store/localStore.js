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

export const getUserToken = () => {
  return localStorage.getItem("token");
};

export const removeUserToken = () => {
  localStorage.removeItem("token");
};
export const saveUserProfile = (profile) => {
  localStorage.setItem("user_profile", JSON.stringify(profile));
};
export const getUserProfile = () => {
  const profile = localStorage.getItem("user_profile");
  return profile ? JSON.parse(profile) : null;
};
export const removeUserProfile = () => {
  localStorage.removeItem("user_profile");
};
export const saveUserCard = (card) => {
  localStorage.setItem("user_card", JSON.stringify(card));
};
export const getUserCard = () => {
  const card = localStorage.getItem("user_card");
  return card ? JSON.parse(card) : null;
};
export const removeUserCard = () => {
  localStorage.removeItem("user_card");
};
export const saveUserStats = (stats) => {
  localStorage.setItem("user_stats", JSON.stringify(stats));
};
export const getUserStats = () => {
  const stats = localStorage.getItem("user_stats");
  return stats ? JSON.parse(stats) : null;
};
