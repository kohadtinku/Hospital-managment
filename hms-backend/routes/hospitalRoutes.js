// routes/hospitalRoutes.js
const express = require("express");
const {
  createHospital,
  getHospitals,
  deleteHospital
} = require("../controllers/hospitalController");

const router = express.Router();

router.post("/add", createHospital);
router.get("/all", getHospitals);
router.delete("/:id", deleteHospital);

module.exports = router;
