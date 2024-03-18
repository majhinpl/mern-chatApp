const express = require("express");
const { chats } = require("./dataModel/chatModel");
const connectDb = require("./database/index");
const app = express();
const { Server } = require("socket.io");
const port = 3000;

connectDb();

const server = app.listen(port, () => {
  console.log("Server listning ...");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A new user has connected");
});
