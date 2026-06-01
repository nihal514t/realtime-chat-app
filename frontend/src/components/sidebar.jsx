import { useEffect, useState } from "react";
import userService from "../services/userService";
import { getUnreadCounts } from "../services/messageService";

function Sidebar({
  selectedUser,
  setSelectedUser,
  onlineUsers,
  refreshUnread,
}) {
  const [users, setUsers] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState([]);

  const fetchUnreadCounts = async () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const unread = await getUnreadCounts(storedUser.token);

    setUnreadCounts(unread);
  };
  useEffect(() => {
    fetchUnreadCounts();
  }, [refreshUnread]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        const token = storedUser.token;

        const data = await userService.getUsers(token);

        setUsers(data);
        const unread = await getUnreadCounts(token);

        setUnreadCounts(unread);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="w-80 border-r border-gray-200 bg-white">
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">Chats</h2>
      </div>

      <div className="p-4 space-y-2">
        {users.map((user) => {
          const isOnline = onlineUsers.includes(user._id.toString());
          const unread = unreadCounts.find((item) => item._id === user._id);

          const unreadCount = unread?.count || 0;

          return (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 rounded-2xl cursor-pointer transition ${
                selectedUser?._id === user._id
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{user.name}</span>

                  {unreadCount > 0 && (
                    <div className="bg-green-500 text-white text-xs min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                      {unreadCount}
                    </div>
                  )}
                </div>

                {isOnline && (
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
