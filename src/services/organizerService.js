const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

const createEvent = async (
  title,
  description,
  date,
  location,
  category,
  organizerId
) => {
  if (!title || !description || !date || !location || !category) {
    const error = new Error("All fields are required");
    error.status = 400;
    throw error;
  }
  const result = await Event.create({
    organizer_id: organizerId,
    title,
    description,
    date,
    location,
    category,
  });

  return result;
};

const getAllEvent = async (req) => {
  const { keyword, category, page = 1, limit = 3 } = req.query;
  const organizerId = req.user.id;

  const where = { organizer_id: organizerId };

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
    where: {
      organizer_id: req.user.id,
    },
    include: [{ model: Ticket, as: "tickets" }],
  });

  if (!result) {
    const error = new Error("Event not found or not available");
    error.status = 404;
    throw error;
  }

  return result;
};

const updateEvent = async (req) => {
  const { id } = req.params;
  const { title, description, date, location, category, status } = req.body;
  const organizerId = req.user.id;

  const event = await Event.findByPk(id, {
    include: [
      {
        model: Ticket,
        as: "tickets",
        attributes: ["id"], // Hanya ambil ID tiket untuk mengecek keberadaan
      },
    ],
  });

  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to update this event");
    error.status = 401;
    throw error;
  }

  if (event.status === "pending" && status === "active") {
    if (event.tickets.length === 0) {
      const error = new Error(
        "Event must have at least 1 ticket to set status active"
      );
      error.status = 400;
      throw error;
    }
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.date = date || event.date;
  event.location = location || event.location;
  event.category = category || event.category;
  event.status = status || event.status;

  await event.save();

  return event;
};

const deleteEvent = async (req) => {
  const { id } = req.params;
  const organizerId = req.user.id;

  const event = await Event.findByPk(id);

  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to delete this event");
    error.status = 401;
    throw error;
  }

  event.destroy()
  
  return event
};

module.exports = {
  createEvent,
  getAllEvent,
  getOneEvent,
  updateEvent,
  deleteEvent,
};
