const Event = require("../models/Event");
const Ticket = require("../models/Ticket");

const createTicket = async (req) => {
  const { eventId } = req.params;
  const { name, price, quantity } = req.body;
  const organizerId = req.user.id;

  if (!name || typeof name !== "string") {
    const error = new Error("Invalid ticket name");
    error.status = 400;
    throw error;
  }

  if (!price || price < 0) {
    const error = new Error("Price must be a positive number");
    error.status = 400;
    throw error;
  }

  if (!quantity || quantity < 1) {
    const error = new Error("Quantity must be at least 1");
    error.status = 400;
    throw error;
  }

  const event = await Event.findByPk(eventId);
  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to create ticket for this event");
    error.status = 401;
    throw error;
  }

  const result = await Ticket.create({
    event_id: eventId,
    name,
    price,
    quantity,
  });

  return result;
};

const getAllTickets = async (req) => {
  const { eventId } = req.params;
  const organizerId = req.user.id;

  const event = await Event.findByPk(eventId);
  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to get tickets for this event");
    error.status = 401;
    throw error;
  }

  const result = Ticket.findAll({
    where: {
      event_id: eventId,
    },
  });

  return result;
};

const getOneTicket = async (req) => {
  const { eventId, ticketId } = req.params;
  const organizerId = req.user.id;

  const event = await Event.findByPk(eventId);
  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to get ticket for this event");
    error.status = 401;
    throw error;
  }

  const result = Ticket.findOne({
    where: {
      id: ticketId,
      event_id: eventId,
    },
  });

  if (!result) {
    const error = new Error("Ticket not found");
    error.status = 404;
    throw error;
  }

  return result;
};

const updateTicket = async (req) => {
  const { eventId, ticketId } = req.params;
  const { name, price, quantity } = req.body;
  const organizerId = req.user.id;

  if (price < 0 || quantity < 0) {
    const error = new Error("Price and quantity must be positive");
    error.status = 400;
    throw error;
  }

  const event = await Event.findByPk(eventId);

  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to get ticket for this event");
    error.status = 401;
    throw error;
  }

  const result = await Ticket.findOne({
    where: {
      id: ticketId,
      event_id: eventId,
    },
  });

  if (!result) {
    const error = new Error("Ticket not found");
    error.status = 404;
    throw error;
  }

  result.name = name || result.name;
  result.price = price || result.price;
  result.quantity = quantity || result.quantity;

  await result.save();

  return result;
};

const deleteTicket = async (req) => {
  const { eventId, ticketId } = req.params;
  const organizerId = req.user.id;

  const event = await Event.findByPk(eventId);

  if (!event) {
    const error = new Error("Event not found");
    error.status = 404;
    throw error;
  }

  if (event.organizer_id !== organizerId) {
    const error = new Error("Unauthorized to get ticket for this event");
    error.status = 401;
    throw error;
  }

  const result = await Ticket.findOne({
    where: {
      id: ticketId,
      event_id: eventId,
    },
  });

  if (!result) {
    const error = new Error("Ticket not found");
    error.status = 404;
    throw error;
  }

  await result.destroy()

  return result
};

module.exports = {
  createTicket,
  getAllTickets,
  getOneTicket,
  updateTicket,
  deleteTicket,
};
