import axios from "axios";

const API = "http://localhost:8000/api/messages";

export const getMessages = async (userId, token) => {
  const res = await axios.get(`${API}/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const sendMessage = async (receiverId, message, token) => {
  const res = await axios.post(
    API,
    {
      receiverId,
      message,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const updateMessageStatus = async (messageId, status, token) => {
  const res = await axios.put(
    `${API}/${messageId}/status`,
    { status },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return res.data;
};

export const getUnreadCounts = async (token) => {
  const res = await axios.get(`${API}/unread`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
