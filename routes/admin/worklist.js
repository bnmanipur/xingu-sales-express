const express = require('express');
const router = express.Router();
const worklistController = require("../../controllers/admin/worklist")

router.get("", worklistController.index)
router.get("/get_list", worklistController.get_list)
router.get("/get_list2", worklistController.get_list2)
router.get("/get_list3", worklistController.get_list3)
router.get("/get_list4", worklistController.get_list4)
router.get("/get_data", worklistController.get_order)

router.get("/delete_order", worklistController.delete_order)
router.post("/update", worklistController.update)
router.post("/insert", worklistController.insert)

module.exports = router;
