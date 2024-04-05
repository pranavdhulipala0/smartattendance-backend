const express = require("express");
const router = express.Router();
const detailsController = require("../controllers/detailsController.js");

router.post("/details", detailsController.details);
router.post("/adv-details", detailsController.advDetails);
router.post("/table-details", detailsController.tableDetails);

module.exports = router;
