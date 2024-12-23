const ticketService = require("../services/ticketService");

const createTicket = async (req, res) => {
  try {
    const result = await ticketService.createTicket(req)
    res.json({ message: "Ticket created", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllTickets = async (req, res) => {
  try {
    const result = await ticketService.getAllTickets(req)
    res.json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getOneTicket = async (req, res) => {
  try {
    const result = await ticketService.getOneTicket(req)
    res.json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const result = await ticketService.updateTicket(req)
    res.json({ message: "Ticket updated", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const result = await ticketService.deleteTicket(req)
    res.json({ message: "Ticket deleted", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = { createTicket, getAllTickets, getOneTicket, updateTicket, deleteTicket };
