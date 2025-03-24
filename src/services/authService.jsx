import axios from "axios";

const API_URL = "https://fs505p2m-3000.asse.devtunnels.ms/";

export const userService = {
  login: async (email) => {
    const response = await axios.post(`${API_URL}/login`, { email });
    return response.data;
  },
};
