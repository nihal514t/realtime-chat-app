import { useState, useEffect } from "react";
import { getMessages } from "../services/messageService";

function MessageArea({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("user"));

  const token = userInfo?.token;
  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      const data = await getMessages(selectedUser._id,token);
      setMessages(data);
    };

    fetchMessages();
  }, [selectedUser]);
  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center">
        Select a chat
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <div className="h-20 border-b border-gray-200 flex items-center px-6">
        <h2 className="text-xl font-semibold">{selectedUser.name}</h2>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4">
        Messages will appear here
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

        <button className="px-5 py-2 bg-black text-white rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}



export default MessageArea;
