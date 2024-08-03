import { Server as socketIo } from "socket.io";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import http from "http";
import dotenv from "dotenv";

const app = express();
const server = http.createServer(app);

dotenv.config();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(helmet());
app.use(compression());
app.use(morgan("common"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is Running");
});

const io = new socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

let users = [];

const addUser = (userId, socketId) => {
  if (!users.some((user) => user.userId === userId)) {
    users.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("sendMessage", ({ senderId, receiverId, text, createdAt }) => {
    let user = users.find((user) => user.userId === receiverId);
    io.to(user?.socketId).emit("getMessage", { senderId, text, createdAt });
  });

  socket.on("typing", (data) => {
    let user = users.find((user) => user.userId === data.receiverId);
    io.to(user?.socketId).emit("typingResponse", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(process.env.PORT || 4444, () => {
  console.log(`Server is running on port ${process.env.PORT || 4444}`);
});
