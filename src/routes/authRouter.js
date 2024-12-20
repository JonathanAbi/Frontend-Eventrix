const express = require("express");
const {
  registerParticipant,
  registerOrganizer,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");
const { authenticate, authorize } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerParticipant);
router.post("/register-organizer", authenticate, authorize(["admin"]), registerOrganizer);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
