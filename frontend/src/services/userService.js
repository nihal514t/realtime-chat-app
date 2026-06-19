import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const getUsers = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default {
  getUsers,
};
