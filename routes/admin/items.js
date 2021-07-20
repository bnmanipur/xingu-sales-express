const express = require('express');
const router = express.Router();

const itemsRouter = require('../../controllers/admin/items')

router.get("", itemsRouter.index)
router.get("/get", itemsRouter.get)
router.get("/get_list", itemsRouter.get_list)

router.post("/add", itemsRouter.add)
router.post("/edit", itemsRouter.edit)
router.get("/delete", itemsRouter.delete)

module.exports = router;
