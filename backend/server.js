const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();

connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chat API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes);



const PORT = process.env.PORT || 8000;

// app.listen();

const http = require("http");

const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const {
  initializeSocket,
} = require("./socket/socket");

initializeSocket(io);

server.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});