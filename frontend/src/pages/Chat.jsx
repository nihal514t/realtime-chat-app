import { useState, useEffect } from "react";
import Sidebar from "../components/sidebar";
import MessageArea from "../components/MessageArea";
import socket from "../services/socketService";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [refreshUnread, setRefreshUnread] = useState(0);
  useEffect(() => {
    if (user?._id) {
      socket.emit("addUser", user._id);
    }
  }, []);
  useEffect(() => {
    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("onlineUsers");
    };
  }, []);
  return (
    <div className="h-screen bg-[#f5f5f7] flex">
      <Sidebar
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onlineUsers={onlineUsers}
        refreshUnread={refreshUnread}
      />
      <MessageArea selectedUser={selectedUser} onMessageReceived={() =>
    setRefreshUnread((p) => p + 1)
  }/>
    </div>
  );
}

export default Chat;
