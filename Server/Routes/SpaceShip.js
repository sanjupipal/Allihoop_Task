const express = require("express");

const router = express.Router();

const { getSpaceShips } = require("../controllers/space");

router.get("/get/spaceships", getSpaceShips);

module.exports = router;
