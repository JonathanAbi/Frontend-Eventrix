const authService = require("../services/authService");

const registerParticipant = async (req, res) => {
  try {
    const result = await authService.registerParticipant(req);
    res.json({ message: "Participant registered successfully", user: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const registerOrganizer = async (req, res) => {
  try {
    const result = await authService.registerOrganizer(req);
    res.json({ message: "Organizer registered successfully", user: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(
      email, 
      password
    );
    res.json({ message: "Login Successfully", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const newAccessToken = await authService.refreshToken(refreshToken);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    await authService.logout(refreshToken);
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  login,
  refreshToken,
  logout,
  registerParticipant,
  registerOrganizer,
};
