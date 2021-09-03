const router = require('express').Router();
const userRoutes = require('./userRoutes');
const BlogpostRoutes = require('./BlogpostRoutes');

router.use('/users', userRoutes);
router.use('/Blogpost', BlogpostRoutes);

module.exports = router;
