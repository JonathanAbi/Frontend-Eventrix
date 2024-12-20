const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: "Token is missing or invalid format" });
  }

  const token = authHeader.split(' ')[1]; // Ambil token setelah "Bearer"
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
          return res.status(403).json({ message: "Invalid token" });
      }

      req.user = payload; // Simpan data pengguna ke req.user
      next();
  });
};


const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user.role;

    // Periksa apakah role pengguna diizinkan
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
module.exports = { authenticate, authorize };
