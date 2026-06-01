const express = require("express");

const {
  sendMessage,
  getMessages,
  updateMessageStatus,
  getUnreadCounts,
} = require("../controllers/messageController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, sendMessage);
router.get("/unread", protect, getUnreadCounts);
router.get("/:userId", protect, getMessages);
router.put("/:messageId/status", protect, updateMessageStatus);

module.exports = router;
