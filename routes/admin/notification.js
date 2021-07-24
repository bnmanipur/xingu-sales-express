const express = require('express');
const router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

const notificationController = require('../../controllers/admin/notification')

router.get('', notificationController.index)
router.post('/send', notificationController.send)

module.exports = router;
