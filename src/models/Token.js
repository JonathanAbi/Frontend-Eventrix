const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Token = sequelize.define("Token", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Model yang dirujuk
      key: "id",   // Kolom di tabel User yang dirujuk
    },
    onDelete: "CASCADE", // Jika User dihapus, Token terkait juga dihapus
  },
  token_hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  is_revoked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Relasi
Token.belongsTo(User, { foreignKey: "user_id", as: "user" });

module.exports = Token;
