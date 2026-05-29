import Sidebar from "../components/Sidebar";
import MessageArea from "../components/MessageArea";

function Chat() {
  return (
    <div className="h-screen bg-[#f5f5f7] flex">
      <Sidebar />
      <MessageArea />
    </div>
  );
}

export default Chat;