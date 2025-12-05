// controllers/googleController.js
const CommandModel = require("../models/CommandModel");

module.exports = {
  async webhook(req, res) {
    try {
      const intent = req.body.queryResult?.intent?.displayName || "";
      const params = req.body.queryResult?.parameters || {};

      // contoh intent mapping: "RunCommand" dengan parameter command_key
      if (intent === "RunCommand") {
        const keyOrName = params.command || params.command_key || "";
        // coba match by key or name
        let cmd = await CommandModel.getByKey(keyOrName);
        if (!cmd) {
          const all = await CommandModel.getAll();
          cmd = all.find(c => c.name.toLowerCase() === String(keyOrName).toLowerCase());
        }
        if (!cmd) {
          return res.json({ fulfillmentText: `Perintah "${keyOrName}" tidak ditemukan.` });
        }

        // log and optionally push (here we just reply)
        await require("../firebase").db.collection("voiceLogs").add({
          commandKey: cmd.key,
          intent,
          createdAt: Date.now()
        });

        // You may choose to push to device here using FCM (not done automatically)
        return res.json({ fulfillmentText: `Menjalankan perintah ${cmd.name}.` });
      }

      // example: SendMessage intent
      if (intent === "SendMessage") {
        const text = params.text || "halo";
        // create a temporary command in firestore (optional)
        const temp = await CommandModel.create({
          name: `Send message: ${text}`,
          action: { type: "send_message", text }
        });

        return res.json({ fulfillmentText: `Pesan "${text}" akan dikirim.` });
      }

      return res.json({ fulfillmentText: "Intent tidak dikenali oleh Tapify." });
    } catch (err) {
      res.status(500).json({ fulfillmentText: "Server error" });
    }
  }
};
