const express = require("express");
const router = express.Router();
const { getPublicEvents, getOneEvent } = require("../controllers/eventController");

router.get("/", getPublicEvents);
router.get("/:id", getOneEvent);


module.exports = router;
