const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();

//db

// import routes

// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));

// app.use(cors())
app.use(cors({ origin: process.env.CLIENT_URL }));

// middleware

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
