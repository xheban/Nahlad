const express = require("express");
const {getSensors,saveSensors} = require("../controllers/sensor_controller");

const router = express.Router();

router.get('', getSensors);
router.post('',saveSensors);

module.exports = router;