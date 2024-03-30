const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
  console.log(`Chat server running on port: ${PORT}`);
});

const io = require("socket.io")(server);

// const { chats } = require("./dataModel/chatModel");
// const Chat = require("./dataModel/chatModel");
// const connectDb = require("./database/index");

// const Msg = require("./dataModel/messageModel");

// connectDb();

app.use(express.static(path.join(__dirname, "public")));

let socketsConnected = new Set();

io.on("connection", onconnected);

function onconnected(socket) {
  console.log(socket.id);

  socketsConnected.add(socket.id);

  io.emit("clients-total", socketsConnected.size);

  socket.on("disconnet", () => {
    console.log("Socket disconnected", socket.id);

    socketsConnected.delete(socket.id);

    io.emit("clients-total", socketsConnected.size);
  });
}
