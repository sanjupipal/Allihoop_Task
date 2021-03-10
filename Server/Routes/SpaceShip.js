const express = require("express");

const router = express.Router();

const {
  getSpaceShips,
  getAllSpaceShipsType,
} = require("../components/SpaceShip");

router.get("/get/spaceships/", getSpaceShips);
router.get("/get/all/spaceships", getAllSpaceShipsType);

module.exports = router;
