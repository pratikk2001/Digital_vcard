const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      status_code: 401,
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
    req.user = decoded; // Attach decoded user data to req
    next();
  } catch (error) {
    res.status(401).json({
      status_code: 401,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;