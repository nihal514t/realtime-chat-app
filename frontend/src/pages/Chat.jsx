import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";
import socket from "../services/socketService";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
  if (user?._id) {
    socket.emit("addUser", user._id);
  }
}, []);
  return (
    <div className="h-screen bg-[#f5f5f7] flex">
      <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
      <MessageArea selectedUser={selectedUser} />
    </div>
  );
}

export default Chat;
