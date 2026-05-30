const onlineUsers = new Map();

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("addUser", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));
    });

    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", message);
      }
    });

    socket.on("typing", ({ receiverId, senderName }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", senderName);
      }
    });

    socket.on("stopTyping", ({ receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userStoppedTyping");
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));

      console.log("User Disconnected:", socket.id);
    });
  });
};

module.exports = {
  initializeSocket,
  onlineUsers,
};
