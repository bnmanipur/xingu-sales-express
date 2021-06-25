const express = require('express');
const router = express.Router();
const repairingController = require("../../controllers/admin/repairing")

router.get("", repairingController.index)
router.get("/get_list", repairingController.get_list)
router.get("/get_job", repairingController.get_job)
router.get("/get_latest_jobno", repairingController.get_latest_jobno)

router.post('/add_job', repairingController.add_job)
router.post('/edit_job', repairingController.edit_job)
router.get('/delete_job', repairingController.delete)

module.exports = router;
