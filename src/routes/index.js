const express = require('express');
const authRoutes = require('./authRouter');
const eventRoutes = require('./eventRouter');
const organizerRoutes = require('./organizerRouter')
const ticketRoutes = require('./ticketRouter')

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/events', eventRoutes);
router.use('/organizer', organizerRoutes);
router.use('/organizer/events', ticketRoutes);

module.exports = router;
