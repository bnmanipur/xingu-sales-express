const express = require('express');
const router = express.Router();
const courierController = require("../../controllers/admin/courier")

router.get("", courierController.index)
router.get("/get_list", courierController.get_list)
router.get("/get_list2", courierController.get_list2)
router.get("/get_list3", courierController.get_list3)
router.get("/get_data", courierController.get_data)

router.get("/delete", courierController.delete)
router.post("/update", courierController.update)
router.post("/insert", courierController.insert)

module.exports = router;
