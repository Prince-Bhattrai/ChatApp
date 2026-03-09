import express from "express";
import { Server } from "socket.io";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Chat } from "./models/chatModel.js";
import userRouter from "./router/userRoutes.js";
import userContactRouter from "./router/userContactRoutes.js";
import chatRouter from "./router/chatRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors({
  origin: ["https://full-chat-app-two.vercel.app"],
  credentials: true
}));

app.use(express.json());
app.use("/v1/api/user", userRouter);
app.use("/v1/api/contact", userContactRouter);
app.use("/v1/api/chat", chatRouter);

const io = new Server(server, {
  cors: {
    origin: ["https://full-chat-app-two.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("from", async ({ from, to, message }) => {
    try {
      const chat = new Chat({ from, to, message });
      await chat.save();

      io.emit("to", { from, to, message });

    } catch (error) {
      console.log("Socket error:", error);
    }
  });


  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

export default server;
