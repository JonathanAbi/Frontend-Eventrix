const organizerService = require("../services/organizerService");

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, category } = req.body;
    const result = await organizerService.createEvent(
      title,
      description,
      date,
      location,
      category,
      req.user.id
    );
    res.json({ message: "Event created", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getAllEvent = async (req, res) => {
  try {
    const result = await organizerService.getAllEvent(req);
    res.json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getOneEvent = async (req, res) => {
  try {
    const result = await organizerService.getOneEvent(req);
    res.json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const updateEvent = async (req, res) => {
  try {
    const result = await organizerService.updateEvent(req);
    res.json({ message: "Event updated", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const result = await organizerService.deleteEvent(req);
    res.json({ message: "Event deleted", data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = { createEvent, getAllEvent, getOneEvent, updateEvent, deleteEvent };
