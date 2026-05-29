import axios from "axios";

const API_URL = "http://localhost:8000/api/users";

const getUsers = async (token) => {
  const response = await axios.get(
    API_URL,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export default {
  getUsers,
};