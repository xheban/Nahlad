const express = require("express");
const {getData, receiveData} = require ('../controllers/data_controller.js')

const router = express.Router();

router.get('', getData);
router.post('',receiveData);
module.exports = router;