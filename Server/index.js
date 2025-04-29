const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://future-me-5nhg.vercel.app/",
    // origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

const syncRoutes = require("./src/routes/syncRoutes");
app.use("/api/sync", syncRoutes);

module.exports = app;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
