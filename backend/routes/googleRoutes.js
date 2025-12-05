// routes/google.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/googleController");

router.post("/webhook", ctrl.webhook);

module.exports = router;
