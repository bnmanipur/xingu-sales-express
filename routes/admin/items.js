const express = require('express');
const router = express.Router();

const itemsRouter = require('../../controllers/admin/items')

router.get("", itemsRouter.index)
router.get("/get_list", itemsRouter.get_list)

module.exports = router;
