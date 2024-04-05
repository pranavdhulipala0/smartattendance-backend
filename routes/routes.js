const express = require("express");
const router = express.Router();

const detailRoutes = require("./detailRoutes.js");

router.use("/details", detailRoutes);

module.exports = router;
