const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

app.post("/lost-item", (req, res) => {
  const { name, description, location, date } = req.body;

  if (!name || !location || !date) {
    return res.status(400).json({
      ok: false,
      msg: "Missing required fields"
    });
  }

  res.json({
    ok: true,
    msg: "Listing submitted",
    data: req.body
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});