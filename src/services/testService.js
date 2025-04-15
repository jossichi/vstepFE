// src/services/testService.js
import axios from "axios";
import { getUserToken, getUserId } from "../store/localStore";
const API_URL = `${process.env.REACT_APP_API_URL}/api`;

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
export const userTestService = {
  evaluateTest: async (answersPayload) => {
    const token = getUserToken();
    const user_id = getUserId();

    if (!user_id || !token) {
      throw new Error("Không tìm thấy thông tin đăng nhập người dùng.");
    }

    const data = {
      user_id,
      ...answersPayload, // gồm test_id và answers
    };

    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/evaluateTest`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res.data;
  },
};
