const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const finderRoutes = require("./routes/finderRoutes");
const itemRoutes = require("./items/itemRoutes");
const messageRoutes = require("./messaging/messageRoutes");
const notificationRoutes = require("./notifications/notificationRoutes");
const reportRoutes = require("./moderation/reportRoutes");
const moderatorRoutes = require("./moderation/moderatorRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Lost & Found Backend API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/finder", finderRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/moderator", moderatorRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});