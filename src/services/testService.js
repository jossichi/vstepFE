import axios from "axios";

const API_URL = "http://localhost:3000/api/test";

export const testService = {
  getAllTests: async () => {
    const response = await axios.get(API_URL);
    return response.data;
  },

  getTestById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  createTest: async (testData) => {
    const response = await axios.post(API_URL, testData);
    return response.data;
  },

  updateTest: async (id, testData) => {
    const response = await axios.put(`${API_URL}/${id}`, testData);
    return response.data;
  },

  deleteTest: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
  getUserTests: async () => {
    const response = await fetch(`${API_URL}/user-tests`);
    if (!response.ok) throw new Error("Failed to fetch user tests");
    return response.json();
  },
};
export default testService;
