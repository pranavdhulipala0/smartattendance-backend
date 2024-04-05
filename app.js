require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const db = require("./database/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
    credentials: true,
  })
);

const port = 5000; // You can change the port as needed

app.use(bodyParser());
app.use(cookieParser());

const apiRouter = require("./routes/routes.js");
app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
