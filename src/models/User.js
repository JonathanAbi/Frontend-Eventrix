const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  role: {
    type: DataTypes.ENUM("admin", "organizer", "participant"),
    defaultValue: "participant",
  },
  is_verified: { type: DataTypes.BOOLEAN, defaultValue: false },
  otp_code: { type: DataTypes.STRING, allowNull: true },
  otp_expires_at: { type: DataTypes.DATE, allowNull: true },
});

module.exports = User;
