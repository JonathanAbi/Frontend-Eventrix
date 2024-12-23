const eventService = require("../services/eventService");

const getPublicEvents = async (req, res) => {
  try {
    const result = await eventService.getPublicEvents(req);
    res.json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getOneEvent = async (req, res) => {
  try {
    const result = await eventService.getOneEvent(req);
    res.json({ data: result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = { getPublicEvents, getOneEvent };
