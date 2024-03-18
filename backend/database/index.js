const mongoose = require("mongoose");

const connectString =
  "mongodb+srv://majhintech:luminous@cluster0.v0w6yzu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function connectDb() {
  await mongoose.connect(connectString);
  console.log("DB connected");
}

module.exports = connectDb;
