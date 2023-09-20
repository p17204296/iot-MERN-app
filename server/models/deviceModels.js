const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
  deviceName: { type: String, required: true },
  warehouseAdditionTime: { type: Date, required: true },
  fee: { type: Number, required: true, min: 0 },
  linkedIndustry: { type: String, required: true },
});

module.exports = mongoose.model('Device', deviceSchema);
