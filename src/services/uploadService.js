// /src/services/uploadService.js
import axios from "axios";
const API_URL = `${process.env.REACT_APP_API_URL}`;

const uploadMaterial = async (formData) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/process-material`,
      formData
    );
    return response.data; // Trả về dữ liệu từ server
  } catch (error) {
    console.error("Error uploading material", error);
    throw new Error("Failed to upload material.");
  }
};

export default uploadMaterial;
