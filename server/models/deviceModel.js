const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: "warehouseAdditionTime", updatedAt: "updatedAt" },
};

const deviceSchema = new Schema(
  {
    deviceName: { type: String, required: true },
    fee: { type: Number, required: true, min: 0 },
    linkedIndustry: { type: String, required: true },
  },
  schemaOptions
);

module.exports = mongoose.model("Device", deviceSchema);
