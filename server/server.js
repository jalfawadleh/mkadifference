const express = require("express");
const cors = require("cors");
const compression = require("compression");
const path = require("path");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();

// Connect DB
const startDB = async () => {
  try {
    mongoose.set("strictQuery", true);
    const conn = await mongoose.connect("mongodb://127.0.0.1/test");

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startDB();

// express defenition
const app = express();

app
  // Use body parser middleware to process json data
  .use(express.json())
  .use(express.urlencoded({ extended: false }))

  //use cors to allow requests from client to server
  .use(cors())

  // Use compression
  .use(compression())

  .use(errorHandler)

  .use("/api/users", require("./modules/users"))
  .use("/api/members", require("./modules/members"))
  .use("/api/messages", require("./modules/messages"))
  .use("/api/comments", require("./modules/comments"))
  .use("/api/items", require("./modules/items"))
  .use("/api/search", require("./modules/search"))
  .use("/api/map", require("./modules/map"))

  // Serve frontend
  .use(express.static(path.join(__dirname, "../client/build")))
  .get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"))
  )

  .listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`)
  );
