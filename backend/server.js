const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")

const todoRoutes = require("./routes/todoRoutes.js");

dotenv.config();

const app = express();

//middleware
app.use(cors());

// form data
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

// routes
app.use("/api/todos", todoRoutes);

const port = process.env.PORT || 5000;
//server is listening
app.listen(port, () => {
  console.log(`server running successfully`);
});
