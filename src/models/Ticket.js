const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./Event");

const Ticket = sequelize.define("Ticket", {
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: "id",
    },
    onDelete: "CASCADE",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  quantity: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sold_quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

Ticket.belongsTo(Event, { foreignKey: "event_id", as: "event" });
Event.hasMany(Ticket, { foreignKey: "event_id", as: "tickets" });

module.exports = Ticket;
