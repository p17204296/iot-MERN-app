const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const industrySchema = new Schema({
  industryName: { type: String, required: true },
});

module.exports = mongoose.model("Industry", industrySchema);
