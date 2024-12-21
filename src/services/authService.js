const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/User");
const Token = require("../models/Token");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/tokenUtils");
const { sendOtpEmail } = require("../services/emailService");

const saveRefreshToken = async (userID, refreshToken) => {
  try {
    const hashedToken = await bcrypt.hash(refreshToken, 10);

    await Token.create({
      user_id: userID,
      token_hash: hashedToken,
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
  } catch (error) {
    console.log(error);
  }
};

const registerParticipant = async (req) => {
  const { name, email, password } = req.body;

  // Validasi input
  if (!name || !email || !password) {
    const error = new Error("All fields are required");
    error.status = 400;
    throw error;
  }

  let newUser = await User.findOne({ where: { email } });

  if (newUser) {
    if (newUser.is_verified === false) {
      const error = new Error("User is registered, please verify OTP");
      error.status = 400;
      throw error;
    } else {
      const error = new Error("Email already in use");
      error.status = 400;
      throw error;
    }
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp_code: Math.floor(100000 + Math.random() * 900000).toString(),
      otp_expires_at: Date.now() + 5 * 60 * 1000,
    });
  }

  await sendOtpEmail(email, newUser);

  const result = newUser.toJSON();
  delete result.password;
  delete result.otp_code;

  return result;
};

const registerOrganizer = async (req) => {
  const { name, email, password } = req.body;

  if (req.user.role !== "admin") {
    const error = new Error("Only admin can register organizers");
    error.status = 401;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "organizer",
    is_verified: true,
  });

  const userWithoutPassword = newUser.toJSON();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};

const resendOtp = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  if (user.is_verified) {
    const error = new Error("User already verified");
    error.status = 400;
    throw error;
  }

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = Date.now() + 5 * 60 * 1000;

  user.otp_code = otpCode;
  user.otp_expires_at = otpExpiresAt;
  await user.save();

  await sendOtpEmail(email, user);

  const result = user.toJSON();
  delete result.password;
  delete result.otp_code;

  return result;
};

const verifyOtp = async (email, otpCode) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    const error = new Error("User not found");
    error.status = 404;
    throw error;
  }
  if (user.is_verified) {
    const error = new Error("User already verified");
    error.status = 400;
    throw error;
  }

  if (user.otp_code === otpCode && user.otp_expires_at > Date.now()) {
    user.is_verified = true;
    user.otp_code = null;
    user.otp_expires_at = null;
    await user.save();

    const result = user.toJSON();
    delete result.password;

    return result;
  } else {
    const error = new Error("Invalid or expired OTP");
    error.status = 400;
    throw error;
  }
};

const login = async (email, password) => {
  if (!email || !password) {
    const error = new Error("Email and password are required");
    error.status = 400;
    throw error;
  }
  const user = await User.findOne({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  if (user.is_verified === false) {
    const error = new Error("Your account is not active");
    error.status = 401;
    throw error;
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  await saveRefreshToken(user.id, refreshToken);
  return {
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const tokenRecord = await Token.findOne({
    where: {
      user_id: payload.id,
      is_revoked: false,
      expires_at: { [Op.gt]: new Date() },
    },
  });

  if (
    !tokenRecord ||
    !(await bcrypt.compare(refreshToken, tokenRecord.token_hash))
  ) {
    const error = new Error("Invalid refresh token");
    error.status = 403;
    throw error;
  }

  const user = await User.findByPk(payload.id);
  return generateAccessToken(user);
};

const logout = async (refreshToken) => {
  const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  await Token.update({ is_revoked: true }, { where: { user_id: payload.id } });
};

module.exports = {
  registerParticipant,
  registerOrganizer,
  login,
  refreshToken,
  logout,
  resendOtp,
  verifyOtp,
};
