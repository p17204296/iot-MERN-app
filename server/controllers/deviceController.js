const deviceModel = require("../models/deviceModel");
const industryModel = require("../models/industryModel");
const mongoose = require("mongoose");

// Get all devices
exports.getAllDevices = async (req, res) => {
  try {
    // Extract and set default values for query parameters
    const {
      page = 1, // Current page, starting at 1
      limit = 3, // Number of items per page
      search = "", // Search query string
      sort = "fee", // Default Sort field is "fee"
      linkedIndustry = "All", // Filter by linked industry (default: "All")
    } = req.query;

    // Fetch the list of available industry names from the "industries" collection
    const industryOptions = await industryModel.find({}, "industryName");

    // Extract just the industry names from the fetched options
    const linkedIndustryOptions = industryOptions.map(
      (option) => option.industryName
    );

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
    res.status(201).json(response);
  } catch (err) {
    // Handle errors, log them, and send a 500 (Internal Server Error) response
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// Get a single device
exports.getDevice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such device" });
  }

  const device = await deviceModel.findById(id);

  if (!device) {
    return res.status(404).json({ error: "No such device" });
  }

  res.status(200).json(device);
};
// Create new device
exports.createDevice = async (req, res) => {
  const { deviceName, fee, linkedIndustry } = req.body;

  try {
    const device = await deviceModel.create({
      deviceName,
      fee,
      linkedIndustry,
    });
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a device
exports.deleteDevice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such device" });
  }

  const device = await deviceModel.findOneAndDelete({ _id: id });

  if (!device) {
    return res.status(400).json({ error: "No such device" });
  }

  res.status(200).json(device);
};

// Update a device
exports.updateDevice = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such device" });
  }

  const device = await deviceModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!device) {
    return res.status(400).json({ error: "No such device" });
  }

  res.status(200).json(device);
};
