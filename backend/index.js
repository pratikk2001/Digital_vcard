const express = require("express");
const app = express();
const routes = require("./api/routes"); // Verify this path
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");

connectDB()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

app.use(express.json({ extended: true }));
app.use(cors());

// Mount API routes
app.use("/api", routes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status_code: 200, message: "Instance is healthy", timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.status(200).json({ status_code: 200, message: "Welcome to the API", available_endpoints: { health: "/health", api: "/api" } });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ status_code: 404, message: `Route ${req.method} ${req.path} not found`, timestamp: new Date().toISOString() });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status_code: 500, message: "Something went wrong!", error: process.env.NODE_ENV === "development" ? err.message : undefined });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}  http://localhost:${port}/`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});