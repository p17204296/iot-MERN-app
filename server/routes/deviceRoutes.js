const router = require("express").Router();
const deviceModel = require("../models/deviceModel");

// GET all devices
router.get("/", async (req, res) => {
  try {
    // Extract and set default values for query parameters
    const {
      page = 1, // Current page, starting at 1
      limit = 3, // Number of items per page
      search = "", // Search query string
      sort = "fee", // Default Sort field is "fee"
      linkedIndustry = "All", // Filter by linked industry (default: "All")
    } = req.query;

    // List of available linked industry options
    const linkedIndustryOptions = [
      "Agriculture",
      "Security",
      "Logistics",
      "Hospitality",
      "Healthcare",
    ];

    // Determine industries to filter based on query
    const industriesToFilter =
      linkedIndustry === "All"
        ? linkedIndustryOptions
        : linkedIndustry.split(",");

    // Split sort parameter into field and order
    const [sortField, sortOrder = "asc"] = sort.split(",");

    // Calculate the number of items to skip for pagination
    const skip = (page - 1) * limit;

    // Define the query for database retrieval
    const query = {
      deviceName: { $regex: search, $options: "i" }, // Case-insensitive search
      linkedIndustry: { $in: industriesToFilter }, // Filter by linked industry
    };

    // Fetch devices based on the query, sort, and pagination
    const devices = await deviceModel
      .find(query)
      .sort({ [sortField]: sortOrder }) // Dynamic sorting based on sortField
      .skip(skip)
      .limit(parseInt(limit));

    // Count the total number of devices matching the query for pagination
    const total = await deviceModel.countDocuments(query);

    // Prepare the response object with data and metadata
    const response = {
      error: false,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      linkedIndustries: linkedIndustryOptions,
      devices,
    };

    // Send a successful response with status 200
    res.status(200).json(response);
  } catch (err) {
    // Handle errors, log them, and send a 500 (Internal Server Error) response
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

// GET a single device
router.get("/:id", (req, res) => {
  res.json({ mssg: "GET a single device" });
});

router.post("/", async (req, res) => {
  const { deviceName, fee, linkedIndustry } = req.body;

  try {
    const device = await deviceModel.create({
      deviceName,
      fee,
      linkedIndustry,
    });
    res.status(200).json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a device
router.delete("/:id", (req, res) => {
  res.json({ mssg: "DELETE a device" });
});

// UPDATE a device
router.patch("/:id", (req, res) => {
  res.json({ mssg: "UPDATE a device" });
});

// ---- END ---

module.exports = router;
