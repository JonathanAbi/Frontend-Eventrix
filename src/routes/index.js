const express = require('express');
const authRoutes = require('./authRouter');
// const eventRoutes = require('./events');

const router = express.Router();

router.use('/auth', authRoutes);
// router.use('/events', eventRoutes);

module.exports = router;
