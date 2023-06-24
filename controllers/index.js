const router = require('express').Router();
const navRoutes = require('./navRoutes')
const apiRoutes = require('./api');


router.use('/', navRoutes)
router.use('/api', apiRoutes);

module.exports = router;
