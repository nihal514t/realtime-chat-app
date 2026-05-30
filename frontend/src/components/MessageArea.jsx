import { useState, useEffect, useRef } from "react";
import {
  getMessages,
  sendMessage,
  updateMessageStatus,
} from "../services/messageService";
import socket from "../services/socketService";

function MessageArea({ selectedUser }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const userInfo = JSON.parse(localStorage.getItem("user"));

  const token = userInfo?.token;
  const currentUserId = userInfo?._id;

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const data = await getMessages(selectedUser._id, token);

        setMessages(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, [selectedUser, token]);

  useEffect(() => {
    socket.on("receiveMessage", async (message) => {
      if (message.senderId?.toString() === selectedUser?._id) {
        setMessages((prev) => [...prev, message]);
      }

      await updateMessageStatus(message._id, "delivered", token);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [selectedUser, token]);

  useEffect(() => {
    socket.on("userTyping", () => {
      setIsTyping(true);
    });

    socket.on("userStoppedTyping", () => {
      setIsTyping(false);
    });

    return () => {
      socket.off("userTyping");
      socket.off("userStoppedTyping");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const sentMessage = await sendMessage(
        selectedUser._id,
        newMessage,
        token,
      );

      setMessages((prev) => [...prev, sentMessage]);

      socket.emit("sendMessage", {
        receiverId: selectedUser._id,
        message: sentMessage,
      });

      socket.emit("stopTyping", {
        receiverId: selectedUser._id,
      });

      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

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

      {/* Messages */}
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
                className={`max-w-md px-4 py-2 rounded-2xl ${
                  isMine ? "bg-black text-white" : "bg-white text-black"
                }`}
              >
                <p>{msg.message}</p>

                <p
                  className={`text-xs mt-2 ${
                    isMine ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  {new Date(msg.createdAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}

        <div ref={messagesEndRef}></div>
      </div>
      {isTyping && (
        <div className="px-4 pb-2 text-sm text-gray-500">
          {selectedUser.name} is typing...
        </div>
      )}
      {/* Input */}
      <div className="border-t border-gray-200 p-4 flex gap-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);

            socket.emit("typing", {
              receiverId: selectedUser._id,
              senderName: userInfo.name,
            });

            clearTimeout(typingTimeoutRef.current);

            typingTimeoutRef.current = setTimeout(() => {
              socket.emit("stopTyping", {
                receiverId: selectedUser._id,
              });
            }, 1000);
          }}
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none"
        />

        <button
          onClick={handleSend}
          className="px-5 py-2 bg-black text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessageArea;
