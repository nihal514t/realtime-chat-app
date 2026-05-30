import { useState, useEffect } from "react";
import { getMessages, sendMessage } from "../services/messageService";
import socket from "../services/socketService";

function MessageArea({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const token = userInfo?.token;
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      const data = await getMessages(selectedUser._id, token);
      setMessages(data);
    };

    fetchMessages();
  }, [selectedUser, token]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a chat
      </div>
    );
  }

  const currentUserId = userInfo?._id;

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const sentMessage = await sendMessage(selectedUser._id, newMessage, token);

    setMessages((prev) => [...prev, sentMessage]);

    socket.emit("sendMessage", {
      receiverId: selectedUser._id,
      message: sentMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-gray-200 flex items-center px-6">
        <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg) => {
          const isMine = msg.senderId?.toString() === currentUserId;

          return (
            <div
              key={msg._id}
              className={`flex mb-3 ${
                isMine ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  isMine ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
        />

        <button
          className="px-5 py-2 bg-black text-white rounded-lg"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageArea;
