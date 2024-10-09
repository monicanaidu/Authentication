const express = require("express");
require("dotenv").config();

const cors = require("cors");
const { StatusCodes } = require("http-status-codes");

const PORT = process.env.PORT;
const { connectDb } = require("./db/config");

const app = express();

//body parse middleware
app.use(express.urlencoded({ extends: true }));
app.use(express.json());

//cors
app.use(cors());

//index route
app.get(`/`, async (req, res) => {
  return res
    .status(StatusCodes.OK)
    .json({ status: true, msg: `Welcome to Auth Api` });
});

//route
app.use(`/api/auth`, require("./route/authRoute"));

//default route
app.all(`*`, async (req, res) => {
  return res
    .status(StatusCodes.NOT_FOUND)
    .json({ status: false, msg: `Requested path not found` });
});

//listener
app.listen(PORT, () => {
  if (process.env.MODE === "development") {
    connectDb(process.env.MONGO_DEV);
  }
  if (process.env.MODE === "production") {
    connectDb(process.env.MONGO_PROD);
  }

  console.log(`server is  connected and running @ http:localhost:${PORT}`);
});
