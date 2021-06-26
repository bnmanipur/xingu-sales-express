const express = require('express');
const router = express.Router();

const usersRouter = require('./master/users')
const masterRouter = require('./master/categories')


router.use('/users', usersRouter)
router.use('/categories', masterRouter)

module.exports = router;
