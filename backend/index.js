
const express = require("express");
const app = express();
// const { verifyToken, authorizeRole } = require("./middleware/authHeaders");
const routes = require("./api/routes");
const connectDB = require("./config/db");
require("dotenv").config();
const port = process.env.PORT || 3000;
const cors = require("cors");
// const helmet = require("helmet");

// Connect to the database
connectDB();

// Middleware configurations
app.use(express.json({ extended: true })); // Parse JSON bodies

app.use(cors())

app.use("/api", routes);


// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).send({
    status_code: 200,
    message: "Instance is healthy",
  });
});


app.listen(port, () => {  
  console.log(`Server is running on port 3000  http://localhost:${port}/`);
});








