function Sidebar() {
  return (
    <div className="w-80 border-r border-gray-200 bg-white">
      <div className="h-20 flex items-center px-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold">
          Chats
        </h2>
      </div>

      <div className="p-4">
        <div className="p-4 rounded-2xl hover:bg-gray-100 cursor-pointer transition">
          Alex
        </div>

        <div className="p-4 rounded-2xl hover:bg-gray-100 cursor-pointer transition">
          Sarah
        </div>
      </div>
    </div>
  );
}

export default Sidebar;