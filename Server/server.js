const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

//db
const db = require("./Db");

// import routes
const Space = require("./Routes/SpaceShip");

// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));

// app.use(cors())
app.use(cors({ origin: process.env.CLIENT_URL }));

// middleware
app.use("/api", Space);

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
