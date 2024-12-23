const Event = require("../models/Event");
const Ticket = require("../models/Ticket");
const { Op } = require("sequelize");

const getPublicEvents = async (req) => {
  const { keyword, category, page = 1, limit = 3 } = req.query;
  const where = {
    status: "active", // Hanya event yang aktif
  };
  //   const where = {};

  if (keyword) {
    where.title = { [Op.like]: `%${keyword}%` };
  }

  if (category) where.category = category;

  const offset = (page - 1) * limit;
  const events = await Event.findAndCountAll({
    distinct: true, // Menghitung jumlah event unik
    where,
    include: [{ model: Ticket, as: "tickets" }],
    limit: parseInt(limit),
    offset: parseInt(offset),
  });

  const result = {
    total: events.count,
    totalPages: Math.ceil(events.count / limit),
    currentPage: parseInt(page),
    events: events.rows,
  };

  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;

  if (isNaN(id)) {
    const error = new Error("Invalid event ID format");
    error.status = 400;
    throw error;
  }

  const result = await Event.findByPk(id, {
    include: [{ model: Ticket, as: "tickets" }],
  });

  if (!result) {
    const error = new Error("Event not found or not available");
    error.status = 404;
    throw error;
  }

  return result;
};

module.exports = { getPublicEvents, getOneEvent };
