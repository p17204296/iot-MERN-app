const industryModel = require("../models/industryModel");
const mongoose = require("mongoose");

// Get all industries
exports.getAllIndustries = async (req, res) => {
  try {
    // Extract and set default values for query parameters
    const {
      page = 1, // Current page, starting at 1
      limit = 3, // Number of items per page
      search = "", // Search query string
      sort = "industryName", // Default Sort field is "fee"
    } = req.query;

    // Split sort parameter into field and order
    const [sortField, sortOrder = "asc"] = sort.split(",");

    // Calculate the number of items to skip for pagination
    const skip = (page - 1) * limit;

    // Define the query for database retrieval
    const query = {
      industryName: { $regex: search, $options: "i" }, // Case-insensitive search
    };

    // Fetch industries based on the query, sort, and pagination
    const industries = await industryModel
      .find(query)
      .sort({ [sortField]: sortOrder }) // Dynamic sorting based on sortField
      .skip(skip)
      .limit(parseInt(limit));

    // Count the total number of industries matching the query for pagination
    const total = await industryModel.countDocuments(query);

    // Prepare the response object with data and metadata
    const response = {
      error: false,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      industries,
    };

    // Send a successful response with status 200
    res.status(200).json(response);
  } catch (err) {
    // Handle errors, log them, and send a 500 (Internal Server Error) response
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

// Get a single industry
exports.getIndustry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such industry" });
  }

  const industry = await industryModel.findById(id);

  if (!industry) {
    return res.status(404).json({ error: "No such industry" });
  }

  res.status(200).json(industry);
};

// Create a new industry
exports.createIndustry = async (req, res) => {
  const { industryName } = req.body;

  // add to the database
  try {
    const industry = await industryModel.create({ industryName });
    res.status(201).json(industry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a industry
exports.deleteIndustry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such industry" });
  }

  const industry = await industryModel.findOneAndDelete({ _id: id });

  if (!industry) {
    return res.status(400).json({ error: "No such industry" });
  }

  res.status(200).json(industry);
};

// Update a industry
exports.updateIndustry = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such industry" });
  }

  const industry = await industryModel.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!industry) {
    return res.status(400).json({ error: "No such industry" });
  }

  res.status(200).json(industry);
};
