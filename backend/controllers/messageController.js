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

    res.json(messages);
  } catch (error) {
    console.log("GET MESSAGES ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

//updateMessage status
const updateMessageStatus = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { status } = req.body;
    const updateData = { status };

    if (status === "seen") {
      updateData.read = true;
    }

    const message = await Message.findByIdAndUpdate(messageId, updateData, {
      returnDocument: "after",
    });

    res.json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//unread messages
const getUnreadCounts = async (req, res) => {
  try {
    const counts = await Message.aggregate([
      {
        $match: {
          receiverId: req.user._id,
          read: false,
        },
      },
      {
        $group: {
          _id: "$senderId",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.json(counts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
  updateMessageStatus,
  getUnreadCounts,
};
