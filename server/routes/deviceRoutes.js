const router = require("express").Router();
const deviceModel = require("../models/deviceModel");
const {
  getAllDevices,
  getDevice,
  createDevice,
  deleteDevice,
  updateDevice,
} = require("../controllers/deviceController");

// GET all devices
router.get("/", getAllDevices);

// GET a single device
router.get("/:id", getDevice);

// CREATE a single device
router.post("/", createDevice);

// DELETE a device
router.delete("/:id", deleteDevice);

// UPDATE a device
router.patch("/:id", updateDevice);

// ---- END ---

module.exports = router;
