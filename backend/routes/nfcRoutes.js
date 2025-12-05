// routes/nfc.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/nfcController");

router.get("/", ctrl.handleNfc);

module.exports = router;
