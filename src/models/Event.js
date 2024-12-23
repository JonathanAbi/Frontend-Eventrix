const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Event = sequelize.define("Event", {
  organizer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Model yang dirujuk
      key: "id", // Kolom di tabel User yang dirujuk
    },
  },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  date: { type: DataTypes.DATE, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  category: {
    type: DataTypes.ENUM("workshop", "concert", "seminar"),
    allowNull: false,
  }, 
  status: {
    type: DataTypes.ENUM("pending", "active", "completed", "cancelled"),
    defaultValue: "pending",
  },
});

Event.belongsTo(User, { foreignKey: "organizer_id", as: "organizer" });
User.hasMany(Event, { foreignKey: "organizer_id", as: "events" });

module.exports = Event;
