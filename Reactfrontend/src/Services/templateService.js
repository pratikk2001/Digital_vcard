import axios from "axios";

const API_BASE_URL = "http://localhost:4500/api"; // Update with your backend URL

export const getUserFormData = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/template/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const saveBasicDetails = async (userId, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/template/${userId}/basic-details`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
