const router = require("express").Router();
const {
  getAllIndustries,
  getIndustry,
  createIndustry,
  deleteIndustry,
  updateIndustry,
} = require("../controllers/industryController");

// GET all industries
router.get("/", getAllIndustries);

// GET a single industry
router.get("/:id", getIndustry);

// CREATE a single industry
router.post("/", createIndustry);

// DELETE a industry
router.delete("/:id", deleteIndustry);

// UPDATE a industry
router.patch("/:id", updateIndustry);

module.exports = router;
