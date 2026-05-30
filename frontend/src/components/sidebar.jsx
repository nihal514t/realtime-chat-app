import { useEffect, useState } from "react";
import userService from "../services/userService";

function Sidebar({ selectedUser, setSelectedUser, onlineUsers }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        const token = storedUser.token;

        const data = await userService.getUsers(token);

        setUsers(data);
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
                <span>{user.name}</span>

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
