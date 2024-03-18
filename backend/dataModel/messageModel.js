const mongoose = require("mongoose");

const msgSchema = new mongoose.Schema(
  {
    chatId: {
      type: String
    },
    senderId: {
      type: String
    },
    text: {
      type: String
    }
  }, {timestamps: true}
);

const Msg = mongoose.model("Msg", msgSchema);

module.exports = Msg;
