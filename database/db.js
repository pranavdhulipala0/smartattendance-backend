const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://artendance:Qwerty123@cluster0.lvtxm2j.mongodb.net/Artendance?retryWrites=true&w=majority",
  {}
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

module.exports = db;
