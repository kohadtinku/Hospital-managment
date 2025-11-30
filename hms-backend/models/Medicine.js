const mongoose = require('mongoose');

const medSchema = new mongoose.Schema({
  name: { type: String, required: true },
  genericName: { type: String },
  strength: { type: String },
  type: { type: String }, // Tablet/Syrup/Injection
  company: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Medicine', medSchema);
