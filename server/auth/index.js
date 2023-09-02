const express = require("express");
const helmet = require("helmet");
const { PORT } = require("./config/config.js");
require("dotenv").config();
const app = express();
app.use(helmet());

app.use(express.json());

app.use("/api/v1/auth", require("./routes/auth.js"));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
