const onlineUsers = new Map();
const Message = require("../models/Message");

const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User Connected:", socket.id);

    socket.on("addUser", async (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("onlineUsers", Array.from(onlineUsers.keys()));

      const pendingMessages = await Message.find({
        receiverId: userId,
        status: "sent",
      });

      for (const msg of pendingMessages) {
        msg.status = "delivered";
        await msg.save();

        const senderSocketId = onlineUsers.get(msg.senderId.toString());

        if (senderSocketId) {
          io.to(senderSocketId).emit("messageDelivered", msg._id.toString());
        }
      }
    });

    socket.on("sendMessage", ({ receiverId, message }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", message);
      }
    });

    socket.on("typing", ({ receiverId, senderId , senderName }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userTyping", {senderId,senderName,});
      }
    });

    socket.on("stopTyping", ({ receiverId , senderId}) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("userStoppedTyping",{senderId});
      }
    });

    socket.on("messageSeen", ({ senderId, messageId }) => {
      const senderSocketId = onlineUsers.get(senderId);

      if (senderSocketId) {
        io.to(senderSocketId).emit("messageSeen", messageId);
      }
    });

    socket.on("messageDelivered", ({ senderId, messageId }) => {
      const senderSocketId = onlineUsers.get(senderId);

      if (senderSocketId) {
        io.to(senderSocketId).emit("messageDelivered", messageId);
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
