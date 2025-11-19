const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const chatRoutes = require("./routes/chatRoutes");

const app = express();

// --- CORS FIX (Allow frontend to access backend) ---
app.use(
  cors({
    origin: "*", // you can replace '*' with your frontend domain if needed
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON
app.use(express.json());

// Debugging logs
app.use((req, res, next) => {
  console.log(`➡️  ${req.method} ${req.url}`, req.body);
  next();
});

// Routes
app.use("/api/chat", chatRoutes);

// Root route (useful for testing Render deployment)
app.get("/", (req, res) => {
  res.send("✅ VHD Backend is running successfully!");
});

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
