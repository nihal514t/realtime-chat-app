const Message = require("../models/Message");

// Send Message
const sendMessage = async (req, res) => {
  try {
    const { receiverId, message } = req.body;

    const newMessage = await Message.create({
      senderId: req.user._id,
      receiverId,
      message,
    });

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Conversation
const getMessages = async (req, res) => {
  try {
    console.log("GET MESSAGES HIT");
    console.log("PARAMS:", req.params);
    console.log("USER:", req.user);

    const { userId } = req.params;

    const messages = await Message.find({
      $or: [
        {
          senderId: req.user._id,
          receiverId: userId,
        },
        {
          senderId: userId,
          receiverId: req.user._id,
        },
      ],
    }).sort({
      createdAt: 1,
    });

    console.log("MESSAGES:", messages);

    res.json(messages);
  } catch (error) {
    console.log("GET MESSAGES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};