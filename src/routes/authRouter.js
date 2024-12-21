const express = require("express");
const {
  registerParticipant,
  registerOrganizer,
  login,
  refreshToken,
  logout,
  resendOtp,
  verifyOtp,
} = require("../controllers/authController");
const { authenticate, authorize } = require("../middlewares/auth");
const {
  loginRateLimiter,
  resendOtpRateLimiter,
} = require("../middlewares/rateLimit");

const router = express.Router();

router.post("/register", registerParticipant);
router.post(
  "/register-organizer",
  authenticate,
  authorize(["admin"]),
  registerOrganizer
);
router.post("/login", loginRateLimiter, login);
router.post("/resend-otp", resendOtpRateLimiter, resendOtp);
router.post("/verify", verifyOtp);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
