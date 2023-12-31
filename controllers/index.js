const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoute');
const dashboardRoutes = require('./dashboardRoute');

router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;

