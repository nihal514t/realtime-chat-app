const onlineUsers = new Map();

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.keys())
      );
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit(
        "onlineUsers",
        Array.from(onlineUsers.keys())
      );

      console.log(
        "User Disconnected:",
        socket.id
      );
    });
  });
};

module.exports = {
  initializeSocket,
  onlineUsers,
};