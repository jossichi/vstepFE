// src/services/testService.js
import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/api`;
console.log("API URL:", API_URL);

export const testService = {
  getTestById: async (id) => {
    const response = await axios.get(`${API_URL}/tests/${id}`);
    return response.data;
  },

  createTest: async (data, isFormData = false) => {
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    const payload = isFormData ? data : JSON.stringify(data);

    const response = await axios.post(`${API_URL}/tests`, payload, { headers });
    return response.data;
  },

  updateTest: async (id, data, isFormData = false) => {
    const headers = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

    const payload = isFormData ? data : JSON.stringify(data);

    const response = await axios.put(`${API_URL}/tests/${id}`, payload, {
      headers,
    });
    return response.data;
  },

  deleteTest: async (id) => {
    const response = await axios.delete(`${API_URL}/tests/${id}`);
    return response.data;
  },

  getAllTests: async () => {
    const response = await axios.get(`${API_URL}/tests`);
    return response.data;
  },
};
