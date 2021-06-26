const express = require('express');
const router = express.Router();

const usersController = require('../../../controllers/admin/users')

router.get('/users', usersController.index)
router.get('/users/get_list', usersController.get_list)


router.post('/users/add', usersController.add)

module.exports = router;
