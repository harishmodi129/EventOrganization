const express = require("express");
const mongoose = require("mongoose");
const DataController = require("./controller/data.js");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const MongoURI =
  "mongodb+srv://harishmodi129:harish129@dummycluster.c1genco.mongodb.net/";

mongoose
  .connect(MongoURI)
  .then(() => console.log("connected to mongodb"))
  .catch((error) => console.log("failed to connect to mongodb", error));
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the stack trace
  res
    .status(500)
    .json({ message: "An internal server error occurred", error: err.message });
});

app.get("/getdata", DataController.GetDataTable);
// Example using Express.js

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
