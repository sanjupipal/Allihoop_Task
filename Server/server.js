const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
const mysql = require("mysql");
const axios = require("axios");

//db
global.DB = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "Space",
});

DB.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("DB Connected");
  DB.query(
    `CREATE TABLE IF NOT EXISTS SpaceShip (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ship_type CHAR(255) NOT NULL,
    ship_name CHAR(255) NOT NULL,
    home_port CHAR(255) NOT NULL,
    class int NOT NULL,
    image_url VARCHAR(100) ,
    ship_id CHAR(100) unique not null,
	weight_kg int NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)  ENGINE=INNODB`,
    function (error, results, fields) {
      if (error) console.log(error);
      getData();
    }
  );
});

const getData = async (props) => {
  try {
    const res = await axios.get(`https://api.spacexdata.com/v3/ships`);
    let query = `INSERT ignore INTO SpaceShip (ship_name, ship_id, ship_type, weight_kg, home_port,class) values ?`;
    const qargs = [];
    res.data.forEach((ele) => {
      const { ship_name, ship_id, ship_type, weight_kg, home_port } = ele;
      const val = [];
      val.push(ship_name);
      val.push(ship_id);
      val.push(ship_type);
      val.push(weight_kg);
      val.push(home_port);
      val.push(ele.class);
      qargs.push(val);
    });
    DB.query(query, [qargs], (error) => {
      if (error) console.log(error);
    });
  } catch (error) {
    console.error(error);
  }
};

// import routes

// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: "5mb", type: "application/json" }));

// app.use(cors())
app.use(cors({ origin: process.env.CLIENT_URL }));

// middleware

const port = process.env.PORT;

app.listen(port, () => console.log(`API is running on port ${port}`));
