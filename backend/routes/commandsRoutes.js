// routes/commands.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/commandsController");

router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.get("/:key", ctrl.get);
router.post("/run/:key", ctrl.run); // POST to include options e.g. { push: true }

module.exports = router;
