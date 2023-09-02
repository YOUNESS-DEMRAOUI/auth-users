const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { MONGO_IP, MONGO_PORT, PORT } = require("./config/config.js");
require("dotenv").config();
const app = express();
app.use(helmet());
const createDemoUser = require("./config/createDemoUser.js");

const MONGO_URL = `mongodb://${MONGO_IP}:${MONGO_PORT}/users`;

app.use(express.json());

app.use("/api/v1/users", require("./routes/users.js"));

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    createDemoUser();
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  })
  .catch((err) => console.log(err));
