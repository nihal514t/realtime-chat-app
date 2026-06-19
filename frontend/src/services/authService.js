import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);

  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);

  return response.data;
};

const getMe = async (token) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  register,
  login,
  getMe,
};
