const db = require("../Db");
exports.getSpaceShips = (req, res) => {
  const type = req.body?.Ship_type;
  const weight = req.body?.weight;
  const home = req.body?.homePort;
  try {
    let query = `select * from SpaceShip where `;
    qargs = [];
    if (type) {
      query += `ship_type = ?`;
      qargs.push(type);
    }
    if (weight) {
      if (qargs.length > 0) {
        query += " and ";
      }
      query += `weight_kg = ?`;
      qargs.push(weight);
    }
    if (home) {
      if (qargs.length > 0) {
        query += " and ";
      }
      query += `home_port = ?`;
      qargs.push(home);
    }
    db.query(query, qargs, (error, results) => {
      if (error) throw error;
      return res.json({ results });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};

exports.getAllSpaceShipsType = async (req, res) => {
  try {
    const q = `select distinct ship_type from SpaceShip`;
    const data = db.query(q, (error, results, fields) => {
      if (error) throw error;
      const shipTypes = [];
      results.forEach((element) => {
        shipTypes.push(element.ship_type);
      });
      return res.json({ shipTypes });
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
};
