// controllers/nfcController.js
const CommandModel = require("../models/CommandModel");

module.exports = {
  // Handler: GET /api/nfc?cmd=KEY
  async handleNfc(req, res) {
    try {
      const cmdKey = req.query.cmd;
      if (!cmdKey) return res.status(400).json({ error: "cmd query missing" });

      const cmd = await CommandModel.getByKey(cmdKey);
      if (!cmd) return res.status(404).json({ error: "Command not registered" });

      // log NFC scan
      await require("../firebase").db.collection("nfcLogs").add({
        commandKey: cmdKey,
        ip: req.ip,
        createdAt: Date.now()
      });

      // Return action to frontend; frontend/app companion executes
      return res.json({ success: true, action: cmd.action, name: cmd.name });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }
};
