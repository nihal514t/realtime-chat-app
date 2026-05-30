import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";

function Chat() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="h-screen bg-[#f5f5f7] flex">
      <Sidebar selectedUser={selectedUser}
  setSelectedUser={setSelectedUser} />
      <MessageArea selectedUser={selectedUser}/>
    </div>
  );
}

export default Chat;
