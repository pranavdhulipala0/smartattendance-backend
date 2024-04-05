const express = require("express");
const router = express.Router();

const detailRoutes = require("./detailRoutes.js");
const authRoutes = require("./authRoutes.js");

router.use("/details", detailRoutes);
router.use("/auth", authRoutes);

module.exports = router;
