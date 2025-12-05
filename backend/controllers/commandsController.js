// controllers/commandsController.js
const CommandModel = require("../models/CommandModel");
const { fcm } = require("../firebase");

module.exports = {
  async create(req, res) {
    try {
      const payload = req.body;
      const cmd = await CommandModel.create(payload);
      res.json(cmd);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async list(req, res) {
    try {
      const list = await CommandModel.getAll();
      res.json(list);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async get(req, res) {
    try {
      const { key } = req.params;
      const cmd = await CommandModel.getByKey(key);
      if (!cmd) return res.status(404).json({ error: "Not found" });
      res.json(cmd);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // "run" akan mencatat log & optional: push ke FCM topic or device token
  async run(req, res) {
    try {
      const { key } = req.params;
      const cmd = await CommandModel.getByKey(key);
      if (!cmd) return res.status(404).json({ error: "Command not found" });

      // catat log sederhana ke collection 'commandLogs'
      await require("../firebase").db.collection("commandLogs").add({
        commandKey: key,
        action: cmd.action,
        method: req.body.method || "API",
        createdAt: Date.now()
      });

      // Opsional: push notification ke device(s)
      if (req.body.push === true) {
        // contoh push ke topic
        const message = {
          topic: process.env.FCM_TOPIC_ALL || "all-devices",
          data: { type: "run_command", key, action: JSON.stringify(cmd.action) },
          notification: { title: `Tapify: ${cmd.name}`, body: "Perintah baru tersedia" }
        };
        await fcm.send(message);
      }

      res.json({ status: "ok", executed: cmd });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
};
