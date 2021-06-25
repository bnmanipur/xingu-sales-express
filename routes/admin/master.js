const express = require('express');
const router = express.Router();

const usersRouter = require('../../controllers/admin/users')

router.get('/users', usersRouter.index)
router.get('/users/get_list', usersRouter.get_list)


router.post('/users/add', usersRouter.add)

module.exports = router;
