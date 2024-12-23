const express = require("express");
const router = express.Router();
const { createEvent, getAllEvent, getOneEvent, updateEvent, deleteEvent } = require("../controllers/organizerController");
const { authenticate, authorize } = require("../middlewares/auth");

router.post("/events", authenticate, authorize(["organizer"]), createEvent);
router.get("/events", authenticate, authorize(["organizer"]), getAllEvent);
router.get("/events/:id", authenticate, authorize(["organizer"]), getOneEvent);
router.patch("/events/:id", authenticate, authorize(["organizer"]), updateEvent);
router.delete("/events/:id", authenticate, authorize(["organizer"]), deleteEvent);

module.exports = router;
