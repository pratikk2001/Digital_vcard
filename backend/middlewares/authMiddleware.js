const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({
      status_code: 401,
      message: "No Authorization header provided",
    });
  }

  const tokenMatch = authHeader.match(/^Bearer\s+(.+)/i);
  if (!tokenMatch || !tokenMatch[1]) {
    return res.status(401).json({
      status_code: 401,
      message: "Invalid Authorization header format. Use 'Bearer <token>'",
    });
  }

  const token = tokenMatch[1];
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error("JWT_SECRET is not set in environment variables");
    return res.status(500).json({
      status_code: 500,
      message: "Server configuration error",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    res.status(401).json({
      status_code: 401,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;