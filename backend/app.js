const express = require("express");
const { chats } = require("./dataModel/chatModel");
const Chat = require("./dataModel/chatModel");
const connectDb = require("./database/index");
const app = express();
const { Server } = require("socket.io");
const Msg = require("./dataModel/messageModel");
const port = 3000;

connectDb();

const server = app.listen(port, () => {
  console.log("Server listning ...");
});

const io = new Server(server);

io.on("connection", (socket) => {
  console.log("A new user has connected");

  // addBook

  socket.on("sendMsg", async (data) => {
    try {
      if (data) {
        const { chatId, senderId, message } = data;
        const newMsg = await Msg.create({
          chatId: chatId,
          senderId: senderId,
          message: message,
        });
        socket.emit("response", {
          status: 200,
          message: "message delivered",
          data: newMsg,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong",
      });
    }
  });

  // read operation
  socket.on("getMsg", async (data) => {
    try {
      if (data) {
        const { chatId, senderId, message } = data;
        const newMsg = await Msg.find();
        socket.emit("response", {
          status: 200,
          message: "message received",
          data: newMsg,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong",
      });
    }
  });

  // update operation
  socket.on("updateMsg", async (data) => {
    try {
      if (data) {
        const { chatId, senderId, message } = data;
        const updatedMsg = await Msg.findByIdAndUpdate(
          senderId,
          {
            chatId,
            senderId,
            message,
          },
          {
            new: true,
          }
        );
        socket.emit("response", {
          status: 200,
          message: "message updated",
          data: updatedMsg,
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong",
      });
    }
  });

  // delete operation
  socket.on("deleteMsg", async (data) => {
    try {
      if (data) {
        const { chatId, senderId, message } = data;
        await Msg.findByIdAndDelete(senderId);
        socket.emit("response", {
          status: 200,
          message: "message deleted",
        });
      }
    } catch (error) {
      socket.emit("response", {
        status: 500,
        message: "something went wrong",
      });
    }
  });
});
