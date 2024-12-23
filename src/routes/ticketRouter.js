const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("../middlewares/auth");
const {
  createTicket,
  getAllTickets,
  getOneTicket,
  updateTicket,
  deleteTicket,
} = require("../controllers/ticketController");

router.post(
  "/:eventId/tickets",
  authenticate,
  authorize(["organizer"]),
  createTicket
);
router.get(
  "/:eventId/tickets",
  authenticate,
  authorize(["organizer"]),
  getAllTickets
);
router.get(
  "/:eventId/tickets/:ticketId",
  authenticate,
  authorize(["organizer"]),
  getOneTicket
);
router.patch(
  "/:eventId/tickets/:ticketId",
  authenticate,
  authorize(["organizer"]),
  updateTicket
);
router.delete(
  "/:eventId/tickets/:ticketId",
  authenticate,
  authorize(["organizer"]),
  deleteTicket
);

module.exports = router;
