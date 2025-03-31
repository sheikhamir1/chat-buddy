import { Server } from "socket.io";
import http from "http";
import express from "express";
import { on } from "events";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    // credentials: true,
  },
});

export const getReceiverSocketID = (userID) => {
  return allOnlineUsers[userID];
};

const allOnlineUsers = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userID = socket.handshake.query.userID;

  if (userID) allOnlineUsers[userID] = socket.id;

  console.log("userID", userID);
  // console.log("allOnlineUsers", allOnlineUsers);

  io.emit("onlineUsers", Object.keys(allOnlineUsers));

  //   user disconnected
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete allOnlineUsers[userID];
    io.emit("onlineUsers", Object.keys(allOnlineUsers));
  });
});

export { io, server, app };
