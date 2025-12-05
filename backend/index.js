// index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const commandsRoutes = require("./routes/commands");
const nfcRoutes = require("./routes/nfc");
const googleRoutes = require("./routes/google");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/commands", commandsRoutes);
app.use("/api/nfc", nfcRoutes);
app.use("/api/google", googleRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Tapify backend running on port ${PORT}`));
