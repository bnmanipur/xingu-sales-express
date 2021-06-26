const express = require('express');
const router = express.Router();

const categoriesController = require('../../../controllers/admin/categories')

router.get("", categoriesController.index)
router.get("/get", categoriesController.get)
router.get("/get_list", categoriesController.get_list)

router.post("/add", categoriesController.add)
router.get("/delete", categoriesController.delete)

module.exports = router;
